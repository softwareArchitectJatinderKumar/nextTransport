'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { transportService } from '@/services/transportService';

// Use dynamic import for TransportModal to prevent SSR issues
const TransportModalDynamic = dynamic(() => import('./TransportModal'), { ssr: false });

interface DashboardProps {
  readOnly?: boolean;
}

function DashboardContent({ readOnly = false }: DashboardProps) {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Advanced Filter State
  const filterKeys = [
    'CRANE', 'CONTAINER', 'FULL_LOADS', 'General_Freight', 'Crane','Urgent',
    'Vehicle', 'Refrigerated', 'URGENT', 'Sensitive', 'Freight'
  ];
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>(
    filterKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  // Check authentication for non-readonly mode
  useEffect(() => {
    if (!readOnly) {
      const isAuth = localStorage.getItem('auth-token') === 'authenticated';
      if (!isAuth) {
        router.push('/login');
        return;
      }
    }
  }, [readOnly, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await transportService.getAll();
      setData(res || []);
      setFilteredData(res || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search and filtering logic
  useEffect(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(query)
        )
      );
    }

    // Apply advanced filters
    const selectedFilters = Object.keys(activeFilters).filter(key => activeFilters[key]);
    if (selectedFilters.length > 0) {
      result = result.filter(item => 
        selectedFilters.every(filter => item[filter] === true || item[filter] === 1 || item[filter] === 'true')
      );
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, activeFilters, data]);

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearFilters = () => {
    setActiveFilters(filterKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    setSearchQuery('');
    setShowFilterDropdown(false);
  };

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredData.slice(startIndex, endIndex);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        await transportService.delete(id);
        loadData();
      } catch (err) {
        console.error('Error deleting record:', err);
        alert('Error deleting record');
      }
    }
  };

  // Columns to EXEMPT from the table grid
  const exemptColumns = [...filterKeys, 'id', 'created_at', 'updated_at', 'user_id'];
  const allKeys = data.length > 0 ? Object.keys(data[0]) : [];
  const displayCols = allKeys.filter(key => !exemptColumns.includes(key));

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid mt-4 px-4">
      {/* Main Grid */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">Fleet Directory <span className="badge bg-secondary ms-2">{filteredData.length}</span></h5>
            {!readOnly && (
              <div className="d-flex align-items-center gap-2">
                <button onClick={() => { setSelectedRecord(null); setIsModalOpen(true); }} className="btn btn-primary btn-sm px-3">+ Add New</button>
              </div>
            )}
          </div>
          
          {/* Search and Filter Row - Improved UI */}
          <div className="bg-light rounded p-3">
            {/* Search Box */}
            <div className="mb-3">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search all columns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
            
            {/* Horizontal Filter Checkboxes - Improved UI */}
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="small fw-semibold text-muted text-uppercase">Quick Filters:</span>
                {(activeFilterCount > 0 || searchQuery) && (
                  <button 
                    className="btn btn-link btn-sm text-decoration-none text-danger p-0"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="d-flex flex-wrap gap-2">
                {filterKeys.map(key => (
                  <label 
                    key={key} 
                    className={`btn btn-sm ${activeFilters[key] ? 'btn-primary' : 'btn-outline-secondary'}`}
                  >
                    <input 
                      type="checkbox" 
                      className="d-none"
                      checked={activeFilters[key]}
                      onChange={() => toggleFilter(key)}
                    />
                    {key.replace('_', ' ')}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-responsive" style={{ maxHeight: '75vh' }}>
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light sticky-top">
              <tr>
                {displayCols.map(c => (
                  <th key={c} className="text-uppercase small fw-bold text-muted">{c.replace('_', ' ')}</th>
                ))}
                {!readOnly && <th className="text-end px-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan={displayCols.length + 1} className="text-center py-5 text-muted">
                    No records found
                  </td>
                </tr>
              ) : (
                currentRecords.map((item, idx) => (
                  <tr key={item.id || idx}>
                    {displayCols.map(c => (
                      <td key={c} className="small text-truncate" style={{ maxWidth: '180px' }}>
                        {String(item[c] ?? '-')}
                      </td>
                    ))}
                    {!readOnly && (
                      <td className="text-end px-4">
                        <button onClick={() => { setSelectedRecord(item); setIsModalOpen(true); }} className="btn btn-sm btn-outline-info me-1">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="card-footer bg-white py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            {/* Records per page dropdown */}
            <div className="d-flex align-items-center gap-2">
              <span className="small text-muted">Records per page:</span>
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            
            {/* Pagination info */}
            <div className="small text-muted">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
            </div>
            
            {/* Prev/Next buttons */}
            <div className="d-flex align-items-center gap-2">
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="small text-muted">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {!readOnly && (
        <TransportModalDynamic
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={async (formData) => {
            if (selectedRecord) await transportService.update(selectedRecord.id, formData);
            else await transportService.create(formData);
            setIsModalOpen(false);
            loadData();
          }} 
          initialData={selectedRecord}
          columns={allKeys}
        />
      )}
    </div>
  );
}

export default function Dashboard(props: DashboardProps) {
  return <DashboardContent {...props} />;
}

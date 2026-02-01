'use client';
import { useState, useEffect } from 'react';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  columns: string[];
}

// Columns that should be displayed as checkboxes (true/false)
const checkboxColumns = [
  'CRANE', 'CONTAINER', 'FULL_LOADS', 'General_Freight', 'Crane', 'Urgent',
  'Vehicle', 'Refrigerated', 'URGENT', 'Sensitive', 'Freight'
];

export default function TransportModal({ isOpen, onClose, onSave, initialData, columns }: TransportModalProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const editableColumns = columns.filter(col => !['id', 'created_at', 'updated_at', 'user_id'].includes(col));
  
  // Separate checkbox columns from text columns
  const checkboxCols = editableColumns.filter(col => checkboxColumns.includes(col));
  const textCols = editableColumns.filter(col => !checkboxColumns.includes(col));

  const handleCheckboxChange = (col: string, checked: boolean) => {
    setFormData({ ...formData, [col]: checked });
  };

  return (
    <div className="modal d-block show" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-truck me-2"></i>
              {initialData ? 'Edit Transport Record' : 'Add New Transport Record'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form id="transportForm" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
              
              {/* Basic Information Section */}
              <h6 className="text-uppercase text-muted fw-bold mb-3 pb-2 border-bottom">Basic Information</h6>
              <div className="row g-3 mb-4">
                {textCols.filter(col => !['LOCATIONS', 'CARRIER', 'Phone', 'Notes', 'ContactPerson'].includes(col)).map(col => (
                  <div className="col-md-6" key={col}>
                    <label className="form-label small fw-semibold text-muted text-uppercase">{col.replace('_', ' ')}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Enter ${col.replace('_', ' ')}`}
                      value={formData[col] || ''}
                      onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              {/* Contact Details Section */}
              <h6 className="text-uppercase text-muted fw-bold mb-3 pb-2 border-bottom">Contact Details</h6>
              <div className="row g-3 mb-4">
                {textCols.includes('LOCATIONS') && (
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted text-uppercase">Locations</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Locations"
                      value={formData['LOCATIONS'] || ''}
                      onChange={(e) => setFormData({ ...formData, ['LOCATIONS']: e.target.value })}
                    />
                  </div>
                )}
                {textCols.includes('CARRIER') && (
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted text-uppercase">Carrier</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Carrier Name"
                      value={formData['CARRIER'] || ''}
                      onChange={(e) => setFormData({ ...formData, ['CARRIER']: e.target.value })}
                    />
                  </div>
                )}
                {textCols.includes('Phone') && (
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted text-uppercase">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      value={formData['Phone'] || ''}
                      onChange={(e) => setFormData({ ...formData, ['Phone']: e.target.value })}
                    />
                  </div>
                )}
                {textCols.includes('ContactPerson') && (
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted text-uppercase">Contact Person</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Contact Person"
                      value={formData['ContactPerson'] || ''}
                      onChange={(e) => setFormData({ ...formData, ['ContactPerson']: e.target.value })}
                    />
                  </div>
                )}
                {textCols.includes('Notes') && (
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted text-uppercase">Notes</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Notes"
                      rows={3}
                      value={formData['Notes'] || ''}
                      onChange={(e) => setFormData({ ...formData, ['Notes']: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Service Options Section */}
              <h6 className="text-uppercase text-muted fw-bold mb-3 pb-2 border-bottom">Service Options</h6>
              <div className="bg-light rounded p-3 mb-3">
                <div className="row g-2">
                  {checkboxCols.map(col => (
                    <div className="col-6 col-md-4 col-lg-3" key={col}>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`checkbox-${col}`}
                          checked={formData[col] === true || formData[col] === 'true' || formData[col] === 1}
                          onChange={(e) => handleCheckboxChange(col, e.target.checked)}
                          style={{ cursor: 'pointer' }}
                        />
                        <label className="form-check-label small fw-semibold" htmlFor={`checkbox-${col}`}>
                          {col.replace('_', ' ')}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </form>
          </div>
          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              <i className="bi bi-x-lg me-1"></i> Cancel
            </button>
            <button type="submit" form="transportForm" className="btn btn-primary">
              <i className="bi bi-check-lg me-1"></i>
              {initialData ? 'Update Record' : 'Save Record'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

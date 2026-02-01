// Dynamic import to avoid build-time errors with Supabase
let supabase: any = null;

async function getSupabaseClient() {
  if (supabase) return supabase;
  
  if (typeof window === 'undefined') {
    // Server-side - return null, will use empty data
    return null;
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured');
    return null;
  }
  
  try {
    // Dynamic import of @supabase/ssr
    const { createBrowserClient } = await import('@supabase/ssr');
    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    return supabase;
  } catch (e) {
    console.warn('Failed to load Supabase client:', e);
    return null;
  }
}

export const transportService = {
  // 1. Fetch all records
  async getAll() {
    try {
      const client = await getSupabaseClient();
      if (!client) return []; // Return empty if no Supabase
      
      const { data, error } = await client
        .from('Transports')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        console.error("Supabase Fetch Error:", error.message);
        return [];
      }
      return data || [];
    } catch (e) {
      console.error('Error fetching data:', e);
      return [];
    }
  },

  // 2. Insert a record
  async create(payload: any) {
    const client = await getSupabaseClient();
    if (!client) throw new Error('Supabase not configured');
    
    const { data, error } = await client
      .from('Transports')
      .insert([payload])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 3. Update a record
  async update(id: string | number, payload: any) {
    const client = await getSupabaseClient();
    if (!client) throw new Error('Supabase not configured');
    
    const { id: _, created_at: __, ...updateData } = payload;

    const { data, error } = await client
      .from('Transports')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Delete a record
  async delete(id: string | number) {
    const client = await getSupabaseClient();
    if (!client) throw new Error('Supabase not configured');
    
    const { error } = await client
      .from('Transports')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

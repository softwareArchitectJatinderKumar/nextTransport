import { createBrowserClient } from '@supabase/ssr'

// Create client lazily to avoid build-time errors
function getSupabaseClient() {
  if (typeof window === 'undefined') {
    // Return a dummy client for server-side during build
    return null;
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured');
    return null;
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const transportService = {
  // 1. Fetch all records
  async getAll() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      // Return mock data for build/preview without Supabase
      return [];
    }
    
    const { data, error } = await supabase
      .from('Transports')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.error("Supabase Fetch Error:", error.message);
      throw error;
    }
    return data || [];
  },

  // 2. Insert a record
  async create(payload: any) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('Transports')
      .insert([payload])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 3. Update a record
  async update(id: string | number, payload: any) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not configured');
    
    const { id: _, created_at: __, ...updateData } = payload;

    const { data, error } = await supabase
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
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not configured');
    
    const { error } = await supabase
      .from('Transports')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

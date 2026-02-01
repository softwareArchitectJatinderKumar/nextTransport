import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const transportService = {
  // 1. Fetch all records
  async getAll() {
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
    // Architect Tip: Ensure we don't accidentally send empty ID strings
    const { data, error } = await supabase
      .from('Transports')
      .insert([payload])
      .select()
      .single(); // Return the newly created object specifically
    
    if (error) throw error;
    return data;
  },

  // 3. Update a record
  async update(id: string | number, payload: any) {
    /** * FIX: Remove system fields from payload before sending to Supabase.
     * Supabase will throw an error if you try to "update" the ID field.
     */
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
    const { error } = await supabase
      .from('Transports')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
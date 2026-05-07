export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          role: 'admin' | 'parent' | 'staff'
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['users']['Row'],
          'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      parents: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          address: string | null
          gender: 'M' | 'F' | 'Other' | null
          status: 'Active' | 'Inactive' | null
          payment_status: 'Current' | 'Pending' | 'Overdue' | null
          owing_amount: number | null
          user_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['parents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['parents']['Insert']>
      }
      children: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'M' | 'F' | 'Other'
          enrollment_date: string
          program_type: 'infant' | 'toddler' | 'preschool'
          status: 'Active' | 'Inactive' | 'Waitlisted'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['children']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['children']['Insert']>
      }
      parent_child: {
        Row: {
          id: string
          parent_id: string
          child_id: string
          relationship: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['parent_child']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['parent_child']['Insert']>
      }
      enrollment_applications: {
        Row: {
          id: string
          child_full_name: string
          child_preferred_name: string | null
          date_of_birth_year: number
          date_of_birth_month: number
          date_of_birth_day: number
          address: string
          parent1_name: string
          parent1_email: string
          parent1_cell_phone: string
          emergency_contact1_name: string
          emergency_contact1_home_phone: string
          allergies_details: string | null
          status: 'Pending' | 'Approved' | 'Rejected'
          enrollment_date_year: number
          enrollment_date_month: number
          enrollment_date_day: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['enrollment_applications']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['enrollment_applications']['Insert']>
      }
      payments: {
        Row: {
          id: string
          child_id: string
          parent_id: string
          amount: number
          payment_date: string
          payment_type: string
          payment_method: string
          status: 'Paid' | 'Pending' | 'Late'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          type: 'general' | 'event' | 'urgent' | 'reminder'
          priority: 'low' | 'medium' | 'high'
          target_audience: 'all' | 'parents' | 'staff'
          is_active: boolean
          expires_at: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['announcements']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          status: 'Unread' | 'Read' | 'Replied'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

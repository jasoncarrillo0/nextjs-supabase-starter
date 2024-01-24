export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type User = Database["public"]["Tables"]["users"]["Row"];

export interface Database {
  public: {
    Tables: {
      orphaned_users: {
        Row: {
          acct_status: Database["public"]["Enums"]["acct_status_types"] | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          other_fields: Json | null
          updated_at: string | null
        }
        Insert: {
          acct_status?: Database["public"]["Enums"]["acct_status_types"] | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          other_fields?: Json | null
          updated_at?: string | null
        }
        Update: {
          acct_status?: Database["public"]["Enums"]["acct_status_types"] | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          other_fields?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          acct_status: Database["public"]["Enums"]["acct_status_types"] | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          other_fields: Json | null
          updated_at: string | null
        }
        Insert: {
          acct_status?: Database["public"]["Enums"]["acct_status_types"] | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          other_fields?: Json | null
          updated_at?: string | null
        }
        Update: {
          acct_status?: Database["public"]["Enums"]["acct_status_types"] | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          other_fields?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      acct_status_types: "confirmed" | "unconfirmed" | "deleted" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

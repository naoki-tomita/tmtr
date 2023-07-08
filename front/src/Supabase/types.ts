export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          bio: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          bio?: string
          created_at?: string
          id: string
          name: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tomeeta: {
        Row: {
          created_at: string
          id: string
          text: string
          user: string
        }
        Insert: {
          created_at?: string
          id?: string
          text: string
          user: string
        }
        Update: {
          created_at?: string
          id?: string
          text?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "tomeeta_user_fkey"
            columns: ["user"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
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

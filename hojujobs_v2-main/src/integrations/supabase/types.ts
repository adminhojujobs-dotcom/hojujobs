export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      anonymous_click_events: {
        Row: {
          anonymous_id: string | null
          country: string | null
          created_at: string | null
          event_name: string
          id: string
          listing_id: string | null
          listing_type: string | null
          metadata: Json | null
          page_url: string | null
          user_agent: string | null
        }
        Insert: {
          anonymous_id?: string | null
          country?: string | null
          created_at?: string | null
          event_name: string
          id?: string
          listing_id?: string | null
          listing_type?: string | null
          metadata?: Json | null
          page_url?: string | null
          user_agent?: string | null
        }
        Update: {
          anonymous_id?: string | null
          country?: string | null
          created_at?: string | null
          event_name?: string
          id?: string
          listing_id?: string | null
          listing_type?: string | null
          metadata?: Json | null
          page_url?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      business_job_listings: {
        Row: {
          branch_id: string
          company_slug: string
          created_at: string
          details: string | null
          id: string
          is_active: boolean
          salary: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          branch_id: string
          company_slug: string
          created_at?: string
          details?: string | null
          id?: string
          is_active?: boolean
          salary?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          branch_id?: string
          company_slug?: string
          created_at?: string
          details?: string | null
          id?: string
          is_active?: boolean
          salary?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_job_listings_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "company_branches"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          created_at: string
          description: string | null
          event_date_label: string | null
          id: string
          image_url: string | null
          is_active: boolean
          location_label: string | null
          organizer: string
          sort_order: number
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date_label?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          location_label?: string | null
          organizer: string
          sort_order?: number
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date_label?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          location_label?: string | null
          organizer?: string
          sort_order?: number
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_branches: {
        Row: {
          address: string
          branch_label: string | null
          branch_name: string
          company_slug: string
          condition_rows: Json
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          map_query: string | null
          phone: string | null
          phone_href: string | null
          recruitment_rows: Json
          sort_order: number
          updated_at: string
        }
        Insert: {
          address: string
          branch_label?: string | null
          branch_name: string
          company_slug: string
          condition_rows?: Json
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          map_query?: string | null
          phone?: string | null
          phone_href?: string | null
          recruitment_rows?: Json
          sort_order?: number
          updated_at?: string
        }
        Update: {
          address?: string
          branch_label?: string | null
          branch_name?: string
          company_slug?: string
          condition_rows?: Json
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          map_query?: string | null
          phone?: string | null
          phone_href?: string | null
          recruitment_rows?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_branches_company_slug_fkey"
            columns: ["company_slug"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["slug"]
          },
        ]
      }
      company_job_openings: {
        Row: {
          apply_email: string | null
          area: string
          branch_id: string | null
          company: string
          company_slug: string
          condition_rows: Json
          created_at: string
          detail_intro: string | null
          detail_sections: Json
          hours: string
          id: string
          is_active: boolean
          pay: string
          pay_type: string
          posted_at: string
          recruitment_rows: Json
          skill_tags: string[]
          sort_order: number
          suburb: string
          title: string
          updated_at: string
        }
        Insert: {
          apply_email?: string | null
          area: string
          branch_id?: string | null
          company: string
          company_slug: string
          condition_rows?: Json
          created_at?: string
          detail_intro?: string | null
          detail_sections?: Json
          hours: string
          id?: string
          is_active?: boolean
          pay: string
          pay_type?: string
          posted_at?: string
          recruitment_rows?: Json
          skill_tags?: string[]
          sort_order?: number
          suburb: string
          title: string
          updated_at?: string
        }
        Update: {
          apply_email?: string | null
          area?: string
          branch_id?: string | null
          company?: string
          company_slug?: string
          condition_rows?: Json
          created_at?: string
          detail_intro?: string | null
          detail_sections?: Json
          hours?: string
          id?: string
          is_active?: boolean
          pay?: string
          pay_type?: string
          posted_at?: string
          recruitment_rows?: Json
          skill_tags?: string[]
          sort_order?: number
          suburb?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_job_openings_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "company_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_job_openings_company_slug_fkey"
            columns: ["company_slug"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["slug"]
          },
        ]
      }
      company_profiles: {
        Row: {
          about_paragraphs: string[]
          address: string
          badges: string[]
          condition_rows: Json
          created_at: string
          email: string | null
          id: string
          instagram_handle: string | null
          instagram_url: string | null
          is_active: boolean
          logo_url: string
          map_query: string | null
          name: string
          phone: string | null
          phone_href: string | null
          photo_url: string | null
          profile_title: string
          recruitment_rows: Json
          skill_tags: string[]
          slug: string
          subtitle: string
          updated_at: string
        }
        Insert: {
          about_paragraphs?: string[]
          address: string
          badges?: string[]
          condition_rows?: Json
          created_at?: string
          email?: string | null
          id?: string
          instagram_handle?: string | null
          instagram_url?: string | null
          is_active?: boolean
          logo_url: string
          map_query?: string | null
          name: string
          phone?: string | null
          phone_href?: string | null
          photo_url?: string | null
          profile_title: string
          recruitment_rows?: Json
          skill_tags?: string[]
          slug: string
          subtitle: string
          updated_at?: string
        }
        Update: {
          about_paragraphs?: string[]
          address?: string
          badges?: string[]
          condition_rows?: Json
          created_at?: string
          email?: string | null
          id?: string
          instagram_handle?: string | null
          instagram_url?: string | null
          is_active?: boolean
          logo_url?: string
          map_query?: string | null
          name?: string
          phone?: string | null
          phone_href?: string | null
          photo_url?: string | null
          profile_title?: string
          recruitment_rows?: Json
          skill_tags?: string[]
          slug?: string
          subtitle?: string
          updated_at?: string
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          aud: number | null
          base_currency: string
          eur: number | null
          fetched_at: string | null
          jpy: number | null
          usd: number | null
        }
        Insert: {
          aud?: number | null
          base_currency?: string
          eur?: number | null
          fetched_at?: string | null
          jpy?: number | null
          usd?: number | null
        }
        Update: {
          aud?: number | null
          base_currency?: string
          eur?: number | null
          fetched_at?: string | null
          jpy?: number | null
          usd?: number | null
        }
        Relationships: []
      }
      hojunara_realestate_share: {
        Row: {
          category: string | null
          contact_number: string | null
          description: string | null
          enquiry_email: string | null
          gender_restriction: string | null
          id: number
          image_url: string | null
          kakaoid: string | null
          post_photo: string[] | null
          price: number | null
          private_bathroom: boolean | null
          private_room: boolean | null
          state_location: string | null
          sub_category: string | null
          suburb: string | null
          time_posted: string | null
          title: string | null
          uploaded_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          contact_number?: string | null
          description?: string | null
          enquiry_email?: string | null
          gender_restriction?: string | null
          id?: never
          image_url?: string | null
          kakaoid?: string | null
          post_photo?: string[] | null
          price?: number | null
          private_bathroom?: boolean | null
          private_room?: boolean | null
          state_location?: string | null
          sub_category?: string | null
          suburb?: string | null
          time_posted?: string | null
          title?: string | null
          uploaded_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          contact_number?: string | null
          description?: string | null
          enquiry_email?: string | null
          gender_restriction?: string | null
          id?: never
          image_url?: string | null
          kakaoid?: string | null
          post_photo?: string[] | null
          price?: number | null
          private_bathroom?: boolean | null
          private_room?: boolean | null
          state_location?: string | null
          sub_category?: string | null
          suburb?: string | null
          time_posted?: string | null
          title?: string | null
          uploaded_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      homepage_job_cards: {
        Row: {
          company_label: string
          created_at: string
          id: string
          is_active: boolean
          job_url: string | null
          location_label: string
          logo_text: string
          logo_tone: string
          logo_url: string | null
          pay_amount: string
          pay_type: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          company_label: string
          created_at?: string
          id?: string
          is_active?: boolean
          job_url?: string | null
          location_label: string
          logo_text: string
          logo_tone?: string
          logo_url?: string | null
          pay_amount: string
          pay_type: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          company_label?: string
          created_at?: string
          id?: string
          is_active?: boolean
          job_url?: string | null
          location_label?: string
          logo_text?: string
          logo_tone?: string
          logo_url?: string | null
          pay_amount?: string
          pay_type?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          contact: string | null
          description: string | null
          email: string | null
          google_search: string | null
          id: number
          image_url: string | null
          industry: string | null
          kakaoid: string | null
          location: string[] | null
          Promoted: boolean | null
          Source: string | null
          title: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          contact?: string | null
          description?: string | null
          email?: string | null
          google_search?: string | null
          id?: never
          image_url?: string | null
          industry?: string | null
          kakaoid?: string | null
          location?: string[] | null
          Promoted?: boolean | null
          Source?: string | null
          title?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact?: string | null
          description?: string | null
          email?: string | null
          google_search?: string | null
          id?: never
          image_url?: string | null
          industry?: string | null
          kakaoid?: string | null
          location?: string[] | null
          Promoted?: boolean | null
          Source?: string | null
          title?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      jobs_archive: {
        Row: {
          contact: string | null
          description: string | null
          email: string | null
          google_search: string | null
          id: number
          image_url: string | null
          industry: string | null
          kakaoid: string | null
          location: string[] | null
          Promoted: boolean | null
          Source: string | null
          title: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          contact?: string | null
          description?: string | null
          email?: string | null
          google_search?: string | null
          id?: never
          image_url?: string | null
          industry?: string | null
          kakaoid?: string | null
          location?: string[] | null
          Promoted?: boolean | null
          Source?: string | null
          title?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact?: string | null
          description?: string | null
          email?: string | null
          google_search?: string | null
          id?: never
          image_url?: string | null
          industry?: string | null
          kakaoid?: string | null
          location?: string[] | null
          Promoted?: boolean | null
          Source?: string | null
          title?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category_key: string
          category_label_ko: string
          category_summary_ko: string | null
          category_tone: string | null
          created_at: string
          id: number
          image_url: string | null
          is_featured: boolean
          meta: string | null
          original_published_at: string | null
          published_at_label_ko: string | null
          show_on_dashboard: boolean
          show_on_news_page: boolean
          sort_order: number
          source_domain: string | null
          source_name: string
          source_url: string
          summary_ko: string
          title: string
          updated_at: string
        }
        Insert: {
          category_key: string
          category_label_ko: string
          category_summary_ko?: string | null
          category_tone?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          is_featured?: boolean
          meta?: string | null
          original_published_at?: string | null
          published_at_label_ko?: string | null
          show_on_dashboard?: boolean
          show_on_news_page?: boolean
          sort_order?: number
          source_domain?: string | null
          source_name: string
          source_url: string
          summary_ko: string
          title: string
          updated_at?: string
        }
        Update: {
          category_key?: string
          category_label_ko?: string
          category_summary_ko?: string | null
          category_tone?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          is_featured?: boolean
          meta?: string | null
          original_published_at?: string | null
          published_at_label_ko?: string | null
          show_on_dashboard?: boolean
          show_on_news_page?: boolean
          sort_order?: number
          source_domain?: string | null
          source_name?: string
          source_url?: string
          summary_ko?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ozbargain_deals: {
        Row: {
          category: string
          description: string | null
          external_url: string | null
          id: number
          image_url: string | null
          promo_codes: Json
          promoted: boolean
          rank: number
          teaser_description: string | null
          title: string
          uploaded_at: string
        }
        Insert: {
          category: string
          description?: string | null
          external_url?: string | null
          id?: number
          image_url?: string | null
          promo_codes?: Json
          promoted?: boolean
          rank: number
          teaser_description?: string | null
          title: string
          uploaded_at: string
        }
        Update: {
          category?: string
          description?: string | null
          external_url?: string | null
          id?: number
          image_url?: string | null
          promo_codes?: Json
          promoted?: boolean
          rank?: number
          teaser_description?: string | null
          title?: string
          uploaded_at?: string
        }
        Relationships: []
      }
      user_click_events: {
        Row: {
          country: string | null
          created_at: string | null
          event_name: string
          id: string
          listing_id: string | null
          listing_type: string | null
          metadata: Json | null
          page_url: string | null
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          event_name: string
          id?: string
          listing_id?: string | null
          listing_type?: string | null
          metadata?: Json | null
          page_url?: string | null
          user_id: string
        }
        Update: {
          country?: string | null
          created_at?: string | null
          event_name?: string
          id?: string
          listing_id?: string | null
          listing_type?: string | null
          metadata?: Json | null
          page_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          account_type: string
          contact_number: string | null
          created_at: string
          education: string | null
          email: string | null
          full_name: string | null
          introduction: string | null
          job_email_opt_in: boolean
          onboarding_completed: boolean
          other_info: string | null
          updated_at: string
          user_id: string
          visa_type: string | null
          work_history: string | null
        }
        Insert: {
          account_type: string
          contact_number?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          full_name?: string | null
          introduction?: string | null
          job_email_opt_in?: boolean
          onboarding_completed?: boolean
          other_info?: string | null
          updated_at?: string
          user_id: string
          visa_type?: string | null
          work_history?: string | null
        }
        Update: {
          account_type?: string
          contact_number?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          full_name?: string | null
          introduction?: string | null
          job_email_opt_in?: boolean
          onboarding_completed?: boolean
          other_info?: string | null
          updated_at?: string
          user_id?: string
          visa_type?: string | null
          work_history?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      view_counts: {
        Row: {
          count: number
          id: string
          job_id: number
          updated_at: string
          uploaded_at: string | null
        }
        Insert: {
          count?: number
          id?: string
          job_id: number
          updated_at?: string
          uploaded_at?: string | null
        }
        Update: {
          count?: number
          id?: string
          job_id?: number
          updated_at?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_view_counts_job_id"
            columns: ["job_id"]
            isOneToOne: true
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_activity_summary: {
        Row: {
          contact_text_selections: number | null
          country: string | null
          dashboard_page_views: number | null
          display_name: string | null
          email: string | null
          email_clicks: number | null
          filters_changed: number | null
          first_activity: string | null
          flatmates_page_views: number | null
          job_posts_started: number | null
          job_posts_submitted: number | null
          job_views: number | null
          kakao_clicks: number | null
          last_activity: string | null
          news_page_views: number | null
          phone_clicks: number | null
          rental_posts_started: number | null
          rental_posts_submitted: number | null
          rental_views: number | null
          sale_views: number | null
          sales_page_views: number | null
          searches_performed: number | null
          total_contact_clicks: number | null
          total_events: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_anonymous_activity_summary: {
        Args: { since?: string }
        Returns: {
          country: string
          event_name: string
          first_activity: string
          label: string
          last_activity: string
          listing_id: string
          listing_type: string
          page_path: string
          source: string
          surface: string
          total_events: number
          unique_visitors: number
        }[]
      }
      get_user_activity_summary: {
        Args: { since?: string }
        Returns: {
          admin_clicks: number
          auth_events: number
          contact_text_selections: number
          country: string
          dashboard_page_views: number
          deal_outbound_clicks: number
          display_name: string
          email: string
          email_clicks: number
          filters_changed: number
          first_activity: string
          flatmates_page_views: number
          job_card_clicks: number
          job_posts_started: number
          job_posts_submitted: number
          job_views: number
          kakao_clicks: number
          last_activity: string
          map_clicks: number
          my_posts_clicks: number
          navigation_clicks: number
          news_article_clicks: number
          news_page_views: number
          phone_clicks: number
          post_cta_clicks: number
          promote_cta_clicks: number
          rental_card_clicks: number
          rental_posts_started: number
          rental_posts_submitted: number
          rental_views: number
          sale_card_clicks: number
          sale_views: number
          sales_filters_changed: number
          sales_page_views: number
          searches_performed: number
          total_contact_clicks: number
          total_events: number
          user_id: string
        }[]
      }
      has_role:
        | { Args: { _role: string; _user_id: string }; Returns: boolean }
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
      increment_job_view_counts: { Args: never; Returns: undefined }
      increment_view_count: { Args: { p_job_id: number }; Returns: number }
      map_location_to_region: { Args: { suburbs: string[] }; Returns: string[] }
      sync_jobs_archive_id_sequence: { Args: never; Returns: number }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const

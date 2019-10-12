export interface Profile {
  role: string;
  user_id: number;
  supplier_id: number;
  email: string;
  company_name: string;
  company_description: string;
  logo_path: string;
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  city: string;
  postal_code: string;
}

export interface ApiResponse {
  status: number;
  message: string;
}

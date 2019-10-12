export class DashboardInfo {
  customerCount: number;
  supplierCount: number;
  productCount: number;
  notifications: Notification[];
}

export class Notification {
  phone: string;
  email: string;
  code: string;
  date: string;
}

export interface Category {
  CategoryID: number;
  ParentID: number;
  SupplierID: number;
  CategoryName: string;
  Descriptions: string;
  Slug: string;
  Picture: string | File;
}

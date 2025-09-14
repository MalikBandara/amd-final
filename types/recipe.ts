export interface Recipe {
  id?: string;
  title: string;
  description?: string;
  ingredients: string[];
  steps: string[];
  isPublished: boolean;
  createdAt?: any;
  createdBy?: string;
}

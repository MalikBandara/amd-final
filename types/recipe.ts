
export interface Recipe {
  id?: string;
  title: string;
  description?: string;
  ingredients: string[]; // ["Eggs 2", "Milk 200ml"]
  steps: string[];       // ["Beat eggs", "Heat pan"]
  images: string[];      // storage URLs
  tags?: string[];       // ["breakfast","quick"]
  prepTimeMin?: number;
  cookTimeMin?: number;
  serves?: number;
  isPublished: boolean;
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
}

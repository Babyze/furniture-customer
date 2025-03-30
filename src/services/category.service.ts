import { API_ROUTES } from '@src/constants/api-routes.constant';
import { Category } from '@src/models/category.model';
import { api } from './axios';

class CategoryService {
  private static instance: CategoryService;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async getCategories(): Promise<Category[]> {
    return api.public.get<Category[]>(API_ROUTES.CATEGORY.LIST);
  }
}

export const categoryService = CategoryService.getInstance();

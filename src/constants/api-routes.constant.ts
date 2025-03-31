export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/customer/auth/signin',
    SIGN_UP: '/customer/auth/signup',
    REFRESH_TOKEN: '/customer/auth/refresh-token',
  },
  PRODUCT: {
    LIST: '/customer/products',
    CREATE: '/customer/products',
    GET_BY_ID: (id: number) => `/customer/products/${id}`,
    GET_SPUS: (id: number) => `/customer/products/${id}/spus`,
    GET_IMAGE: (id: number) => `/customer/products/${id}/images`,
  },
  ORDER: {
    PLACE_ORDER: '/customer/orders',
    GET_ORDERS: '/customer/orders',
  },
  CATEGORY: {
    LIST: '/customer/categories',
  },
  CATEGORY_AREA: {
    LIST: '/customer/category-areas',
  },
};

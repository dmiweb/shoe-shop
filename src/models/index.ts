export type RetryRequestConfig = {
  initialDelay: number;
  maxDelay: number;
  exponent: number;
}

export type CustomError = Error & {
  status?: number;
}

export type TGetParams = {
  offset?: string;
  categoryId?: string;
  q?: string;
}

export type TMenuItem = {
  label: string;
  link: string;
};

export type TCategoryProducts = {
  id: number;
  title: string;
}

export type TCatalogItem = {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export type TProduct = {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: {
    size: string;
    available: boolean;
  }[];
}

export type TOrder = {
  id: number;
  title: string;
  size: string | null;
  count: number;
  price: number;
  totalPrice: number;
}

export type TCompletedOrder = {
  owner: {
    phone: string;
    address: string;
  };
  items: {
    id: number;
    price: number;
    count: number;
  }[];
}

export type TCatalogState = {
  catalog: TCatalogItem[];
  loading: boolean;
  error: string | null;
  newProductsCount: number | null;
  searchQuery: string;
}

export type TTopSalesState = {
  topSales: TCatalogItem[];
  topSalesLoading: boolean;
  topSalesError: string | null;
}

export type TCategoriesState = {
  categories: TCategoryProducts[];
  loading: boolean;
  error: string | null;
  selectedCategory: number | null;
}

export type TProductState = {
  product: TProduct | null;
  loading: boolean;
  error: string | null;
  size: string | null;
  count: number;
  price: number | null;
}

export type TCartState = {
  orders: TOrder[] | null;
  loading: boolean;
  error: string | null;
  orderStatus: boolean;
}

export type TRootState = {
  catalog: TCatalogState;
  topSales: TTopSalesState;
  categories: TCategoriesState;
  cart: TCartState;
};
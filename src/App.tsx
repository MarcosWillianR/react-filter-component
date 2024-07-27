import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { fetchProducts, ProductFilters } from './api/products';
import ProductList from './components/ProductList/ProductList';
import ProductListFilters from './components/ProductList/ProductListFilters';

export default function App() {
  const [search, setSearch] = useState<ProductFilters['search']>('');
  const [category, setCategory] = useState<ProductFilters['category']>();
  const [maxPrice, setMaxPrice] = useState<ProductFilters['maxPrice']>();

  const { data, isFetching } = useQuery({
    queryKey: ['products', { search, category, maxPrice }],
    queryFn: () => fetchProducts({ search, category, maxPrice }),
  });

  const handleChangeFilters = useCallback((filters: ProductFilters) => {
    setSearch(filters.search);
    setCategory(filters.category);
    setMaxPrice(filters.maxPrice);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-4xl font-bold">Products</h1>
      </div>
      <ProductListFilters
        onChange={(filters) => handleChangeFilters(filters)}
      />
      <div>
        {data && <ProductList products={data} />}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
}

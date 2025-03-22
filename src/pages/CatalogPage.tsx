import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { requestCatalog, requestMoreCatalogItems, cancelRequestCatalog } from "../slices/catalogSlice";
import { selectCategory, cancelRequestCategories } from "../slices/categoriesSlice";
import { Section, Loader, Error, Banner, Search, Categories, Catalog, LoadMoreButton } from "../components";

const CatalogPage = () => {
  const dispatch = useAppDispatch();

  const { catalog, loading, error, newProductsCount, searchQuery } = useAppSelector((state) => state.catalog);


  useEffect(() => {
    dispatch(selectCategory(null));
    dispatch(requestCatalog());

    return () => {
      dispatch(cancelRequestCategories());
      dispatch(cancelRequestCatalog());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMoreButton = () => {
    dispatch(requestMoreCatalogItems(catalog.length));
  }

  const handleCatalogError = () => {
    dispatch(requestMoreCatalogItems(catalog.length));
  }

  return (
    <>
      <Banner />
      <Section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Search className="catalog-search-form form-inline" clearOnSubmit={false} />
        {<Categories />}
        {catalog.length ? <Catalog catalog={catalog} /> : null}
        {!loading && !catalog.length && searchQuery ?
          <div className="text-center fs-4">Товары не найдены</div> : null}
        {loading && <Loader />}
        {error && !loading && <div><Error message={error} handler={handleCatalogError} /></div>}
        {catalog.length && newProductsCount === 6 ? <LoadMoreButton handler={handleLoadMoreButton} /> : null}
      </Section>
    </>
  );
}

export default CatalogPage;
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { requestCatalog, requestMoreCatalogItems, saveSearchQuery } from "../slices/catalogSlice";
import { requestTopSales } from "../slices/topSalesSlice";
import { selectCategory, cancelRequestCategories } from "../slices/categoriesSlice";
import { Loader, Error, Section, Banner, TopSales, Categories, Catalog, LoadMoreButton } from "../components";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { topSales, topSalesLoading } = useAppSelector((state) => state.topSales);
  const { catalog, loading, error, newProductsCount } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(cancelRequestCategories());
    dispatch(selectCategory(null));
    dispatch(saveSearchQuery(""));

    dispatch(requestTopSales());
    dispatch(requestCatalog());
  }, [dispatch]);

  const handleLoadMoreButton = () => {
    dispatch(requestMoreCatalogItems(catalog.length));
  }

  const handleCatalogError = () => {
    dispatch(requestMoreCatalogItems(catalog.length));
  }

  return (
    <>
      <Banner />
      {topSalesLoading || topSales.length ?
        <Section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {topSalesLoading && <Loader />}
          {topSales.length ? <TopSales catalog={topSales} /> : null}
        </Section> : null}

      <Section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {<Categories />}
        {catalog.length ? <Catalog catalog={catalog} /> : null}
        {loading && <Loader />}
        {error && !loading && <Error message={error} handler={handleCatalogError} />}
        {catalog.length && newProductsCount === 6 ? <LoadMoreButton handler={handleLoadMoreButton} /> : null}
      </Section>
    </>
  );
}

export default HomePage;
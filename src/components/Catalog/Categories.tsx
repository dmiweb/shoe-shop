import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { requestCatalog, requestCatalogByCategory } from "../../slices/catalogSlice";
import { requestCategories, selectCategory } from "../../slices/categoriesSlice";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories, selectedCategory } = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();

  const categoryStyle = "nav-link";
  const categoryStyleActive = "nav-link active";

  useEffect(() => {
    dispatch(requestCategories());
  }, [dispatch]);

  const handleClickCategoryAll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    dispatch(selectCategory(null));
    dispatch(requestCatalog());
  }

  const handleClickCategory = (event: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    event.preventDefault();

    dispatch(selectCategory(id));
    dispatch(requestCatalogByCategory(id));
  }

  const getClassNameLink = (categoryId: number | null): string => {
    return categoryId === selectedCategory ? categoryStyleActive : categoryStyle;
  };

  return (
    categories.length ?
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <Link
          to="#"
          className={getClassNameLink(null)}
          onClick={(event) => handleClickCategoryAll(event)}
        >
          Все
        </Link>
      </li>
      {
        categories.map((item) =>
          <li key={item.id} className="nav-item">
            <Link
              to="#"
              className={getClassNameLink(item.id)}
              onClick={(event) => handleClickCategory(event, item.id)}>
              {item.title}
            </Link>
          </li>
        )
      }
    </ul> : null
  );
}

export default Categories;
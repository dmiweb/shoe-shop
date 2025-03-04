import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveSearchQuery, requestCatalog } from "../../slices/catalogSlice";

type SearchProps = {
  dataId?: string;
  className: string;
  isVisible?: boolean;
  setVisible?: () => void | undefined;
  clearOnSubmit?: boolean;
}

const Search = forwardRef<HTMLFormElement, SearchProps>(
  ({ dataId, className, isVisible, setVisible, clearOnSubmit }, ref) => {
    const query = useAppSelector(state => state.catalog.searchQuery);
    const [searchInputValue, setSearchInputValue] = useState(query);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if (!clearOnSubmit) {
        setSearchInputValue(query);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const getClassName = (): string => {
      if (isVisible) {
        return className;
      } else {
        return `${className} invisible`;
      }
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      setSearchInputValue(inputValue);

      if (!clearOnSubmit && inputValue === "") {
        dispatch(saveSearchQuery(""));
        dispatch(requestCatalog());
      }
    }

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const searchQuery = searchInputValue.trim();

      if (searchQuery) {
        dispatch(saveSearchQuery(searchQuery));
        dispatch(requestCatalog());
        navigate("/catalog");

        if (clearOnSubmit) {
          setSearchInputValue("");
        }
      }

      if(setVisible) setVisible();
    }

    return (
      <form
        data-id={dataId}
        className={isVisible === undefined ? className : getClassName()}
        onSubmit={handleForm}
        ref={ref}
      >
        <input
          className="form-control"
          value={searchInputValue}
          placeholder="Поиск"
          onChange={handleChangeInput}
        />
      </form>
    );
  });

export default Search;
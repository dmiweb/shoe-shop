import { useState, useRef } from "react";
import { Logo, Menu, Search, CartWidget } from "../../components";
import { menuItemsHeader } from "../../data/menuItems";

const Nav = () => {
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);
  const searchFormRef = useRef<HTMLFormElement>(null);

  const setVisibleSearch = () => {
    setIsVisibleSearch((prevIsVisibleSearch) => !prevIsVisibleSearch);
  }

  const handleClickSubmitIcon = () => {
    if (isVisibleSearch) {
      if (searchFormRef.current) {
        searchFormRef.current.requestSubmit();
      }
    }

    if (!isVisibleSearch) {
      setVisibleSearch();

      setTimeout(() => {
        searchFormRef?.current?.querySelector('input')?.focus();
      }, 0);
    }

  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Logo />
      <div className="collapse navbar-collapse" id="navbarMain">
        <Menu classNameMenu="navbar-nav me-auto" menuItems={menuItemsHeader} />
        <div>
          <div className="header-controls-pics">
            <div
              data-id="search-expander"
              className="header-controls-pic header-controls-search"
              onClick={handleClickSubmitIcon}
            ></div>
            <CartWidget />
          </div>
          <Search
            dataId="search-form"
            className="header-controls-search-form form-inline"
            isVisible={isVisibleSearch}
            setVisible={setVisibleSearch}
            clearOnSubmit={true}
            ref={searchFormRef}
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;
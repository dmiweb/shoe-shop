import { Outlet } from "react-router-dom";
import { Header, Nav, Footer } from "../../components";

const Layout = () => {
  return (
    <>
      <Header>
        <Nav />
      </Header>

      <main className="container">
        <div className="row">
          <div className="col">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
import { Menu, Pay, Copyright, Contacts } from "../../components";
import { menuItemsFooter } from "../../data/menuItems";

const Footer = () => {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <section>
          <h5>Информация</h5>
            <Menu classNameMenu="nav flex-column" menuItems={menuItemsFooter} />
          </section>
        </div>
        <div className="col">
          <section>
          <h5>Принимаем к оплате:</h5>
            <Pay />
          </section>
          <section>
            <Copyright />
          </section>
        </div>
        <div className="col text-end">
          <section className="footer-contacts">
          <h5>Контакты:</h5>
            <Contacts />
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
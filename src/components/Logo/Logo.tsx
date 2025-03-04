import { Link } from "react-router-dom";
import headerLogo from "../../assets/img/header-logo.png";

const Logo = () => {
  return (
    <Link to="/" className="navbar-brand">
      <img src={headerLogo} alt="Bosa Noga" />
    </Link>
  );
}

export default Logo;
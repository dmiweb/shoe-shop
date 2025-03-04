import { NavLink } from "react-router-dom";
import { TMenuItem } from "../../models";

export default function MenuItem({ item }: { item: TMenuItem }) {

  const menuStyle = "nav-link";
  const menuStyleActive = "nav-link active";

  return (
    <li className="nav-item">
      <NavLink className={({ isActive }) => isActive ? menuStyleActive : menuStyle} to={item.link}>
        {item.label}
      </NavLink>
    </li>
  );
}
import { TMenuItem } from "../../models";
import { MenuItem } from "..";

type MenuProps = {
  classNameMenu?: string;
  menuItems: TMenuItem[];
};

const Menu = ({ classNameMenu, menuItems }: MenuProps) => {
  return (
    <ul className={classNameMenu} >
      {menuItems.map((item) => (
        <MenuItem key={item.label} item={item} />
      ))}
    </ul>
  );
}

export default Menu;
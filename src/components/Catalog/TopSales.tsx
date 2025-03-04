import { TCatalogItem } from "../../models";
import { Catalog } from "../../components";

const TopSales = ({ catalog }: { catalog: TCatalogItem[] }) => {
  return (
    <Catalog catalog={catalog} />
  );
}

export default TopSales;
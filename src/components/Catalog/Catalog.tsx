import { TCatalogItem } from "../../models";
import { CatalogItem } from "../../components";

const Catalog = ({ catalog }: { catalog: TCatalogItem[] }) => {
  return (
      <div className="row g-4 mb-4">
        {catalog.map(item => <CatalogItem key={item.id} item={item} />)}
      </div>
  );
}

export default Catalog;
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectSize } from "../../slices/productSlice";

type SizesProps = {
  sizes: {
    size: string;
    available: boolean;
  }[];
}

const Component = ({ sizes }: SizesProps) => {
  const { size } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  const itemSizeStyle = "catalog-item-size";
  const itemSizeStyleSelected = "catalog-item-size selected";


  const handleClickSize = (size: string): void => {
    dispatch(selectSize(size));
  }

  return (
    <p>Размеры в наличии:&nbsp;
      {sizes.map((o) => {
        return o.available ?
          <span
            key={o.size}
            className={o.size === size ? itemSizeStyleSelected : itemSizeStyle}
            onClick={() => handleClickSize(o.size)}
          >
            {o.size}
          </span> : null
      })}
    </p>
  );
}

export default Component;
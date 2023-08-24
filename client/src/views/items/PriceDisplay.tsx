import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type PriceDisplayProps = {
  value?: number;
};

function ItemPriceDisplay(props: PriceDisplayProps) {
  const value = props.value;
  if (!value) {
    return <span>Not for Sale</span>;
  }
  return (
    <span>
      <FontAwesomeIcon icon={faCoins} /> {value.toLocaleString()}
    </span>
  );
}

export default ItemPriceDisplay;

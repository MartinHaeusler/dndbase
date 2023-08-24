import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MerchantType } from "api/itemsApi";

export type ItemMerchantsDisplayProps = {
  merchants: MerchantType[];
};

function ItemMerchantsDisplay(props: ItemMerchantsDisplayProps) {
  const text =
    props.merchants.length <= 0
      ? "Not for Sale"
      : [...props.merchants]
          .sort()
          .map((m) => merchantTypeToHumanReadable(m))
          .join(", ");
  return (
    <span>
      <FontAwesomeIcon icon={faStore} /> {text}
    </span>
  );
}

function merchantTypeToHumanReadable(merchantType: MerchantType): string {
  switch (merchantType) {
    case "SMITH":
      return "Smith";
    case "TEMPLE":
      return "Temple";
    case "WEAPONSMITH":
      return "Weaponsmith";
    case "ARMORER":
      return "Armorer";
    case "ALCHEMIST":
      return "Alchemist";
    case "HEALER":
      return "Healer";
    case "WIZARD":
      return "Wizard";
    case "LIBRARIAN":
      return "Librarian";
    case "JEWELLER":
      return "Jeweller";
    case "GENERAL":
      return "General Store";
    case "CONCEALER":
      return "Concealer";
    case "BARD":
      return "Bard";
  }
}

export default ItemMerchantsDisplay;

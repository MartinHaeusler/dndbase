import { Icon } from "@blueprintjs/core";
import {
  faCandyCane,
  faFlask,
  faRing,
  faScroll,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType } from "api/itemsApi";

type ItemTypeDisplayProps = {
  itemType: ItemType;
};

function ItemTypeDisplay(props: ItemTypeDisplayProps) {
  switch (props.itemType) {
    case "ARMOR":
      return (
        <div>
          <Icon icon="shield" /> Armor
        </div>
      );
    case "POTION":
      return (
        <div>
          <FontAwesomeIcon icon={faFlask} /> Potion
        </div>
      );
    case "RING":
      return (
        <div>
          <FontAwesomeIcon icon={faRing} /> Ring
        </div>
      );
    case "ROD":
      return (
        <div>
          <Icon icon="slash" /> Rod
        </div>
      );
    case "SCROLL":
      return (
        <div>
          <FontAwesomeIcon icon={faScroll} /> Scroll
        </div>
      );
    case "STAFF":
      return (
        <div>
          <FontAwesomeIcon icon={faCandyCane} /> Staff
        </div>
      );
    case "WAND":
      return (
        <div>
          <FontAwesomeIcon icon={faWandMagicSparkles} /> Wand
        </div>
      );
    case "WEAPON":
      return (
        <div>
          <Icon icon="ninja" /> Weapon
        </div>
      );
    case "WONDROUS_ITEM":
      return (
        <div>
          <Icon icon="crown" /> Wondrous Item
        </div>
      );
  }
}

export default ItemTypeDisplay;

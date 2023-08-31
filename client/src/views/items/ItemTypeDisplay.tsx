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
  return <div><ItemTypeIcon type={props.itemType} />&nbsp;<ItemTypeName type={props.itemType} /></div>
}

export type ItemTypeIconProps = {
  type: ItemType
}

export function ItemTypeIcon(props: ItemTypeIconProps): JSX.Element {
  switch (props.type) {
    case "ARMOR":
      return <Icon icon="shield" />;
    case "POTION":
      return <FontAwesomeIcon icon={faFlask} />;
    case "RING":
      return <FontAwesomeIcon icon={faRing} />;
    case "ROD":
      return <Icon icon="slash" />;
    case "SCROLL":
      return <FontAwesomeIcon icon={faScroll} />;
    case "STAFF":
      return <FontAwesomeIcon icon={faCandyCane} />;
    case "WAND":
      return <FontAwesomeIcon icon={faWandMagicSparkles} />;
    case "WEAPON":
      return <Icon icon="ninja" />;
    case "WONDROUS_ITEM":
      return <Icon icon="crown" />;
  }
}

type ItemTypeNameProps = {
  type: ItemType
}

function ItemTypeName(props: ItemTypeNameProps): JSX.Element {
  switch (props.type) {
    case "ARMOR":
      return <span>Armor</span>;
    case "POTION":
      return <span>Potion</span>;
    case "RING":
      return <span>Ring</span>;
    case "ROD":
      return <span>Rod</span>;
    case "SCROLL":
      return <span>Scroll</span>;
    case "STAFF":
      return <span>Staff</span>;
    case "WAND":
      return <span>Wand</span>;
    case "WEAPON":
      return <span>Weapon</span>;
    case "WONDROUS_ITEM":
      return <span>Wondrous Item</span>;
  }
}

export default ItemTypeDisplay;

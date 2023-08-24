import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarStroke } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemRarity } from "api/itemsApi";
import { Tooltip } from "@blueprintjs/core";

type ItemRarityDisplayProps = {
  rarity: ItemRarity;
};

function ItemRarityDisplay(props: ItemRarityDisplayProps) {
  switch (props.rarity) {
    case "COMMON":
      return (
        <Tooltip content="Common">
          <div>
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
          </div>
        </Tooltip>
      );
    case "UNCOMMON":
      return (
        <Tooltip content="Uncommon">
          <div>
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
          </div>
        </Tooltip>
      );
    case "RARE":
      return (
        <Tooltip content="Rare">
          <div>
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
          </div>
        </Tooltip>
      );
    case "VERY_RARE":
      return (
        <Tooltip content="Very Rare">
          <div>
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarStroke} />
            <FontAwesomeIcon icon={faStarStroke} />
          </div>
        </Tooltip>
      );
    case "LEGENDARY":
      return (
        <Tooltip content="Legendary">
          <div>
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarStroke} />
          </div>
        </Tooltip>
      );
    case "ARTIFACT":
      return (
        <Tooltip content="Artifact">
          <div>
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
          </div>
        </Tooltip>
      );
  }
}

export default ItemRarityDisplay;

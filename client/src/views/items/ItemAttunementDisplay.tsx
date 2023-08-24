import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@blueprintjs/core";

export type ItemAttunementDisplayProps = {
  attunement: Boolean;
};

function ItemAttunementDisplay(props: ItemAttunementDisplayProps) {
  if (props.attunement) {
    return (
      <Tooltip content="This item requires attunement.">
        <FontAwesomeIcon icon={faSquareCheck} />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip content="This item does not require attunement.">
        <FontAwesomeIcon icon={faSquare} />
      </Tooltip>
    );
  }
}

export default ItemAttunementDisplay;

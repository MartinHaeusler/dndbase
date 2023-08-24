import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ItemSourceDisplayProps = {
  source: string | null | undefined;
};

function ItemSourceDisplay(props: ItemSourceDisplayProps) {
  return (
    <span>
      <FontAwesomeIcon icon={faBook} />
      &nbsp;
      {props.source ?? "unknown"}
    </span>
  );
}

export default ItemSourceDisplay;

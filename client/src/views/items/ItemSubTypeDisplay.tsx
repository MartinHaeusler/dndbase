export type ItemSubTypeDisplayProps = {
  subType: string;
};

function ItemSubTypeDisplay(props: ItemSubTypeDisplayProps) {
  return <span>{props.subType}</span>;
}

export default ItemSubTypeDisplay;

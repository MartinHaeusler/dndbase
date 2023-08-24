export type ItemExtraDisplayProps = {
  extra: string;
};

function ItemExtraDisplay(props: ItemExtraDisplayProps) {
  return <span>{props.extra}</span>;
}

export default ItemExtraDisplay;

import { Button, Classes, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { ItemType, itemType } from "api/itemsApi";
import { int } from "api/typeAliases";
import ItemTypeDisplay from "./ItemTypeDisplay";

export type ItemTypeSelectProps = {
  value: ItemType | undefined;
  onChange: (newItem: ItemType | undefined) => void;
};

function ItemTypeSelect(props: ItemTypeSelectProps): JSX.Element {
  return (
    <Select<int>
      items={generateIndicesArray()}
      filterable={false}
      itemRenderer={renderItemTypeForSelect}
      activeItem={mapItemTypeToIndex(props.value)}
      popoverProps={{
        minimal: false,
        matchTargetWidth: true,
        popoverClassName: Classes.DARK,
      }}
      onItemSelect={(selectedItemTypeIndex) => {
        const selectedItemType = mapItemTypeIndexToItemType(
          selectedItemTypeIndex
        );
        props.onChange(selectedItemType);
      }}
    >
      <Button
        className="itemTypeSelect"
        alignText="left"
        text={
          <span>{renderItemTypeOrAny(mapItemTypeToIndex(props.value))}</span>
        }
        rightIcon="caret-down"
      />
    </Select>
  );
}

function generateIndicesArray(): int[] {
  // one index for every entry of the enum
  const indices = itemType.map((_, index) => index);
  // add -1 as first entry to allow the user to select "any"
  indices.unshift(-1);
  return indices;
}

const renderItemTypeForSelect: ItemRenderer<int> = (
  value,
  { handleClick, handleFocus, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      className={Classes.DARK}
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={value}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={renderItemTypeOrAny(value)}
    />
  );
};

function renderItemTypeOrAny(value: int) {
  return value < 0 ? (
    "Any Item Type"
  ) : (
    <ItemTypeDisplay
      itemType={mapItemTypeIndexToItemType(value) ?? "WONDROUS_ITEM"}
    />
  );
}

function mapItemTypeToIndex(type: ItemType | undefined | null): int {
  switch (type) {
    case undefined:
    case null:
      return -1;
    default:
      const index = itemType.indexOf(type);
      if (index === undefined || index === null || index < 0) {
        throw new Error(`Unknown item type: ${type}`);
      }
      return index;
  }
}

function mapItemTypeIndexToItemType(index: int): ItemType | undefined {
  switch (index) {
    case -1:
      return undefined; // "all"
    default:
      const type = itemType.at(index);
      if (!type) {
        throw new Error(`Unknown item type index: ${index}`);
      }
      return type;
  }
}

export default ItemTypeSelect;

import { Button, Classes, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { ItemRarity, itemRarity } from "api/itemsApi";
import { int } from "api/typeAliases";
import ItemRarityDisplay from "./ItemRarityDisplay";

export type ItemRaritySelectProps = {
  value: ItemRarity | undefined;
  onChange: (newRarity: ItemRarity | undefined) => void;
};

function ItemRaritySelect(props: ItemRaritySelectProps): JSX.Element {
  return (
    <Select<int>
      items={generateIndicesArray()}
      filterable={false}
      itemRenderer={renderRarityForSelect}
      activeItem={mapItemRarityToIndex(props.value)}
      popoverProps={{
        minimal: false,
        matchTargetWidth: true,
        popoverClassName: Classes.DARK,
      }}
      onItemSelect={(selectedRarityIndex) => {
        const selectedRarity =
          mapItemRarityIndexToItemRarity(selectedRarityIndex);
        props.onChange(selectedRarity);
      }}
    >
      <Button
        className="raritySelect"
        alignText="left"
        text={
          <span>{renderRarityOrAny(mapItemRarityToIndex(props.value))}</span>
        }
        rightIcon="caret-down"
      />
    </Select>
  );
}

function generateIndicesArray(): int[] {
  // one index for every entry of the enum
  const indices = itemRarity.map((_, index) => index);
  // add -1 as first entry to allow the user to select "any"
  indices.unshift(-1);
  return indices;
}

const renderRarityForSelect: ItemRenderer<int> = (
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
      text={renderRarityOrAny(value)}
    />
  );
};

function renderRarityOrAny(value: int) {
  return value < 0 ? (
    "Any Rarity"
  ) : (
    <ItemRarityDisplay
      rarity={mapItemRarityIndexToItemRarity(value) ?? "COMMON"}
    />
  );
}

function mapItemRarityToIndex(rarity: ItemRarity | undefined | null): int {
  switch (rarity) {
    case undefined:
    case null:
      return -1;
    default:
      const index = itemRarity.indexOf(rarity);
      if (index === undefined || index === null || index < 0) {
        throw new Error(`Unknown rarity: ${rarity}`);
      }
      return index;
  }
}

function mapItemRarityIndexToItemRarity(index: int): ItemRarity | undefined {
  switch (index) {
    case -1:
      return undefined; // "all"
    default:
      const rarity = itemRarity.at(index);
      if (!rarity) {
        throw new Error(`Unknown rarity index: ${index}`);
      }
      return rarity;
  }
}

export default ItemRaritySelect;

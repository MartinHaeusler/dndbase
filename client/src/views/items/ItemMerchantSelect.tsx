import { Button, Classes, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { MerchantType, merchantType } from "api/itemsApi";
import { int } from "api/typeAliases";
import ItemMerchantDisplay from "./ItemMerchantsDisplay";

export type ItemMerchantSelectProps = {
  value: MerchantType | undefined;
  onChange: (newMerchant: MerchantType | undefined) => void;
};

function ItemMerchantSelect(props: ItemMerchantSelectProps): JSX.Element {
  return (
    <Select<int>
      items={generateIndicesArray()}
      filterable={false}
      itemRenderer={renderMerchantTypeForSelect}
      activeItem={mapMerchantTypeToIndex(props.value)}
      popoverProps={{
        minimal: false,
        matchTargetWidth: true,
        popoverClassName: Classes.DARK,
      }}
      onItemSelect={(selectedMerchantTypeIndex) => {
        const selectedMerchantType = mapItemMerchantIndexToItemMerchant(
          selectedMerchantTypeIndex
        );
        props.onChange(selectedMerchantType);
      }}
    >
      <Button
        className="merchantTypeSelect"
        alignText="left"
        text={
          <span>
            {renderMerchantTypeOrAny(mapMerchantTypeToIndex(props.value))}
          </span>
        }
        rightIcon="caret-down"
      />
    </Select>
  );
}

function generateIndicesArray(): int[] {
  // one index for every entry of the enum
  const indices = merchantType.map((_, index) => index);
  // add -1 as first entry to allow the user to select "any"
  indices.unshift(-1);
  return indices;
}

const renderMerchantTypeForSelect: ItemRenderer<int> = (
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
      text={renderMerchantTypeOrAny(value)}
    />
  );
};

function renderMerchantTypeOrAny(value: int) {
  return value < 0 ? (
    "Any Merchant"
  ) : (
    <ItemMerchantDisplay
      merchants={[mapItemMerchantIndexToItemMerchant(value) ?? "GENERAL"]}
    />
  );
}

function mapMerchantTypeToIndex(type: MerchantType | undefined | null): int {
  switch (type) {
    case undefined:
    case null:
      return -1;
    default:
      const index = merchantType.indexOf(type);
      if (index === undefined || index === null || index < 0) {
        throw new Error(`Unknown merchant type: ${type}`);
      }
      return index;
  }
}

function mapItemMerchantIndexToItemMerchant(
  index: int
): MerchantType | undefined {
  switch (index) {
    case -1:
      return undefined; // "all"
    default:
      const type = merchantType.at(index);
      if (!type) {
        throw new Error(`Unknown merchant type index: ${index}`);
      }
      return type;
  }
}

export default ItemMerchantSelect;

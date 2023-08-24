import {
  Button,
  HTMLTable,
  MenuItem,
  Spinner,
  Classes,
  InputGroup,
} from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import {
  getItemsForQuery,
  GetItemsQuery,
  Item,
  PaginatedResponse,
} from "api/itemsApi";
import { int } from "api/typeAliases";
import { useEffect, useState } from "react";
import "./ItemView.css";
import { useDebouncedEffect } from "hooks/useDebouncedEffect";

function ItemsView() {
  // the query we're firing to the server
  const [itemQuery, setItemQuery] = useState<GetItemsQuery>({
    query: "",
    pageSize: 20,
    pageIndex: 0,
  });

  // loading state for the query
  const [isLoading, setIsLoading] = useState(false);

  // the item data we have received from the server
  const [itemData, setItemData] = useState<PaginatedResponse<Item>>({
    totalCount: 0,
    pageContent: [],
  });

  // the "useDebouncedEffect" performs the actual fetching. Please note the
  // trailing array; it indicates that the effect should be triggered
  // again if the "itemQuery" object changes. The final argument is the delay
  useDebouncedEffect(
    () => {
      async function fetchData() {
        setIsLoading(true);
        const result = await getItemsForQuery(itemQuery);
        setItemData(result);
        setIsLoading(false);
      }

      fetchData();
    },
    [itemQuery], // re-evaluate when this changes
    500 // debounce delay
  );

  return (
    <div>
      <InputGroup
        className="searchInput"
        large={true}
        placeholder="Search in Table..."
        small={false}
        leftIcon="search"
        type="search"
        value={itemQuery.query}
        onChange={(event) =>
          setItemQuery({ ...itemQuery, query: event.currentTarget.value })
        }
      />

      {isLoading ? (
        <Spinner intent="primary" />
      ) : (
        <div className="itemTableContainer">
          <HTMLTable interactive={true} striped={true}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Rarity</th>
                <th>Attunement</th>
                <th>Source</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Sold By</th>
              </tr>
            </thead>
            <tbody>
              {itemData.pageContent.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.rarity}</td>
                  <td>{item.attunement}</td>
                  <td>{item.source}</td>
                  <td>{item.price}</td>
                  <td>{item.weight}</td>
                  <td>{item.merchants}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <div style={{ width: "fit-content" }}>
                    <Select<int>
                      items={[10, 20, 50]}
                      filterable={false}
                      itemRenderer={renderNumber}
                      activeItem={itemQuery.pageSize}
                      // menuProps={{ className: Classes.DARK }}
                      // popoverTargetProps={{ className: Classes.DARK }}
                      popoverProps={{
                        minimal: false,
                        matchTargetWidth: true,
                        popoverClassName: Classes.DARK,
                      }}
                      onItemSelect={(item) =>
                        setItemQuery({ ...itemQuery, pageSize: item })
                      }
                    >
                      <Button
                        text={`Items on Page: ${itemQuery.pageSize}`}
                        rightIcon="caret-down"
                      />
                    </Select>
                  </div>
                </td>
                <td>1408</td>
              </tr>
            </tfoot>
          </HTMLTable>
        </div>
      )}
    </div>
  );
}

const renderNumber: ItemRenderer<int> = (
  value,
  { handleClick, handleFocus, modifiers, query }
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
      // label={""}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={value.toString()}
    />
  );
};

export default ItemsView;

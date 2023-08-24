import {
  Button,
  Classes,
  Dialog,
  DialogBody,
  DialogFooter,
  HTMLTable,
  InputGroup,
  MenuItem,
  Spinner,
} from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import {
  faBookOpen,
  faCoins,
  faSignature,
  faSort,
  faSortDown,
  faSortUp,
  faStarHalfAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GetItemsQuery,
  Item,
  ItemOrderBy,
  OrderDirection,
  PaginatedResponse,
  getItemsForQuery,
} from "api/itemsApi";
import { int } from "api/typeAliases";
import { useDebouncedEffect } from "hooks/useDebouncedEffect";
import { useState } from "react";
import ItemAttunementDisplay from "./ItemAttunementDisplay";
import ItemRarityDisplay from "./ItemRarityDisplay";
import ItemTypeDisplay from "./ItemTypeDisplay";
import "./ItemsView.css";
import PaginationControl from "./PaginationControl";
import ItemPriceDisplay from "./PriceDisplay";
import ItemDetailsDisplay from "./ItemDetailsDisplay";

function ItemsView() {
  // the query we're firing to the server
  const [itemQuery, setItemQuery] = useState<GetItemsQuery>({
    query: "",
    pageSize: 20,
    pageIndex: 0,
    orderBy: "NAME",
    orderDirection: "ASCENDING",
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

  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  function updateItemQuerySorting(columnId: ItemOrderBy, dir: OrderDirection) {
    console.log(`Will now sort by ${columnId} ${dir}`);
    setItemQuery({ ...itemQuery, orderBy: columnId, orderDirection: dir });
  }

  const currentOrderBy = itemQuery.orderBy ?? "NAME";
  const currentOrderDirection = itemQuery.orderDirection ?? "ASCENDING";

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

      <Dialog
        className={Classes.DARK}
        title={`Item Details: ${currentItem?.name}`}
        isOpen={currentItem !== null}
        icon="info-sign"
        onClose={() => setCurrentItem(null)}
      >
        <DialogBody>
          <ItemDetailsDisplay item={currentItem} />
        </DialogBody>
        <DialogFooter
          actions={
            <Button
              intent="primary"
              text="Close"
              onClick={() => setCurrentItem(null)}
            />
          }
        />
      </Dialog>

      {isLoading ? (
        <Spinner intent="primary" />
      ) : (
        <div className="itemTableContainer">
          <HTMLTable interactive={true} striped={true}>
            <thead>
              <tr>
                <SortableTableHeader<ItemOrderBy>
                  columnId="NAME"
                  currentSortColumnId={currentOrderBy}
                  sortDirection={currentOrderDirection}
                  onClick={updateItemQuerySorting}
                >
                  <FontAwesomeIcon icon={faSignature} /> Name
                </SortableTableHeader>
                <SortableTableHeader<ItemOrderBy>
                  columnId="TYPE"
                  currentSortColumnId={currentOrderBy}
                  sortDirection={currentOrderDirection}
                  onClick={updateItemQuerySorting}
                >
                  <FontAwesomeIcon icon={faBookOpen} /> Type
                </SortableTableHeader>
                <SortableTableHeader<ItemOrderBy>
                  columnId="RARITY"
                  currentSortColumnId={currentOrderBy}
                  sortDirection={currentOrderDirection}
                  onClick={updateItemQuerySorting}
                >
                  <FontAwesomeIcon icon={faStarHalfAlt} /> Rarity
                </SortableTableHeader>
                <SortableTableHeader<ItemOrderBy>
                  columnId="ATTUNEMENT"
                  currentSortColumnId={currentOrderBy}
                  sortDirection={currentOrderDirection}
                  onClick={updateItemQuerySorting}
                >
                  <FontAwesomeIcon icon={faUser} /> Attunement
                </SortableTableHeader>
                <SortableTableHeader<ItemOrderBy>
                  columnId="PRICE"
                  currentSortColumnId={currentOrderBy}
                  sortDirection={currentOrderDirection}
                  onClick={updateItemQuerySorting}
                >
                  <FontAwesomeIcon icon={faCoins} /> Price
                </SortableTableHeader>
              </tr>
            </thead>
            <tbody>
              {itemData.pageContent.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    console.log("SELECTED ITEM: ", item);
                    setCurrentItem(item);
                  }}
                >
                  <td>{item.name}</td>
                  <td>
                    <ItemTypeDisplay itemType={item.type} />
                  </td>
                  <td>
                    <ItemRarityDisplay rarity={item.rarity} />
                  </td>
                  <td>
                    <ItemAttunementDisplay attunement={item.attunement} />
                  </td>
                  <td>
                    <ItemPriceDisplay value={item.price} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
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
                <td colSpan={2}>
                  <PaginationControl
                    currentPageIndex={itemQuery.pageIndex ?? 0}
                    maxButtonsToDisplay={7}
                    pageSize={itemQuery.pageSize ?? 20}
                    totalEntries={itemData.totalCount}
                    onChange={(newIndex) =>
                      setItemQuery({ ...itemQuery, pageIndex: newIndex })
                    }
                  />
                </td>
              </tr>
            </tfoot>
          </HTMLTable>
        </div>
      )}
    </div>
  );
}

type SortableTableHeaderProps<T> = React.PropsWithChildren & {
  columnId: T;
  currentSortColumnId: T;
  sortDirection: OrderDirection;
  onClick: (event: T, newDirection: OrderDirection) => void;
};

function SortableTableHeader<T>(props: SortableTableHeaderProps<T>) {
  return (
    <th
      className="sortableTableHeader"
      onClick={(e) => {
        let newSortDirection: OrderDirection;
        if (props.columnId !== props.currentSortColumnId) {
          newSortDirection = "ASCENDING";
        } else if (props.sortDirection === "ASCENDING") {
          newSortDirection = "DESCENDING";
        } else {
          newSortDirection = "ASCENDING";
        }
        props.onClick(props.columnId, newSortDirection);
      }}
    >
      {props.children}
      <SortIcon
        direction={props.sortDirection}
        sortByThisColumn={props.currentSortColumnId === props.columnId}
      />
    </th>
  );
}

type SortIconProps = {
  sortByThisColumn: boolean;
  direction: OrderDirection;
};

function SortIcon(props: SortIconProps) {
  if (!props.sortByThisColumn) {
    return <FontAwesomeIcon icon={faSort} style={{ float: "right" }} />;
  }
  switch (props.direction) {
    case "ASCENDING":
      return <FontAwesomeIcon icon={faSortUp} style={{ float: "right" }} />;
    case "DESCENDING":
      return <FontAwesomeIcon icon={faSortDown} style={{ float: "right" }} />;
  }
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

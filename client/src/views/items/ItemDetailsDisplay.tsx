import { Item } from 'api/itemsApi';
import ItemTypeDisplay from './ItemTypeDisplay';
import ItemAttunementDisplay from './ItemAttunementDisplay';
import ItemPriceDisplay from './PriceDisplay';
import { Tag } from '@blueprintjs/core';
import ItemRarityDisplay from './ItemRarityDisplay';
import './ItemDetailsDisplay.css';
import ItemSubTypeDisplay from './ItemSubTypeDisplay';
import ItemExtraDisplay from './ItemExtraDisplay';
import ItemMerchantsDisplay from './ItemMerchantsDisplay';
import ItemSourceDisplay from './ItemSourceDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export type ItemDetailsDisplayProps = {
  item: Item | null | undefined;
};

function ItemDetailsDisplay(props: ItemDetailsDisplayProps) {
  const item = props.item;
  if (!item) {
    return <div>No Item selected</div>;
  }
  return (
    <div className="itemDetailsDisplay">
      <h1>{item.name}</h1>
      <div className="tagCloud">
        <Tag round={true}>
          <ItemTypeDisplay itemType={item.type} />
        </Tag>
        <Tag round={true}>
          <span>
            Attunement: <ItemAttunementDisplay attunement={item.attunement} />
          </span>
        </Tag>
        <Tag round={true}>
          <ItemRarityDisplay rarity={item.rarity} />
        </Tag>
        <Tag round={true}>
          <ItemPriceDisplay value={item.price} />
        </Tag>
        {item.subtype && (
          <Tag round={true}>
            <ItemSubTypeDisplay subType={item.subtype} />
          </Tag>
        )}
        {item.extra && (
          <Tag round={true}>
            <ItemExtraDisplay extra={item.extra} />
          </Tag>
        )}
        <Tag round={true}>
          <ItemMerchantsDisplay merchants={item.merchants} />
        </Tag>
        <Tag round={true}>
          <ItemSourceDisplay source={item.source} />
        </Tag>
      </div>
      <span className="itemDescription">{item.description}</span>
      <span className="itemFeedback">
        <a
          href={`mailto:${encodeURIComponent('feedback.dndbase@gmail.com')}?subject=${encodeURIComponent(
            `Item Data on '${item.name}' (ID: ${item.id})`,
          )}&body=${encodeURIComponent("Please specify what's wrong or missing:")}`}
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
          &nbsp; Report wrong or missing information
        </a>
      </span>
    </div>
  );
}

export default ItemDetailsDisplay;

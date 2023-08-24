import { Button } from "@blueprintjs/core";
import { int } from "api/typeAliases";
import React from "react";
import "./PaginationControl.css";

export type PaginationControlProps = {
  currentPageIndex: int;
  pageSize: int;
  totalEntries: int;
  maxButtonsToDisplay: int;
  onChange: (newPageIndex: int) => void;
};

function PaginationControl(props: PaginationControlProps) {
  if (props.maxButtonsToDisplay < 3) {
    throw new Error(
      `maxButtonsToDisplay must be at least 3 (got: ${props.maxButtonsToDisplay})`
    );
  }

  const totalPages = Math.ceil(props.totalEntries / props.pageSize);
  const lastPageIndex = totalPages - 1;
  const currentPageIndex = Math.min(props.currentPageIndex, lastPageIndex);

  let pageIndicesWithButtons = new Set<int>();

  if (totalPages <= props.maxButtonsToDisplay) {
    const buttons: React.JSX.Element[] = [];
    // render one button per page. That's the easy case.
    for (let i = 0; i < totalPages; i++) {
      const button = createPageButton(
        i,
        i === currentPageIndex,
        pageIndicesWithButtons,
        props.onChange
      );
      if (button) {
        buttons.push(button);
      }
    }
    return <div className="paginationControl">{buttons}</div>;
  }

  // we don't have enough buttons to display one button per page.
  // the three buttons we MUST have are:
  // - the first page
  // - the current page
  // - the last page

  const leadButtons: React.JSX.Element[] = [];
  const middleButtons: React.JSX.Element[] = [];
  const trailButtons: React.JSX.Element[] = [];

  const initialButton = createPageButton(
    0,
    0 === currentPageIndex,
    pageIndicesWithButtons,
    props.onChange
  );
  if (initialButton) {
    leadButtons.push(initialButton);
  }

  if (currentPageIndex !== 0 && currentPageIndex !== lastPageIndex) {
    const currentIndexButton = createPageButton(
      currentPageIndex,
      true,
      pageIndicesWithButtons,
      props.onChange
    );
    if (currentIndexButton) {
      middleButtons.push(currentIndexButton);
    }
  }

  const lastTrailButton = createPageButton(
    lastPageIndex,
    lastPageIndex === currentPageIndex,
    pageIndicesWithButtons,
    props.onChange
  );
  if (lastTrailButton) {
    trailButtons.push(lastTrailButton);
  }

  // for the remaining buttons, we distribute as follows:
  // - one more before the middle list
  // - one more after the middle list
  // - one more for the initial list
  // - one more before the end list
  //
  // ... but be careful not to overlap!

  let nextButtonPosition = 0;
  while (pageIndicesWithButtons.size < props.maxButtonsToDisplay) {
    switch (nextButtonPosition) {
      case 0:
        // - one more before the middle list
        const newIndexBeforeMiddle =
          middleButtons.length <= 0
            ? lastPageIndex / 2 // no buttons in this segment yet, start in the middle
            : parseInt(middleButtons[0].key as string) - 1; // take the smallest button index and go one before

        // attempt to add it to the set
        const newMiddleStartButton = createPageButton(
          newIndexBeforeMiddle,
          false,
          pageIndicesWithButtons,
          props.onChange
        );
        if (newMiddleStartButton) {
          middleButtons.unshift(newMiddleStartButton);
        }
        break;
      case 1:
        // - one more after the middle list
        const newIndexAfterMiddle =
          middleButtons.length <= 0
            ? lastPageIndex / 2 // no buttons in this segment yet, start in the middle
            : parseInt(middleButtons[middleButtons.length - 1].key as string) +
              1; // take the largest button index and go one after

        // attempt to add it to the set
        const newMiddleEndButton = createPageButton(
          newIndexAfterMiddle,
          false,
          pageIndicesWithButtons,
          props.onChange
        );
        if (newMiddleEndButton) {
          middleButtons.push(newMiddleEndButton);
        }
        break;
      case 2:
        // - one more for the initial list
        const lastButton = leadButtons[leadButtons.length - 1];
        const lastButtonPageIndex = parseInt(lastButton.key as string);

        // add one more
        const newIndexAfterLead = lastButtonPageIndex + 1;

        // attempt to add it to the set
        const newLeadButton = createPageButton(
          newIndexAfterLead,
          false,
          pageIndicesWithButtons,
          props.onChange
        );
        if (newLeadButton) {
          leadButtons.push(newLeadButton);
        }
        break;
      case 3:
        // - one more before the end list

        const newIndexBeforeTrail = parseInt(trailButtons[0].key as string) - 1;

        const newTrailStartButton = createPageButton(
          newIndexBeforeTrail,
          false,
          pageIndicesWithButtons,
          props.onChange
        );

        if (newTrailStartButton) {
          trailButtons.unshift(newTrailStartButton);
        }
        break;
    }
    nextButtonPosition = (nextButtonPosition + 1) % 4;
  }

  // now, let's render everything into a <div>. Remember to add "..." between the lead, middle and trail (unless there is no gap in indices)

  var needsSpacingAfterLead = false;
  var needsSpacingBeforeTrail = false;

  const lastOfLead = parseInt(
    leadButtons[leadButtons.length - 1].key as string
  );
  const firstOfTrail = parseInt(trailButtons[0].key as string);

  if (middleButtons.length <= 0) {
    needsSpacingAfterLead = lastOfLead + 1 < firstOfTrail;
    // there is no "middle", so we only need at most one separator.
    needsSpacingBeforeTrail = false;
  } else {
    const firstOfMiddle = parseInt(middleButtons[0].key as string);
    const lastOfMiddle = parseInt(
      middleButtons[middleButtons.length - 1].key as string
    );
    needsSpacingAfterLead = lastOfLead + 1 < firstOfMiddle;
    needsSpacingBeforeTrail = lastOfMiddle + 1 < firstOfTrail;
  }

  return (
    <div className="paginationControl">
      {leadButtons}
      {needsSpacingAfterLead ? <span>...</span> : undefined}
      {middleButtons}
      {needsSpacingBeforeTrail ? <span>...</span> : undefined}
      {trailButtons}
    </div>
  );
}

function createPageButton(
  pageIndex: number,
  isActive: boolean,
  pageIndicesWithButtons: Set<int>,
  onChange: (newPageIndex: int) => void
): React.JSX.Element | undefined {
  if (pageIndicesWithButtons.has(pageIndex)) {
    // there is already a button for this page, don't create another one!
    return undefined;
  }
  // remember that we have a button for this page
  pageIndicesWithButtons.add(pageIndex);
  const className = isActive ? "activePageButton" : "";
  return (
    <Button
      key={pageIndex} // also used to get the page index for the button back!
      className={className}
      onClick={() => {
        onChange(pageIndex);
      }}
    >
      {pageIndex}
    </Button>
  );
}

export default PaginationControl;

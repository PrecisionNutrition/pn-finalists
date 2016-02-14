import React from 'react';
import uuid from 'uuid';
import FinalistRow from './FinalistRow';
import Finalist from './Finalist';

function FinalistBox(props) {

  /*
   * In order to get an infinite loop effect, we need to duplicate the
   * finalists. And since React requires unique keys, we can't just use the
   * same array twice. So we create two distinct arrays with unique keys.
   */
  const finalistsArray = props.finalists.map((finalist, index) => getFinalist(finalist, props.clickHandler, index));
  const dupeArray = props.finalists.map((finalist, index) => getFinalist(finalist, props.clickHandler, index));
  const finalistRows = createFinalistRows(finalistsArray, dupeArray, props.transformationsPerRow, props.maxRows);

  return (
    <div className="pn-finalists__box">
      {finalistRows}
    </div>
  );
}

FinalistBox.defaultProps = {
  transformationsPerRow: 10,
  maxRows: 3,
};

/*
 * Helper functions
 */
function getFinalist(finalist, clickHandler = ()=>{}, index = 0) {
  const onClick = clickHandler.bind(null, index);
  return <Finalist key={uuid.v4()} finalist={finalist} clickHandler={onClick} />;
}

function createFinalistRows(finalistsArray, dupeArray, perRow, maxRows) {
  let rows = [];
  let rowCount = 0;
  while (rowCount <= maxRows) {
    let start = rowCount * perRow;
    let end = start + perRow;

    if (finalistsArray.size <= start) {
      break;
    }

    // Double the finalists so we can make the animation look infinite.
    let finalists = finalistsArray.slice(start, end);
    finalists = finalists.concat(dupeArray.slice(start, end));

    rows.push(<FinalistRow key={`row${rowCount}`} finalists={finalists} />);
    rowCount++;
  }

  return rows;
}

export default FinalistBox;

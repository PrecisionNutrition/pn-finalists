import React from 'react';

function FinalistPopover({app, clickHandler}) {
  const classes = ['pn-finalists__popover'];
  if (!app.get('showPopover')) {
    return <div />;
  }

  const finalist = {};

  if (app.hasIn(['finalist', 'age'])) {
    finalist.age = app.getIn(['finalist', 'age']);
  }

  if (app.hasIn(['finalist', 'images'])) {
    finalist.images = app.getIn(['finalist', 'images']);
  }

  if (app.hasIn(['finalist', 'weight'])) {
    finalist.weight = app.getIn(['finalist', 'weight']);
  }

  if (app.hasIn(['finalist', 'inches'])) {
    finalist.inches = app.getIn(['finalist', 'inches']);
  }

  if (app.hasIn(['finalist', 'bodyfat'])) {
    finalist.bodyfat = app.getIn(['finalist', 'bodyfat']);
  }

  return (
    <div className={classes.join(' ')}>
      <div className="pn-finalists__transformation">
        {finalist.images &&
        <div className="pn-finalists__image-wrapper">
          {finalist.images.front &&
            <img
              className="pn-finalists__image pn-finalists__image--front"
              src={finalist.images.front} />
          }
          {finalist.images.side &&
            <img
              className="pn-finalists__image pn-finalists__image--side"
              src={finalist.images.side} />
          }
          {finalist.images.back &&
            <img
              className="pn-finalists__image pn-finalists__image--back"
              src={finalist.images.back} />
          }
        </div>}
        <div className="pn-finalists__info-wrapper">
          <ul className="pn-finalists__info">
            <li className="pn-finalists__info-item pn-finalists__info-item--type">
              $250,000 Finalist
            </li>
            {finalist.age &&
            <li className="pn-finalists__info-item pn-finalists__info-item--age">
              <strong className="pn-finalists__info-label">Age:</strong>
              {app.getIn(['finalist', 'age'])} years
            </li>}
            {finalist.weight &&
            <li className="pn-finalists__info-item pn-finalists__info-item--weight">
              <strong className="pn-finalists__info-label">Weight Lost:</strong>
              {roundToNearestTenth(finalist.weight.start - finalist.weight.end)} lbs
              <small className="pn-finalists__info-note">(from {finalist.weight.start} lbs to {finalist.weight.end} lbs)</small>
            </li>}
            {finalist.bodyfat &&
            <li className="pn-finalists__info-item pn-finalists__info-item--bodyfat">
              <strong className="pn-finalists__info-label">% Body Fat Lost:</strong>
              {roundToNearestTenth(finalist.bodyfat.start - finalist.bodyfat.end)}%
              <small className="pn-finalists__info-note">(from {finalist.bodyfat.start}% to {finalist.bodyfat.end}%)</small>
            </li>}
            {finalist.inches &&
            <li className="pn-finalists__info-item pn-finalists__info-item--girth">
              <strong className="pn-finalists__info-label">Total Inches Lost:</strong>
              {roundToNearestTenth(finalist.inches.start - finalist.inches.end)} inches
              <small className="pn-finalists__info-note">(from {finalist.inches.start} inches to {finalist.inches.end} inches)</small>
            </li>}
          </ul>
        </div>
      </div>
      <a className="pn-finalists__close-btn" onClick={clickHandler}>
        &times;
      </a>
    </div>
  );
}

export default FinalistPopover;

function roundToNearestTenth(num) {
  return Math.round(num * 10) / 10;
}

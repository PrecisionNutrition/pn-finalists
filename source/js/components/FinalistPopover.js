import React from 'react';

function FinalistPopover({app, clickHandler}) {
  const classes = ['pn-finalists__popover'];
  if (!app.get('showPopover')) {
    return <div />;
  }

  const finalist = {
    age: setIfKeyPathExists(app, ['finalist', 'age']),
    images: setIfKeyPathExists(app, ['finalist', 'images']),
    weight: setIfKeyPathExists(app, ['finalist', 'weight']),
    inches: setIfKeyPathExists(app, ['finalist', 'inches']),
    bodyfat: setIfKeyPathExists(app, ['finalist', 'bodyfat']),
  };

  const images = ['front', 'side', 'back'].map(image => {
    return finalist.images[image] && (
      <div className="pn-finalists__image-box">
        <img src={finalist.images[image]}
             key={image}
             onLoad={handleOnLoad}
             className={`pn-finalists__image pn-finalists__image--${image} pn-finalists__image--loading`} />
      </div>
    );
  });

  return (
    <div className={classes.join(' ')}>
      <div className="pn-finalists__transformation">
        {finalist.images &&
        <div className="pn-finalists__image-wrapper">
          {images}
        </div>}
        <div className="pn-finalists__info-wrapper">
          <ul className="pn-finalists__info">
            <li className="pn-finalists__info-item pn-finalists__info-item--type">
              2015 Coaching Client
            </li>

            {finalist.age &&
            <li className="pn-finalists__info-item pn-finalists__info-item--age">
              <strong className="pn-finalists__info-label">Age:</strong>
              {finalist.age} years
            </li>}

            {finalist.weight &&
            <li className="pn-finalists__info-item pn-finalists__info-item--weight">
              <strong className="pn-finalists__info-label">Weight Lost:</strong>
              {roundToNearestTenth(finalist.weight.start - finalist.weight.end)} lbs
              <small className="pn-finalists__info-note">(from {finalist.weight.start} lbs to {finalist.weight.end} lbs)</small>
            </li>}

            {finalist.bodyfat > 0 &&
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
        {String.fromCodePoint(0x00D7)}
      </a>
    </div>
  );
}

export default FinalistPopover;

function handleOnLoad(event) {
  event.target.classList.remove('pn-finalists__image--loading');
}

function setIfKeyPathExists(app, keyPath) {
  if (app.hasIn(keyPath)) {
    return app.getIn(keyPath);
  }

  return false;
}

function roundToNearestTenth(num) {
  return Math.round(num * 10) / 10;
}

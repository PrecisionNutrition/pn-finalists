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
    group: setIfKeyPathExists(app, ['finalist', 'group']),
  };

  const images = ['front', 'side', 'back'].map(image => {
    return finalist.images[image] && (
      <div className="pn-finalists__image-box" key={image}>
        <img src={finalist.images[image]}
             onLoad={handleOnLoad}
             className={`pn-finalists__image pn-finalists__image--${image} pn-finalists__image--loading`} />
      </div>
    );
  });

  const coachingGroup = `${finalist.group==="women" ? "Women" : "Men"}'s`;

  const ageTerm = pluralize(finalist.age, ' year');
  const weightTerm = pluralize(roundToNearestTenth(finalist.weight.start - finalist.weight.end), ' lb');
  const inchesTerm = pluralize(roundToNearestTenth(finalist.inches.start - finalist.inches.end), ' inch', ' inches');

  const age = dataItemSimple(finalist.age, 'Age', ageTerm);
  const weight = dataItem(finalist.weight, 'Weight Lost', weightTerm, 'weight');
  const inches = dataItem(finalist.inches, 'Total Inches Lost', inchesTerm, 'girth');

  return (
    <div className={classes.join(' ')}>
      <div className="pn-finalists__transformation">
        <div className="pn-finalists__image-wrapper">
          {images}
        </div>
        <div className="pn-finalists__info-wrapper">
          <ul className="pn-finalists__info">
            <li className="pn-finalists__info-item pn-finalists__info-item--type">
              {coachingGroup} Coaching Client
            </li>
            {age}
            {weight}
            {inches}
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

function dataItemSimple(data, label, unit, modifier = false) {
  return data && (
    <li className={`pn-finalists__info-item pn-finalists__info-item--${label.toLowerCase()}`}>
      <strong className="pn-finalists__info-label">{label}:</strong>
      {data}{unit}
    </li>
  );
}

function dataItem(data, label, unit, modifier = false) {
  return data && (
    <li className={`pn-finalists__info-item pn-finalists__info-item--${modifier || label.toLowerCase()}`}>
      <strong className="pn-finalists__info-label">{label}:</strong>
      {roundToNearestTenth(data.start - data.end)}{unit}
      <small className="pn-finalists__info-note">(from {data.start}{unit} to {data.end}{unit})</small>
    </li>
  );
}

function pluralize(value, singular, plural=false) {
  const pluralTerm = plural ? plural : `${singular}s`;
  return parseInt(value) === 1 ? singular : pluralTerm;
}

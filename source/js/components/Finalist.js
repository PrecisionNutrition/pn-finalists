import React from 'react';

function Finalist({finalist, clickHandler = ()=>{}}) {
  return (
    <a
      className="pn-finalists__finalist"
      onClick={clickHandler}
    >
      <img
        className="pn-finalists__finalist-thumb"
        src={finalist.images.front}
        alt={finalist.age}
      />
    </a>
  );
}

export default Finalist;

import Immutable from 'immutable';
import uuid from 'uuid';

const FinalistRecord = Immutable.Record({
  id: undefined,
  year: undefined,
  group: undefined,
  age: undefined,
  images: {
    front: undefined,
    back: undefined,
    side: undefined,
  },
  weight: {
    start: undefined,
    end: undefined,
  },
  inches: {
    start: undefined,
    end: undefined,
  },
  bodyfat: {
    start: undefined,
    end: undefined,
  },
});

export default class Finalist extends FinalistRecord {

  constructor(finalist) {
    const images = {
      front: finalist.image_front && finalist.image_front.sizes.medium || false,
      side: finalist.image_side && finalist.image_side.sizes.medium || false,
      back: finalist.image_back && finalist.image_back.sizes.medium || false,
    };

    super({
      id: finalist.id || uuid.v4(),
      year: parseInt(finalist.year) || 2015,
      age: parseInt(finalist.age) || false,
      group: finalist.group || false,
      images: {
        front: images.front || false,
        side: images.side || false,
        back: images.back || false,
      },
      weight: {
        start: parseFloat(finalist.weight_start) || false,
        end: parseFloat(finalist.weight_end) || false,
      },
      inches: {
        start: parseFloat(finalist.girth_start) || false,
        end: parseFloat(finalist.girth_end) || false,
      },
      bodyfat: {
        start: parseFloat(finalist.bodyfat_start) || false,
        end: parseFloat(finalist.bodyfat_end) || false,
      },
    });
  }

}

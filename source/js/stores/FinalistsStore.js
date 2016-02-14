import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher';
import Finalist from '../models/FinalistModel';
import FinalistData from '../../../data/finalists.json';

class FinalistsStore extends ReduceStore {

  getInitialState() {
    const finalists = new Immutable.List();
    const transformations = FinalistData[0].acf.transformations;
    return createFinalistRecords(finalists, transformations);
  }

  reduce(state, action) {
    switch (action.type) {
      default:
    }

    return state;
  }

}

function createFinalistRecords(state, finalistArray) {
  finalistArray.forEach(finalist => {
    const finalistRecord = new Finalist(finalist);
    state = state.set(state.size, finalistRecord);
  });

  return state;
}

const instance = new FinalistsStore(Dispatcher);
export default instance;

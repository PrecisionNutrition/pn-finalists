import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher';
import FinalistsStore from './FinalistsStore';

class AppStore extends ReduceStore {

  getInitialState() {
    return Immutable.Map({
      showPopover: false,
      finalist: false,
    });
  }

  reduce(state, action) {
    switch (action.type) {

      case 'popover/toggle-visibility':
        state = togglePopoverVisibility(state, action.finalistID);
        break;

      default:
        /* no-op */
    }

    return state;
  }

}

const instance = new AppStore(Dispatcher);
export default instance;

function togglePopoverVisibility(state, finalistID) {
  if (state.get('showPopover') === true) {
    state = state.set('finalist', false);
    state = state.set('showPopover', false);
  }

  const finalists = FinalistsStore.getState();
  if (finalists.has(finalistID)) {
    state = state.set('showPopover', true);
    state = state.set('finalist', finalists.get(finalistID));
  }

  return state;
}

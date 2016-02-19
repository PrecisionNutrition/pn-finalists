/*
 * # PNFinalistsApp.js
 * This is the main element that wraps everything else.
 */

/*
 * ## Styles
 * Imported and bundled via webpack.
 */
import '../../css/pn-finalists.css';

/*
 * ## Dependencies
 */
import React, {Component} from 'react';
import Immutable from 'immutable';
import {Container} from 'flux/utils';
import {dispatch} from '../dispatcher';
import AppStore from '../stores/AppStore';
import FinalistsStore from '../stores/FinalistsStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Portal from '../components/Portal';
import FinalistBox from '../components/FinalistBox';
import FinalistPopover from '../components/FinalistPopover';

class PNFinalists extends Component {

  static getStores() {
    return [
      AppStore,
      FinalistsStore
    ];
  }

  static calculateState(prevState) {
    return {
      finalists: FinalistsStore.getState(),
      app: AppStore.getState(),
    };
  }

  render() {
    return (
      <div className="pn-finalists">
        <FinalistBox finalists={this.state.finalists} clickHandler={togglePopoverVisibility} />
        <Portal portalId="pn-finalists-popover" className="pn-finalists">
          <ReactCSSTransitionGroup
            transitionName="pn-finalists__popover-"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {this.state.app.get('showPopover') &&
            <FinalistPopover
              key="popover"
              app={this.state.app}
              clickHandler={togglePopoverVisibility}
            />}
          </ReactCSSTransitionGroup>
        </Portal>
      </div>
    );
  }
}

const PNFinalistsContainer = Container.create(PNFinalists);
export default PNFinalistsContainer;

function togglePopoverVisibility(finalistID = false) {
  dispatch({
    type: 'popover/toggle-visibility',
    finalistID: finalistID,
  });
}

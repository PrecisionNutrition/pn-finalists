/*
 * # Portal.js
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

/*
 * ## The Portal React Component
 * The Portal component creates a way to append React-managed elements directly
 * to the body of the DOM, rather than keeping it caged in specific React
 * components. For our purposes, this is so we can add a popover without the
 * container element's styles breaking the layout.
 */
export default class Portal extends Component {

  /**
   * Returns an empty div that will never update.
   *
   * @return {ReactElement} an empty div
   */
  render() {
    return <div />;
  }

  /**
   * When the component mounts, we create a portal and fire the update method.
   *
   * @return {void}
   */
  componentDidMount() {
    this.portal = createPortal(this.props.portalId);
    this.componentDidUpdate();
  }

  /**
   * Destroy the portal.
   *
   * @return {void}
   */
  componentWillUnmount() {
    this.portal = destroyPortal(this.props.portalId);
  }

  /**
   * When we get new props, re-render the portal's content.
   *
   * @return {void}
   */
  componentDidUpdate() {
    ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portal);
  }

}

/*
 * ## Helper Functions
 * These functions are _almost_ pure, in that the same input creates the same
 * output every time. Since the DOM changes as a side-effect, however, we can't
 * _actually_ call these pure functions.
 *
 * We keep them outside the class to keep them private to this module.
 */

/**
 * Checks for a div with the given `portalId` or creates a new element.
 *
 * The element is appended to the body — this is what makes it a portal. By
 * moving the content outside the React element and appending it directly to
 * the body, we have the ability to circumvent cascading styles that would
 * otherwise break our element.
 *
 * For example, a modal window that needs to be positioned at the top-left of
 * the viewport with 100% width and height would break inside a container with
 * `position: relative` set. A portal circumvents that issue without requiring
 * brittle refactoring of the container(s).
 *
 * @param  {String} portalId a unique portal ID
 * @return {Element}         the portal element
 */
function createPortal(portalId) {
  let portal = document.getElementById(portalId);

  if (!portal) {
    portal = document.createElement('div');
    portal.id = portalId;
    document.body.appendChild(portal);
  }

  return portal;
}

/**
 * Removes the portal element from the DOM.
 *
 * @param  {String} portalId a unique portal ID to remove
 * @return {Boolean}         always returns `false`
 */
function destroyPortal(portalId) {
  let portal = document.getElementById(portalId);

  if (portal) {
    document.body.removeChild(portal);
  }

  return false;
}

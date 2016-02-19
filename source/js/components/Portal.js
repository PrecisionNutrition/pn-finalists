import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let __portal = false;

export default class Portal extends Component {

  render() {
    return <div />;
  }

  componentDidMount() {
    this.portal = createPortal(this.props.portalId);
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.portal = destroyPortal(this.props.portalId);
  }

  componentDidUpdate() {
    ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portal);
  }

}

function createPortal(portalId) {
  let portal = document.getElementById(portalId);

  if (!portal) {
    portal = document.createElement('div');
    portal.id = portalId;
    document.body.appendChild(portal);
  }

  return portal;
}

function destroyPortal(portalId) {
  let portal = document.getElementById(portalId);

  if (portal) {
    document.body.removeChild(portal);
  }

  return false;
}

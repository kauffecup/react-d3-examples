import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SimpleComponentD3 from './SimpleComponentD3_02';

/**
 * This is a rather simple component. For more "production ready" designs,
 * you should consider manually formatting the props object returned in getProps
 * instead of returning everything. It should also handle resizing. For a more
 * thorough example, see: https://github.com/kauffecup/react-bubble-chart
 */
export default class SimpleComponent extends Component {
  render() {
    return <div className="simple-component"></div>;
  }

  /** When we mount, initialize our D3 component */
  componentDidMount() {
    this.simpleComponentD3 = new SimpleComponentD3(ReactDOM.findDOMNode(this), this.getProps());
  }

  /** When we update, update our D3 component */
  componentDidUpdate() {
    this.simpleComponentD3.update(ReactDOM.findDOMNode(this), this.getProps());
  }

  /** When we unmount, destroy our D3 component */
  componentWillUnmount() {
    this.simpleComponentD3.destroy(ReactDOM.findDOMNode(this));
  }

  /** Get the properties object to pass along to our D3 component */
  getProps() {
    return this.props;
  }
}

SimpleComponent.propTypes = {
  data: PropTypes.array.isRequired,
  colorLegend: PropTypes.array
}

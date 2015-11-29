import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Allow the user to toggle between different components
 */
export default class ComponentToggler extends Component {
  render() {
    const { components, onClick, selectedComponent } = this.props;
    const classes = id => classNames({selected: selectedComponent === id});
    const click = (e, id) => {e.stopPropagation(); onClick(id)};
    return (
      <ul className="component-toggler">{components.map(c =>
        <li key={c._id} className={classes(c._id)} onClick={e => click(e, c._id)}>
          {c.description}
        </li>
      )}</ul>
    );
  }
}

ComponentToggler.propTypes = {
  components: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedComponent: PropTypes.string.isRequired
}

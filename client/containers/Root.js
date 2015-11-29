import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import MyApp        from './App';
import DevTools     from './DevTools';

/**
 * Our root container/entry-point. Hooks up our main App
 * Component, and the Redux DevTools to the redux Provider
 * and store. This keeps the main App component cleaner.
 */
export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <MyApp />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

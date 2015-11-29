import React          from 'react';
import { render }     from 'react-dom';
import { Provider }   from 'react-redux';
import Root           from './containers/Root';
import configureStore from './store';
import './style.less';

/**
 * Our JS/bundle entry point. Load in the root component,
 * configure the redux store, render our Root container,
 * and load CSS.
 */

let store = configureStore();
let rootElement = document.getElementById('root');

render( <Root store={store} />, rootElement );

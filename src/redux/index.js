import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export default class ReduxWrapper extends React.PureComponent {
  render() {
    window._store = store;
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import desktopState from "./reducers/index";
import Desktop from "./containers/desktop";


let store = createStore(desktopState);

ReactDOM.render(
  <Provider store={store}>
    <Desktop />
  </Provider>,
  document.getElementById("root")
);
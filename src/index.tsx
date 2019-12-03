import * as React from "react";
import * as ReactDom from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import desktopState from "./reducers/index";
import Desktop from "./containers/desktop";


let store = createStore(desktopState);

ReactDom.render(
  <Provider store={store}>
    <Desktop />
  </Provider>,
  document.getElementById("root")
);
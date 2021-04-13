import React from 'react';
import ReactDOM from 'react-dom';
import AppStartComponent from "./AppStartComponent";

test('renders APP', () => {
  const div = document.createElement("div")
      ReactDOM.render( <AppStartComponent/>,div)
  ReactDOM.unmountComponentAtNode(div)
 });

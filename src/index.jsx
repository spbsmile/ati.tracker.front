import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'app.jsx';
import flux from 'app/flux';
 

const flx = flux();

render(
  <AppContainer>
      <App flux={flx}/>
  </AppContainer>,
  document.querySelector("#app")
);

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    const flx = flux();
    render(
      <AppContainer>
            <App flux={flx}/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store/store';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getElementError } from '@testing-library/react';
import reportWebVitals from './reportWebVitals';

interface State {
  store: Store
}
const store = new Store();

export const Context = createContext<State>({
  store,
})

ReactDOM.render(

  <Context.Provider value={{ store }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ Context.Provider>,
  document.getElementById('root')
)


reportWebVitals();
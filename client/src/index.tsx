import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store/store';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getElementError } from '@testing-library/react';
import reportWebVitals from './reportWebVitals';
import CourseStore from './store/CoursesStore';

interface State {
  store: Store,
  courseStore: CourseStore

}
const store = new Store();
const courseStore = new CourseStore()
export const Context = createContext<State>({
  store, courseStore
})

ReactDOM.render(
  <Context.Provider value={{ store, courseStore }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ Context.Provider>,
  document.getElementById('root')
)


reportWebVitals();
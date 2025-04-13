import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './components/Pages/Router/router.jsx';
import { RouterProvider } from "react-router-dom";
import GlobalContextProvider from './components/Pages/Router/GlobalContextProvider.jsx';
//import {store} from "./components/Pages/Redux/Store.js";
import {Provider} from "react-redux";
import { store } from './components/Pages/Redux/Store/store';

function App(){

  return<RouterProvider router={Router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalContextProvider>
  </StrictMode>,
)

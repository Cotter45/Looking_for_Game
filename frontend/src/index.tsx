import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { ModalProvider } from './context/modal/modal';
import { store } from './context/store/index';
import { restoreCSRF } from './context/store/utils/csrfFetch';

import './index.css';

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  )
}
root.render(
  <Root />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

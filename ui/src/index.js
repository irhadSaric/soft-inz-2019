import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import Routes from './routes/routes';
import './index.css'
import { Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import CookieConsent, { Cookies } from "react-cookie-consent";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userObject = localStorage.getItem('user') && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};

toast.configure();

// Define the initial state properties here
const initialAppState = {
  user: userObject
};


const store = configureStore(initialAppState);

export default function App() {
  if(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
  Cookies.set('test', 'nice')
  return (
    <div>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>

    <CookieConsent
    disableStyles
    location="bottom"
    className='cookieBackground'
    >
    <div className='cookieText'>
      <Header as='h4' className=''>Our website uses cookies to improve your user experience.</Header>
      <Header as='h5' className=''>If you continue browsing, we assume that you consent to our use of cookies.</Header>
    </div>
    </CookieConsent>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/setup';
import { TenantProvider } from 'contexts/TenantProvider';
import { DynamicChakraProvider } from 'contexts/DynamicChakraProvider.js';
import App from './app.js';
import 'assets/css/App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
	<Provider store={store}>
    <TenantProvider>
      <DynamicChakraProvider>
        <App />
      </DynamicChakraProvider>
    </TenantProvider>
  </Provider>,
	</React.StrictMode>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from 'reduxStore/setup'
import { TenantProvider } from 'contexts/TenantProvider'
import { DynamicChakraProvider } from 'contexts/DynamicChakraProvider'
import App from './App.jsx'
import 'assets/css/App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TenantProvider>
        <DynamicChakraProvider>
          <App />
        </DynamicChakraProvider>
      </TenantProvider>
    </Provider>
  </React.StrictMode>
)

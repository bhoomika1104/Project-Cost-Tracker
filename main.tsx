import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';
import './custom-styles.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <>
          {/* <Sidebar /> */}
          <App />
        </>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

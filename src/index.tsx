import './index.css';

import React from 'react';
import {createRoot} from 'react-dom/client';
import { QueryClient,QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline,ThemeProvider } from '@mui/material';

import { theme } from './theme';

const queryClient = new QueryClient()

const run = () => {
  const App = require('./app').default
  const root = createRoot(document.getElementById('root') as HTMLElement)

  root.render(
    <React.StrictMode>
      {/* <Provider store={}> */}
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </BrowserRouter>
      {/* </Provider> */}
    </React.StrictMode>
  );
}

run()
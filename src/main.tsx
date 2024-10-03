import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import ThemeProvider from './contexts/ThemeProvider.tsx';
import {Provider} from 'react-redux';
import {store} from './app/store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>

            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);

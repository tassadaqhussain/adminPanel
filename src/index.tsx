import "../src/assets/css/App.css";
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store} from './app/store';
import {ChakraProvider} from '@chakra-ui/react'
import theme from './layouts/theme/theme';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <App/>
                </ChakraProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from 'react-redux';
import store from './redux/setup';
import App from './app.js';

ReactDOM.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<React.StrictMode>
				<ThemeEditorProvider>
					<App />
				</ThemeEditorProvider>
			</React.StrictMode>
		</ChakraProvider>
	</Provider>,
	document.getElementById('root')
);

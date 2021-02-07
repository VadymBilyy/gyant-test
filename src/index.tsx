import React from 'react';
import ReactDOM from 'react-dom';
import './config/default.css';
import './config/palette.ts';

import { App } from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);

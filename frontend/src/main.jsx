import { createRoot } from 'react-dom/client';
import "./app/index.css";
import App from './app/App.jsx';
import { store } from "./app/app.store.js";
import { Provider } from "react-redux";
import '@fontsource/libre-baskerville/400.css';  
import '@fontsource/libre-baskerville/700.css';
import '@fontsource/libre-baskerville/400-italic.css';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
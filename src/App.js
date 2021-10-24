import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
	const code = new URLSearchParams(window.location.search).get('code');
	const [ accessToken, setAccessToken ] = useState('');

	useEffect(
		() => {
			if (code) {
				axios.post('http://localhost:8000/login', { code }).then((res) => {
					window.history.pushState({}, null, '/');

					setAccessToken(res.data.accessToken);
				});
			}
		},
		[ code ]
	);

	return <div className='App'>{accessToken !== '' ? <Dashboard accessToken={accessToken} /> : <Login />}</div>;
}

export default App;

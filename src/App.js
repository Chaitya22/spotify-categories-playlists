import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import Login from './Login';
import './App.css';
import Playlist from './Playlist';

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

	return (
		<Router>
			<div className='App'>{accessToken !== '' ? <Redirect to='/categories' /> : <Redirect to='/' />}</div>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/categories'>
					<Dashboard accessToken={accessToken} />
				</Route>
				<Route path='/categories/:id'>
					<Playlist accesstoken={accessToken} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

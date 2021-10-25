const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
const clientId = 'Your Client ID';

const scopes = [ 'streaming', 'user-read-email', 'user-read-private' ];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}`;

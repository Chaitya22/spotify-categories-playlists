var SpotifyWebApi = require('spotify-web-api-node');
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
const clientId = 'd8bcd2d5ae0c44a6a5d24f3c22a0eed1';

const scopes = [ 'streaming', 'user-read-email', 'user-read-private' ];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}`;

// credentials are optional
export var spotifyApi = new SpotifyWebApi({
	clientId: 'd8bcd2d5ae0c44a6a5d24f3c22a0eed1',
	clientSecret: 'a0b372c7fb1c41e288746e68c972d0f1',
	redirectUri: 'http://localhost:3000/'
});

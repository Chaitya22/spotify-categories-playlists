import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function Playlist({ accesstoken }) {
	const { id } = useParams();
	const [ playlists, setPlaylists ] = useState();
	useEffect(
		() => {
			if (accesstoken) {
				var config = {
					method: 'get',
					url: `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
					headers: {
						Authorization: `Bearer ${accesstoken}`
					}
				};
				axios(config)
					.then(function(response) {
						console.log(response.data.playlists);
						setPlaylists(response.data.playlists);
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
		[ accesstoken, id ]
	);

	function fetchPlaylist(url) {
		var config = {
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${accesstoken}`
			}
		};
		axios(config)
			.then(function(response) {
				console.log(response.data.playlists);
				setPlaylists(response.data.playlists);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	return (
		<div className='playlist py-4' style={{ background: '#131313' }}>
			<h1 className='text-center pt-3' style={{ color: '#1db954' }}>
				Top Spotify Playlists
			</h1>
			<div className='container py-5'>
				<div className='cardsWrapInner'>
					{playlists &&
						playlists.items.map((playlist, id) => (
							<div className='playlist-card  ' key={id}>
								<div className='cardImage'>
									<img src={playlist.images[0].url} alt={playlist.name} />
								</div>
								<div className='cardContent'>
									<h3>{playlist.name}</h3>
									<span>{playlist.description.split('.')[0]}</span>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className='text-center'>
				{playlists &&
				playlists.previous && (
					<button className='btn btn-success mx-5 px-5' onClick={() => fetchPlaylist(playlists.previous)}>
						Prev
					</button>
				)}
				{playlists &&
				playlists.next && (
					<button className='btn btn-success mx-5 px-5' onClick={() => fetchPlaylist(playlists.next)}>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default Playlist;

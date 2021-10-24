import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

function Dashboard({ accessToken }) {
	const [ categories, setCategories ] = useState([]);
	const [ next, setNext ] = useState(0);
	const [ isNext, setIsNext ] = useState(true);

	useEffect(
		() => {
			var config = {
				method: 'get',
				url: `https://api.spotify.com/v1/browse/categories?offset=${next * 20}&limit=20`,
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			};
			console.log({ next });
			axios(config).then((res) => {
				setCategories(res.data.categories.items);
				if (res.data.categories.next) setIsNext(true);
				else setIsNext(false);
				console.log(res.data.categories.next);
			});
		},
		[ next, accessToken ]
	);

	return (
		<div className='m-5' id='categories'>
			<h1 className='text-center' style={{ color: '#1db954' }}>
				Top Spotify Playlist
			</h1>
			<div className='load-more'>
				{next !== 0 && (
					<button className='btn btn-primary prev' onClick={() => setNext(next - 1)}>
						Prev
					</button>
				)}
				{isNext && (
					<button className='btn btn-primary next' onClick={() => setNext(next + 1)}>
						Next
					</button>
				)}
			</div>
			<div className='container mt-5 '>
				<div className='row pb-5'>
					{categories.map((category, index) => {
						return (
							<div className='col-3 text-center mt-4' key={index}>
								<img src={category.icons[0].url} alt={category.name} height='90%' width='90%' />
								<div className='category-name'>{category.name}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='load-more'>
				{next !== 0 && (
					<button className='btn btn-primary prev' onClick={() => setNext(next - 1)}>
						Prev
					</button>
				)}
				{isNext && (
					<button className='btn btn-primary next' onClick={() => setNext(next + 1)}>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default Dashboard;

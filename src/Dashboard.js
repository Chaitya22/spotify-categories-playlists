import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
			if (accessToken) {
				axios(config).then((res) => {
					setCategories(res.data.categories.items);
					if (res.data.categories.next) setIsNext(true);
					else setIsNext(false);
					console.log(res.data.categories);
				});
			}
		},
		[ next, accessToken ]
	);

	return (
		<div className='m-5' id='categories'>
			<h1 className='text-center' style={{ color: '#1db954' }}>
				Top Spotify Categories
			</h1>
			<div className='load-more text-center mt-5'>
				{next !== 0 && (
					<button className='btn btn-success mx-5 px-5' onClick={() => setNext(next - 1)}>
						Prev
					</button>
				)}
				{isNext && (
					<button className='btn btn-success mx-5 px-5' onClick={() => setNext(next + 1)}>
						Next
					</button>
				)}
			</div>
			<div className='container mt-5 '>
				<div className='row pb-5'>
					{categories.map((category) => {
						return (
							<div className='col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4' key={category.id}>
								<Link to={`/categories/${category.id}`}>
									<img src={category.icons[0].url} alt={category.name} height='90%' width='90%' />
								</Link>
								<div className='category-name'>{category.name}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='load-more text-center'>
				{next !== 0 && (
					<button className='btn btn-success mx-5 px-5' onClick={() => setNext(next - 1)}>
						Prev
					</button>
				)}
				{isNext && (
					<button className='btn btn-success mx-5 px-5' onClick={() => setNext(next + 1)}>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default Dashboard;

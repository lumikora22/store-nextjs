import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getFavoriteApi } from '../api/favorite';
import { size, forEach } from 'lodash';
import useAuth from '../hooks/useAuth';
import ListProductos from '../components/ListProductos/ListProductos';
import { CircularProgress } from '@mui/material';

const Wishlist = () => {
	const [favoriteProducts, setFavoriteProducts] = useState(null);
	const { auth, logout } = useAuth();
	useEffect(() => {
		(async () => {
			const response = await getFavoriteApi(auth.idUser, logout);

			if (size(response) > 0) {
				const productsList = [];
				forEach(response, (data) => {
					productsList.push(data.producto);
				});
				setFavoriteProducts(productsList);
			} else {
				setFavoriteProducts([]);
			}
		})();
	}, []);
	return (
		<BasicLayout className='wishlist'>
			<div className='wishlist__block'>
				<div className='title'>Lista de deseos</div>
				<div className='data'>
					{!favoriteProducts && (
						<h2 className='load-more'>
							{' '}
							<CircularProgress />
							Cargando Productos{' '}
						</h2>
					)}
					{favoriteProducts && size(favoriteProducts) === 0 && (
						<div className='load-more'>
							<h4>No hay productos favoritos</h4>
						</div>
					)}
					{size(favoriteProducts) > 0 && (
						<ListProductos productos={favoriteProducts} />
					)}
				</div>
			</div>
		</BasicLayout>
	);
};

export default Wishlist;

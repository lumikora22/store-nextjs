import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import {
	getProdcutPlatformApi,
	getTotalProductsPlatformApi,
	getPlatformToProductApi,
} from '../../api/productos';
import ListProductos from '../../components/ListProductos/ListProductos';
import { CircularProgress } from '@mui/material';
import Paginations from '../../components/Pagination/Pagination';

const limitPerPage = 4;
const Platform = () => {
	const [productos, setProductos] = useState(null);
	const [totalProductos, setTotalProductos] = useState(null);
	const [currentPlatform, setCurrentPlatform] = useState(null);
	const { query } = useRouter();

	const getStartItem = () => {
		const currentPage = parseInt(query.page);
		if (!query.page || currentPage === 1) {
			return 0;
		} else {
			return currentPage * limitPerPage - limitPerPage;
		}
	};

	useEffect(() => {
		(async () => {
			if (query.platform) {
				const response = await getProdcutPlatformApi(
					query.platform,
					limitPerPage,
					getStartItem()
				);
				setProductos(response);
				const resultPlatform = await getPlatformToProductApi(query.platform);
				setCurrentPlatform(resultPlatform);
			}
		})();
	}, [query]);

	useEffect(() => {
		(async () => {
			if (query.platform) {
				const response = await getTotalProductsPlatformApi(query.platform);
				setTotalProductos(response);
			}
		})();
	}, [query]);

	return (
		<BasicLayout className='home'>
			{!productos && (
				<h2 className="load-more">
					{' '}
					<CircularProgress />
					Cargando Productos{' '}
				</h2>
			)}
			{productos && size(productos) === 0 && (
				<div>
					<h4>No hay productos disponibles</h4>
				</div>
			)}
			{size(productos) > 0 && (
				<ListProductos
					productos={productos}
					currentPlatform={currentPlatform}
				/>
			)}

			{totalProductos && (
				<Paginations
					totalProductos={totalProductos}
					page={query.page ? parseInt(query.page) : 1}
					limitPerPage={limitPerPage}
				/>
			)}
		</BasicLayout>
	);
};

export default Platform;

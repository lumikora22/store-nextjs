import BasicLayout from '../layouts/BasicLayout';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import {searchProductsApi} from '../api/productos'
import {size} from 'lodash'
import ListProductos from '../components/ListProductos/ListProductos';
import { CircularProgress } from '@mui/material';

const Search = () => {
	const [products, setProducts] = useState(null);
	const {query} = useRouter();
	useEffect(() => {
		document.getElementById('search-input').focus();
		
	}, []);

	useEffect(() => {
		(async ()=> {
			if(size(query.query) > 0 ){
				const response = await searchProductsApi(query.query);
				if(size(response)> 0) setProducts(response);
				else setProducts([])
			}else{
				setProducts([]);
			}
		})()
	}, [query]);
	return (
		<BasicLayout className='search'>
			{!products && (
						<h2 className='load-more'>
							{' '}
							<CircularProgress />
							Cargando Productos{' '}
						</h2>
					)}
					{products && size(products) === 0 && (
						<div className='load-more'>
							<h4>No hay productos relacionados</h4>
						</div>
					)}
					{size(products) > 0 && (
						<ListProductos productos={products} />
					)}
		</BasicLayout>
	);
};

export default Search;

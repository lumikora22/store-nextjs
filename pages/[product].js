import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getProductByUrlApi } from '../api/productos';
import Headerproduct from '../components/Product/HeaderProduct';

const Product = () => {
	const [product, setProduct] = useState(null);
	const { query } = useRouter();
	useEffect(() => {
		(async () => {
			if (query.product) {
				const response = await getProductByUrlApi(query.product);
				setProduct(response);
			}
		})();
	}, [query]);

	return (
		<BasicLayout className='single-product'>
			<Headerproduct product={product} />
		</BasicLayout>
	);
};

export default Product;

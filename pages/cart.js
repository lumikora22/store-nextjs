import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
// import {getProductsCart} from '../api/cart';
import useCart from '../hooks/useCart';
import { getProductByUrlApi } from '../api/productos';
import Summarycart from '../components/Cart/SummaryCart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping/AddressShipping';
import Payment from '../components/Cart/Payment/Payment';

const Cart = () => {
	const { getProductCart } = useCart();
	const products = getProductCart();

	return !products ? <EmptyCart /> : <FullCart products={products} />;
};

function EmptyCart() {
	return (
		<BasicLayout className='empty-cart'>
			<h1>Ningun producto agregado al carrito</h1>
		</BasicLayout>
	);
}

function FullCart() {
	const { getProductCart } = useCart();

	const [productsData, setProductsData] = useState(null);
	const [reloadCart, setReloadCart] = useState(false);

	const [address, setAddress] = useState(null);

	useEffect(() => {
		const products = getProductCart();
		// if (products) {
		(async () => {
			const productsTemp = [];
			for await (const product of products) {
				const data = await getProductByUrlApi(product);
				productsTemp.push(data);
			}
			console.log(productsTemp.cantidad);
			if (productsTemp.cantidad === undefined) {
				productsTemp.map((product) => (product.cantidad = 1));
			}

			setProductsData(productsTemp);
		})();
		// } else {
		// setProductsData([]);
		// }
		setReloadCart(false);
	}, [reloadCart]);

	// useEffect(() => {
	// 	console.log('estoy change');
	// }, [productsData]);

	return (
		<BasicLayout className='full-cart'>
			<Summarycart
				products={productsData}
				reloadCart={reloadCart}
				setReloadCart={setReloadCart}
			/>
			<AddressShipping setAddress={setAddress} />
			{address && <Payment products={productsData} address={address}/>}
		</BasicLayout>
	);
}
export default Cart;

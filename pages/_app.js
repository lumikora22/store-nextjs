import '../scss/global.scss';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
// import { setToken } from '../api/token';
import { TOKEN } from '../utils/constants';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import CartContext from '../context/CartContext';
import {
	getProductsCart,
	addProductCart,
	countProductsCart,
	removeProductCart,
} from '../api/cart';

export default function MyApp({ Component, pageProps }) {
	const [auth, setAuth] = useState(undefined);
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [reloadUser, setReloadUser] = useState(false);
	const [totalProductsCart, setTotalProductsCart] = useState(0);
	const [reloadCart, setReloadCart] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setAuth(null);
		const token = cookies?.token;

		if (token) {
			const objUser = jwtDecode(token);
			setAuth({
				token,
				idUser: objUser.id,
			});
		} else {
			setAuth(null);
		}
		setReloadUser(false);
	}, [reloadUser]);

	useEffect(() => {
		setTotalProductsCart(countProductsCart());
		setReloadCart(false);
	}, [reloadCart, auth]);

	const login = (token) => {
		setCookie(TOKEN, token);

		const objUser = jwtDecode(token);

		setAuth({
			token,
			idUser: objUser.id,
		});
	};

	const logout = () => {
		if (auth) {
			removeCookie(TOKEN);
			setAuth(null);
			router.push('/');
		}
	};

	const addProduct = (product) => {
		const token = cookies?.token;
		if (token) {
			addProductCart(product);
			setReloadCart(true);
		} else {
			toast.warning('Es necesario iniciar sesión');
		}
	};

	const removeProduct = (product) => {
		removeProductCart(product);
		setReloadCart(true);
    toast.info('Producto eliminado del carrito');
	};

	const authData = useMemo(
		() => ({
			auth,
			login,
			logout,
			setReloadUser,
		}),
		[auth]
	);

	const cartData = useMemo(
		() => ({
			productsCart: totalProductsCart,
			addProductCart: (product) => addProduct(product),
			getProductCart: getProductsCart,
			removeProductCart: (product) => removeProduct(product),
			removeAllProductsCart: () => null,
		}),
		[totalProductsCart]
	);

	if (auth === undefined) return null;

	return (
		<>
			<AuthContext.Provider value={authData}>
				<CartContext.Provider value={cartData}>
					<Component {...pageProps} />
					<ToastContainer
						position='top-right'
						autoClose={5000}
						hideProgressBar
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover
					/>
				</CartContext.Provider>
			</AuthContext.Provider>
		</>
	);
}

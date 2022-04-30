import '../scss/global.scss';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
// import { setToken } from '../api/token';
import { TOKEN } from '../utils/constants';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
	const [auth, setAuth] = useState(undefined);
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [reloadUser, setReloadUser] = useState(false);
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

	const authData = useMemo(
		() => ({
			auth,
			login,
			logout,
			setReloadUser,
		}),
		[auth]
	);

	if (auth === undefined) return null;

	return (
		<>
			<AuthContext.Provider value={authData}>
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
			</AuthContext.Provider>
		</>
	);
}

import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export function getToken() {
	const token = Cookies.get('token');
	return token;
}

export function hasExpiredToken(token) {
	const tokenDecode = jwtDecode(token);
	const expiredDate = tokenDecode.exp * 1000;
	const currentDate = new Date().getTime();

	if (currentDate > expiredDate) {
		return true;
	} else {
		return false;
	}
}

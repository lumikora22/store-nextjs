import { getToken, hasExpiredToken } from '../api/token';

export async function authFetch(url, params, logout) {
	const token = getToken();

	
	if (!token) {
		logout();
		return null;
	} else {
		if (hasExpiredToken(token)) {
			logout();
			return null;
		} else {
			const paramsTemp = {
				...params,
				headers: {
					...params?.headers,
					Authorization: `Bearer ${token}`,
				},
			};
			
			try {
				const response = await fetch(url, paramsTemp);
				const result = await response.json();
				return result;
			} catch (err) {
				console.log(err);
				return err;
			}
		}
	}
}

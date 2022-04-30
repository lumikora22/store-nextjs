import { BASE_PATH } from '../utils/constants';
import axios from 'axios';
import { authFetch } from '../utils/fetch';

export async function registerApi(formData) {
	try {
		const uri = `${BASE_PATH}/auth/local/register`;
		const response = await axios.post(uri, formData);
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function loginApi(formData) {
	try {
		const uri = `${BASE_PATH}/auth/local`;
		const response = await axios.post(uri, formData);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function resetPasswordApi(email) {
	try {
		const uri = `${BASE_PATH}/auth/forgot-password`;
		const response = await axios.post(uri, { email });
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getMeApi(logout) {
	try {
		const uri = `${BASE_PATH}/users/me`;
		const result = await authFetch(uri, null, logout);
		return result ? result : null;
	} catch (err) {
		console.log(err);
		return null;
	}
}

export async function updateMeApi(idUser, formData, logout) {
	try {
		const uri = `${BASE_PATH}/users/${idUser}`;
		const params = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		};
		const result = await authFetch(uri, params, logout);
		// const result = await axios.put(uri, formData);

		return result ? result : null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateEmailApi(idUser, email, logout) {
	try {
		const uri = `${BASE_PATH}/users/${idUser}`;
		const params = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		};
		const result = await authFetch(uri, params, logout);
		return result ? result : null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updatePasswordApi(idUser, password, logout) {
	
	try {
		const uri = `${BASE_PATH}/users/${idUser}`;
		const params = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password }),
		};
		const result = await authFetch(uri, params, logout);
		return result ? result : null;
	} catch (error) {
		console.log(error);
		return null;
	}
}



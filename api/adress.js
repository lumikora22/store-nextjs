import { BASE_PATH } from '../utils/constants';
import axios from 'axios';
import { authFetch } from '../utils/fetch';

export async function createAddressApi(formDataTemp, logout) {
	try {
		const uri = `${BASE_PATH}/adresses`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formDataTemp),
		};

		const result = await authFetch(uri, params, logout);

		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getAddressesApi(idUser, logout) {
	try {
		const url = `${BASE_PATH}/adresses?users_permissions_user=${idUser}`;
		const result = await authFetch(url, null, logout);
		if (result.statusCode === 500) throw 'Error de servidor';
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function deleteAddressApi(id, logout) {
	try {
		const url = `${BASE_PATH}/adresses/${id}`;
		const params = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const result = await authFetch(url, params, logout);
		if (result.statusCode === 500) throw 'Error de servidor';
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateAddressApi(id, address, logout){
	try{
		const url = `${BASE_PATH}/adresses/${id}`;
		const params = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(address),
		};

		const result = await authFetch(url, params, logout);
		
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}
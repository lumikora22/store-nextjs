import { BASE_PATH } from '../utils/constants';

export async function getProdcutApi(limit) {
	try {
		const limitItems = `_limit=${limit}`;
		const sortItem = '_sort=createdAt:desc';
		const url = `${BASE_PATH}/productos?${limitItems}&${sortItem}`;

		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getProdcutPlatformApi(platform, limit, start) {
	try {
		const limitItems = `_limit=${limit}`;
		const sortItems = `_sort=createdAt:desc`;
		const startItems = `_start=${start}`;
		const url = `${BASE_PATH}/productos?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;

		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getPlatformToProductApi(platform) {
	try {
		const url = `${BASE_PATH}/platforms?url=${platform}`;
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}
export async function getTotalProductsPlatformApi(platform) {
	try {
		const url = `${BASE_PATH}/productos/count?platform.url=${platform}`;
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getProductByUrlApi(path){
	try {
		const url = `${BASE_PATH}/productos?url=${path}`;
		const response = await fetch(url);
		const result = await response.json();
		return result[0];	
	} catch (error) {
		console.log(error);
		return null;
	
		
	}
}

export async function searchProductsApi(title){
	try {
		const url = `${BASE_PATH}/productos?_q=${title}`;
		const response = await fetch(url);
		const result = await response.json();
		return result;
		
	} catch (error) {
		console.log(error);
		return null;
	}
}
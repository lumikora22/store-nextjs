import { BASE_PATH } from '../utils/constants';
import axios from 'axios';
import { authFetch } from '../utils/fetch';

export async function getPlatformApi() {
	try {
		const url = `${BASE_PATH}/platforms?_sort=position:asc`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
	}
}

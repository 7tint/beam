import axios from 'axios';
import APIKeys from './api-keys.js';

async function getResponse(url) {
	const uri =
        "https://api.smmry.com?SM_API_KEY=" + APIKeys.smmryAPI + "&SM_URL=" + url;

	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export const SmmryAPI = async (query) => {
	const res = await getResponse(query);
	return res;
};


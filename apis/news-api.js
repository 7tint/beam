import axios from 'axios';
import APIKeys from './api-keys.js';

async function getResponse(query) {
	const uri =
		'https://newsapi.org/v2/everything?qInTitle=' +
		query +
		'&apiKey=' +
		APIKeys.newsAPI;

	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export const NewsAPI = async (query) => {
	const res = await getResponse(query);
	return res;
};

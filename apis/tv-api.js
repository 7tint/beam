import axios from 'axios';
import APIKeys from './api-keys.js';

async function getSearchResponse(query) {
	const uri =
        "https://api.themoviedb.org/3/search/tv?api_key=" + APIKeys.movieAPI + "&query=" + query;
    
	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

async function getTVResponse(keyword) {
    const tv_shows_list = await getSearchResponse(keyword);    
    const tv_show = tv_shows_list.data.results[0];
    const tv_show_id = tv_show.id;
    
    const uri =
        "https://api.themoviedb.org/3/tv/" + tv_show_id + "/recommendations?api_key=" + APIKeys.movieAPI;
    
	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export const TVAPI = async (query) => {
	const res = await getTVResponse(query);
	return res;
};

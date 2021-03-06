import axios from 'axios';
import APIKeys from './api-keys.js';

async function getSearchResponse(query) {
	const uri =
        "https://api.themoviedb.org/3/search/movie?api_key=" + APIKeys.movieAPI + "&query=" + query;
    
	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

async function getMovieResponse(keyword) {
    const movies_list = await getSearchResponse(keyword);    
    const movie = movies_list.data.results[0];
    const movie_id = movie.id;
    
    const uri =
        "https://api.themoviedb.org/3/movie/" + movie_id + "/recommendations?api_key=" + APIKeys.movieAPI;
    
	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export const MovieAPI = async (query) => {
	const res = await getMovieResponse(query);
	return res;
};

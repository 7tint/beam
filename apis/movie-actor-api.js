import axios from 'axios';
import APIKeys from './api-keys.js';

async function getSearchResponse(query) {
	const uri =
        "https://api.themoviedb.org/3/search/person?api_key=" + APIKeys.movieAPI + "&query=" + query;
    
	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

async function getActorResponse(keyword) {
    const actors_list = await getSearchResponse(keyword);    
    const actor = actors_list.data.results[0];
    const actor_id = actor.id;
    
    const uri =
        "https://api.themoviedb.org/3/person/" + actor_id + "/movie_credits?api_key=" + APIKeys.movieAPI;
    
	return axios
		.get(uri)
		.then(function (res) {
			return res;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export const ActorAPI = async (query) => {
	const res = await getActorResponse(query);
	return res;
};

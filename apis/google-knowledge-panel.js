import axios from 'axios';
import APIKeys from '../apis/api-keys.js';

async function getResponse(query) {
  const uri = 'https://kgsearch.googleapis.com/v1/entities:search?query=' + query +
              '&key=' + APIKeys.knowledgeGraph + '&limit=1&indent=True';

  return axios.get(uri)
  .then(function(res) {
    return res;
  })
  .catch(function(err) {
    console.log(err);
  });
}

export const GoogleKnowledgePanel = async (query) => {
  const res = await getResponse(query);
  return res;
}

import axios from 'axios';
import APIKeys from '../apis/api-keys.js';

async function getResponse(jsonRequest) {
  const uri = 'https://language.googleapis.com/v1beta2/documents:analyzeEntities?key=' + APIKeys.googleCloud;

  return axios.post(uri, jsonRequest)
  .then(function(res) {
    return res;
  })
  .catch(function(err) {
    console.log(err);
  });
}

export const CloudNaturalLanguage = async (string) => {
  const jsonRequest =
  {
    document: {
      type: "PLAIN_TEXT",
      language: "EN",
      content: string
    },
    encodingType: "UTF8"
  }

  const res = await getResponse(jsonRequest);
  return res.data.entities;
}

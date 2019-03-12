import axios from 'axios';

const BASE_URL = process.env.API_ROOT_URL;

export const getOneArticle = (id) => {
	return axios.get(`${BASE_URL}/articles/${id}`);
};

export const getArticles = () => {
	return axios.get(`${BASE_URL}/articles`);
};
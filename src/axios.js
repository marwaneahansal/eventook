import axios from 'axios';

axios.defaults.baseURL = 'https://eventook-api.herokuapp.com/api/';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

export default axios;

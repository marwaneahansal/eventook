import axios from 'axios';

axios.defaults.baseURL = '/api/';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

export default axios;

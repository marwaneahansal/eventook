import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:8000/api';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

export default axios;

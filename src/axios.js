import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_BACKEND_URL}/api/`;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

export default axios;

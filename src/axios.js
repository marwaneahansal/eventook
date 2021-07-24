import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_BACKEND_URL}/api/`;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://eventook-api.herokuapp.com';
axios.defaults.withCredentials = true;

export default axios;

import axios from 'axios';
import router from '@/router';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:8000/api';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

axios.interceptors.response.use((res) => res, (err) => {
  if (err.response.status === 429) {
    router.push({ name: 'tooManyRequests' });
  }
});

export default axios;

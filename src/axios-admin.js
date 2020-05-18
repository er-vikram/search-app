import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.122.7.162:5000/v60/admin/'
});

instance.defaults.headers = {
    withCredentials: true
}

export default instance;
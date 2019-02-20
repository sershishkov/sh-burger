import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sh-burger.firebaseio.com/'
});

export default instance;
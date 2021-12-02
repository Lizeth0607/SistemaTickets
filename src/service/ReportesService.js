import axios from 'axios';
export default class RegistroService {

    getProductsSmall() {
        return axios.get("http://127.0.0.1/api-soporte/public/report").then(res => res.data);
    }
}

import axios from 'axios';



export default class TiposService {

    obtenerTipo() {
        return axios.get("http://127.0.0.1/api-soporte/public/tipo/index").then(res => res.data);
    }

    seleccionaTipo(pTipos) {
        let seleccionaUrl = 'http://127.0.0.1/api-soporte/public/tipo/show'; //Modificar
        console.log("Seleccionado: ", pTipos.id);
        return axios.get(seleccionaUrl + '/' + pTipos.id).then(response => response.data);
    }

    agregaTipo(pTipos) {
        let agregaUrl = 'http://127.0.0.1/api-soporte/public/tipo/store';
        console.log(pTipos);
        const params = new URLSearchParams()
        params.append('nombre', pTipos.nombre)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.post(agregaUrl, params, config).then(response => response.data);
    }

    eliminaTipo(pTipos) {
        let eliminaUrl = 'http://127.0.0.1/api-soporte/public/tipo/destroy'; //Modificar
        console.log("Eliminado: ", pTipos.id);
        return axios.delete(eliminaUrl + '/' + pTipos.id);

    }

    actualizaTipo(pTipos) {
        let actualizaUrl = 'http://127.0.0.1/api-soporte/public/tipo/update'; //Modificar
        console.log("Actualizar: ", pTipos.id);
        const params = new URLSearchParams()
        params.append('nombre', pTipos.nombre)
        return axios.post(actualizaUrl + '/' + pTipos.id, params).then(response => response.data);
    }




}



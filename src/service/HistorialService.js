import axios from 'axios';



export default class HistorialService {


    obtenerHistorial() {
        return axios.get("").then(res => res.data);
    }


    seleccionaHistorial(pHistorial) {
        let seleccionaUrl = ''; //Modificar
        console.log(pHistorial.historial_id);
        return axios.get(seleccionaUrl + '/' + pHistorial.historial_id).then(response => response.data);
    }

    agregaHistorial(pHistorial) {
        let agregaUrl = '';
        const params = new URLSearchParams()
        params.append('mov_id', pHistorial.mov_id)
        params.append('equipo_id', pHistorial.equipo_id)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.post(agregaUrl, params, config).then(response => response.data);
    }

    actualizaHistorial(pHistorial) {
        let actualizaUrl = ''; //Modificar
        const params = new URLSearchParams()
        params.append('mov_id', pHistorial.mov_id)
        params.append('equipo_id', pHistorial.equipo_id)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.put(actualizaUrl + '/' + pHistorial.historial_id, params, config).then(response => response.data);
    }

    eliminaHistorial(pHistorial) {
        let eliminaUrl = ''; //Modificar
        console.log("asda ",pHistorial.historial_id);
        return axios.delete(eliminaUrl + '/' + pHistorial.historial_id);
    }

}
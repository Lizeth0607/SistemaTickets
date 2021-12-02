
import axios from 'axios';



export default class ServiciosService {

    obtenerServicio(pCriterio) {
        return axios.get("http://localhost/api-soporte/public/ticket/index").then(res => res.data);
    }


    seleccionaServicio(pServicios) {
        let seleccionaUrl = 'http://localhost/api-soporte/public/ticket/show'; //Modificar
        console.log("Seleccionado: ", pServicios.id);
        return axios.get(seleccionaUrl + '/' + pServicios.id).then(response => response.data);
    }

    agregaServicio(pServicios) {
        let agregaUrl = 'http://127.0.0.1/api-soporte/public/ticket/store';
        console.log(pServicios);
        const params = new URLSearchParams()
        params.append('equipo_id', pServicios.equipo_id)
        params.append('indicador_id', pServicios.indicador_id)
        params.append('problema', pServicios.problema)
        params.append('acciones', pServicios.acciones)
        params.append('estado', pServicios.estado)
        params.append('inicio', pServicios.fecha_inicio)
        params.append('termino', pServicios.fecha_termino)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.post(agregaUrl, params, config).then(response => response.data);
    }

    eliminaServicio(pServicios) {
        let eliminaUrl = 'http://127.0.0.1/api-soporte/public/ticket/destroy'; //Modificar
        console.log("Eliminado ", pServicios.id);
        console.log(pServicios);
        return axios.delete(eliminaUrl + '/' + pServicios.id);

    }

    actualizaServicio(pServicios) {
        let actualizaUrl = 'http://localhost/api-soporte/public/ticket/update'; //Modificar
        console.log("Actualiza: ", pServicios.id);
        const params = new URLSearchParams()
        params.append('equipo_id', pServicios.equipo_id)
        params.append('indicador_id', pServicios.indicador_id)
        params.append('problema', pServicios.problema)
        params.append('acciones', pServicios.acciones)
        params.append('estado', pServicios.estado)
        params.append('inicio', pServicios.fecha_inicio)
        params.append('termino', pServicios.fecha_termino)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.post(actualizaUrl + '/' + pServicios.id, params, config).then(response => response.data);
    }




}



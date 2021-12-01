
import axios from 'axios';



export default class  ServiciosService {

obtenerServicio (pCriterio){
    return axios.get("").then(res => res.data);
}


seleccionaServicio(pServicios) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pServicios.idServicio).then(response  =>  response.data);
}

agregaServicio (pServicios) {
    let agregaUrl = '';
    console.log(pServicios);
    const params = new URLSearchParams()
    params.append('servicio', pServicios.servicio)
    params.append('descripcion', pServicios.descripcion)
    params.append('prioridad', pServicios.prioridad)
    params.append('estado', pServicios.estado)
    params.append('fecha_solicitud', pServicios.fecha_solicitud)
    params.append('fecha_termino', pServicios.fecha_termino)
    params.append('equipo_id', pServicios.equipo_id)
    params.append('usuario_id', pServicios.usuario_id)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params, config).then(response => response.data);
}

eliminaServicio (pServicios) {
    let eliminaUrl = ''; //Modificar
    //console.log("asda ",pServicios.servicio_id);
    return axios.delete(eliminaUrl + '/' + pServicios.servicio_id);

}

actualizaServicio (pServicios) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pServicios.idServicio,  pServicios)
.then(response  =>  response.data);
}




}                



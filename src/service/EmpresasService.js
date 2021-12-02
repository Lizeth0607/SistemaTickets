
import axios from 'axios';



export default class  UbicacionesService {

obtenerUbicacion (){
    return axios.get("").then(res => res.data);
}


seleccionaUbicacion(pUbicaciones) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pUbicaciones.ubicacion_id).then(response  =>  response.data);
}

agregaUbicacion (pUbicaciones) {
    let agregaUrl = '';
    console.log(pUbicaciones);
    const params = new URLSearchParams()
    params.append('nombre',pUbicaciones.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaUbicacion (pUbicaciones) {
    let eliminaUrl = ''; //Modificar
    //console.log("asda ",pUbicaciones.rol_id);
    return axios.delete(eliminaUrl + '/' + pUbicaciones.ubicacion_id);

}

actualizaUbicacion (pUbicaciones) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pUbicaciones.ubicacion_id,  pUbicaciones)
.then(response  =>  response.data);
}




}                



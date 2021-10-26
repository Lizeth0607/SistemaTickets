
import axios from 'axios';



export default class  UbicacionesService {

obtenerUbicacion (){
    return axios.get("https://backliz1.herokuapp.com/location").then(res => res.data);
}


seleccionaUbicacion(pUbicaciones) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pUbicaciones.ubicacion_id).then(response  =>  response.data);
}

agregaUbicacion (pUbicaciones) {
    let agregaUrl = 'https://backliz1.herokuapp.com/location';
    console.log(pUbicaciones);
    const params = new URLSearchParams()
    params.append('nombre',pUbicaciones.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaUbicacion (pUbicaciones) {
    let eliminaUrl = 'https://backliz1.herokuapp.com/location'; //Modificar
    //console.log("asda ",pUbicaciones.rol_id);
    return axios.delete(eliminaUrl + '/' + pUbicaciones.ubicacion_id);

}

actualizaUbicacion (pUbicaciones) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pUbicaciones.ubicacion_id,  pUbicaciones)
.then(response  =>  response.data);
}




}                


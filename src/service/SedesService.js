
import axios from 'axios';



export default class  SedesService {

obtenerSede (){
    return axios.get("https://backliz1.herokuapp.com/seat").then(res => res.data);
}


seleccionaSede(pSedes) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pSedes.sede_id).then(response  =>  response.data);
}

agregaSede (pSedes) {
    let agregaUrl = 'https://backliz1.herokuapp.com/seat';
    console.log(pSedes);
    const params = new URLSearchParams()
    params.append('nombre',pSedes.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaSede (pSedes) {
    let eliminaUrl = 'https://backliz1.herokuapp.com/seat'; //Modificar
    //console.log("asda ",pSedees.rol_id);
    return axios.delete(eliminaUrl + '/' + pSedes.sede_id);

}

actualizaSede (pSedes) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pSedes.sede_id,  pSedes)
.then(response  =>  response.data);
}




}                



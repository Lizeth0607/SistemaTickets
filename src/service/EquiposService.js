
import axios from 'axios';



export default class  EquiposService {

obtenerEquipo (pCriterio){
    return axios.get("https://backliz1.herokuapp.com/device").then(res => res.data);

}


seleccionaEquipo(pEquipos) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pEquipos.idEquipo).then(response  =>  response.data);
}

agregaEquipo (pEquipos) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pEquipos).then(response  =>  response.data);
}

eliminaEquipo (pEquipos) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pEquipos.idEquipo, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pEquipos
});

}

actualizaEquipo (pEquipos) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pEquipos.idEquipo,  pEquipos)
.then(response  =>  response.data);
}



}                



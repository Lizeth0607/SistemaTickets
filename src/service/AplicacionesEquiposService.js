
import axios from 'axios';



export default class  AplicacionesEquiposService {

obtenerAplicacionEq (){
    return axios.get("https://backliz1.herokuapp.com/installation").then(res => res.data);

}


seleccionaAplicacionEq(pAplicacionEqs) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pAplicacionEqs.idAplicacionEquipo).then(response  =>  response.data);
}

agregaAplicacionEq (pAplicacionEqs) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pAplicacionEqs).then(response  =>  response.data);
}

eliminaAplicacionEq (pAplicacionEqs) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pAplicacionEqs.idAplicacionEquipo, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pAplicacionEqs
});

}

actualizaAplicacionEq (pAplicacionEqs) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pAplicacionEqs.idAplicacionEquipo,  pAplicacionEqs)
.then(response  =>  response.data);
}




}                




import axios from 'axios';



export default class  RolesService {

obtenerRol (){
    return axios.get("https://backliz1.herokuapp.com/role").then(res => res.data);
}


seleccionaRol(pRoles) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pRoles.idRol).then(response  =>  response.data);
}

agregaRol (pRoles) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pRoles).then(response  =>  response.data);
}

eliminaRol (pRoles) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pRoles.idRol, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pRoles
});

}

actualizaRol (pRoles) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pRoles.idRol,  pRoles)
.then(response  =>  response.data);
}




}                



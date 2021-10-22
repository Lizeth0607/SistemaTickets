
import axios from 'axios';



export default class  UsuariosService {

obtenerUsuario (pCriterio){
let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaUsuario(pUsuario) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pUsuario.idUsuario).then(response  =>  response.data);
}

agregaUsuario (pUsuario) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pUsuario).then(response  =>  response.data);
}

eliminaUsuario (pUsuario) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pUsuario.idUsuario, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pUsuario
});

}

actualizaUsuario (pUsuario) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pUsuario.idUsuario,  pUsuario)
.then(response  =>  response.data);
}




}                



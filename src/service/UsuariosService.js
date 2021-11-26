
import axios from 'axios';



export default class  UsuariosService {

obtenerUsuario (pCriterio){
let buscaUrl = '';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaUsuario(pUsuario) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pUsuario.idUsuario).then(response  =>  response.data);
}

agregaUsuario (pUsuario) {
let agregaUrl = '';
return axios.post(agregaUrl, pUsuario).then(response  =>  response.data);
}

eliminaUsuario (pUsuario) {
let eliminaUrl = ''; //Modificar
axios.delete(eliminaUrl  + '/' + pUsuario.idUsuario, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pUsuario
});

}

actualizaUsuario (pUsuario) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pUsuario.idUsuario,  pUsuario)
.then(response  =>  response.data);
}




}                



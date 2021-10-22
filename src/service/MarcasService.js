
import axios from 'axios';



export default class  MarcasService {

obtenerMarca (pCriterio){
let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaMarca(pMarcas) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pMarcas.idMarca).then(response  =>  response.data);
}

agregaMarca (pMarcas) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pMarcas).then(response  =>  response.data);
}

eliminaMarca (pMarcas) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pMarcas.idMarca, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pMarcas
});

}

actualizaMarca (pMarcas) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pMarcas.idMarca,  pMarcas)
.then(response  =>  response.data);
}




}                



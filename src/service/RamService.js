
import axios from 'axios';



export default class  RamService {

obtenerRam (pCriterio){
let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaRam(pRam) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pRam.idRam).then(response  =>  response.data);
}

agregaRam (pRam) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pRam).then(response  =>  response.data);
}

eliminaRam (pRam) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pRam.idRam, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pRam
});

}

actualizaRam (pRam) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pRam.idRam,  pRam)
.then(response  =>  response.data);
}




}                



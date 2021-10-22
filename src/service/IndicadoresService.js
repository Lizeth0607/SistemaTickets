
import axios from 'axios';



export default class  IndicadoresService {

obtenerIndicador (pCriterio){
let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaIndicador(pIndicadores) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pIndicadores.idInd).then(response  =>  response.data);
}

agregaIndicador (pIndicadores) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pIndicadores).then(response  =>  response.data);
}

eliminaIndicador (pIndicadores) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pIndicadores.idInd, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pIndicadores
});

}

actualizaIndicador (pIndicadores) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pIndicadores.idInd,  pIndicadores)
.then(response  =>  response.data);
}




}                



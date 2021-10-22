
import axios from 'axios';



export default class  TblSentidosSentenciasService {

obtenerTblSentidosSentencias (pCriterio){
let buscaUrl = '/MxExoticCarsMx/index.php?controller=Usuario&&action=mostrar';
//let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl).then(response  =>  response.data);
}


seleccionaTblSentidosSentencias(pTblSentidosSentencias) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias';
return axios.get(seleccionaUrl  + '/' + pTblSentidosSentencias.cveSentidoSentencia).then(response  =>  response.data);
}

agregaTblSentidosSentencias (pTblSentidosSentencias) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pTblSentidosSentencias).then(response  =>  response.data);
}

eliminaTblSentidosSentencias (pTblSentidosSentencias) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias';
axios.delete(eliminaUrl  + '/' + pTblSentidosSentencias.cveSentidoSentencia, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pTblSentidosSentencias
});

}

actualizaTblSentidosSentencias (pTblSentidosSentencias) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias';
return axios.put(actualizaUrl + '/' + pTblSentidosSentencias.cveSentidoSentencia,  pTblSentidosSentencias)
.then(response  =>  response.data);
}




}                



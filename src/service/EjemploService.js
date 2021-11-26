import axios from 'axios';



export default class  TblSentidosSentenciasService {

obtenerTblSentidosSentencias (pCriterio){
let buscaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/index';
//let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl).then(response  =>  response.data);
}


seleccionaTblSentidosSentencias(pTblSentidosSentencias) {
let seleccionaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/show';
return axios.get(seleccionaUrl  + '/' + pTblSentidosSentencias.cveSentidoSentencia).then(response  =>  response.data);
}

agregaTblSentidosSentencias (pTblSentidosSentencias) {
let agregaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/store';
return axios.post(agregaUrl, pTblSentidosSentencias).then(response  =>  response.data);
}


eliminaTblSentidosSentencias (pTblSentidosSentencias) {
let eliminaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/destroy';
return axios.put(eliminaUrl + '/'+ pTblSentidosSentencias.cveSentidoSentencia, pTblSentidosSentencias).then(response => response.data);
}
actualizaTblSentidosSentencias (pTblSentidosSentencias) {
let actualizaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/update';
return axios.put(actualizaUrl + '/' + pTblSentidosSentencias.cveSentidoSentencia,  pTblSentidosSentencias)
.then(response  =>  response.data);
}




}


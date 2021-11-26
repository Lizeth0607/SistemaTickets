
import axios from 'axios';



export default class  IndicadoresService {

obtenerIndicador (pCriterio){
let buscaUrl = '';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaIndicador(pIndicadores) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pIndicadores.idInd).then(response  =>  response.data);
}

agregaIndicador (pIndicadores) {
let agregaUrl = '';
return axios.post(agregaUrl, pIndicadores).then(response  =>  response.data);
}

eliminaIndicador (pIndicadores) {
let eliminaUrl = ''; //Modificar
axios.delete(eliminaUrl  + '/' + pIndicadores.idInd, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pIndicadores
});

}

actualizaIndicador (pIndicadores) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pIndicadores.idInd,  pIndicadores)
.then(response  =>  response.data);
}




}                



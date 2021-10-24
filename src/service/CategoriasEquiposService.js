
import axios from 'axios';



export default class  CategoriasService {

/*obtenerCategoria (pCriterio){
let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}
*/

seleccionaCategoria(pCategorias) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pCategorias.idCategiria).then(response  =>  response.data);
}

agregaCategoria (pCategorias) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pCategorias).then(response  =>  response.data);
}

eliminaCategoria (pCategorias) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pCategorias.idCategiria, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pCategorias
});

}

actualizaIndicador (pCategorias) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pCategorias.idCategiria,  pCategorias)
.then(response  =>  response.data);
}

obtenerCategoria (){
    /*
    let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
    let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
    return axios.get(buscaUrl + oValor).then(response  =>  response.data);*/
    return axios.get("https://backliz1.herokuapp.com/category/1").then(res => res.data);
}



}                



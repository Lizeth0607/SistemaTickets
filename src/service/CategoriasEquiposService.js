
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
let agregaUrl = 'https://backliz1.herokuapp.com/category';
const params = new URLSearchParams()
params.append('nombre', pCategorias.nombre)
params.append('descripcion', pCategorias.descripcion)
const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
return axios.post(agregaUrl, params, config).then(response  =>  response.data);
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
    return axios.get("https://backliz1.herokuapp.com/category").then(res => res.data);
}



}                



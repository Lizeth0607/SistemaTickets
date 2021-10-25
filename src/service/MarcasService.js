
import axios from 'axios';



export default class  MarcasService {

obtenerMarca (){
    return axios.get("https://backliz1.herokuapp.com/mark").then(res => res.data);
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



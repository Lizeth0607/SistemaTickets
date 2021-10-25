
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
let agregaUrl = 'https://backliz1.herokuapp.com/mark';
console.log(pMarcas);
const params = new URLSearchParams()
params.append('nombre',pMarcas.nombre)
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaMarca (pMarcas) {
    let eliminaUrl = 'https://backliz1.herokuapp.com/mark'; //Modificar
    console.log("asda ",pMarcas.marca_id);
    return axios.delete(eliminaUrl + '/' + pMarcas.marca_id);

}

actualizaMarca (pMarcas) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pMarcas.idMarca,  pMarcas)
.then(response  =>  response.data);
}




}                



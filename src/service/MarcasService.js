
import axios from 'axios';



export default class  MarcasService {

obtenerMarca (){
    return axios.get("").then(res => res.data);
}


seleccionaMarca(pMarcas) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pMarcas.idMarca).then(response  =>  response.data);
}

agregaMarca (pMarcas) {
let agregaUrl = '';
console.log(pMarcas);
const params = new URLSearchParams()
params.append('nombre',pMarcas.nombre)
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaMarca (pMarcas) {
    let eliminaUrl = ''; //Modificar
    console.log("asda ",pMarcas.marca_id);
    return axios.delete(eliminaUrl + '/' + pMarcas.marca_id);

}

actualizaMarca (pMarcas) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pMarcas.idMarca,  pMarcas)
.then(response  =>  response.data);
}




}                



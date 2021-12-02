
import axios from 'axios';



export default class  IndicadoresService {

obtenerIndicador (){
    return axios.get("http://localhost/api-soporte/public/indicador/index").then(res => res.data);
}


seleccionaIndicador(pIndicadores) {
let seleccionaUrl = 'http://localhost/api-soporte/public/indicador/show'; //Modificar
console.log("Seleccionado: ", pIndicadores.id);
return axios.get(seleccionaUrl  + '/' + pIndicadores.id).then(response  =>  response.data);
}

agregaIndicador (pIndicadores) {
let agregaUrl = 'http://127.0.0.1/api-soporte/public/indicador/store';
    console.log(pIndicadores);
    const params = new URLSearchParams()
    params.append('nombre',pIndicadores.nombre)
    params.append('descripcion',pIndicadores.descripcion)
   
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaIndicador (pIndicadores) {
    let eliminaUrl = 'http://127.0.0.1/api-soporte/public/indicador/destroy'; //Modificar
    console.log("Eliminado: ",pIndicadores.id);
    console.log(pIndicadores);
    return axios.delete(eliminaUrl + '/' + pIndicadores.id);

}

actualizaIndicador (pIndicadores) {
let actualizaUrl = 'http://localhost/api-soporte/public/indicador/update'; //Modificar
console.log("Actualizar: ",pIndicadores.id);
const params = new URLSearchParams()
    params.append('nombre',pIndicadores.nombre)
    params.append('descripcion',pIndicadores.descripcion)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
return axios.post(actualizaUrl + '/' + pIndicadores.id,  params, config).then(response  =>  response.data);
}




}                



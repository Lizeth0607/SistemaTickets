
import axios from 'axios';



export default class  IndicadoresService {

obtenerIndicador (){
    return axios.get("http://localhost/api-soporte/public/indicador/index").then(res => res.data);
}


seleccionaIndicador(pIndicadores) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pIndicadores.idInd).then(response  =>  response.data);
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
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pIndicadores.idInd,  pIndicadores)
.then(response  =>  response.data);
}




}                



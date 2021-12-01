
import axios from 'axios';



export default class  DiscosService {

obtenerDisco (){
    return axios.get("").then(res => res.data);

}


seleccionaDisco(pDiscos) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pDiscos.idDisco).then(response  =>  response.data);
}

agregaDisco (pDiscos) {
    let agregaUrl = '';
    console.log(pDiscos);
    const params = new URLSearchParams()
    params.append('tipo',pDiscos.tipo)
    params.append('capacidad',pDiscos.capacidad)
    params.append('medida',pDiscos.medida)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaDisco (pDiscos) {
    let eliminaUrl = ''; //Modificar
    console.log("asda ",pDiscos.disco_id);
    return axios.delete(eliminaUrl + '/' + pDiscos.disco_id);

}

actualizaDisco (pDiscos) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pDiscos.idDisco,  pDiscos)
.then(response  =>  response.data);
}




}                



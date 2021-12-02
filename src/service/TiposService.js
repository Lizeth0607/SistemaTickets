
import axios from 'axios';



export default class  TiposService {

obtenerTipo (){
    return axios.get("http://127.0.0.1/api-soporte/public/tipo/index").then(res => res.data);
}

seleccionaTipo(pTipos) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pTipos.id).then(response  =>  response.data);
}

agregaTipo (pTipos) {
    let agregaUrl = 'http://127.0.0.1/api-soporte/public/tipo/store';
    console.log(pTipos);
    const params = new URLSearchParams()
    params.append('nombre',pTipos.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaTipo (pTipos) {
    let eliminaUrl = 'http://127.0.0.1/api-soporte/public/tipo/destroy'; //Modificar
    console.log("Eliminado: ",pTipos.id);
    return axios.delete(eliminaUrl + '/' + pTipos.id);

}

actualizaTipo (pTipos) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pTipos.id,  pTipos)
.then(response  =>  response.data);
}




}                



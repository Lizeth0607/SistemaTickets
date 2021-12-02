
import axios from 'axios';



export default class  AplicacionesService {

obtenerApp (){
    return axios.get("http://localhost/api-soporte/public/aplicacion/index").then(res => res.data);
}


seleccionaApp(pApps) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pApps.idApp).then(response  =>  response.data);
}

agregaApp (pApps) {
    let agregaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/store';
    console.log(pApps);
    const params = new URLSearchParams()
    params.append('nombre',pApps.nombre)
    params.append('version',pApps.version)
    params.append('compra',pApps.compra)
    
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaApp (pApps) {
    let eliminaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/destroy'; //Modificar
    console.log("Eliminado ",pApps.id);
    console.log(pApps);
    return axios.delete(eliminaUrl + '/' + pApps.id);

}

actualizaApp (pApps) {
let actualizaUrl = 'http://127.0.0.1/api-soporte/public/aplicacion/update'; //Modificar
console.log("Actualizado", pApps);
return axios.post(actualizaUrl + '/' + pApps.id,  pApps).then(response  =>  response.data);
}




}                



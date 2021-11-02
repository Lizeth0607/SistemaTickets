
import axios from 'axios';



export default class  AplicacionesService {

obtenerApp (){
    return axios.get("https://api-hpp.herokuapp.com/apps").then(res => res.data);

}


seleccionaApp(pApps) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pApps.idApp).then(response  =>  response.data);
}

agregaApp (pApps) {
    let agregaUrl = 'https://backliz1.herokuapp.com/disk';
    console.log(pApps);
    const params = new URLSearchParams()
    params.append('tipo',pApps.tipo)
    params.append('capacidad',pApps.capacidad)
    params.append('medida',pApps.medida)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaApp (pApps) {
    let eliminaUrl = 'https://backliz1.herokuapp.com/disk'; //Modificar
    console.log("asda ",pApps.App_id);
    return axios.delete(eliminaUrl + '/' + pApps.App_id);

}

actualizaApp (pApps) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pApps.idApp,  pApps)
.then(response  =>  response.data);
}




}                



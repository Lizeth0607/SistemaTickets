
import axios from 'axios';



export default class  AplicacionesEquiposService {

obtenerAplicacionEq (){

    return axios.get("https://api-hpp.herokuapp.com/install").then(res => res.data);

}


seleccionaAplicacionEq(pAplicacionEqs) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pAplicacionEqs.instalacion_id).then(response  =>  response.data);
}

agregaAplicacionEq (pAplicacionEqs) {
    let agregaUrl = 'https://api-hpp.herokuapp.com/install';
    console.log(pAplicacionEqs);
    const params = new URLSearchParams()
    //params.append('fecha_instalacion',pAplicacionEqs.fecha_instalacion)
    params.append('app',pAplicacionEqs.app)
    params.append('equipo',pAplicacionEqs.equipo)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaAplicacionEq (pAplicacionEqs) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pAplicacionEqs.instalacion_id, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pAplicacionEqs
});

}

actualizaAplicacionEq (pAplicacionEqs) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pAplicacionEqs.instalacion_id,  pAplicacionEqs)
.then(response  =>  response.data);
}




}                




import axios from 'axios';



export default class  AplicacionesEquiposService {

obtenerAplicacionEq (){

    return axios.get("http://127.0.0.1/api-soporte/public/instalacion/index").then(res => res.data);

}


seleccionaAplicacionEq(pAplicacionEqs) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pAplicacionEqs.instalacion_id).then(response  =>  response.data);
}

agregaAplicacionEq (pAplicacionEqs) {
    let agregaUrl = 'http://127.0.0.1/api-soporte/public/instalacion/store';
    console.log(pAplicacionEqs);
    const params = new URLSearchParams()
    params.append('instalacion',pAplicacionEqs.instalacion)
    params.append('aplicacion_id',pAplicacionEqs.aplicacion_id)
    params.append('equipo_id',pAplicacionEqs.equipo_id)
    params.append('estacion',pAplicacionEqs.estacion)
    params.append('aplicacion',pAplicacionEqs.aplicacion_id)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaAplicacionEq (pAplicacionEqs) {
let eliminaUrl = ''; //Modificar
axios.delete(eliminaUrl  + '/' + pAplicacionEqs.instalacion_id, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pAplicacionEqs
});

}

actualizaAplicacionEq (pAplicacionEqs) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pAplicacionEqs.instalacion_id,  pAplicacionEqs)
.then(response  =>  response.data);
}




}                



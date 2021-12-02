
import axios from 'axios';



export default class  AplicacionesEquiposService {

obtenerAplicacionEq (){

    return axios.get("http://127.0.0.1/api-soporte/public/instalacion/index").then(res => res.data);

}


seleccionaAplicacionEq(pAplicacionEqs) {
    let seleccionaUrl = 'http://localhost/api-soporte/public/instalacion/show'; //Modificar
    console.log("Seleccionado: ", pAplicacionEqs.id);
    console.log("Fecha: ", pAplicacionEqs.fecha_instalacion);
    return axios.get(seleccionaUrl + '/' + pAplicacionEqs.id).then(response => response.data);
}


agregaAplicacionEq (pAplicacionEqs) {
    let agregaUrl = 'http://127.0.0.1/api-soporte/public/instalacion/store';
    console.log(pAplicacionEqs);
    const params = new URLSearchParams()
    params.append('fecha_instalacion',pAplicacionEqs.fecha_instalacion)
    params.append('aplicacion_id',pAplicacionEqs.aplicacion_id)
    params.append('equipo_id',pAplicacionEqs.equipo_id)
   
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

    eliminaAplicacionEq (pApps) {
        let eliminaUrl = 'http://127.0.0.1/api-soporte/public/instalacion/destroy'; //Modificar
        console.log("Eliminado: ",pApps.id);
        console.log(pApps);
        return axios.delete(eliminaUrl + '/' + pApps.id);
    
    }

actualizaAplicacionEq (pAplicacionEqs) {
    let actualizaUrl = 'http://localhost/api-soporte/public/instalacion/update'; //Modificar
    console.log("Actualizado", pAplicacionEqs.id);
    const params = new URLSearchParams()
    params.append('fecha_instalacion',pAplicacionEqs.fecha_instalacion)
    params.append('aplicacion_id',pAplicacionEqs.aplicacion_id)
    params.append('equipo_id',pAplicacionEqs.equipo_id)
    console.log("Act: ", pAplicacionEqs);

    return axios.post(actualizaUrl + '/' + pAplicacionEqs.id, params).then(response => response.data);
}




}                



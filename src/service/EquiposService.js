
import axios from 'axios';



export default class  EquiposService {

obtenerEquipo (pCriterio){
    return axios.get("http://localhost/api-soporte/public/equipo/index").then(res => res.data);
}


seleccionaEquipo(pEquipos) {
let seleccionaUrl = 'http://localhost/api-soporte/public/equipo/show'; //Modificar
console.log("Seleccionado ",pEquipos.num_serie);
return axios.get(seleccionaUrl  + '/' + pEquipos.num_serie).then(response  =>  response.data);
}

agregaEquipo (pEquipos) {
    let agregaUrl = 'http://localhost/api-soporte/public/equipo/store';
    console.log("Registro: ", pEquipos);
    const params = new URLSearchParams()
    params.append('num_serie',pEquipos.num_serie)
    params.append('estacion',pEquipos.estacion)
    params.append('detalle',pEquipos.detalle)
    params.append('compra',pEquipos.compra)
    params.append('install',pEquipos.install)
    params.append('tipo_id',pEquipos.tipo_id)
    params.append('empresa_id',pEquipos.empresa_id)
    
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaEquipo (pEquipos) {
    let eliminaUrl = 'http://127.0.0.1/api-soporte/public/equipo/destroy'; //Modificar
    console.log("Eliminado: ",pEquipos.num_serie);
    console.log(eliminaUrl + '/' + pEquipos.num_serie);
    return axios.delete(eliminaUrl + '/' + pEquipos.num_serie);

}

actualizaEquipo (pEquipos) {
let actualizaUrl = 'http://localhost/api-soporte/public/equipo/update'; //Modificar
console.log("Actualizar: ",pEquipos.estacion);
const params = new URLSearchParams()
    //params.append('num_serie',pEquipos.num_serie)
    params.append('estacion',pEquipos.estacion)
    params.append('detalle',pEquipos.detalles)
    params.append('compra',pEquipos.compra)
    params.append('install',pEquipos.can_install)
    params.append('tipo_id',pEquipos.tipo_id)
    params.append('empresa_id',pEquipos.empresa_id)
    console.log(actualizaUrl,'/',pEquipos.num_serie);
return axios.post(actualizaUrl + '/' + pEquipos.num_serie,  params).then(response  =>  response.data);
}



}                




import axios from 'axios';



export default class  EquiposService {

obtenerEquipo (pCriterio){
    return axios.get("https://backliz1.herokuapp.com/device").then(res => res.data);

}


seleccionaEquipo(pEquipos) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pEquipos.idEquipo).then(response  =>  response.data);
}

agregaEquipo (pEquipos) {
    let agregaUrl = 'https://backliz1.herokuapp.com/device';
    console.log(pEquipos);
    const params = new URLSearchParams()
    params.append('equipo_id',pEquipos.equipo_id)
    params.append('nombre',pEquipos.nombre)
    params.append('serial',pEquipos.serial)
    params.append('ip_equipo',pEquipos.ip_equipo)
    params.append('licencia',pEquipos.licencia)
    params.append('fecha_compra',pEquipos.fecha_compra)
    params.append('marca_id',pEquipos.marca_id)
    params.append('categoria_id',pEquipos.categoria_id)
    params.append('ram_id',pEquipos.ram_id)
    params.append('disco_id',pEquipos.disco_id)
    params.append('pantalla_id',pEquipos.pantalla_id)
    params.append('empleado_id',pEquipos.empleado_id)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaEquipo (pEquipos) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pEquipos.idEquipo, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pEquipos
});

}

actualizaEquipo (pEquipos) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pEquipos.idEquipo,  pEquipos)
.then(response  =>  response.data);
}



}                



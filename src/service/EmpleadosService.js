
import axios from 'axios';



export default class  EmpleadosService {

obtenerEmpleado (){
    return axios.get("http://localhost/api-soporte/public/empleado/index").then(res => res.data);
}


seleccionaEmpleado(pEmpleados) {
let seleccionaUrl = ''; //Modificar
console.log("asda ",pEmpleados.empleado_id);
return axios.get(seleccionaUrl  + '/' + pEmpleados.idEmpleado).then(response  =>  response.data);
}

agregaEmpleado (pEmpleados) {
let agregaUrl = 'http://localhost/api-soporte/public/empleado/store';
console.log(pEmpleados);
const params = new URLSearchParams()
params.append('num_empleado',pEmpleados.num_empleado)
params.append('nombre',pEmpleados.nombre)
params.append('apellidos',pEmpleados.apellidos)
params.append('puesto',pEmpleados.puesto)
params.append('area',pEmpleados.area)
params.append('id_equipo',pEmpleados.id_equipo)
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaEmpleado (pEmpleados) {
    let eliminaUrl = 'http://localhost/api-soporte/public/empleado/destroy'; //Modificar
    console.log("Eliminado: ",pEmpleados.id);
    return axios.delete(eliminaUrl + '/' + pEmpleados.id);

}

actualizaEmpleado (pEmpleados) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pEmpleados.idEmpleado,  pEmpleados)
.then(response  =>  response.data);
}




}                



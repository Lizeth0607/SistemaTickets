
import axios from 'axios';



export default class  EmpleadosService {

obtenerEmpleado (){
    return axios.get("http://localhost/api-soporte/public/empleado/index").then(res => res.data);
}


seleccionaEmpleado(pEmpleados) {
let seleccionaUrl = 'http://localhost/api-soporte/public/empleado/show/'; //Modificar
console.log("Id Seleccionado ",pEmpleados.id);
console.log(pEmpleados);
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
return axios.post(agregaUrl, params).then(response  =>  response.data);
}

eliminaEmpleado (pEmpleados) {
    let eliminaUrl = 'http://localhost/api-soporte/public/empleado/destroy'; //Modificar
    console.log("Eliminado: ",pEmpleados.id);
    return axios.delete(eliminaUrl + '/' + pEmpleados.id);

}

actualizaEmpleado (pEmpleados) {
let actualizaUrl = 'http://localhost/api-soporte/public/empleado/update'; //Modificar
console.log(pEmpleados)
console.log(pEmpleados.num_empleado);
const params = new URLSearchParams()
params.append('num_empleado',pEmpleados.num_empleado)
params.append('nombre',pEmpleados.nombre)
params.append('apellidos',pEmpleados.apellidos)
params.append('puesto',pEmpleados.puesto)
params.append('area',pEmpleados.area)
return axios.post(actualizaUrl + '/' + pEmpleados.num_empleado,  params).then(response  =>  response.data);
}




}                



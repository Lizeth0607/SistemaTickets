
import axios from 'axios';



export default class  EmpleadosService {

obtenerEmpleado (){
    return axios.get("https://backliz1.herokuapp.com/employee").then(res => res.data);
}


seleccionaEmpleado(pEmpleados) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pEmpleados.idEmpleado).then(response  =>  response.data);
}

agregaEmpleado (pEmpleados) {
let agregaUrl = 'https://backliz1.herokuapp.com/employee';
console.log(pEmpleados);
const params = new URLSearchParams()
params.append('nombre',pEmpleados.nombre)
params.append('telefono',pEmpleados.telefono)
params.append('mail',pEmpleados.mail)
params.append('puesto',pEmpleados.puesto)
params.append('imagen',pEmpleados.imagen)
params.append('ubicacion_id',pEmpleados.ubicacion_id)
params.append('sede_id',pEmpleados.sede_id)
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaEmpleado (pEmpleados) {
    let eliminaUrl = 'https://backliz1.herokuapp.com/employee'; //Modificar
    console.log("asda ",pEmpleados.empleado_id);
    return axios.delete(eliminaUrl + '/' + pEmpleados.empleado_id);

}

actualizaEmpleado (pEmpleados) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pEmpleados.idEmpleado,  pEmpleados)
.then(response  =>  response.data);
}




}                



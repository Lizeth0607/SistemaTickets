
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
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pEmpleados).then(response  =>  response.data);
}

eliminaEmpleado (pEmpleados) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pEmpleados.idEmpleado, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pEmpleados
});

}

actualizaEmpleado (pEmpleados) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pEmpleados.idEmpleado,  pEmpleados)
.then(response  =>  response.data);
}




}                



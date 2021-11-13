
import axios from 'axios';



export default class  RegistrosService {

obtenerRegistro (){
    return axios.get("https://backliz1.herokuapp.com/Registrose").then(res => res.data);
}


seleccionaRegistro(pRegistros) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pRegistros.idRegistros).then(response  =>  response.data);
}

agregaRegistro (pRegistros) {
    let agregaUrl = 'https://backliz1.herokuapp.com/Registrose';
    console.log(pRegistros);
    const params = new URLSearchParams()
    params.append('nombre',pRegistros.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaRegistro (pRegistros) {
    let eliminaUrl = 'https://backliz1.herokuapp.com/Registrose'; //Modificar
    console.log("asda ",pRegistros.Registros_id);
    return axios.delete(eliminaUrl + '/' + pRegistros.Registros_id);

}

actualizaRegistro (pRegistros) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pRegistros.idRegistros,  pRegistros)
.then(response  =>  response.data);
}




}                



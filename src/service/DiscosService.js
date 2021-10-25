
import axios from 'axios';



export default class  DiscosService {

obtenerDisco (){
    return axios.get("https://backliz1.herokuapp.com/disk").then(res => res.data);

}


seleccionaDisco(pDiscos) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pDiscos.idDisco).then(response  =>  response.data);
}

agregaDisco (pDiscos) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pDiscos).then(response  =>  response.data);
}

eliminaDisco (pDiscos) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pDiscos.idDisco, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pDiscos
});

}

actualizaDisco (pDiscos) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pDiscos.idDisco,  pDiscos)
.then(response  =>  response.data);
}




}                



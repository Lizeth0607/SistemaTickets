
import axios from 'axios';



export default class  PantallasService {

    obtenerPantalla (pCriterio){
        return axios.get("https://backliz1.herokuapp.com/screen").then(res => res.data);
    }


    seleccionaPantalla(pPantallas) {
    let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
    return axios.get(seleccionaUrl  + '/' + pPantallas.idPantalla).then(response  =>  response.data);
    }

    agregaPantalla (pPantallas) {
    let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
    return axios.post(agregaUrl, pPantallas).then(response  =>  response.data);
    }

    eliminaPantalla (pPantallas) {
    let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
    axios.delete(eliminaUrl  + '/' + pPantallas.idPantalla, {
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    data: pPantallas
    });

    }

    actualizaPantalla (pPantallas) {
    let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
    return axios.put(actualizaUrl + '/' + pPantallas.idPantalla,  pPantallas)
    .then(response  =>  response.data);
    }




}                



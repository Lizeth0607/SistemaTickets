
import axios from 'axios';



export default class  PantallasService {

    obtenerPantalla (pCriterio){
        return axios.get("").then(res => res.data);
    }


    seleccionaPantalla(pPantallas) {
    let seleccionaUrl = ''; //Modificar
    return axios.get(seleccionaUrl  + '/' + pPantallas.idPantalla).then(response  =>  response.data);
    }

    agregaPantalla (pPantallas) {
        let agregaUrl = '';
        console.log(pPantallas);
        const params = new URLSearchParams()
        params.append('tipo',pPantallas.tipo)
        params.append('tamano',pPantallas.tamano)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.post(agregaUrl, params,config).then(response  =>  response.data);
        }

    eliminaPantalla (pPantallas) {
        let eliminaUrl = ''; //Modificar
        console.log("asda ",pPantallas.pantalla_id);
        return axios.delete(eliminaUrl + '/' + pPantallas.pantalla_id);
    
    }

    actualizaPantalla (pPantallas) {
    let actualizaUrl = ''; //Modificar
    return axios.put(actualizaUrl + '/' + pPantallas.idPantalla,  pPantallas)
    .then(response  =>  response.data);
    }




}                



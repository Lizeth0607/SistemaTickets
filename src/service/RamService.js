
import axios from 'axios';



export default class  RamService {

obtenerRam (pCriterio){
    return axios.get("").then(res => res.data);
}


seleccionaRam(pRam) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pRam.idRam).then(response  =>  response.data);
}

agregaRam (pRam) {
    let agregaUrl = '';
    console.log(pRam);
    const params = new URLSearchParams()
    params.append('tipo',pRam.tipo)
    params.append('capacidad',pRam.capacidad)
    params.append('medida',pRam.medida)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
    }

eliminaRam (pRam) {
    let eliminaUrl = ''; //Modificar
    console.log("asda ",pRam.ram_id);
    return axios.delete(eliminaUrl + '/' + pRam.ram_id);

}

actualizaRam (pRam) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pRam.idRam,  pRam)
.then(response  =>  response.data);
}




}                



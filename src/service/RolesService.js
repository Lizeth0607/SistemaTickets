
import axios from 'axios';



export default class  RolesService {

obtenerRol (){
    return axios.get("").then(res => res.data);
}


seleccionaRol(pRoles) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pRoles.idRol).then(response  =>  response.data);
}

agregaRol (pRoles) {
    let agregaUrl = '';
    console.log(pRoles);
    const params = new URLSearchParams()
    params.append('nombre',pRoles.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaRol (pRoles) {
    let eliminaUrl = ''; //Modificar
    console.log("asda ",pRoles.rol_id);
    return axios.delete(eliminaUrl + '/' + pRoles.rol_id);

}

actualizaRol (pRoles) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pRoles.idRol,  pRoles)
.then(response  =>  response.data);
}




}                



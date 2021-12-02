
import axios from 'axios';



export default class  EmpresasService {

obtenerEmpresa (){
    return axios.get("http://127.0.0.1/api-soporte/public/empresa/index").then(res => res.data);
}

seleccionaEmpresa(pEmpresas) {
let seleccionaUrl = ''; //Modificar
return axios.get(seleccionaUrl  + '/' + pEmpresas.ubicacion_id).then(response  =>  response.data);
}

agregaEmpresa (pEmpresas) {
    let agregaUrl = 'http://127.0.0.1/api-soporte/public/empresa/store';
    console.log(pEmpresas);
    const params = new URLSearchParams()
    params.append('nombre',pEmpresas.nombre)
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return axios.post(agregaUrl, params,config).then(response  =>  response.data);
}

eliminaEmpresa (pEmpresas) {
    let eliminaUrl = 'http://127.0.0.1/api-soporte/public/empresa/destroy'; //Modificar
    console.log("Eliminado: ",pEmpresas.id);
    return axios.delete(eliminaUrl + '/' + pEmpresas.id);

}

actualizaEmpresa (pEmpresas) {
let actualizaUrl = ''; //Modificar
return axios.put(actualizaUrl + '/' + pEmpresas.ubicacion_id,  pEmpresas)
.then(response  =>  response.data);
}




}                



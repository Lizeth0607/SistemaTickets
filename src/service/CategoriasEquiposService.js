import axios from 'axios';



export default class CategoriasService {


    obtenerCategoria() {
        return axios.get("https://backliz1.herokuapp.com/category").then(res => res.data);
    }


    seleccionaCategoria(pCategorias) {
        let seleccionaUrl = 'https://backliz1.herokuapp.com/category'; //Modificar
        console.log(pCategorias.categoria_id);
        return axios.get(seleccionaUrl + '/' + pCategorias.categoria_id).then(response => response.data);
    }

    agregaCategoria(pCategorias) {
        let agregaUrl = 'https://backliz1.herokuapp.com/category';
        const params = new URLSearchParams()
        params.append('nombre', pCategorias.nombre)
        params.append('descripcion', pCategorias.descripcion)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.post(agregaUrl, params, config).then(response => response.data);
    }

    actualizaCategoria(pCategorias) {
        let actualizaUrl = 'https://backliz1.herokuapp.com/category'; //Modificar
        const params = new URLSearchParams()
        params.append('nombre', pCategorias.nombre)
        params.append('descripcion', pCategorias.descripcion)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        return axios.put(actualizaUrl + '/' + pCategorias.idCategoria, params, config).then(response => response.data);
    }

    eliminaCategoria(pCategorias) {
        let eliminaUrl = 'https://backliz1.herokuapp.com/category'; //Modificar
        console.log("asda ",pCategorias.categoria_id);
        return axios.delete(eliminaUrl + '/' + pCategorias.categoria_id);
    }

}
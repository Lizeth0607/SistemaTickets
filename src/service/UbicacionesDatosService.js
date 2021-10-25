export default class UnicacionesDatosService {

    getUbicaciones() {
        return fetch('data/ubicaciones.json').then(res => res.json())
            .then(d => d.data);
    }
}
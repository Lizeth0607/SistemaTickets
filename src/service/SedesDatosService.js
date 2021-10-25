export default class SedesDatosService {

    getSedes() {
        return fetch('data/sedes.json').then(res => res.json())
            .then(d => d.data);
    }
}
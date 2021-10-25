export default class AplicacionesDatosService {

    getAplicacionesEqs() {
        return fetch('data/aplicacionesEqs.json').then(res => res.json())
            .then(d => d.data);
    }
}
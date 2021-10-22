export class EquiposDatosService {

    getEquipos() {
        return fetch('data/equipos.json').then(res => res.json())
            .then(d => d.data);
    }
}
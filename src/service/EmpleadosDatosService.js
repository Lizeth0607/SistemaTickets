export default class EmpleadosService {

    getEmpleados() {
        return fetch('data/empleados.json').then(res => res.json())
            .then(d => d.data);
    }
}
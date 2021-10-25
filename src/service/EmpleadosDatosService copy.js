export default class EmpleadosDatosService {

    getEmpleados() {
        return fetch('data/empleados.json').then(res => res.json())
            .then(d => d.data);
    }
}
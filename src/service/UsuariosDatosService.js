export default class UsuariosDatosService {

    getUsuarios() {
        return fetch('data/usuarios.json').then(res => res.json())
            .then(d => d.data);
    }
}
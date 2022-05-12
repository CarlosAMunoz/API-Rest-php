
var usuarios = [];
const url = '../../API-Rest-php/registro-usuarios-backend/api/usuarios.php'

//Creamos una función que utilizará la librería de Axios
function obtenerUsuarios(){
    axios({
        method:'GET',
        url: url,
        responseType: 'json'
        /*No enviamos parámetros en el caso de esta función*/ 
    //PROMESA 
    //Esto se ejecutará solo cuando el servidor termine de procesar. 
    }).then(res=>{
        console.log(res.data);
        this.usuarios=res.data;
        llenarTabla();
    }).catch(error=>{
        console.error(error);
    });

}
obtenerUsuarios();

// Esta función lo que hará será recorrer el objeto usuarios para imprimirlo dentro de las tablas. 
function llenarTabla(){
    document.querySelector('#tabla-usuarios tbody').innerHTML = '';
    for (let i = 0; i < usuarios.length; i++) {
        document.querySelector('#tabla-usuarios tbody').innerHTML +=
        `
        <tr>
            <td>${usuarios[i].usuario}</td>
            <td>${usuarios[i].apellido}</td>
            <td>${usuarios[i].fechaNacimiento}</td>
            <td>${usuarios[i].pais}</td>
            <td><button type="button" onclick="eliminar(${i})">X</button></td>
        </tr>
        
        `
    }  
}

function eliminar(indice){
    console.log("Eliminar el elemento con el índice " + indice);

    axios({ 
        method: 'DELETE',
        url: url + `?id=${indice}`,
        responseType: 'json'
    }).then(res=>{
        console.log(res.data);
        obtenerUsuarios();
    }).catch(error=>{
        console.error(error);
    });
}

function guardar(){
    //Traems los datos de nuestro formulario y los guardamos en una variable como json 
    let usuarioApi = {
        usuario: document.getElementById('usuario').value,
        apellido: document.getElementById('apellido'.value),
        fechaNacimiento: document.getElementById(fechaNacimiento).value,
        pais: document.getElementById('pais').value,
    };


    console.log("Usuario a guardar ", usuarioApi);
}


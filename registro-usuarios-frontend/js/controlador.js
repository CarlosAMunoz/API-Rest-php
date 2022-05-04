
var usuarios = [];


//Creamos una función que utilizará la librería de Axios
function obtenerUsuarios(){
    axios({
        method:'GET',
        url: '../../API-Rest-php/registro-usuarios-backend/data/usuarios.json',
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
    for (let i = 0; i < usuarios.length; i++) {
        document.querySelector('#tabla-usuarios tbody').innerHTML +=
        `
        <tr>
            <td>${usuarios[i].nombre}</td>
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
}


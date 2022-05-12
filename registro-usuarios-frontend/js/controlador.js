//Usuario seleccionado para editar
var usaurioSeleccionado;

var usuarios = [];
const url = '../../API-Rest-php/registro-usuarios-backend/api/usuarios.php'

//Creamos una función que utilizará la librería de Axios para obtener la información del JSON
function obtenerUsuarios(){
    axios({
        method:'GET',
        url: url,
        responseType: 'json'
        /*No enviamos parámetros en el caso de esta función*/ 
    //PROMESA 
    //Esto se ejecutará solo cuando el servidor termine de procesar. 
    }).then(res=>{
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
            <td>${usuarios[i].nombre}</td>
            <td>${usuarios[i].apellido}</td>
            <td>${usuarios[i].fechaNacimiento}</td>
            <td>${usuarios[i].pais}</td>
            <td>
                <button type="button" onclick="eliminar(${i})">X</button>
                <button type="button" onclick="editar(${i})">...</button>
            </td>
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
    document.getElementById("btn-guardar").disabled = true;
    document.getElementById("btn-guardar").innerHTML = 'Cargando...';

    //Traemos los datos de nuestro formulario y los guardamos en una variable como json 
    let usuarioNuevo = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value,
    };

    console.log("Usuario a guardar ", usuarioNuevo);

    axios({ 
        method: 'POST',
        url: url,
        responseType: 'json',
        //Los valores a enviar
        data: usuarioNuevo,
    }).then(res=>{
        console.log(res.data);
        obtenerUsuarios();
        limpiar();
        document.getElementById("btn-guardar").disabled = false;
        document.getElementById("btn-guardar").innerHTML = 'Guardar';
    }).catch(error=>{
        console.error(error);
    });
}


function limpiar(){
    //Limpiamos todos los componentes. 
     document.getElementById('nombre').value="",
     document.getElementById('apellido').value="",
     document.getElementById('fechaNacimiento').value="",
     document.getElementById('pais').value=""

     document.getElementById('btn-guardar').style.display = 'inline-block';
     document.getElementById('btn-actualizar').style.display = 'none';
}


function editar(indice){
    usaurioSeleccionado = indice;
    console.log("Se seleccionó el elemento "+ indice +" para editar");

    axios({
        method:'GET',
        //SOLO vamos a querer un usuario, entonces enviamos con la URL el id
        url: url + `?id=${indice}`,
        responseType: 'json'
        /*No enviamos parámetros en el caso de esta función*/ 
    //PROMESA 
    //Esto se ejecutará solo cuando el servidor termine de procesar. 
    }).then(res=>{
        this.usuarios=res.data;

  
        document.getElementById('nombre').value=usuarios.nombre;
        document.getElementById('apellido').value=usuarios.apellido;
        document.getElementById('fechaNacimiento').value=usuarios.fechaNacimiento;
        document.getElementById('pais').value=usuarios.pais;

        document.getElementById('btn-guardar').style.display = 'none';
        document.getElementById('btn-actualizar').style.display = 'inline-block';

    }).catch(error=>{
        console.error(error);
    });

}


function actualizar(){

    let UsuarioAActualizar = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value,
    };

    console.log("Usuario a Actualziar  ", UsuarioAActualizar);

    axios({ 
        method: 'PUT',
        url: url + `?id=${usaurioSeleccionado}`,
        responseType: 'json',
        //Los valores a enviar
        data: UsuarioAActualizar,
    }).then(res=>{
        console.log(res.data);
        obtenerUsuarios();
        limpiar();
    }).catch(error=>{
        console.error(error);
    });

}

<?php

//localhost:3306/..../api/usuarios.php
//Este archivo recibe todas las peticiones de nuestro usuario. 

//De esta manera logramos obtener información relacionada a nuestra petición.  
//echo "Metodo HTTP: ".$_SERVER['REQUEST_METHOD'];

// De esta manera obtenemos la información enviada a través de HTTP desde formato JSON
//echo "Información: " .file_get_contents('php://input');



//Le indicamos al cliente que lo que le envío es un json
header("Content-Type: application/json");


//Definimos variable para imprimir resultados
$resultado["mensaje"] = "";

//Evaluamos el método de la petición e imprimo el resultado. 
switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);

        //Guardamos en un array asociativo la respuesta que queremos dar para posteriormente regresarla de manera esturcturada (Foramto JSON). 
        $resultado["mensaje"] = "Guardar usuario nuevo. Inforamtion: ".json_encode($_POST);
        
    break;
    case 'GET':
        //So traemos un ID, es porque vamos a retornar un usuario, de lo contrario vamos a retornarlos todos.  
        if (isset($_GET['id'])) {
            $resultado["mensaje"] = "Obtener usuario con el id ".$_GET['id'];

        }else {
            $resultado["mensaje"]= "Obtener todos los usuarios";

        }
    break;
    case 'PUT':
        $_PUT = json_decode(file_get_contents('php://input'),true);
        $resultado["mensaje"] =   "Actualizar el usuario con el id ".$_GET['id'].
                                    "   Information a actualizar ".json_encode($_PUT);

    break;
    case 'DELETE':
        $resultado["mensaje"] =  "Eliminar usuario con el id ".$_GET['id'];

    break;
}

echo json_encode($resultado);


?>
    

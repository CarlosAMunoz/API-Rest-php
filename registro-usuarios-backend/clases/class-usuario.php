<?php
//Clase Usuario

class Usuario {
    private $nombre;
    private $apellido; 
    private $fechaNacimiento;
    private $pais; 


    public function __construct($nombre, $apellido, $fechaNacimiento, $pais){
        $this->nombre = $nombre;
        $this->apellido = $apellido; 
        $this->fechaNacimiento = $fechaNacimiento;
        $this->pais = $pais; 
    }


    /**
     * Get the value of nombre
     */ 
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of nombre
     *
     * @return  self
     */ 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get the value of apellido
     */ 
    public function getApellido()
    {
        return $this->apellido;
    }

    /**
     * Set the value of apellido
     *
     * @return  self
     */ 
    public function setApellido($apellido)
    {
        $this->apellido = $apellido;

        return $this;
    }

    /**
     * Get the value of fechaNacimiento
     */ 
    public function getFechaNacimiento()
    {
        return $this->fechaNacimiento;
    }

    /**
     * Set the value of fechaNacimiento
     *
     * @return  self
     */ 
    public function setFechaNacimiento($fechaNacimiento)
    {
        $this->fechaNacimiento = $fechaNacimiento;

        return $this;
    }

    /**
     * Get the value of genero
     */ 
    public function getPais()
    {
        return $this->pais;
    }

    /**
     * Set the value of genero
     *
     * @return  self
     */ 
    public function setPais($pais)
    {
        $this->pais = $pais;    

        return $this;
    }

    
    //Acá escribimos nuestro archivo JSON
    // Para guardar un nuevo elemento en nuestro array, necesitamos trar toda la información del JSON y sobreescribirla. De lo contrario el Json no quedará con la sitaxis correcta. 
    public function guardarUsuario(){
        //Treaemos la información del archivo json
        $contenidoArchivo = file_get_contents("../data/usuarios.json");
        //Guardamos la información en un arrray asociativo
        $usuarios = json_decode($contenidoArchivo, true);
        //Agregamos un elemento adicional a nuestro Array
        $usuarios[] = array(

                "nombre"=> $this->nombre,
                "apellido"=> $this->apellido,
                "fechaNacimiento"=> $this->fechaNacimiento,
                "pais"=> $this->pais
        );

        //Abrimos el archivo haciendo referencia a su origen y el método w para sustituír. 
        $archivo =fopen("../data/usuarios.json", "w");
        //El método fwrite nos ayudará a escribir el documento con nuestro arreglo nuevo. 
        fwrite($archivo, json_encode($usuarios));
        //Finalmente cerramos el flujo del archivo. 
        fclose($archivo);
    }

    //Cuando agregamos el modificador static, hace que la función pueda ser accedida sin crear una instancia. 
    public static function obtenerUsuarios(){
        $contenidoArchivo = file_get_contents("../data/usuarios.json");
        echo $contenidoArchivo;
    }

    
    public static function  obtenerUsuario($indice){
        $contenidoArchivo = file_get_contents("../data/usuarios.json");
        //true para que sea un arreglo asociativo.
        $usuarios = json_decode($contenidoArchivo, true);
        //Obtenemos e imprimimos un subarreglo del íncide indicado. 
        echo json_encode($usuarios[$indice]);
    }

    public function actualizarUsuario($indice){
        //Leemos el contenido del archivo. 
        $contenidoArchivo = file_get_contents("../data/usuarios.json");
        //Lo convertimos en un arreglo asociativo
        $usuarios = json_decode($contenidoArchivo, true);
  

        $usuario = array(
            'nombre'=>$this->nombre,
            'apellido'=>$this->apellido,
            'fechaNacimiento'=>$this->fechaNacimiento,
            'pais'=>$this->pais
        );

        $usuarios[$indice] = $usuario;

        $archivo = fopen("../data/usuarios.json", "w");
        fwrite($archivo, json_encode($usuarios));
        fclose($archivo);
    }


    public static function eliminarUsuario($indice){
        //Leemos el contenido del archivo. 
        $contenidoArchivo = file_get_contents("../data/usuarios.json");
        //Lo convertimos en un arreglo asociativo
        $usuarios = json_decode($contenidoArchivo, true);

        array_splice($usuarios, $indice, 1);

        $archivo = fopen("../data/usuarios.json", "w");
        fwrite($archivo, json_encode($usuarios));
        fclose($archivo);
    }










}

?>
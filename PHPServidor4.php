<?php

    //ACTUALIZAR DATOS DE TRACKING DESDE RECEPCIONES (returns)
    if(isset($_POST["Reception_ID"], $_POST["Locker_ID"])){
        
        $Reception_ID = $_POST["Reception_ID"];
        $LastStatus = $_POST["LastStatus"];
        $Locker_ID = $_POST["Locker_ID"];
        $Return_ID =$_POST["Return_ID"];
      
        $servidor = "localhost";
        $usuario = "root";
        $password = "";
        $dbname = "reverselogisticsmng";
    
        $conexion = mysqli_connect($servidor, $usuario, $password, $dbname);
        if (!$conexion) {
            echo(alert("Fallo en la conexion"));
            echo "MySQL connection error: ".mysqli_connect_error();
            exit();
    
        } else {
            echo("Conexion establecida correctamente.");
        }
    
        $sql = "UPDATE tracking SET Return_ID=$Return_ID, LastStatus=$LastStatus, Locker_ID=$Locker_ID WHERE Reception_ID=$Reception_ID";
        if (mysqli_query($conexion, $sql)) {
            echo "\nRegistros guardados.";
            
        } else {
            echo "Error: ".mysqli_error($conexion);
        }
        mysqli_close($conexion);
    }


?>
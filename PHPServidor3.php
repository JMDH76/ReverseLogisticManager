<?php

    //RELLENAR DATOS DE TRACKING DESDE RECEPCIONES
    if(isset($_POST["Reception_ID"], $_POST["Locker_ID"])){
        
        $Reception_ID = $_POST["Reception_ID"];
        $Customer_ID = $_POST["Customer_ID"];
        $LastStatus = $_POST["LastStatus"];
        $Locker_ID = $_POST["Locker_ID"];
      
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

        $sql = "INSERT INTO tracking (Reception_ID, Customer_ID, LastStatus,Locker_ID)
        VALUES ('".addslashes($Reception_ID)."','".addslashes($Customer_ID)."', 
        '".addslashes($LastStatus)."', '".addslashes($Locker_ID)."')";

        if (mysqli_query($conexion, $sql)) {
            echo "\nRegistros guardados.";
            
        } else {
            echo "Error: ".mysqli_error($conexion);
        }
        mysqli_close($conexion);
    }







?>
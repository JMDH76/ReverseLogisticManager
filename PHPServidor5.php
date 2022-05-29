<?php

/*  //ACTUALIZAR DATOS DE TRACKING DESDE QUALITY
 if(isset($_POST["Reception_ID"])){
        
    $Reception_ID = $_POST["Reception_ID"];
    $LastStatus = $_POST["LastStatus"];
    $Locker_ID = $_POST["Locker_ID"];
    $Quality_ID =$_POST["Quality_ID"];
  
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

    $sql = "UPDATE tracking SET Quality_ID=$Quality_ID, LastStatus=$LastStatus, Locker_ID=$Locker_ID WHERE Reception_ID=$Reception_ID";
    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistros guardados.";
        
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
} */


 //ACTUALIZAR DATOS DE TRACKING DESDE RECEPCIONES (returns)
 /* if(isset($_POST["Recep"], $_POST["Lock"])){
        
    $Reception_ID = $_POST["Recep"];
    $LastStatus = $_POST["LastStatus"];
    $Locker_ID = $_POST["Lock"];
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
} */

 //RELLENAR DATOS DE TRACKING DESDE RECEPCIONES II FINAL
 if(isset($_POST["Recep"], $_POST["Lock"])){
            
    $Reception_ID = $_POST["Recep"];
    $Customer_ID = $_POST["Customer_ID"];
    $LastStatus = $_POST["LastStatus"];
    $Locker_ID = $_POST["Lock"];
    $Return_ID = $_POST["Return_ID"];

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
    $sql = "INSERT INTO tracking (Reception_ID, Return_ID, Customer_ID, LastStatus,Locker_ID)
    VALUES ('".addslashes($Reception_ID)."','".addslashes($Return_ID)."','".addslashes($Customer_ID)."', 
    '".addslashes($LastStatus)."', '".addslashes($Locker_ID)."')";

    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistros guardados.";
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
}



?>
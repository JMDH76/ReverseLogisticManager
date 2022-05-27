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


    //ACTUALIZAR DATOS DE TRACKING DESDE RECEPCIONES
    if(isset($_POST["Reception_ID"], $_POST["Locker_ID"])){
        
        $Reception_ID = $_POST["Reception_ID"];
        $Customer_ID = $_POST["Customer_ID"];
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

        $sql = "UPDATE tracking SET Return_ID=$Return_ID,LastStatus=$LastStatus, Locker_ID=$Locker_ID WHERE Reception_ID=$Reception_ID";

        if (mysqli_query($conexion, $sql)) {
            echo "\nRegistros guardados.";
            
        } else {
            echo "Error: ".mysqli_error($conexion);
        }
        mysqli_close($conexion);
    }




//GRABAR DATOS EN RETURNS
if(isset($_POST["Item"])){
        
    $Return_ID = $_POST["Return_ID"];
    $Locker_ID = $_POST["Locker_ID"];
    $NextTrackingStatus = $_POST["NextTrackingStatus"];
    $Remarks = $_POST["Remarks"];
    $Qty = $_POST["Qty"];
    $Item = $_POST["Item"];


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

    $sql ="UPDATE returns SET Item=$Item,Qty=$Qty, Remarks=$Remarks, NextTrackingStatus=$NextTrackingStatus, Locker_ID=$Locker_ID WHERE Return_ID=$Return_ID";
   /* $sql = "UPDATE returns SET Item=$Item, Qty=$Qty, Remarks=$Remarks, NextTrackingStatus=$NextTrackingStatus, Locker_ID=$Locker_ID WHERE Return_ID=$Return_ID";  */
   
    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistro modificados.";
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
}



?>
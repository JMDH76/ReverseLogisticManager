<?php
  //CONSULTA CUENTA DE IMPUTACION RETORNOS POR AGENCIA
  if(isset($_POST["Disponible"])){
       
    $Disponible = $_POST["Disponible"];      

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

    $sql = "SELECT Agency_ID, ReturnsAccount FROM transportagencies WHERE Disponible = $Disponible ORDER BY ReturnsAccount ASC";
    $select = mysqli_query($conexion, $sql);
    while ($dat=mysqli_fetch_assoc($select)){
        $arr[]=$dat;
    }
        
    if (mysqli_query($conexion, $sql)) {
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
    echo json_encode($arr); 
}

    //CONSULTA Solicitudes pendientes de recepcionar
    if(isset($_POST["Received"])){
            
        $Received = $_POST["Received"];     

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

        $sql = "SELECT PickUp_ID FROM pickups WHERE Received = $Received";      
        $select = mysqli_query($conexion, $sql);

        while ($dat=mysqli_fetch_assoc($select)){
            $arr[]=$dat;
        }
        echo json_encode($arr);  

        if (mysqli_query($conexion, $sql)) {
        } else {
            echo "Error: ".mysqli_error($conexion);
        }
        mysqli_close($conexion);
    }    



    //SOLICITUDES YA RECIBIDAS
    if(isset($_POST["PickUp_ID"])){
           
        $PickUp_ID = $_POST["PickUp_ID"];
        $Received = $_POST["Received"];     

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
        $sql = "UPDATE pickups SET Received = $Received WHERE PickUp_ID = $PickUp_ID";      
        $select = mysqli_query($conexion, $sql);

        while ($dat=mysqli_fetch_assoc($select)){
            $arr[]=$dat;
        }
        echo json_encode($arr);  

        if (mysqli_query($conexion, $sql)) {
        } else {
            echo "Error: ".mysqli_error($conexion);
        }
        mysqli_close($conexion);
    }    

//CONSULTA EMBALAJES
if(isset($_POST["ActivePackage"])){
        
    $ActivePackage = $_POST["ActivePackage"];      

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

    $sql = "SELECT PackageType_ID, Description FROM packagestypes WHERE ActivePackage = $ActivePackage";      
    $select = mysqli_query($conexion, $sql);

    while ($dat=mysqli_fetch_assoc($select)){
        $arr[]=$dat;
    }
    echo json_encode($arr);    

    if (mysqli_query($conexion, $sql)) {
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
}    


 /* //OBTIENE EL NUMERO DE RECEPCION PARA PASARLO A TRACKING
 if(isset( $_POST["NextTrackingStatus"], $_POST["PickUp_ID"])){
        
    $PickUp_ID = $_POST["PickUp_ID"];
    $NextTrackingStatus = $_POST["NextTrackingStatus"];
  
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

    $sql = "SELECT Reception_ID FROM receptions WHERE PickUp_ID = $PickUp_ID" ;    
    $sql = "SELECT Reception_ID FROM receptions WHERE Reception_ID = (SELECT MAX(Reception_ID) FROM receptions) "; 
    $select = mysqli_query($conexion, $sql);

    $dat=mysqli_fetch_assoc($select);
    
    echo json_encode($dat);   

     if (mysqli_query($conexion, $sql)) {
     } else {
         echo "Error: ".mysqli_error($conexion);
     }
     mysqli_close($conexion);
} */

//RELLENAR DATOS DE TRACKING DESDE RECEPCIONES
/* if(isset($_POST["Reception_ID"], $_POST["Customer_ID"], $_POST["LastStatus "], $_POST["Locker_ID"])){
        
    $Reception_ID = $_POST["Reception_ID"];
    $Customer_ID = $_POST["Customer_ID"];
    $LastStatus  = $_POST["LastStatus "];
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

    $sql = "INSERT INTO tracking (Reception_ID, Customer_ID, LastStatus , Locker_ID)
    VALUES ('".addslashes($Reception_ID)."','".addslashes($Customer_ID)."', 
    '".addslashes($LastStatus )."', '".addslashes($Locker_ID)."')";

    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistros guardados.";
        
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
} */


?>
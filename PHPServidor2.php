<?php
  
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



?>
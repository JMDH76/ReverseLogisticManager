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


/* returns */
//IMPORTAR LISTA RECEPCIONES PENDIENTES 
if(isset($_POST["NextTrackingStatus"])){
        
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

    $sql = "SELECT Reception_ID, Locker_ID, Comments, PackageType FROM receptions WHERE NextTrackingStatus = $NextTrackingStatus ORDER BY DateReception ASC";      
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

//OBTENER EL NUMERO DE ORDEN ASOCIADA A UN Reception_ID
if(isset($_POST["Recepcion"])){
        
    $Reception_ID = $_POST["Recepcion"];      

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

    $sql = "SELECT AssociatedOrder_ID FROM pickups WHERE PickUp_ID = (SELECT PickUp_ID FROM receptions WHERE Reception_ID=$Reception_ID)"; 
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


//OBTENER EL ITEM Y CANTIDAD DE UNA ORDEN
if(isset($_POST["Orden"])){
        
    $Order_ID = $_POST["Orden"];      

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

    $sql = "SELECT Item_ID, Qty FROM orders WHERE Order_ID = $Order_ID";     
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

//OBTENER EL ITEM Y CANTIDAD DE UNA ORDEN
if(isset($_POST["Cliente"])){
        
    $Customer_ID = $_POST["Cliente"];      

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

    $sql = "SELECT Name, Phone1 FROM customers WHERE Customer_ID = $Customer_ID";     
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

//OBTENER LA DESCRIPCION DE UN ITEM
if(isset($_POST["Item"])){
        
    $Item_ID = $_POST["Item"];      

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

    $sql = "SELECT Reference, Description FROM warehouseitems WHERE Item_ID = $Item_ID";     
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
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


    //ACTUALIZAR DATOS DE TRACKING DESDE RECEPCIONES (returns)
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

        $sql = "UPDATE tracking SET Return_ID=$Return_ID, LastStatus=$LastStatus, Locker_ID=$Locker_ID WHERE Reception_ID=$Reception_ID";
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
        $NextTrackingStatus = $_POST["NextTrack"];
        $Remarks = $_POST["Remarks"];
        $Qty = $_POST["Qty"];
        $Item= $_POST["Item"];
        $User_ID = $_POST["User"];

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

        $sql ="UPDATE returns SET User_ID = $User_ID, Item=$Item,Qty=$Qty, Remarks=$Remarks, NextTrackingStatus=$NextTrackingStatus, Locker_ID=$Locker_ID WHERE Return_ID=$Return_ID";
    
        if (mysqli_query($conexion, $sql)) {
            echo "\nRegistro modificados.";
        } else {
            echo "Error: ".mysqli_error($conexion);
        }
        mysqli_close($conexion);
    }


//GRABAR DATOS EN QUALITY
if(isset($_POST["perro"])){
       
    $Perr = $_POST["perro"];
    $User_ID = $_POST["User"];
    $Item_ID = $_POST["Item"];
    $Qty = $_POST["Qt"];
    $Analysis = $_POST["Ana"];
    $Proceded =$_POST["Proc"];
    $Reason = $_POST["Reas"];
    $NextTrackingStatus = $_POST["NextT"];
    $Locker_ID = $_POST["Locker"];
    $Quality_ID = $POST["Quality"];

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

    $sql ="UPDATE quality SET  Item_ID=$Item_ID, User_ID=$User_ID, Analysis=$Analysis, Qty=$Qty, Reason=$Reason, Proceded=$Proceded, NextTrackingStatus=$NextTrackingStatus, Locker_ID=$Locker_ID WHERE Quality_ID=$Quality_ID";
   
    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistro modificados.";
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
}


//BORRAR USUARIO
if(isset($_POST["UserIDDel"])){
        
    $User_ID = $_POST["UserIDDel"];
    
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
    $sql = "TRUNCATE TABLE actual_user";

    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistro modificados.";
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
}


//GRABAR USUARIO
if(isset($_POST["UserID"])){
        
    $User_ID = $_POST["UserID"];
    
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

    $sql = "INSERT INTO actual_user (User_ID)
    VALUES ('".addslashes($User_ID)."')";
   
    if (mysqli_query($conexion, $sql)) {
        echo "\nRegistro modificados.";
    } else {
        echo "Error: ".mysqli_error($conexion);
    }
    mysqli_close($conexion);
}


//OBTENER USUARIO ACTUAL
if(isset($_POST["User"])){
        
    $Identificador = $_POST["User"];      

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

   $sql = "SELECT User_ID FROM actual_user WHERE Identificador = $Identificador"; 
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

//OBTENER LOCKER POR SU ID
if(isset($_POST["ID_Locker"])){
        
    $Locker_ID = $_POST["ID_Locker"];      

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

   $sql = "SELECT Name FROM lockers WHERE Locker_ID = $Locker_ID"; 
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
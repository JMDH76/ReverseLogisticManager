var devolucionesEsperaReturns = () => {
    var lastStatus = 1;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",  //dirección del servidor
        data: {
            LastStatus: lastStatus
        },
        success: function (response) {
            var index = response.indexOf(":");
            var json = response.substring(index + 1, response.length - 1);
            var jsparse = JSON.parse(json);

            pendientes = jsparse;
            document.getElementById("contador-devolucionesreturns").value = pendientes;
        },
        error: function () {
            alert("Error");
        }
    });
}
devolucionesEsperaReturns();


/* var borrarTracking = () => {
    var cust =0;
    console.log("Borrando....")
    $.ajax({
        type: "POST",
        url: "../PHPServidor4.php",
        data: {
            Customer_ID: cust,
        },
        success: function (response) {
            console.log(">>> Tracking borrado");
        },
        error: function () {
            alert("Error");
        }
    });
}
borrarTracking(); */



var updatefechahora = (datetime) => {
    if (datetime < 10) {
        return "0" + datetime;
    } else {
        return datetime;
    }
}
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

//VENTANA MODAL. Insertamospara indicar nº cliente
open.addEventListener('click', () => {
    modal_container.classList.add('show');
    document.getElementById("controles-pendientes").focus();
    document.getElementById("open").style.visibility = "hidden";
    importarListaControlesPendientes();
});

//CANCELACION DEL FORMULARIO. Sale al principio (No deja volver a acceder al formulario)
var cancel = () => {
    console.log(">>> Operación cancelada")
    //desbloquearLocker();
    //borrarEntradaDepartamento(document.getElementById("returnid").value);
    window.location.replace("../forms/quality.html");
}

var cancelmodal = () => {
    window.location.replace("../forms/quality.html");
}

close.addEventListener('click', () => {
    var reception_id = document.getElementById("controles-pendientes").value;
    document.getElementById("numerorecepcio-quality").value = "Recepción:    " + reception_id;

    var qualityid = generarQualityId(200);
    document.getElementById("quality-id").value = qualityid;

    var stringreceptionsinfo = importarListaControlesPendientes();
    var index1 = stringreceptionsinfo.indexOf(".");
    var arrayreceptionsid = stringreceptionsinfo.substring(0, index1).split(",");
    var arraylockers = stringreceptionsinfo.substring(index1 + 1).split(",");
    var codigocliente = reception_id.substring(12, 19);
    document.getElementById("codigoclientereturns").value = codigocliente;

    
    var index3 = arrayreceptionsid.indexOf(reception_id);
    var locker = arraylockers[index3];
    lockerName(locker);
    obtenerTipoEmbalaje();
    
    
    var lockername = document.getElementById("locker-in-quality").value;
    console.log(lockername)
   
    document.getElementById("locker-id").value = locker;
    modal_container.classList.remove('show');
    document.getElementById('cont1').style.visibility = "visible";
    document.getElementById('cont2').style.visibility = "visible";
    document.getElementById('botonera-quality').style.visibility = "visible";
    document.getElementById('analisis-tecnico-quality').focus();



});

//OBTENER EL TIPO DE EMBALAJE
var obtenerTipoEmbalaje = () => {
    var locker = document.getElementById("locker-in-quality").value;
    console.log("Locker: " + locker)
    var lockertype = (document.getElementById("locker-in-quality").value).substring(0, 1)
    var packagetype;
    if (lockertype == "A" || lockertype == "B" || lockertype == "C" || lockertype == "D") {
        packagetype = 1
    } else if (lockertype == "E" || lockertype == "F" || lockertype == "G" || lockertype == "H") {
        packagetype = 2;
    } else if (lockertype == "I" || lockertype == "J") {
        packagetype = 3;
    } else if (locker.substring(0, 1) == "K") {
        packagetype = 4;
    } else {
        return
    }
    console.log(packagetype) 
}


//OBTENER NOMBRE DEL LOCKER
var lockerName = (id) => {
    var lockerid = id;
    $.ajax({
        type: "POST",
        url: "../PHPServidor3.php",
        data: {
            ID_Locker: lockerid,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            document.getElementById("locker-in-quality").value = jsparse[0].Name;
        },
        error: function () {
            alert("Error");
        }
    });
}



//CREAR NUMERO DE DEVOLUCION
var generarQualityId = (code) => {
    var depcode = code;
    var date = new Date();
    var day = updatefechahora(date.getDate()).toString();
    var mounth = updatefechahora((date.getMonth() + 1)).toString();
    var year = date.getFullYear().toString();
    var hour = updatefechahora(date.getHours()).toString();
    var minute = updatefechahora(date.getMinutes()).toString();
    var digitocontrol = Math.floor(Math.random() * (9 - 0 + 1) + 0);

    var Quality_ID = depcode + year + mounth + day + hour + minute + digitocontrol;

    if (Quality_ID.length == 16) {
        return Quality_ID;
    } else {
        Quality_ID = "";
        return Quality_ID;
    }
}


importarListaControlesPendientes = () => {
    var proximodep = 2;
    window.pickups = [];
    window.lockers = [];
    window.stringcontrolespendientes;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            LastStatus: proximodep,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            const $select = document.getElementById("controles-pendientes");
            for (var i = 0; i > $select.options.length; i++) {
                $select.remove(i);
            }
            var option;
            var valor;
            var texto;
            for (var i = -1; i < jsparse.length; i++) {
                option = document.createElement('option');
                if (i == -1) {
                    valor = "";
                    texto = "Seleccione un control";
                } else {
                    valor = jsparse[i].Reception_ID;
                    texto = jsparse[i].Reception_ID;
                    lockers.push(jsparse[i].Locker_ID);
                    pickups.push(valor);
                }
                option.value = valor;
                option.text = texto;
                $select.appendChild(option);
            }
            stringcontrolespendientes = pickups.toString() + "." + lockers.toString() /* + "." + customers.toString() */;
        },
        error: function () {
            alert("Error");
        }
    });
    return window.stringcontrolespendientes;
}


















//BORRARR REGISTR DE ENTRADA EN DEPARTAMENTO
var borrarEntradaDepartamento = (returnid) => {
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",
        data: {
            Devolucion: returnid,
        },
        success: function (response) {
            console.log(">>> Devolución " + returnid + " eliminada del registro correctamente");
        },
        error: function () {
            alert("Error");
        }
    });
}

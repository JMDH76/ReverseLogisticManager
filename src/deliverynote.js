const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

//VENTANA MODAL. Insertamospara indicar nº cliente
open.addEventListener('click', () => {
    modal_container.classList.add('show');
    document.getElementById("envios-pendientes").focus();
    document.getElementById("open").style.visibility = "hidden";
    importarListaEnviosPendientes();
});

//CANCELACION DEL FORMULARIO. Sale al principio (No deja volver a acceder al formulario)
var cancel = () => {
    console.log(">>> Operación cancelada")
    desbloquearLocker();
    borrarEntradaDepartamento(document.getElementById("exp-id").value);
    window.location.replace("../forms/deliverynote.html");
}

var cancelmodal = () => {
    window.location.replace("../forms/deliverynote.html");
}

close.addEventListener('click', () => {

    var reception_id = document.getElementById("envios-pendientes").value;
    document.getElementById("numerorecepcion-exp").value = "Recepción:    " + reception_id;
    console.log(reception_id);

    var expeditionid = generarExpeditionId(500);
    document.getElementById("exp-id").value = expeditionid;
    console.log(expeditionid);

    var codigocliente = reception_id.substring(12, 19);
    document.getElementById("codigoclienteexp").value = codigocliente;
    console.log(codigocliente);


    var stringreceptionsinfo = importarListaEnviosPendientes();
    var index = stringreceptionsinfo.indexOf(".");
    var arrayreceptionsid = stringreceptionsinfo.substring(0, index).split(",");
    var arraylockers = stringreceptionsinfo.substring(index + 1).split(",");

    var index2 = arrayreceptionsid.indexOf(reception_id);
    var locker = arraylockers[index2];
    document.getElementById("locker-id").value = locker;
    console.log(locker);

    lockerName(locker);
    obtenerDatosCliente(codigocliente);
    obtenerUsuario();

    modal_container.classList.remove('show');
    document.getElementById('cont1').style.visibility = "visible";
    //document.getElementById('cont2').style.visibility = "visible";
    document.getElementById('botonera-exp').style.visibility = "visible";
    document.getElementById('pesoexp').focus();
});



var obtenerDatosCliente = (codigocliente) => {

    var Customer_ID = codigocliente;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",
        data: {
            Customer_ID: Customer_ID,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index + 1, response.length - 1);
            var jsparse = JSON.parse(json);

            //Asignamos valores a campos del formulario
            document.getElementById('nombrecliente-exp').value = jsparse.Name;
            document.getElementById('direccion1exp').value = jsparse.Direction1;
            document.getElementById('direccion2exp').value = jsparse.Direction2;

            document.getElementById('cpexp').value = jsparse.ZIPCode;
            document.getElementById('poblacionexp').value = jsparse.Town;
            document.getElementById('provexp').value = jsparse.Province;
            document.getElementById('emailexp').value = jsparse.Email;
            document.getElementById('tlf1exp').value = jsparse.Phone1;

            if (jsparse.Phone2 == 0) {
                document.getElementById('tlf2exp').value = "";
            } else {
                document.getElementById('tlf2exp').value = jsparse.Phone2;
            }
            document.getElementById('nombrecontactoexp').value = jsparse.ContactPerson;
            importarAgencias(jsparse.Agency_ID);
            
        },
        error: function () {
            alert("Error");
        }
    });
}

//IMPORTACIÓN DE AGENCIAS >>> Desplegable
var importarAgencias = (agencia) => {
    var Disponibilidad = 1
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",  //dirección del servidor
        data: {
            Disponible: Disponibilidad
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            //Creamos los 'option' del select
            const $select = document.getElementById("list-agencias")
            //Borramos los anteriores
            for (var i = 0; i > $select.options.length; i++) {
                $select.remove(i);
            }
            var option;
            var valor;
            var texto;
            for (var i = 0; i < jsparse.length; i++) {
                option = document.createElement('option');
                valor = jsparse[i].Agency_ID;
                texto = jsparse[i].Name;
                if (valor == agencia) {
                    option.selected = true;
                }
                option.value = valor;
                option.text = texto;
                $select.appendChild(option);
            }
        },
        error: function () {
            alert("Error");
        }
    });
}








//CREAR NUMERO DE EXPEDICION
var generarExpeditionId = (code) => {
    var depcode = code;
    var date = new Date();
    var day = updatefechahora(date.getDate()).toString();
    var mounth = updatefechahora((date.getMonth() + 1)).toString();
    var year = date.getFullYear().toString();
    var hour = updatefechahora(date.getHours()).toString();
    var minute = updatefechahora(date.getMinutes()).toString();
    var second = updatefechahora(date.getSeconds()).toString();

    var digitocontrol = Math.floor(Math.random() * (9 - 0 + 1) + 0);

    var Expedition_ID = depcode + year + mounth + day + hour + minute + second + digitocontrol;

    if (Expedition_ID.length == 18) {
        return Expedition_ID;
    } else {
        Expedition_ID = "";
        return Expedition_ID;
    }
}

//OBTENEMOR EL USUARIO QUE SE HA LOGEADO 
var obtenerUsuario = () => {
    var user = 1;
    $.ajax({
        type: "POST",
        url: "../PHPServidor3.php",
        data: {
            User: user,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            document.getElementById("iduser3").value = jsparse[0].User_ID;
        },
        error: function () {
            alert("Error");
        }
    });
}

//IMPORTAR LISTADO DE CONTROLES PENDIENTES DE ENVIAR AL CLIENTE
importarListaEnviosPendientes = () => {
    var proximodep = 5;
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

            const $select = document.getElementById("envios-pendientes");
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
            stringcontrolespendientes = pickups.toString() + "." + lockers.toString();
        },
        error: function () {
            alert("Error");
        }
    });
    return window.stringcontrolespendientes;
}

/* ----------------------LOCKERS-------------------------------- */

//OBTENER NOMBRE DEL LOCKER
var lockerName = (id) => {
    var lockerid = id;
    window.casillero;
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
            casillero = jsparse[0].Name;
            document.getElementById("locker-in-exp").value = jsparse[0].Name;
        },
        error: function () {
            alert("Error");
        }
    });
}

//BLOQUEO DEL LOCKER SELECCIONADO
var bloquearLocker = (lockerid, name) => {
    var locker = lockerid;
    var status = 1;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",
        data: {
            Locker_ID: locker,
            Status: status
        },
        success: function (response) {
            console.log(">>> Casillero " + name + " bloqueado");
        },
        error: function () {
            alert("Error");
        }
    });
}

//LIBERAR LOCKER
var desbloquearLocker = () => {
    var locker = document.getElementById("nextlocker-q").value;
    var name = document.getElementById("nextlocker-quality").value;
    var status = 0;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",
        data: {
            Locker_ID: locker,
            Status: status
        },
        success: function (response) {
            console.log(">>> Casillero " + name + " liberado");
        },
        error: function () {
            alert("Error");
        }
    });
}
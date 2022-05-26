const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

//VENTANA MODAL. Insertamospara indicar nº cliente
open.addEventListener('click', () => {
    modal_container.classList.add('show');
    document.getElementById("devoluciones-pendientes").focus();
    document.getElementById("open").style.visibility = "hidden";
    importarListaRecepcionesPendientes();

});

//CANCELACION DEL FORMULARIO. Sale al principio (No deja volver a acceder al formulario)
var cancel = () => {
    //desbloquearLocker();
    window.location.replace("../forms/returns.html");
}

close.addEventListener('click', () => {

    var reception_id = document.getElementById("devoluciones-pendientes").value;
    document.getElementById("numerorecepcio-returns").value = "Recepción:   " + reception_id;
    var arrayreceptionsinfo = importarListaRecepcionesPendientes();
    var index1 = arrayreceptionsinfo.indexOf(".");
    var substring2 = arrayreceptionsinfo.substring(index1 + 1);
    var index2 = substring2.indexOf(".");

    var arrayreceptionsid = arrayreceptionsinfo.substring(0, index1).split(",");
    var arraylockers = substring2.substring(0, index2).split(",");
    var arraycomments = substring2.substring(index2 + 1).split(",");

    console.log(reception_id)

    //SACAMOS NUMERO DE CLIENTE
    var codigocliente = reception_id.substring(12, 19);
    document.getElementById("codigoclientereturns").value = codigocliente;

    //SACAMOS CASILLERO Y COMENTARIOS
    var index3 = arrayreceptionsid.indexOf(reception_id);
    var locker = arraylockers[index3];
    var comments = arraycomments[index3];
    document.getElementById("locker-in-returns").value = locker;
    document.getElementById("comentarios-cliente-returns").value = comments;

    modal_container.classList.remove('show');
    document.getElementById('cont1').style.visibility = "visible";
    document.getElementById('cont2').style.visibility = "visible";
    document.getElementById('botonera-returns').style.visibility = "visible";
    document.getElementById('mercancia-abonar').focus();

    obtenerOrdenAsociada(reception_id);
    obtenerDatosCliente(codigocliente);
    cantidadItemsAbonar();
});


//CANTIDAD DE ITEMS PARA ABONAR
var cantidadItemsAbonar = (reception) => {
    const $select = document.getElementById("cantidadabono-returns");
    var cantidad = 5;
    console.log("Cant: " + cantidad);
    var option;
    var valor;
    var texto;
    for (var i = -1; i < cantidad; i++) {
        option = document.createElement('option');
        if (i == -1) {
            valor = "";
            texto = "Selecione una";
        } else {
            valor = i + 1;
            texto = i + 1;
            /*          lockers.push(jsparse[i].Locker_ID);
                     comentarios.push(jsparse[i].Comments);
                     pickups.push(valor); */
        }
        option.value = valor;
        option.text = texto;
        $select.appendChild(option);
    }
}








//OBTENER NOMBRE Y TELEFONO DEL CLIENTE
var obtenerDatosCliente = (codigo) => {
    var cliente = codigo;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            Cliente: cliente,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            document.getElementById("nombrecliente-returns").value = jsparse[0].Name;
            document.getElementById("telefono1-returns").value = jsparse[0].Phone1;
        },
        error: function () {
            alert("Error");
        }
    });
}

//IMPORTAR PEDIDO ASOCIADO
var obtenerOrdenAsociada = (recepcion) => {
    var reception = recepcion;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            Recepcion: reception,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            document.getElementById("pedidoasociado-returns").value = jsparse[0].AssociatedOrder_ID;
            console.log(jsparse[0].AssociatedOrder_ID);
            obtenerDetalleOrdenAsociada(jsparse[0].AssociatedOrder_ID);
        },
        error: function () {
            alert("Error");
        }
    });
}

//IMPORTAR DETALLE DE PEDIDO
var obtenerDetalleOrdenAsociada = (order) => {
    var associatedorder = order;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            Orden: associatedorder,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            document.getElementById("detalle-pedido-returns").value = jsparse[0].Item_ID;
            document.getElementById("mercancia-abonar").value = jsparse[0].Item_ID;
            document.getElementById("cantidadreturns").value = jsparse[0].Qty + " uds.";
        },
        error: function () {
            alert("Error");
        }
    });
}

//IMPORTA LISTA DE RECEPCIONES EN ESPERA DE ENTRAR EN DEPARTAMENTO + ARRAY CON LOCKER Y COMENTARIOS
var importarListaRecepcionesPendientes = () => {
    var proximodep = 1;
    window.pickups = [];
    window.lockers = [];
    window.comentarios = [];
    window.stringrecepionespendientes;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            NextTrackingStatus: proximodep,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            //console.log(json);
            var jsparse = JSON.parse(json);

            //Creamos los 'option' del select
            const $select = document.getElementById("devoluciones-pendientes");
            var option;
            var valor;
            var texto;
            for (var i = -1; i < jsparse.length; i++) {
                option = document.createElement('option');
                if (i == -1) {
                    valor = "";
                    texto = "Selecciones una devolución";
                } else {
                    valor = jsparse[i].Reception_ID;
                    texto = jsparse[i].Reception_ID;
                    lockers.push(jsparse[i].Locker_ID);
                    comentarios.push(jsparse[i].Comments);
                    pickups.push(valor);
                }
                option.value = valor;
                option.text = texto;
                $select.appendChild(option);
            }
            stringrecepionespendientes = pickups.toString() + "." + lockers.toString() + "." + comentarios.toString();
        },
        error: function () {
            alert("Error");
        }
    });
    return window.stringrecepionespendientes;
}
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
    document.getElementById("numerorecepcio-returns").value = reception_id;
    var arrayreceptionsinfo = importarListaRecepcionesPendientes();
    var index1 = arrayreceptionsinfo.indexOf(".");

    var substring2 = arrayreceptionsinfo.substring(index1 + 1);
    var index2 = substring2.indexOf(".");
    
    var arrayreceptionsid = arrayreceptionsinfo.substring(0, index1).split(",");
    var arraylockers = substring2.substring(0, index2).split(",");
    var arraycomments = substring2.substring(index2+1).split(",");

    console.log(reception_id)

    //SACAMOS NUMERO DE CLIENTE
    var codigocliente = reception_id.substring(12, 19);
    document.getElementById("codigoclientereturns").value = codigocliente;
    console.log(codigocliente);

    //Casillero
    var index3 = arrayreceptionsid.indexOf(reception_id);
    var locker = arraylockers[index3];
    var comments = arraycomments[index3];
    document.getElementById("locker-in-returns").value = locker;
    document.getElementById("comentarios-cliente-returns").value = comments;

    console.log(locker);
    console.log(comments);

   
 /*
     for (var i = 0; i < arrayRecogidas.length; i++) {        // Existe?
         if (arrayRecogidas[i] == pickupId) {
             flag = true;
         }
     }
 
     /* if (flag) console.log("Nº de Recogida correcto >>> " + pickupId); */
    /*if (flag == false) {
        document.getElementById('pickup-number').value = "";
        alert('Introduzca un número de recogida válido');
        document.getElementById('pickup-number').focus;
        return;
    } */

    modal_container.classList.remove('show');
    document.getElementById('cont1').style.visibility = "visible";
    document.getElementById('cont2').style.visibility = "visible";
    document.getElementById('botonera-returns').style.visibility = "visible";
    document.getElementById('mercancia-abonar').focus();









});

//


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
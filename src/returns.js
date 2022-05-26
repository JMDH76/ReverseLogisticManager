const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

//VENTANA MODAL. Insertamospara indicar nº cliente
open.addEventListener('click', () => {
    modal_container.classList.add('show');
    document.getElementById("recepciones-pendientes").focus();
    document.getElementById("open").style.visibility = "hidden";
    importarListaRecepcionesPendientes();

});

//CANCELACION DEL FORMULARIO. Sale al principio (No deja volver a acceder al formulario)
var cancel = () => {
    //desbloquearLocker();
    window.location.replace("../forms/returns.html");
}

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
    document.getElementById('cont1').style.visibility = "visible";
    document.getElementById('botonera').style.visibility = "visible";
    //document.getElementById('proximo-departamento').focus();


});


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
            console.log(json);
            var jsparse = JSON.parse(json);

            //Creamos los 'option' del select
            const $select = document.getElementById("recepciones-pendientes");
            //Borramos los anteriores
         /*    for (var i = 0; i > $select.options.length; i++) {
                $select.remove(i);
            } */
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
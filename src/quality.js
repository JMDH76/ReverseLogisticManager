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
    console.log(">>> Operación cancelada")
    desbloquearLocker();
    borrarEntradaDepartamento(document.getElementById("returnid").value);
    window.location.replace("../forms/quality.html");
}

var cancelmodal = () => {
    window.location.replace("../forms/returns.html");
}

const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

//VENTANA MODAL. Insertamospara indicar nº cliente
open.addEventListener('click', () => {
    modal_container.classList.add('show');
    document.getElementById("pickup-number").focus();
    document.getElementById("open").style.visibility = "hidden";
    importarPickUpsIds();       //importamos todas las recogidas sin recepcionar
    importarTiposEmbalaje();    //importamos todos los tipos de embalaje disponibles
});

//CANCELACION DEL FORMULARIO. Sale al principio (No deja volver a acceder al formulario)
var cancel = () => {
    window.location.replace("../forms/receptions.html");
}


close.addEventListener('click', () => {

    //VALIDACION NUMERO DE RECOGIDA
    var pickupId = document.getElementById('pickup-num').value;
    var arrayRecogidas = importarPickUpsIds().split(",");
    var flag = false;
    var flag2 = false;

    for (var i = 0; i < arrayRecogidas.length; i++) {        // Existe?
        if (arrayRecogidas[i] == pickupId) {
            flag = true;
        }
    }

    if (flag) console.log("Nº de Recogida correcto >>> " + pickupId);
    if (flag == false) {
        document.getElementById('pickup-number').value = "";
        alert('Introduzca un número de recogida válido');
        document.getElementById('pickup-number').focus;
        return;
    }

    var type = document.getElementById('package-type').value;
    if (type == "") {
        alert("Debe indicar el tipo de embalaje");
        document.getElementById("package-type").focus;
        return;
    } else {
        flag2 = true;
        console.log("Tipo embalaje >>> " + type);
    }

    if (flag == true && flag2 == true) {

        /* Se hace visible el menú */
        modal_container.classList.remove('show');
        document.getElementById('cont1').style.visibility = "visible";
        document.getElementById('botonera').style.visibility = "visible";
        document.getElementById('proximo-departamento').focus();

        document.getElementById("num-recogida").value = pickupId;
        document.getElementById("tipo-embalaje").value = type;
        /* Obtenemos la ID del departamento y el nombre */

        obtenterDepartamento(pickupId);
        obtenerLocker(type);
        importarListaDepartamentos();
        obtenerReceptionId(pickupId)


    } else {
        return;
    }

    //Usuario
    //Grabar en su receptions
    //Grabar tracking
});


var confirmarRecepcion = () => {

    var PickUp_ID = document.getElementById("num-recogida").value;
    var User_ID = 1;
    var PackageType = document.getElementById("tipo-embalaje").value;

    //VALIDACION DEPARTAMENTO:
    var departamentos = importarListaDepartamentos();
    var index = departamentos.indexOf(".");
    var dep = (departamentos.substring(0, index)).split(",");
    var id = (departamentos.substring(index + 1)).split(",");
    var NextTrackingStatus = document.getElementById("proximo-dep").value;
    var proxdepactual = document.getElementById("proximo-departamento").value;
    //Confirmamos que existe
    var flag = false;
    for (var i = 0; i < dep.length; i++) {
        if (proxdepactual == dep[i]) {
            flag == true;
        }
    }
    //Comprueba que si se ha cambiado manuelamente el dpto y modifica la variable
    if (!flag) {
        var index2 = dep.indexOf(proxdepactual);
        var proxdepidactual = id[index2];
        if (NextTrackingStatus != proxdepidactual) {
            NextTrackingStatus = proxdepidactual;
            console.log("Próximo departamento nuevo " + NextTrackingStatus);
        }
    } else return;

    var Reception_ID = parseInt(document.getElementById("num-recepcion").value) + 1;
    console.log("recepcion real >> " + Reception_ID);

    var Locker_ID = document.getElementById("locker-recepciones").value;
    var Comments = document.getElementById("obser").value;
    var Customer_ID = document.getElementById("cod_cliente").value;

    //Guardar en tabla receptions y tabla tracking
    //Poner Locker a 1 >> Ocupado
    //GUARDAR datos en receptions y genera número de recepción

    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",  //dirección del servidor
        data: {
            PickUp_ID: PickUp_ID,
            User_ID: User_ID,
            PackageType: PackageType,
            NextTrackingStatus: NextTrackingStatus,
            Locker_ID: Locker_ID,
            Comments: Comments
        },
        success: function (response) {
            console.log("Solicitud registrada correctamente");

            Reception_ID = parseInt(document.getElementById("num-recepcion").value) + 1;
            Customer_ID = document.getElementById("cod_cliente").value;

            $.ajax({
                type: "POST",
                url: "../PHPServidor2.php",
                data: {
                    Reception_ID: Reception_ID,
                    Customer_ID: Customer_ID,
                    NextTrackingStatus: NextTrackingStatus,
                    Locker_ID: Locker_ID
                },
                success: function (response) {
                    console.log("Solicitud registrada correctamente2");
                },
                error: function () {
                    alert("Error");
                }
            });
        },
        error: function () {
            alert("Error");
        }

    });

    //Guardar tabla tracking
    /*  $.ajax({
         type: "POST",
         url: "../PHPServidor2.php",
         data: {
             Reception_ID: Reception_ID,
             Customer_ID: Customer_ID,
             NextTrackingStatus: NextTrackingStatus,
             Locker_ID: Locker_ID
         },
         success: function (response) {
             console.log("Solicitud registrada correctamente2");
         },
         error: function () {
             alert("Error");
         }
     }); */

    //poner como recibida en pickups
    //Poner Locker a 1 >> Ocupado

}
//OBTIENE EL ULTIMO NUMERO DE RECEPCION DE LA TABLA
var obtenerReceptionId = (pickupId) => {
    var PickUp_ID = pickupId;
    var NextTrackingStatus = 0;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            PickUp_ID: PickUp_ID,
            NextTrackingStatus: NextTrackingStatus
        },
        success: function (response) {
            var index = response.indexOf("{");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            document.getElementById("num-recepcion").value = jsparse.Reception_ID;
            console.log("Reception_ID >>> " + jsparse.Reception_ID);
        },
        error: function () {
            alert("Error");
        }
    });
}






//IMPORTACIÓN DE DEPARTAMENTOS >>> LISTA Desplegable y Array de verificación
var importarListaDepartamentos = () => {
    var departamentoactivo = 1;
    window.departamentos = [];
    window.ids = [];
    window.stringdepartamentos;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",  //dirección del servidor
        data: {
            Activo: departamentoactivo,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            //Creamos los 'option' del select
            const $datalist = document.getElementById("DeptList");

            var option;
            var valor;
            for (var i = 0; i < jsparse.length; i++) {
                option = document.createElement('option');
                valor = jsparse[i].Name;
                departamentos.push(jsparse[i].Name);
                ids.push(jsparse[i].Department_ID);
                option.value = valor;
                $datalist.appendChild(option);
            }
            stringdepartamentos = (departamentos.toString() + "." + ids.toString())
            /* .log("String: " + stringdepartamentos); */
        },
        error: function () {
            alert("Error");
        }
    });
    return window.stringdepartamentos;
}


//OBTENER PROXIMO DEPARTAMENTOS. DOS CONSULTAS ANIDADAS
var obtenterDepartamento = (pickupId) => {
    var Recogida = pickupId;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",
        data: {
            PickUp_ID: Recogida
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            for (var i = 0; i < jsparse.length; i++) {
                document.getElementById("proximo-dep").value = jsparse[i].Department_ID;
                document.getElementById("cod_cliente").value = jsparse[i].Customer_ID;
                /* Obtiene nombre */
                var departamento = jsparse[i].Department_ID;
                $.ajax({
                    type: "POST",
                    url: "../PHPServidor.php",
                    data: {
                        Department_ID: departamento
                    },
                    success: function (response) {
                        var index = response.indexOf("[");
                        var json = response.substring(index, response.length);
                        var jsparse = JSON.parse(json);

                        for (var i = 0; i < jsparse.length; i++) {
                            document.getElementById("proximo-departamento").value = jsparse[i].Name;
                        }
                    },
                    error: function () {
                        alert("Error");
                    }
                });
            }
        },
        error: function () {
            alert("Error");
        }
    });
}


//IMPORTACIÓN NUMEROS DE RECOGIDA pendientes de recepcionar >>> Desplegable y Array de verificación
var importarPickUpsIds = () => {
    var RecogidaNoRecibida = 0;
    window.pickups = [];
    window.stringpickups;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",  //dirección del servidor
        data: {
            Received: RecogidaNoRecibida,
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            //Creamos los 'option' del select
            const $datalist = document.getElementById("pickup-number")
            var option;
            var valor;
            for (var i = 0; i < jsparse.length; i++) {
                option = document.createElement('option');
                valor = jsparse[i].PickUp_ID;
                pickups.push(valor);
                option.value = valor;
                $datalist.appendChild(option);
            }
            stringpickups = pickups.toString();
        },
        error: function () {
            alert("Error");
        }
    });
    return window.stringpickups;
}

//IMPORTAR TIPOS DE EMBALAJE >>> Select
var importarTiposEmbalaje = () => {
    var Activo = 1;
    $.ajax({
        type: "POST",
        url: "../PHPServidor2.php",
        data: {
            ActivePackage: Activo
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);

            //Creamos los 'option' del select
            const $select = document.getElementById("package-type")
            //Borramos los anteriores
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
                    texto = "Elija una tipo de embalaje";
                } else {
                    valor = jsparse[i].PackageType_ID;
                    texto = jsparse[i].Description;
                }
                option.value = valor;
                option.text = texto;
                $select.appendChild(option);
                //.log("Select: " + valor + "-" + texto);
            }
        },
        error: function () {
            alert("Error");
        }
    });
}


//IMPORTAR LOCKER LIBRE
var obtenerLocker = (tipo) => {
    var Tipo = tipo;
    var status = 0;
    $.ajax({
        type: "POST",
        url: "../PHPServidor.php",
        data: {
            PackageType: Tipo,
            Status: status
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            /* .log(jsparse[0].Locker_ID) */
            document.getElementById("locker-recepciones").value = jsparse[0].Locker_ID;
        },
        error: function () {
            alert("Error");
        }
    });
}







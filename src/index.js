const open2 = document.getElementById('open2');
const modal_container2 = document.getElementById('modal_container2');
const close2 = document.getElementById('close2');

//VENTANA MODAL. Insertamospara indicar nº cliente
open2.addEventListener('click', () => {
    modal_container2.classList.add('show');
     document.getElementById("usuario").focus();
    document.getElementById("open2").style.visibility = "hidden";
});

//CANCELACION DEL FORMULARIO. Sale al principio (No deja volver a acceder al formulario)
var cancel = () => {
    window.location.replace("./index.html");
}

close2.addEventListener('click', () => {
    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;

    importarUsuarios(usuario, password);    //Pasamos los datos a la función para compararlos
    
    if (document.getElementById("confirmuserpassword")) {
        
        document.getElementById("seccionbienvenida").style.visibility = "visible";
        modal_container2.classList.remove('show');
        document.getElementById("lineaencabezado").style.visibility = "hidden";
        document.getElementById("indexmenu").style.visibility = "visible";
          
    } else {
        alert("Usuario o contraseña incorrectos");
        usuario = document.getElementById('usuario').value = "";
        password = document.getElementById('password').value = "";
        document.getElementById("usuario").focus();
    }
});

//IMPORTACIÓN DE USUARIOS >>> Array de verificación
var importarUsuarios = (user, pass) => {
    var Activo = 1;
    $.ajax({
        type: "POST",
        url: "./PHPServidor.php",
        data: {
            UsuarioActivo: Activo
        },
        success: function (response) {
            var index = response.indexOf("[");
            var json = response.substring(index, response.length);
            var jsparse = JSON.parse(json);
            for (var i = 0; i < jsparse.length; i++) {
                if (jsparse[i].User == user && jsparse[i].Password == pass) {
                    document.getElementById("confirmuserpassword").value = true;
                    document.getElementById("username").value = jsparse[i].Name;
                    document.getElementById("confirmuser").value = jsparse[i].User;
                    //document.getElementById("nombreusuario").value = jsparse[i].User_ID;
                    borrarUsuarioActivo(jsparse[i].User_ID);
                    guardarUsuarioActivo(jsparse[i].User_ID); 
                }
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

var borrarUsuarioActivo = (iduser) => {
    var id = iduser;
    $.ajax({
        type: "POST",
        url: "./PHPServidor3.php",
        data: {
            UserIDDel: id
        },
        success: function (response) {
        },
        error: function () {
            alert("Error");
        }
    });
}

var guardarUsuarioActivo = (iduser) => {
    var id = iduser;
    $.ajax({
        type: "POST",
        url: "./PHPServidor3.php",
        data: {
            UserID: id
        },
        success: function (response) {
            console.log(">>> usuario registrado")
        },
        error: function () {
            alert("Error");
        }
    });
}


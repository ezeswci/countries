//Not using jQuery because this is a special event for phonegap
//If not firing with this event, phonegap plugins don't work
//
//<button onclick="window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl')">message, subject, image and link</button> kl
function sendMail() {
	window.plugins.socialsharing.share('¡Te recomiendo esta aplicación, Mi Club House!', ' Club House optimiza 4 pilares básicos del funcionamiento asociados con toda comunidad privada. Cuenta con 4 funcionalidades: 1) un botón anti pánico en caso de asalto en la vivienda, 2) un sistema de autorización para el ingreso de invitados, 3) un tab de novedades que permite al usuario estar actualizado con la vida cotidiana del barrio, y 4) un gestor de reservas de instalaciones deportivas/sociales. Pedi que sea implementada en tu comunidad privada y descargala de los stores');
}
function abrirVentana(ventana) {
    if (ventana == "1") {
        document.getElementById("cartel").style.visibility = "visible";
        document.getElementById("fondo_negro").style.visibility = "visible";
    } else {
        document.getElementById("cartel2").style.visibility = "visible";;
        document.getElementById("fondo_negro").style.visibility = "visible";
    }

}

function cerrarVentana() {
    document.getElementById("cartel").style.visibility = "hidden";
	document.getElementById("cartel2").style.visibility = "hidden";
    document.getElementById("fondo_negro").style.visibility = "hidden";

}

function initClickCB() {
    $("#amigo").click(sendMail);
    $("#x").click(cerrarVentana);

}
function alerta(txt){
var iframe = document.createElement("IFRAME");
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(txt);
iframe.parentNode.removeChild(iframe);
}
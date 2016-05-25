//Not using jQuery because this is a special event for phonegap
//If not firing with this event, phonegap plugins don't work
//
//<button onclick="window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl')">message, subject, image and link</button> kl
function shareWhatsApp() {
	var whatsapp = document.createElement("a");
		whatsapp.href='whatsapp://send?text=¡Te%20recomiendo%20esta%20aplicación%20Mi%20Club%20House!\nClub%20House%20optimiza%204%20pilares%20básicos%20del%20funcionamiento%20asociados%20con%20toda%20comunidad%20privada.%20Cuenta%20con%204%20funcionalidades:%201)%20un%20botón%20anti%20pánico%20en%20caso%20de%20asalto%20en%20la%20vivienda,%202)%20un%20sistema%20de%20autorización%20para%20el%20ingreso%20de%20invitados,%203)%20un%20tab%20de%20novedades%20que%20permite%20al%20usuario%20estar%20actualizado%20con%20la%20vida%20cotidiana%20del%20barrio,%20y%204)%20un%20gestor%20de%20reservas%20de%20instalaciones%20deportivas/sociales.%20Pedi%20que%20sea%20implementada%20en%20tu%20comunidad%20privada%20y%20descargala%20de%20los%20stores';
	whatsapp.setAttribute("data-tournament-type", "share/whatsapp/share");
	document.body.appendChild(whatsapp);
	whatsapp.click();
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
function alerta(txt){
var iframe = document.createElement("IFRAME");
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(txt);
iframe.parentNode.removeChild(iframe);
}
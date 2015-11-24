// JavaScript Document
	setTimeout(function(){mensajes();},10000);
function mensajes(){
	alert("Entra mensajes");
	setTimeout(function(){alerta();},10000);
	}
function alertDismissed() {
    // do something
	alert("Dismissed");
}
function alerta(){
cordova.plugins.notification.local.schedule({
    title: "New Message",
    message: "Hi, are you ready? We are waiting."
});
}
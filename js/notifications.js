// JavaScript Document
	setTimeout(function(){mensajes();},10000);
function mensajes(){
	alert("Entra mensajes");
	setTimeout(function(){alerta();},10000);
	setTimeout(function(){alertas();},20000);
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
function alertas(){
window.plugin.notification.local.add({
    id:         1,
    message:    'I love BlackBerry!',
    json:       JSON.stringify({ test: 123 })
});
}
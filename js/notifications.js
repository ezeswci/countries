// JavaScript Document
	setTimeout(function(){mensajes();},10000);
function mensajes(){
	alert("Entra mensajes");
	setTimeout(function(){alertas();},10000);
	setTimeout(function(){alertas();},20000);
	}
function alertDismissed() {
    // do something
	alert("Dismissed");
}
function alertas(){
window.plugin.notification.local.add({
    id:         1,
    message:    'I love BlackBerry!',
    json:       JSON.stringify({ test: 123 })
});
}

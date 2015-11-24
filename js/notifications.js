// JavaScript Document
	setTimeout(function(){mensajes();},10000);
function mensajes(){
	alert("Entra mensajes");
	setTimeout(function(){alerta();},10000);
	setTimeout(function(){alertaConfirm();},20000);
	setTimeout(function(){alertaConfirmOp();},30000);
	setTimeout(function(){mensajes();},50000);
	}
function alertDismissed() {
    // do something
	alert("Dismissed");
}
function alerta(){
navigator.notification.alert(
    'You are the winner!',  // message
    alertDismissed,         // callback
    'Game Over',            // title
    'Done'                  // buttonName
);
}
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}
function alertaConfirm(){
navigator.notification.confirm(
    'You are the winner!', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Game Over',           // title
    ['Restart','Exit']     // buttonLabels
);
}
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}
function alertaConfirmOp(){
navigator.notification.prompt(
    'Please enter your name',  // message
    onPrompt,                  // callback to invoke
    'Registration',            // title
    ['Ok','Exit'],             // buttonLabels
    'Jane Doe'                 // defaultText
);

navigator.notification.beep(2);
}
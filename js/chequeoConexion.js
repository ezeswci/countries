// JavaScript Document
function checkConnection() {
var state = navigator.connection.type;
/*if (state == window.Connection.NONE)
{
    // doesn't have internet, notify
	return false;
}
else
{
    // has internet, continue work accessing internet
	return true;
}*/
	return true;// Prueba interna 
    //alert('Connection type: ' + states[networkState]);
}

function checkConnectionControl() {
var state = navigator.connection.type;
alert(state);
alert(state.join('\n'));
if (state == window.Connection.NONE)
{
    // doesn't have internet, notify
	alert("Sin");
}
else
{
    // has internet, continue work accessing internet
	alert("Con");
}
	return true;// Prueba interna 
    //alert('Connection type: ' + states[networkState]);
}
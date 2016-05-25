// JavaScript Document
window.internetCheckedSlow=0;
function checkConnection() {
	if(!window.simulacion){
		var state = navigator.connection.type;
		if (state.toUpperCase() == "NONE")
		{
			//avisoEmergenteJugaPlay("Sin conexión","<p>No se encontró una conexión a internet.</p>");
			//closeLoadingAnimation();
			return false;
		}
		else
		{
			//window.timeToWait = setTimeout(function(){ toSlowInternet(); }, 40000);
			return true;
		}
	}else{
		return true;
	}
}
function stopTimeToWait(){
	clearTimeout(window.timeToWait);
}
function checkIfToSlowInternet(){
	window.timeToWait = setTimeout(function(){ toSlowInternet(); }, 30000);
}
function toSlowInternet(){
	// Mensaje de aviso mas corta el loading
	cerrarTodo();
	alert("Su conexión a internet está muy lenta.Intente en otro momento");
	//avisoEmergenteJugaPlayMalInternet("Conexión muy lenta","<p>Su conexión a internet está muy lenta. Es posible que no pueda disfrutar la experiencia Jugaplay debido a esta causa.</p>");
}
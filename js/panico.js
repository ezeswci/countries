// JavaScript Document
//window.passestado; 0- apagado 1-prendido 2-simulado 
/*
document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
	cordova.plugins.backgroundMode.enable();
}, false);
window.onload=verificarPanico();
function verificarPanico(){
	if (window.passestado==1){
		document.getElementById("img_panic").src="img/boton_parar.jpg";
		activarPanicoRevision();
		}else{
			if(window.passestado==2){
			activarPanicoRevision();
		}}
}*/
if(!window.simulacion){
document.addEventListener('deviceready', function () {
    // Analytics para club House
	window.analytics.startTrackerWithId('UA-69244682-1');// Analytics para club house
	window.analytics.trackView('OP-Alerta');
}, false);
}
function apretoPanico(elemento){
	if(elemento.src.indexOf("boton_empezar")!=-1){
		elemento.src="img/boton_parar.jpg";
		posiblidadCancelarPanico();
		setTimeout(function(){desactivarPanico(elemento);},6000);
		activarPanico();
		if(!window.simulacion){window.analytics.trackEvent('Panico', 'Apreto Boton panico', 'alerta', 1);}
		
	}
}
function desactivarPanico(elemento){
	elemento.src="img/boton_empezar.jpg";
	detenerPanico();
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}

function detenerPanico(){
	//dejarDeTrasmitirGps();
	
}
function activarPanico(){
	//empezarATrasmitirGps();
	//estadoDePanico(1);
	//enviarMensajes();
	//if(window.llamadaSecreta==1){startAudioRec();}
	//if(cordova.plugins.backgroundMode.isEnabled()!=true){cordova.plugins.backgroundMode.enable();}
	enviarMensajeServidor();
	//salidaMagica();
	//document.location.href = 'tel:+01148127101';
}
/*
function activarPanicoRevision(){
	empezarATrasmitirGps();
	//estadoDePanico(1);
	//if(window.llamadaSecreta==1){startAudioRec();}
	if(cordova.plugins.backgroundMode.isEnabled()!=true){cordova.plugins.backgroundMode.enable();}
	//document.location.href = 'tel:+01148127101';
}*/
function posiblidadCancelarPanico(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
	setTimeout(function(){cerrarAviso();},5000); 
}
function cerrarAviso(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}
function enviarMensajeServidor(){
	//alert ("entre a actualizar un invitado:"+inv_id);
	crearAlerta();
	var lot_usu=window.lotUsuId;
	var usu_udid=window.udid;
	var ipSend=window.sis_ip;
	if(checkConnection()){
		//var lot=window.lotUsuId;
		var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			value=parseInt(xmlhttp.responseText);
			borrarAlerta();
			//alert("devuelto:"+value+" Tengo:"+inv_estado);
	    }
	 	 }
		xmlhttp.open("POST",ipSend+"activar_alerta.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("lot_usu="+lot_usu+"&usu_udid="+usu_udid);
		}
		else{
			setTimeout(function(){enviarMensajeServidor();},3000); 
		}
}
function avisarError(){
	//alert ("entre a actualizar un invitado:"+inv_id);
	if(!window.simulacion){window.analytics.trackEvent('Panico', 'Apreto Boton error', 'alerta', 1);}
	borrarAlerta();
	var ipSend=window.sis_ip;
	cerrarAviso();
	var lot_usu=window.lotUsuId;
	var usu_udid=window.udid;
	if(checkConnection()){
		//var lot=window.lotUsuId;
		var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			value=parseInt(xmlhttp.responseText);
			//alert("devuelto:"+value+" Tengo:"+inv_estado);
	    }
	 	 }
		xmlhttp.open("POST",ipSend+"cancelar_alerta.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("lot_usu="+lot_usu+"&usu_udid="+usu_udid);
		}
		else{
			setTimeout(function(){cancelarAlerta();},5000); 
		}
}
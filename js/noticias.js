// JavaScript Document
window.noticias=new Array();
window.ultActulizacion=0;
if(!window.simulacion){
document.addEventListener('deviceready', function () {
    // Analytics para club House
	window.analytics.startTrackerWithId('UA-69244682-1');// Analytics para club house
	window.analytics.trackView('OP-Novedades');
}, false);
}


$(document).ready(onDeviceReady);

function onDeviceReady() {
    var dbSize = 20000000;// 20mb
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   	window.db.transaction(initDB, errorCB, successCB);
	notBack();

}

function initDB(tx) {
	//(no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif)
    tx.executeSql('CREATE TABLE IF NOT EXISTS NOTICIAS (no_id , no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif  )');// Inivtados estado 0-enviado 1-recibido 2-entro 3-cancelado 4-no aparece entro 5- no aparece canceldo
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    //alert("Success!");
    //Select query
    //
	db.transaction(selectLotUsuId, errorCB);
	db.transaction(selectNoticias, errorCB);
	
}
function selectLotUsuId(tx) {
    tx.executeSql('SELECT * FROM LOT_USU', [], querySuccessUsuId, errorCB);
}
function querySuccessUsuId(tx, rs) {
    // this will be empty since no rows were inserted.

    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		window.lotUsuId=p.lu_id;
		window.sis_ip=p.sis_ip;
		window.sis_tabs=p.sis_tabs.split("/");
		window.sis_ult_avi=p.sis_ult_avi;
		cargoOpcionesDeMenu();
    }
}
function cargoOpcionesDeMenu(){
	// sis_tabs son los tabs que el country tiene disponibles Noticias - visitas- emergencias - reservas
	/*if(window.sis_tabs[0]==0){ document.getElementById("botNoticiasFoot").style.display="none";}
	if(window.sis_tabs[1]==0){ document.getElementById("botInvitadosFoot").style.display="none";}
	if(window.sis_tabs[2]==0){ document.getElementById("botEmergenciasFoot").style.display="none";}
	if(window.sis_tabs[3]==0){ document.getElementById("botReservasFoot").style.display="none";}*/
}

function selectNoticias(tx) {
    tx.executeSql('SELECT * FROM NOTICIAS ORDER BY no_prio, no_modif DESC', [], querySuccess, errorCB);
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	window.noticias=new Array();// Esta es la consulta de todos los invitados tal cual la mostramos.
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		window.noticias[i]={titulo:p.no_titulo, foto:p.no_img, resumen:p.no_copete,  descript:p.no_contenido, tipo:p.no_tipo, id:p.no_id};
		guardoFechaMasGrande(p.no_modif);
    }
	mostrarNoticias();
}

function mostrarNoticias(){
	//alert("Entre a mostrarNoticias");
	if(document.getElementById("contiene_noticias")!=null){
	var texto=" ";
	var primero=0;
	for (var b in window.noticias){ 
	
		if(primero!=0){
	   texto +='<div class="noticias" onclick="openNoticia('+b+')"><div class="not_img" style="background-image:url('+window.noticias[b].foto+'); background-size: cover;"></div><div class="titulo" > '+window.noticias[b].titulo+'</div><div class="copete">'+window.noticias[b].resumen+'</div></div><div class="separador"></div>';
	   }else{
		   primero=1;
		   texto +='<div class="noticias" onclick="openNoticia('+b+')"><div class="primera_titulo" > '+window.noticias[b].titulo+'</div><div class="primera_img" style="background-image:url('+window.noticias[b].foto+'); background-size: cover;"></div></div><div class="separador"></div>';
   }
   }
   document.getElementById("contiene_noticias").innerHTML=texto;
   if(window.actulizadaNovedades==0){
   window.actulizadaNovedades=1;
   setTimeout(function(){actualizarNovedades();},3000);}
   }
	else{ setTimeout(function(){mostrarNoticias();},50);}
}
function openNoticia(cual){
	if(!window.simulacion){window.analytics.trackEvent('Noticia', 'Abre noticia', window.noticias[cual].titulo, 1);}
	texto='<div class="header"><div class="titulo">'+window.noticias[cual].tipo+'</div></div><div class="contenidos"><div class="contenedor_fondo" style="background-image:url('+window.noticias[cual].foto+');"></div><div class="corredor_noticia"><div class="noticia"><H1>'+window.noticias[cual].titulo+'</H1><H3>'+window.noticias[cual].resumen+'</H3><div class="texto">'+window.noticias[cual].descript+'</div></div></div> <!--        CALENDARIO / RELOJ      --></div><div class="footer" style="z-index:25;"><a onclick="cerrarPopUp();"><img src="img/cerrar.png" width="135" height="135" /></a></div>';
	//texto='<div class="scroll"><div class="titulo"><p>'+window.noticias[cual].titulo+'</p></div><img src="'+window.noticias[cual].foto+'" class="ppal" /><div class="content"><p>Noticia: <span>'+window.noticias[cual].descript+'</span></p></div></div><div class="botones"><div onclick="cerrarPopUp();" class="boton_unico aceptar"><p>ACEPTAR</p></div></div>';
	document.getElementById("cartelNoticias").innerHTML=texto;
	document.getElementById("cartelNoticias").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function cerrarPopUp(){
	document.getElementById("cartelNoticias").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
	document.getElementById("cartelNoticias").innerHTML=" ";
}
function guardoFechaMasGrande(no_modif){
	if(window.ultActulizacion==0){
		window.ultActulizacion=no_modif;
	}else{
		fechaActual=window.ultActulizacion.substr(8,2)+'/'+window.ultActulizacion.substr(5,2)+'/'+window.ultActulizacion.substr(0,4)+' '+window.ultActulizacion.substr(11,8);
		fechaNueva=no_modif.substr(8,2)+'/'+no_modif.substr(5,2)+'/'+no_modif.substr(0,4)+' '+no_modif.substr(11,8);
		var Time1 = new Date(fechaActual);
		var Time2 = new Date(fechaNueva);
		if(Time1<Time2){
			//alert("comparo: "+fechaActual+'-'+Time1+'--- Con: '+fechaNueva+'-'+Time2+'--- segunda mas grande ');
			window.ultActulizacion=no_modif;
		}else{
			//alert("comparo: "+fechaActual+'-'+Time1+'--- Con: '+fechaNueva+'-'+Time2+'--- Primera mas grande ');
		}
	}
	//window.ultActulizacion=0;
	//2015-11-09 12:29:50 p.no_modif
	//0123-56-89-12345678
	//var Time1 = new Date("04/12/2013 01:03:00");
}
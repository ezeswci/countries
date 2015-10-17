// JavaScript Document
window.premios=new Array();
window.onload=cargarPremios()

function cargarPremios(){
	window.premios[0]={titulo:"Torneo Futbol", foto:"img/productos/futbol.jpg", resumen:"Este fin de semana arranca la temporada de futbol intercountry",  descript:"Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut labore et dolore.Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut labore et dolore.Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut labore et dolore.Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut labore et dolore.Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[1]={titulo:"Padres e Hijos", foto:"img/productos/golf.jpg", resumen:"Sabado 18/8 Torneo en la cancha 9, inscripciones abiertas",  descript:"Aca va la noticia, con los detalles de la misma, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[2]={titulo:"Polo", foto:"img/productos/polo.jpg", resumen:"Conozca los partidos que se vienen, horarios y demas",  descript:"Aca va la noticia, con los detalles de la misma, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[3]={titulo:"Padel", foto:"img/productos/padel.jpg", resumen:"Todos los sabados y domingos, clases gratis a las 16Hs",  descript:"Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, consectetur tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[4]={titulo:"Entrega de Premios", foto:"img/productos/premios.jpg", resumen:"Entrega de premios en el house principal",  descript:"Aca va la noticia, con los detalles de la misma, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[5]={titulo:"Squash", foto:"img/productos/squash.jpg", resumen:"Se viene el torneo de squash interno, no olvides que tenes hasta el 20/8 para anotarte",  descript:"Aca va la noticia, con los detalles de la misma, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	
	mostrarPremios();
}
function mostrarPremios(){
	//alert("Entre a agregar agenda");
	if(document.getElementById("contiene_premios")!=null){
	var texto=" ";
	for (var b in window.premios) {
	   texto +='<div class="prize-box" onclick="openProducto('+b+')"><div class="titulo">'+window.premios[b].titulo+'</div><img src="'+window.premios[b].foto+'"/><div class="resumen"><p>'+window.premios[b].resumen+'</p></div></div>';
   }
   document.getElementById("contiene_premios").innerHTML=texto;}else{
	   setTimeout(function(){mostrarPremios();},50);
   }
}
function openProducto(cual){
	texto='<div class="scroll"><div class="titulo"><p>'+window.premios[cual].titulo+'</p></div><img src="'+window.premios[cual].foto+'" class="ppal" /><div class="content"><p>Noticia: <span>'+window.premios[cual].descript+'</span></p></div></div><div class="botones"><div onclick="cerrarPopUp();" class="boton_unico aceptar"><p>ACEPTAR</p></div></div>';
	document.getElementById("cartel").innerHTML=texto;
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function cerrarPopUp(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
	document.getElementById("cartel").innerHTML=" ";
}
function canjeProducto(cual){
	if(window.monedas>=window.premios[cual].precio){
	window.monedas=window.monedas-window.premios[cual].precio;
	cargarCanje(cual);
	actualizarBilletera();
	cargarMonedas();
	canjeado(cual);
	}else{
		insuficientes(cual);
	}
}
function insuficientes(cual){
	texto='<div onclick="cerrarPopUp();" id="x"><img src="img/x.jpg" width="35" height="35" /></div><div class="titulo">Monedas insuficientes</div><div class="content"><p>el VALOR del premio es de:&nbsp;&nbsp;&nbsp;'+window.premios[cual].precio+' <img src="img/estrella.png" /></p><p>No le alcanzan sus monedas para adquirir este premio:</p></div><div class="botones"><div onclick="cerrarPopUp();" class="boton_unico">ACEPTAR</div></div>';
	document.getElementById("cartel").innerHTML=texto;
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function canjeado(cual){
	texto='<div onclick="cerrarPopUp();" id="x"><img src="img/x.jpg" width="35" height="35" /></div><div class="titulo">CANJEADO</div><div class="content"><p>El premio fue canjeado, encontrara el mismo en el sector de CANJES. Puede cambiar el mismo en las sucursales presentando el codigo QR</p></div><div class="botones"><div onclick="cerrarPopUp();" class="boton_unico">ACEPTAR</div></div>';
	document.getElementById("cartel").innerHTML=texto;
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function cargarCanje(cual){
	alert(cual);
	window.cualCanje=cual;
	window.db.transaction(insertDB, errorCB, successCB);
}
function insertDB(tx) {
	tx.executeSql('INSERT INTO CANJES (ca_pr, ca_canjeado) VALUES ('+window.cualCanje+',0)');
}
function actualizarBilletera(){
	window.db.transaction(terminarRondaEx, errorCB);
}
function terminarRondaEx(tx) {
	valor=parseInt(window.monedas)
    tx.executeSql("UPDATE USUARIOS SET usu_monedas ='"+valor+"'  WHERE rowid =1  ;", [],   errorCB, successCB);
}
function errorCB(){}
function successCB(){}
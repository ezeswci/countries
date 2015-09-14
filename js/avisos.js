// JavaScript Document
window.premios=new Array();
window.onload=cargarPremios()

function cargarPremios(){
	window.premios[0]={titulo:"Reunion de Socios", foto:"img/productos/tango.jpg", resumen:"Tema a tratar, aumento en la seguridad",  descript:"Aca va la noticia, con los detalles de la misma, L e et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[1]={titulo:"Multas velocidad", foto:"img/productos/multas.jpg", resumen:"Tiene una multa por exceso de velocidad",  descript:"Aca va la noticia, con los detalles de la misma, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[2]={titulo:"Cambio Cancha", foto:"img/productos/polo.jpg", resumen:"Juega en la cancha 4, la 6 esta cerrada por reparaciones",  descript:"Aca va la noticia, con los detalles de la misma, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	window.premios[3]={titulo:"Expensas", foto:"img/productos/papel.jpg", resumen:"Detalle de las expensas",  descript:"Aca va alguna descripci&oacute;n del producto, Lorem ipsum dolor sit amet, consectetur tempor incididunt ut labore et dolore.", qr:"img/qr/qr.jpg", plus:"Este producto no tiene plus"};
	
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
	texto='<div onclick="cerrarPopUp();" id="x"><img src="img/x.jpg" width="35" height="35" /></div><div class="scroll"><div class="titulo">'+window.premios[cual].titulo+'</div><img src="'+window.premios[cual].foto+'" class="ppal" /><div class="content"><p>Noticia: <span>'+window.premios[cual].descript+'</span></p></div></div><div class="botones"><div onclick="cerrarPopUp();" class="boton_unico">ACEPTAR</div></div>';
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
// JavaScript Document
function explicarEmergencia(){
	//alert(id+titulo+contenido);
	id=Math.floor((Math.random() * 100000) + 1);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>Seguridad</p></div><div class="content"><p>El botón que se encuentra en el centro de la pantalla es un botón de pánico. Si uno hace clic sobre el mismo este manda un mensaje instantáneo a la guardia avisando que se encuentra en una situación de peligro.</p><p>En caso de error, cuenta con un mensaje pop up de 5 segundos para informar del mismo.</p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
function explicarNovedades(){
	//alert(id+titulo+contenido);
	id=Math.floor((Math.random() * 100000) + 1);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>Novedades</p></div><div class="content"><p>La sección de novedades está diseñada para ser simple e intuitiva. Haga clic sobre la novedad que desea leer y la misma se abrirá. Para cerrar la misma haga clic en la cruz que se encuentra debajo de la pantalla.</p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
function explicarVisitas(){
	//alert(id+titulo+contenido);
	id=Math.floor((Math.random() * 100000) + 1);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>Visitas</p></div><div class="content"><p>El gestor de visitas permite enviar autorizaciones directo a la guardia, así una vez que llega el invitado este ya está autorizado. Para enviar una autorización haga clic en agregar, que se encuentra arriba a la izquierda de la pantalla. Cargue los datos del invitado y apreté el botón verde!! </p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
function explicarReservas(){
	//alert(id+titulo+contenido);
	id=Math.floor((Math.random() * 100000) + 1);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>Reservas</p></div><div class="content"><p>El gestor de reservas permite reservar las distintas instalaciones simplemente usando el celular. Para realizar una reserva haga clic en agregar, que se encuentra arriba a la izquierda de la pantalla. Elija el tipo de reserva a realizar y luego podrá ver la disponibilidad de la misma. Si el horario se encuentra en gris es que está disponible, en caso contrario si está en bordo es que está reservado. </p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
function explicarComoUsar(){
	//alert(id+titulo+contenido);
	id=Math.floor((Math.random() * 100000) + 1);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>Como y Cuando</p></div><div class="content"><H1>Servicios Habilitados</H1><p>El servicio completo de Club House, ofrece –Novedades  -Visitas – Seguridad – Reservas . Cada countrie/barrios cerrados/otros contrata los servicios que considere conveniente para sus residentes por lo que es posible que no cuente con algún servicio. </p><H1>Novedades</H1><p>La sección de novedades está diseñada para ser simple e intuitiva. Haga clic sobre la novedad que desea leer y la misma se abrirá. Para cerrar la misma haga clic en la cruz que se encuentra debajo de la pantalla.</p><H1>Visitas</H1><p>El gestor de visitas permite enviar autorizaciones directo a la guardia, así una vez que llega el invitado este ya está autorizado. Para enviar una autorización haga clic en agregar, que se encuentra arriba a la izquierda de la pantalla. Cargue los datos del invitado y apreté el botón verde!!</p> <H1>Seguridad</H1><p>El botón que se encuentra en el centro de la pantalla es un botón de pánico. Si uno hace clic sobre el mismo este manda un mensaje instantáneo a la guardia avisando que se encuentra en una situación de peligro.</p><p>En caso de error, cuenta con un mensaje pop up de 5 segundos para informar del mismo.</p><H1>Reservas</H1><p>El gestor de reservas permite reservar las distintas instalaciones simplemente usando el celular. Para realizar una reserva haga clic en agregar, que se encuentra arriba a la izquierda de la pantalla. Elija el tipo de reserva a realizar y luego podrá ver la disponibilidad de la misma. Si el horario se encuentra en gris es que está disponible, en caso contrario si está en bordo es que está reservado.</p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
function terminosCondiciones(){
	//alert(id+titulo+contenido);
	id=Math.floor((Math.random() * 100000) + 1);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>Terminos y Condiciones</p></div><div class="content"><p> El usuario debe leer detenidamente estos t&eacute;rminos y condiciones antes de usar la aplicaci&oacute;n Mi Club House. La instalaci&oacute;n, uso o copia de esta aplicaci&oacute;n indica la confirmaci&oacute;n de que el usuario ha le&iacute;do, esta de acuerdo y acepta estos t&eacute;rminos y condiciones. Si el usuario no acepta estos t&eacute;rminos y condiciones, no debe instalar ni utilizar esta aplicaci&oacute;n.</br>Mi Club House es un programa de software (aplicaci&oacute;n) dentro del tel&eacute;fono celular, tableta o para su uso web, destinado a ser una herramienta que simplifica porcesos en los countries/barrios cerrados/otros. Los datos deber&aacute;n ser cargados manualmente. El funcionamiento del programa depende de: 1. la correcta descarga del software en el caso de dispositivos m&oacute;viles y de la adecuada conexi&oacute;n a internet en la versi&oacute;n web; 2. El correcto ingreso de la informaci&oacute;n por parte del usuario; 3. Del correcto funcionamiento del dispositivo y el sistema operativo donde se est&aacute; empleando, incluyendo el encendido, bater&iacute;a disponible y cualquier otro factor relacionado con el adecuado funcionamiento del celular, tableta o computadora. El usuario es el &uacute;nico responsable de la informaci&oacute;n cargada as&iacute; como del correcto funcionamiento del programa, siendo esta responsabilidad intransferible. Para dispositivos m&oacute;viles, el programa funciona y puede ser utilizado solamente con los sistemas operativos iOS 4.3 a 8 y Android 4.3. El uso del software no implica en ning&uacute;n caso el reemplazo o modificaci&oacute;n de las indicaciones brindadas por el m&eacute;dico tratante. El desarrollador se reserva el derecho en cualquier momento y sin previo aviso, de discontinuar el programa Mi Presi&oacute;n, como  as&iacute; tambi&eacute;n de discontinuar su actualizaci&oacute;n. Ni el desarrollador ni los patrocinadores, incluyendo directores, funcionarios y empleados, ser&aacute;n responsables en ning&uacute;n caso por cualquier tipo de p&eacute;rdida, lesi&oacute;n, daños, incluyendo pero no limit&aacute;ndose a daños personales, accesorios, especiales, indirectos o emergentes incluyendo sin ning&uacute;n tipo de limites, los daños por lucro cesante, por el deterioro o p&eacute;rdida de datos, la incapacidad de transmitir o recibir datos o informaci&oacute;n, por la interrupci&oacute;n o mal funcionamiento del software o bien por cualquier tipo de consecuencia del programa, resultantes o relacionados con el mal uso del programa, asi como de cualquier software o aplicaci&oacute;n de terceros que se utilicen junto con Mi Club House, como quiera que haya sido causado e independientemente de la teor&iacute;a de la responsabilidad civil (contractual o extracontractual u otros). El usuario no puede vender, ceder o de cualquier forma disponer del programa Mi Club House.</br>Todos los datos e informaci&oacute;n  que se ingresen y carguen en Mi Club House por el usuario, se encontrar&aacute;n almacenados en el dispositivo del usuario y en la base de Datos de los countries/barrios cerrados/otros. Solo la versi&oacute;n web para ser usada en las computadoras, ofrecer&aacute; al usuario ingresar su correo electr&oacute;nico y solo en el caso de que el usuario solicite una contraseña de acceso a Mi Club House, el desarrollador le otorgar&aacute; una transitroria que el usuario deber&aacute; modificar. En ning&uacute;n caso la informaci&oacute;n podr&aacute; ser empleada, por el desarrollador o el patrocinador.</p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
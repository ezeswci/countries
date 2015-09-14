// JavaScript Document window.passestado!=0 // Con esto se que tengo que mandar uno nuevo
window.deviceuuid=device.uuid;
window.grabacionsrc="";
function startAudioRec() {
	var date = new Date;
	var fecha = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds();
  var src = device.uuid+"rec"+fecha+".amr"; //ESTE ARCHIVO LO GUARDA EN EL DEVICE STORAGE
  window.grabacionsrc= src;
  window.audioRec = new Media(src, recordOnSuccess, recordOnError);
  window.audioRec.startRecord();
  setTimeout(function(){stopAudioRec();},30000);
}
function recordOnError() {}
function recordOnSuccess() {window.audioRec.release();checkIfFileExists(window.grabacionsrc);if(window.passestado!=0){startAudioRec();}}

function stopAudioRec() {
  window.audioRec.stopRecord();
}
function sendFile(src,contador) {
            var options = new FileUploadOptions();
			options.fileKey = "audio";
			options.fileName = src.substr(src.lastIndexOf('/') + 1);//Lleva el nombre con el que lo guardamos
			options.mimeType = "audio/AMR";
			options.httpMethod = "POST";
			options.chunkedMode = false;

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(src, encodeURI("http://www.swci.com.ar/audio/upload.php"), win, fail, options);
        }

        function win(r) {
			//alert("Se mando");
            //alert("Code = " + r.responseCode);
            //alert("Response = " + r.response);
            //alert("Sent = " + r.bytesSent);
        }

        function fail(error) {
            //alert("An error has occurred: Code = " + error.code);
            //alert("upload error source " + error.source);
            //alert("upload error target " + error.target);
        }
function checkIfFileExists(path){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, { create: false }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}
function fileExists(fileEntry){
    //alert("File " + fileEntry.fullPath + " exists! Te lo mando al server");
	//alert("Lo que le tiene que pasar para uploadear es esto: "+fileEntry.toURL());
	sendFile(fileEntry.toURL(),0);
}
function fileDoesNotExist(){
    //alert("file does not exist");
}
function getFSFail(evt) {
    //alert(evt.target.error.code);
}
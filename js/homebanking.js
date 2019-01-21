					//-------DECLARACION DE VARIABLES---------

//------Variables iniciales-----

var nombreUsuario = "Emiliano Atala",
	clave= "1234",
	saldoCuenta = 5000,
	saldoDolar=1000,
	limiteExtraccion = 1000;

//-------Variables HTML----------

var	inputCompraDolar = document.getElementById("compra-dolar"),
	inputVendeDolar = document.getElementById("vende-dolar"),
	iconoDolar = document.getElementById("selector-cuenta-dolar"),
	iconoPesos = document.getElementById("selector-cuenta-pesos"),
	divCompra = document.getElementById("caja-comprar"),
	divVenta = document.getElementById("caja-vender"),
	h3SaldoDolar = document.getElementById("saldo-dolar"),
	parrafoDolar = document.getElementById("parrafo-dolar"),
	saldoMaximo = document.getElementById("saldo-maximo");
	parrafoPesos = document.getElementById("parrafo-pesos"),
	h3SaldoPesos = document.getElementById("saldo-cuenta"),
	displayCompra = document.getElementById("cantidad-pesos-compra"),
	displayVenta = document.getElementById("cantidad-pesos-venta"),
	pLimExt = document.getElementById("limite-extraccion");

//----------Constantes----------

var agua=350,
	telefono=425,
	luz=210,
	internet=570,
 	cuentaAmiga1=1234567,	
	cuentaAmiga2=7654321;

//--------------EJECUCION DE FUNCIONES QUE ACTUALIZAN VARIABLES EN HTML-----------

iniciarSesion();

window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarSaldoDolarEnPantalla();
    actualizarLimiteEnPantalla();
}

//--------------FUNCIONES DEL MENU DE OPERACIONES----------------

function cambiarLimiteDeExtraccion() {

	if (usuarioIntruso()){}
	else if (regreseAPesos()){}
	else{
		var nuevoLimite = prompt("Ingrese nuevo limite de extraccion");
		if (verificacion(nuevoLimite)){}
		else{
			if (confirmar()){
				limiteExtraccion = parseFloat(nuevoLimite);
				actualizarLimiteEnPantalla();
				alert("Su nuevo limite de extracción es $" + nuevoLimite);
			}	
		}
	}
}

function extraerDinero() {

	if (usuarioIntruso()){}
	else if (regreseAPesos()){}
	else{
		var saldoAnterior = saldoCuenta,
		    extraccion = prompt("Ingrese Monto a Extraer");

		if (verificacion(extraccion)){}
		else if (saldoInsuficiente(extraccion, limiteExtraccion)) {
		 	alert("El monto ingresado supera el limite de extraccion");
		} 
		else if (saldoInsuficiente(extraccion, saldoCuenta)){
		 	 alertSaldoInsuficiente();
		}
		else if (extraccion % 100 != 0){
			alert("Solo puedes extraer billetes de $100");
		}
		else{
			if (confirmar()){
				saldoCuenta=saldoResta(saldoCuenta, extraccion);
				actualizarSaldoEnPantalla();
				alert(alertOperacion(saldoAnterior,"Extraccion",extraccion,saldoCuenta));

			}	
		}
	}
}

function depositarDinero() {

	if (usuarioIntruso()){}
	else if (regreseAPesos()){}
	else{
		var saldoAnterior = saldoCuenta,
		    deposito = prompt("Ingrese Monto a Depositar");

		if (verificacion(deposito)){}	
		else {
			if (confirmar()){
				saldoCuenta=saldoSuma(saldoCuenta,deposito);
				actualizarSaldoEnPantalla();
				alert(alertOperacion(saldoAnterior,"Deposito",deposito,saldoCuenta));
			}	
		}
	}
}

function pagarServicio() {

	if (usuarioIntruso()){}
	else if (regreseAPesos()){}
	else{
		var saldoAnterior = saldoCuenta,
		valor =  parseInt(prompt("Seleccione servicio a pagar \n1-Agua $300 \n2-Telefono $425 \n3-Luz $210 \n4-Internet $570"));
	
		switch(valor){
			case 1: 	if (confirmar()){
						if(saldoInsuficiente(agua, saldoCuenta)){
							alertSaldoInsuficiente();
						}
						else{
							saldoCuenta=saldoResta(saldoCuenta, agua);
							actualizarSaldoEnPantalla();
							alert("Has pagado el servicio de agua" + "\n"+alertOperacion(saldoAnterior,
								"Dinero descontado $",agua,saldoCuenta));
						}
					}
			break;

			case 2: if (confirmar()){
						if(saldoInsuficiente(telefono, saldoCuenta)){
							alertSaldoInsuficiente();
						}
						else{
							saldoCuenta=saldoResta(saldoCuenta, telefono);
							actualizarSaldoEnPantalla();
							alert("Has pagado el servicio de telefono" + "\n"+alertOperacion(saldoAnterior,
								"Dinero descontado $",telefono,saldoCuenta));	
						}
					}
			break;

			case 3: if (confirmar()){
						if(saldoInsuficiente(luz, saldoCuenta)){
							alertSaldoInsuficiente();
						}
						else{
							saldoCuenta=saldoResta(saldoCuenta, luz);
							actualizarSaldoEnPantalla();
							alert("Has pagado el servicio de luz" + "\n"+alertOperacion(saldoAnterior,
								"Dinero descontado $",luz,saldoCuenta));	
						}
					}				
			break;

			case 4: if (confirmar()){
						if(saldoInsuficiente(internet, saldoCuenta)){
							alertSaldoInsuficiente();
						}
						else{
							saldoCuenta=saldoResta(saldoCuenta, internet);
							actualizarSaldoEnPantalla();
							alert("Has pagado el servicio de internet" + "\n"+alertOperacion(saldoAnterior,
								"Dinero descontado $",internet,saldoCuenta)); 
						}
					}		
			break;

			default:
				alert("El servicio que desea pagar no esta disponible");	
		}
	}
}

function transferirDinero() {

	if (usuarioIntruso()){}
	else if (regreseAPesos()){}
	else{
		var transferencia = prompt("ingrese el monto que desea transferir");
		if (saldoInsuficiente(transferencia, saldoCuenta)){
			alert("No dispone de dinero suficiente en su cuenta");
		}
		else if (verificacion(transferencia)){}
		else {
			 var numeroCuenta = parseInt(prompt("Ingrese numero de cuenta a la que desea transferir dinero"));
			
		
			switch(numeroCuenta){
				case 1234567:if (confirmar()){
								saldoCuenta=saldoResta(saldoCuenta,transferencia);
								actualizarSaldoEnPantalla();
								alert("Se han transferido $" + transferencia +
					 	 		"\nNumero de Cuenta: " + numeroCuenta);
							}
				break
				case 7654321:if (confirmar()){
								saldoCuenta=saldoResta(saldoCuenta,transferencia);
								actualizarSaldoEnPantalla();
								alert("Se han transferido $" + transferencia +
					 	 		"\nNumero de Cuenta: " + numeroCuenta);
							}
				break
				default:
						alert("Solo puede transferir dinero a una cuenta amiga");		
			}		
		}
	}
}

function pantallaCompraVentaDolar(){

	if (usuarioIntruso()){}
	else{
		pantallaCompraDolar();
		actualizarSaldoDolarEnPantalla();
	}
}

function iniciarSesion() {
	var contraseña = prompt("Ingrese su contraseña")

	if (valorVacio(contraseña)){
		anularSaldos();
		alert("Hemos retenido su dinero por seguridad");		
	}
	else if (contraseña != clave){
		anularSaldos();
		alert("Su clave es incorrecta, hemos retenido su dinero por seguridad");
	}
	else if (contraseña == clave){
		alert("Hola " + nombreUsuario + ", " + "¡bienvenido/a al servicio de HomeBanking!");
	}
}


//----------DECLARACION DE FUNCIONES QUE ACTUALIZAN VARIABLES EN HTML---------


//Actualiza el nombre de usuario en pantalla
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

//Actualiza el saldo de pesos en pantalla
function actualizarSaldoEnPantalla() {
    h3SaldoPesos.innerHTML = "$ " + saldoCuenta;
    document.getElementById("saldo-maximo").innerHTML = "Tu saldo actual en pesos es $ "+ saldoCuenta;
}

//Actualiza el saldo de dolares en pantalla
function actualizarSaldoDolarEnPantalla() {
    h3SaldoDolar.innerHTML = "u$d " + saldoDolar;
}

//Actualiza el limite de extraccion en pantalla
function actualizarLimiteEnPantalla() {
    pLimExt.innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

//Muestra en tiempo real el saldo en $ necesario para comprar dolares
function displayDolarCompra(){
	var monto=parseFloat(inputCompraDolar.value),
		total = monto*28.50;
	if (limitaInput(inputCompraDolar,displayCompra,total)){}
	else if (isNaN(total)){
		total=0.00;
		displayCompra.innerHTML="$ " + total;	
	}
	else{
		displayCompra.innerHTML="$ " + total;	
	}
}

//Muestra en tiempo real el saldo en $ que se obtentran en la venta de dolares
function displayDolarVenta(){
	var monto= parseFloat(document.getElementById("vende-dolar").value),
		total =monto * 27;
	if (limitaInput(inputVendeDolar,displayVenta,total)){}
	else if (isNaN(total)){
		total=0.00;
		displayVenta.innerHTML="$ " + total;	
	}
	else {
		displayVenta.innerHTML="$ " + total;
	}	
}

/*--------------- DECLARACION DE FUNCIONES QUE ALERTAN,
				 VALIDAN O MODIFICAN DATOS DE VARIABLES------------------------*/

//Verifica si el usuario es un intruso
function usuarioIntruso(){
	if (nombreUsuario=="Intruso"){
		alert("Lo sentimos, Usted no tiene permitido realizar la operación");
		return true;
	}
}
//Resta el saldo de su cuenta 
function saldoResta(cuenta,descuento){
	cuenta = cuenta - parseFloat(descuento);
	return cuenta
}
function saldoSuma(cuenta,monto){
	cuenta = cuenta + parseFloat(monto);
	return cuenta
}

//Verifica si hay saldo disponible
function saldoInsuficiente(valorA, valorB){
	if (valorA > valorB){
		return true;
	}
}
//Alerta que no hy dinero suficiente
function alertSaldoInsuficiente(){
	alert("No dispone de suficiente dinero para realizar la operación");
}
//Verifica si los valores ingresados son invalidos
function verificacion(x){
	if(valorVacio(x)){
	return true	
	}
	else if (x<=0){
		alert("El monto ingresado debe ser mayor a $0");
		return true
	}	
}
//verifica que no ha ingresado ningun valor
function valorVacio(x){
	if(x==null){
		alert("No ha ingresado ningun valor");
		return true
	}
	else if (isNaN(x)){
		alert("Ha Introducido un valor invalido");
		return true
	}
}
//Anula todas las cuentas
function anularSaldos(){
	saldoCuenta= 0;
	saldoDolar=0;
	limiteExtraccion=0;
	nombreUsuario="Intruso";
}
//Confirma los propmt
function confirmar(){
	if (confirm("Desea confirmar la operacion")==true){
		return true
	}
}
//Verifica si esta en la pantalla de cuenta en pesos
function regreseAPesos(){
	if (document.getElementById("saldo-cuenta").style.display=="none"){
		alert("Debe estar en la Pantalla de cuenta en $ (pesos) para realizar la operacion");
		return true	
	}
}
// Muestra la operacion realizada
function alertOperacion(a,b,c,d){
		return "Saldo anterior $" + a +  
		"\n"+ b+" $" + c +
		"\nSaldo Actual $" + d
}
//Muestra la pantalla de Cuenta en pesos
function pantallaPesos(){
	iconoDolar.style.color="black";
	iconoPesos.style.color="#C0AC87";
	if (divCompra.style.display="block"){
		divCompra.style.display="none";
		divVenta.style.display="none";
		h3SaldoDolar.style.display="none";
		parrafoDolar.style.display="none";
		saldoMaximo.style.display="none";
		parrafoPesos.style.display="block";
		h3SaldoPesos.style.display="block";
		pLimExt.style.display="block";
		actualizarSaldoEnPantalla();
	}
}


//----------------FUNCIONES REFERIDAS A COMPRA-VENTA DE DOLARES---------


//Muestra pantalla para compra dolares	
function pantallaCompraDolar(){ 
	iconoDolar.style.color="#C0AC87";
	iconoPesos.style.color="black";
	if(divCompra.style.display="none"){
		divCompra.style.display="block";
		divVenta.style.display="block";
		h3SaldoDolar.style.display="block";
		parrafoDolar.style.display="block";
		saldoMaximo.style.display="block";
		parrafoPesos.style.display="none";
		h3SaldoPesos.style.display="none";
		pLimExt.style.display="none";
		inputCompraDolar.value="";
		inputVendeDolar.value="";
		displayCompra.innerHTML="$ 0.00";
		displayVenta.innerHTML="$ 0.00";
		actualizarSaldoDolarEnPantalla();

	}
}

//Muestra pantalla Cuenta en dolares
function pantallaDolar(){
	iconoDolar.style.color="#C0AC87";
	iconoPesos.style.color="black";
	if(h3SaldoPesos.style.display="block"||"none"){
		divCompra.style.display="none";
		divVenta.style.display="none";
		h3SaldoDolar.style.display="block";
		parrafoDolar.style.display="block";
		parrafoPesos.style.display="none";
		h3SaldoPesos.style.display="none";
		pLimExt.style.display="none";
		actualizarSaldoDolarEnPantalla();	
	}
}

//Ejecuta la funcion de venta de dolares
function ventaDolar(){
	var monto= parseFloat(inputVendeDolar.value),
		total = monto * 27;
	if(saldoInsuficiente(monto,saldoDolar)){
		alertSaldoInsuficiente();
	}
	else if (verificacion(monto)){}
	else{
		if (confirmar()){
			saldoCuenta = saldoSuma(saldoCuenta,total);
			saldoDolar =saldoResta(saldoDolar,total/27);
			actualizarSaldoEnPantalla();
			actualizarSaldoDolarEnPantalla();
			alert("Dolares vendidos u$d " + monto + 
				"\nSaldo en dolares u$d " + saldoDolar + 
				"\nSaldo en pesos $ "+ saldoCuenta);
		}
	}
}

//Ejecuta la funcion de compra de dolares
function compraDolar(){
	var monto=parseFloat(inputCompraDolar.value)
		total = monto *28.50;
	if(saldoInsuficiente(total,saldoCuenta)){
		alertSaldoInsuficiente();
	}
	else if (verificacion(monto)){}
	else{
		saldoCuenta=saldoResta(saldoCuenta,total);
		saldoDolar =saldoSuma(saldoDolar,total/28.5);
		actualizarSaldoEnPantalla();
		actualizarSaldoDolarEnPantalla();
		alert("Dolares comprados u$d " + monto + 
			"\nSaldo en dolares u$d " + saldoDolar + 
			"\nSaldo en pesos $ "+ saldoCuenta);
	}
}

function limitaInput(input,display,montoTotal){
	if (input.value.length>5) {
		input.value="";
		montoTotal=0.00;
		display.innerHTML="$ " + montoTotal;
		alert("Solo se permite introducir hasta 5 digitos")
		return true
	}
}


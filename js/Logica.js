class Logica {
    constructor(app) {
        //Setup proyecto
        this.app = app;
        this.app.createCanvas(1200, 700);

        //Variables Generales
        this.pantalla = 0;
        this.usuarioUno = "";
        this.usuarioDos = "";
        this.jugando = 0;
        this.puntosUno = 0;
        this.puntosDos = 0;
        this.ganador = "";
        this.ganadorPuntos = 0;
        this.perdedor = "";
        this.perdedorPuntos = 0;
        this.contador = 0;

        this.escribirUno = false;
        this.escribirDos = false;

        this.fuente = this.app.loadFont("./fonts/JosefinSans-Regular.ttf");
        this.termino = false;
        this.juguetes = [];
        this.encontrados = [];

        //Sonido
        this.app.soundFormats('mp3','wav');
        this.acertado = this.app.loadSound('./sonido/acertado.mp3');
        this.noacertado = this.app.loadSound('./sonido/noAcerto.mp3');
        
        //Varibles del tiempo
        this.mil = 0;
        this.seg = 0;
        this.min = 0;

        //Variables de las imagenes de las pantallas
        this.pantallas = {};
        this.pantallas.inicio = this.app.loadImage("./img/juego/inicio-100.jpg");
        this.pantallas.usuario = this.app.loadImage("./img/juego/usuario-100.jpg");
        this.pantallas.juego = this.app.loadImage("./img/juego/juego-100.jpg");
        this.pantallas.modal = this.app.loadImage("./img/juego/next-100.png");
        this.pantallas.final = this.app.loadImage("./img/juego/final-100.jpg");

        //Creo los juguetes
        this.letrasJuguetes = ["Telescopio", "Bloques", "Cámara", "Aeroplano", "Astronauta", "Avioneta", "Bailarina", "Barco", "Cometa", "Dragón amarillo", "Dragón sin alas", "Jirafa","Militar","Soldado rojo","Nube","Oso","Peluche de conejo","Pestañas","Pistola de agua","Rex","Robot","Soldado verde","Tambor","Transformer verde"];
        for (let i = 0; i < 24; i++) {
            this.juguetes[i] = new Juguete(this.app, this.app.random(10, 980), this.app.random(300, 600), this.app.loadImage("./img/juego/juguete" + i + ".png"), this.letrasJuguetes[i], i);
            console.log(typeof this.juguetes[i])
        }

    }

    pintar() {
        switch (this.pantalla) {

            //Pantalla de inicio
            case 0:
                //Pinto la pantalla
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.inicio, 0, 0);
                break;

                //Pantalla donde coloco los nombre de los usuario
            case 1:
                //Pinto la pantalla
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.usuario, 0, 0);

                //Escribo los nombres de los usuarios
                this.app.textFont(this.fuente);
                this.app.fill(55, 63, 88);
                this.app.textSize(30);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.usuarioUno, 160, 525);
                this.app.text(this.usuarioDos, 506, 525);
                break;

                //Pantalla de juego de usuario 1
            case 2:
                //Pinto la pantalla
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.juego, 0, 0);

                //Inicio el hilo del tiempo
                setInterval(this.tiempo(), 1000);

                //Tiempo de duración del juego
                var tiempo = 59 - this.seg;
                var tiempowith = tiempo;

                //Variable de control del jugador actual
                this.jugando = 1;

                //Pinto el tiempo
                this.app.textFont(this.fuente);
                this.app.fill(255, 255, 255);
                this.app.textSize(20);
                this.app.textAlign(this.app.CENTER);

                //Condicion para mostrar el tiempo en formato "00:00"
                if (tiempo < 10) {
                    tiempowith = "0" + tiempo;
                }

                //Pinto el puntaje
                this.app.text("00:" + tiempowith, 1163, 60);
                this.app.text(this.puntosUno, 1163, 114);

                //Pinto los juguetes
                for (let i = 0; i < this.juguetes.length; i++) {
                    this.juguetes[i].pintar();
                    this.juguetes[i].pintarPalabras();
                }

                //Control para saber cuando se termina el turno del jugador 1
                if ((tiempo <= 0 || this.puntosUno == 120) && this.termino == false) {
                    this.termino = true;
                    tiempowith = "0";
                    console.log("se acabo el tiempo")
                }

                //Reinicio variables al terminar turno del jugador 1
                if (this.termino || this.puntosUno == 120) {
                    this.app.imageMode(this.app.CORNER);
                    this.app.image(this.pantallas.modal, 0, 0);
                    this.mil = 0;
                    this.seg = 0;
                    this.min = 0;
                    tiempowith = "00";
                    tiempo = 0;

                    for (let i = 0; i < this.juguetes.length; i++) {
                        this.juguetes[i].setMostrar(true);
                    }
                }
                break;

                //Pantalla de Juego usuario 2
            case 3:
                //Pinto la pantalla
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.juego, 0, 0);

                //Inicio el hilo del tiempo
                setInterval(this.tiempo(), 1000);

                //Tiempo de duración del juego
                var tiempo = 59 - this.seg;
                var tiempowith = tiempo;

                //Variable de control del jugador actual
                this.jugando = 2;

                //Pinto el tiempo
                this.app.textFont(this.fuente);
                this.app.fill(255, 255, 255);
                this.app.textSize(15);
                this.app.textAlign(this.app.CENTER);

                //Condicion para mostrar el tiempo en formato "00:00"
                if (tiempo < 10) {
                    tiempowith = "0" + tiempo;
                }

                //Pinto el puntaje
                this.app.text("00:" + tiempowith, 1163, 60);
                this.app.text(this.puntosDos, 1163, 114);

                //Pinto los juguetes
                for (let i = 0; i < this.juguetes.length; i++) {
                    this.juguetes[i].pintar();
                    this.juguetes[i].pintarPalabras();
                }

                //Control para saber cuando el jugador 2 termina la partida
                if (tiempo <= 0 || this.puntosDos == 120) {
                    this.pantalla = 4;
                }
                break;

                //Pantalla final de resultados
            case 4:
                //Pinto la pantalla
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.final, 0, 0);

                //Conocer cuando un jugador ganó
                if (this.puntosUno > this.puntosDos) {
                    this.ganador = this.usuarioUno;
                    this.ganadorPuntos = this.puntosUno;
                    this.perdedor = this.usuarioDos;
                    this.perdedorPuntos = this.puntosDos;
                }

                if (this.puntosUno < this.puntosDos) {
                    this.ganador = this.usuarioDos;
                    this.ganadorPuntos = this.puntosDos;
                    this.perdedor = this.usuarioUno;
                    this.perdedorPuntos = this.puntosUno;
                }

                //Pinto los textos de los ganadores
                this.app.textFont(this.fuente);
                this.app.fill(255, 255, 255);
                this.app.textAlign(this.app.CENTER);
                this.app.textSize(30);
                this.app.text(this.ganador + " | " + this.ganadorPuntos + " Puntos", 348, 218);
                this.app.text(this.perdedor + " | " + this.perdedorPuntos + " Puntos", 348, 258);

                //Conocer si hay empate
                if (this.puntosUno == this.puntosDos) {
                    this.app.text("EMPATE", 348, 218);
                }
                break;
        }
    }

    click() {
        console.log(this.app.mouseX + " : " + this.app.mouseY);
        var x = this.app.mouseX;
        var y = this.app.mouseY;
        switch (this.pantalla) {
            case 0:
                //Paso a pantalla de colocar los nombres
                if (x >= 295 && x <= 420 && y >= 307 && y <= 383) {
                    this.pantalla = 1;
                    console.log("cambio");
                }
                break;

            case 1:
                //Escribir en el usuario 1
                if (x >= 49 && x <= 294 && y >= 489 && y <= 535) {
                    this.escribirUno = true;
                } else {
                    this.escribirUno = false;
                }

                //Escribir en el usuario 2
                if (x >= 378 && x <= 627 && y >= 486 && y <= 540) {
                    this.escribirDos = true;
                } else {
                    this.escribirDos = false;
                }


                //Paso a pantalla del juego
                if (x >= 637 && x <= 690 && y >= 478 && y <= 539) {

                    //Validar si los nombres estan llenos
                    if(this.usuarioUno != "" && this.usuarioDos != ""){
                        this.pantalla = 2;
                        console.log("cambio");
                        this.mil = 0;
                        this.seg = 0;
                        this.min = 0;
                    }else{
                        alert("Ups, falta un usuario")
                    }
                }
                break;


            case 2:
                //Interacción, cuando le doy click a un juguete lo oculto y sumo puntos en el usuario
                for (let i = 0; i < 24; i++) {
                    if (this.app.dist(this.juguetes[i].getX(), this.juguetes[i].getY(), x, y) < 30) {
                        //Si el usuario 1 esta jugando se le suman puntos 
                       
                        if (this.jugando == 1 && this.juguetes[i].getMostrar()) {
                            this.puntosUno += 5;
                            if(this.juguetes[i].getMostrar){
                                if(this.acertado){
                                    this.acertado.play();
                                }
                            }
                        }

                        //Si el usuario 2 esta jugando se le suman puntos
                        if (this.jugando == 2 && this.juguetes[i].getMostrar()) {
                            this.puntosDos += 5;
                            if(this.juguetes[i].getMostrar){
                                if(this.acertado){
                                    this.acertado.play();
                                }
                            }
                        }

                        //"Eliminar" juguetes del juego
                        if (this.juguetes[i].getMostrar()) {
                            this.juguetes[i].setMostrar(false);
                        }

                        console.log("Juguete Eliminado: " + i);
                    }
                }

                //Cuando el juego del usuario 1 acaba, cambio la pantalla del modal
                if (this.termino) {
                    if (x >= 567 && x <= 621 && y >= 414 && y <= 467) {
                        console.log("cambio");
                        for (let i = 0; i < 24; i++) {
                            this.juguetes[i] = new Juguete(this.app, this.app.random(10, 980), this.app.random(300, 600), this.app.loadImage("./img/juego/juguete" + i + ".png"), this.letrasJuguetes[i], i);
                            console.log(typeof this.juguetes[i])
                        }
                
                        this.pantalla = 3;
                    }
                }
                break;

            case 3:
                //Interacción, cuando le doy click a un juguete lo oculto y sumo puntos en el usuario
                for (let i = 0; i < 24; i++) {
                    if (this.app.dist(this.juguetes[i].getX(), this.juguetes[i].getY(), x, y) < 30) {
                        //Si el usuario 1 esta jugando se le suman puntos
                        if (this.jugando == 1 && this.juguetes[i].getMostrar()) {
                            this.puntosUno += 5;
                            if(this.juguetes[i].getMostrar){
                                if(this.acertado){
                                    this.acertado.play();
                                }
                            }
                        }

                        //Si el usuario 2 esta jugando se le suman puntos
                        if (this.jugando == 2 && this.juguetes[i].getMostrar()) {
                            this.puntosDos += 5;
                            if(this.juguetes[i].getMostrar){
                                if(this.acertado){
                                    this.acertado.play();
                                }
                            }
                        }

                        //"Eliminar" juguetes del juego
                        if (this.juguetes[i].getMostrar()) {
                            this.juguetes[i].setMostrar(false);
                        }
                        console.log("Juguete Eliminado: " + i);
                    }
                }
                break;

            case 4:
                //Cambio a pantalla inicial y reinicio todas las variables
                if (x >= 535 && x <= 614 && y >= 353 && y <= 425) {
                    this.pantalla = 0;
                    console.log("cambio");
                    this.mil = 0;
                    this.seg = 0;
                    this.min = 0;
                    this.termino = false;
                    this.usuarioUno = "";
                    this.usuarioDos = "";
                    this.jugando = 0;
                    this.puntosUno = 0;
                    this.puntosDos = 0;
                    this.ganador = "";
                    this.ganadorPuntos = 0;
                    this.perdedor = "";
                    this.perdedorPuntos = 0;
                    for (let i = 0; i < 24; i++) {
                        this.juguetes[i] = new Juguete(this.app, this.app.random(10, 980), this.app.random(300, 600), this.app.loadImage("./img/juego/juguete" + i + ".png"), this.letrasJuguetes[i], i);
                        console.log(typeof this.juguetes[i])
                    }
            
                }
                break;
        }
    }

    //Hilo para manejo del tiempo
    tiempo() {
        this.mil++;

        if (this.mil == 60) {
            this.seg++;
            this.mil = 0;
        }

        if (this.seg == 60) {
            this.min++;
            this.seg = 0;
        }
    }

    //Funcio donde escribo en la pantalla de colocar los nombre
    texto() {
        //Opcion para escribir dentro del campo de texto del usuario 1
        if (this.escribirUno) {
            this.usuarioUno += this.app.key;
        }

        //Opcion para escribir dentro del campo de texto del usuario 2
        if (this.escribirDos) {
            this.usuarioDos += this.app.key;
        }
    }
//Funcion donde se elimna los nombres
    eliminar(){
        //Opciones para eliminar texto dentro del campo del texto del usuario 1
        if(this.app.keyCode == this.app.BACKSPACE){
            if(this.escribirUno){
                this.contador -=1;
                this.usuarioUno = this.usuarioUno.slice(0,-1);
            }
                //Opciones para eliminar texto dentro del campo del texto del usuario 2
            if(this.escribirDos){
                this.contador -=1;
                this.usuarioDos = this.usuarioDos.slice(0,-1);
        }
        }
    }

}
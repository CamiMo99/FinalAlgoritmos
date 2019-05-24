class Logica {
    constructor(app) {
        this.app = app;
        this.app.createCanvas(1200, 700);

        this.pantalla = 0;
        this.mil = 0;
        this.seg = 0;
        this.min = 0;

        this.pantallas = {};
        this.pantallas.inicio = this.app.loadImage("./img/juego/inicio-100.jpg");
        this.pantallas.usuario = this.app.loadImage("./img/juego/usuario-100.jpg");
        this.pantallas.juego = this.app.loadImage("./img/juego/juego-100.jpg");
        this.pantallas.modal = this.app.loadImage("./img/juego/next-100.png");
        this.pantallas.final = this.app.loadImage("./img/juego/final-100.jpg");

        this.usuarioUno = "Daniel";
        this.usuarioDos = "Nicole";
        this.jugando = 0;
        this.puntosUno = 0;
        this.puntosDos = 0;
        this.ganador = "";
        this.ganadorPuntos =0;
        this.perdedor = "";
        this.perdedorPuntos = 0;

        this.fuente = this.app.loadFont("./fonts/JosefinSans-Regular.ttf");

        this.termino = false;
        this.juguetes = [];
        this.encontrados = [];

        //juguetes
        for (let i = 0; i < 24; i++) {
            this.juguetes[i] = new Juguete(this.app, this.app.random(10, 1100), this.app.random(300, 600), this.app.loadImage("./img/juego/juguete" + i + ".png"));
            console.log(typeof this.juguetes[i])

        }


    }

    pintar() {
        switch (this.pantalla) {

            //Pantalla de inicio
            case 0:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.inicio, 0, 0);
                break;

                //Pantalla donde coloco los nombre de los usuario
            case 1:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.usuario, 0, 0);
                this.app.textFont(this.fuente);
                this.app.fill(55, 63, 88);
                this.app.textSize(30);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.usuarioUno, 160, 525);
                this.app.text(this.usuarioDos, 506, 525);
                break;

                //Pantalla de juego de usuario 1
            case 2:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.juego, 0, 0);
                setInterval(this.tiempo(), 1000);
                var tiempo = 59 - this.seg;
                var tiempowith = tiempo;
                this.app.textFont(this.fuente);
                this.app.fill(255, 255, 255);
                this.app.textSize(15);
                this.app.textAlign(this.app.CENTER);
                this.jugando = 1;
                if (tiempo < 10) {
                    tiempowith = "0" + tiempo;
                }
                this.app.text("00:" + tiempowith, 1163, 47);
                this.app.text(this.puntosUno + " Puntos", 1163, 107);

                //Pinto los juguetes
                for (let i = 0; i < 24; i++) {
                        this.juguetes[i].pintar();
                }

                if ((tiempo <= 0 || this.puntosUno==120) && this.termino == false) {
                    this.termino = true;
                    tiempowith = "0";
                    console.log("se acabo el tiempo")
                }

                if (this.termino || this.puntosUno == 120) {
                    this.app.imageMode(this.app.CORNER);
                    this.app.image(this.pantallas.modal, 0, 0);
                    this.mil = 0;
                    this.seg = 0;
                    this.min = 0;
                    tiempowith = "00";
                    tiempo = 0;

                    for (let i = 0; i < 24; i++) {
                        this.juguetes[i].setMostrar(true);
                    }
                }
                break;

                //Pantalla de Juego usuario 2
            case 3:
            this.app.imageMode(this.app.CORNER);
            this.app.image(this.pantallas.juego, 0, 0);
            setInterval(this.tiempo(), 1000);
            var tiempo = 59 - this.seg;
            var tiempowith = tiempo;
            this.app.textFont(this.fuente);
            this.app.fill(255, 255, 255);
            this.app.textSize(15);
            this.app.textAlign(this.app.CENTER);
            this.jugando = 2;
            if (tiempo < 10) {
                tiempowith = "0" + tiempo;
            }
            this.app.text("00:" + tiempowith, 1163, 47);
            this.app.text(this.puntosDos + " Puntos", 1163, 107);

            //Pinto los juguetes
            for (let i = 0; i < 24; i++) {
                    this.juguetes[i].pintar();
            }

            if(tiempo<=0 || this.puntosDos==120){
                this.pantalla = 4;
            }
                break;

                //Pantalla final de resultados
            case 4:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas.final, 0, 0);

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


                this.app.textFont(this.fuente);
                this.app.fill(255, 255, 255);
                this.app.textAlign(this.app.CENTER);
                this.app.textSize(30);
                this.app.text(this.ganador + " | " + this.ganadorPuntos + " Puntos", 348, 218);
                this.app.text(this.perdedor + " | " + this.perdedorPuntos + " Puntos", 348, 258);

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
                if (x >= 295 && x <= 420 && y >= 307 && y <= 383) {
                    this.pantalla = 1;
                    console.log("cambio");
                }
                break;

            case 1:
                if (x >= 637 && x <= 690 && y >= 478 && y <= 539) {
                    this.pantalla = 2;
                    console.log("cambio");
                    this.mil = 0;
                    this.seg = 0;
                    this.min = 0;
                }
                break;


            case 2:
                //Juego

                for (let i = 0; i < 24; i++) {
                    if (this.app.dist(this.juguetes[i].getX(), this.juguetes[i].getY(), x, y) < 30) {
                        if (this.jugando == 1 && this.juguetes[i].getMostrar()) {
                            this.puntosUno += 5;
                        }

                        if (this.jugando == 2 && this.juguetes[i].getMostrar()) {
                            this.puntosDos += 5;
                        }

                        //"Eliminar" juguetes del juego
                        if(this.juguetes[i].getMostrar()){
                            this.juguetes[i].setMostrar(false);
                        }
                        console.log("Juguete Eliminado: " + i);
                   }
                }

                //Termino el juego
                if (this.termino) {
                    if (x >= 567 && x <= 621 && y >= 414 && y <= 467) {
                        console.log("cambio");
                        this.pantalla = 3;
                    }
                }
                break;

                case 3:
                for (let i = 0; i < 24; i++) {
                    if (this.app.dist(this.juguetes[i].getX(), this.juguetes[i].getY(), x, y) < 30) {
                        if (this.jugando == 1 && this.juguetes[i].getMostrar()) {
                            this.puntosUno += 5;
                        }

                        if (this.jugando == 2 && this.juguetes[i].getMostrar()) {
                            this.puntosDos += 5;
                        }

                        //"Eliminar" juguetes del juego
                        if(this.juguetes[i].getMostrar()){
                            this.juguetes[i].setMostrar(false);
                        }
                        console.log("Juguete Eliminado: " + i);
                   }
                }
                break;

            case 4:
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
                    this.ganadorPuntos =0;
                    this.perdedor = "";
                    this.perdedorPuntos = 0;
                }
                break;
        }
    }

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
}
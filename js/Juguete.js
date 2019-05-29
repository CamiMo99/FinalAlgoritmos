class Juguete {
    constructor(app, x, y, ima, palabra, pos) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.img = ima;
        this.punt = 5;
        this.mostrar = true;
        this.palabra = palabra;
        this.pos = pos;
    }

    pintar() {
        if(this.mostrar){
            this.app.fill(255, 0, 0);
            this.app.imageMode(this.app.CENTER);
            //this.app.circle(this.x, this.y, 30);
            this.app.image(this.img, this.x, this.y);
        }
    }

    pintarPalabras(){
        if(this.mostrar){
            this.app.fill(255,255,255);
            this.app.textAlign(this.app.RIGHT);
            this.app.text(this.palabra,1190, (23*this.pos)+160);
        }
    }

    getX (){
        return this.x;
    }

    getY (){
        return this.y;
    }

    getMostrar(){
        return this.mostrar;
    }
    setMostrar(e){
        this.mostrar = e;
    }

}
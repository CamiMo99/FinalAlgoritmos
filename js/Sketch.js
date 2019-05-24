new p5(function(app){
    let logica;
    app.setup=function(){
        logica=new Logica(app);
    }
    app.draw= function(){
        logica.pintar();
    }

    app.mouseClicked=function(){
        logica.click();
    }

    app.keyTyped = function (){
        logica.texto();
    }

    app.keyPressed =function(){
        logica.eliminar();
    }

});
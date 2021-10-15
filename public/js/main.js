var tempoInicial = $("#tempoDigitacao").text();
var campo = $(".campo-digitacao");

$(function(){

    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    botaoReiniciar();
    inicializaMarcadores();
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: "text",
      });

    $('.tooltip').tooltipster({

        trigger: "custom"

    });

});

function atualizaTamanhoFrase(){

    var frase = $(".frase").text();

    var numeroPalavras = frase.split(/\S+/).length -1;

    var tamanhoFrase = $("#tamanhoFrase");

    tamanhoFrase.text(numeroPalavras);

}

function atualizaTempoInicial(tempo){

    tempoInicial = tempo
    $("#tempoDigitacao").text(tempo);

}

function inicializaContadores(){

campo.on("input", function(){


    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length -1;
    $("#contadorDePalavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contadorDeCaracteres").text(qtdCaracteres);
    

});

}

function inicializaCronometro(){

    campo.one("focus", function (){

        var tempoRestante = $("#tempoDigitacao").text();

        var cronometroID = setInterval(function(){

            tempoRestante--;
            $("#tempoDigitacao").text(tempoRestante);
            if (tempoRestante <1){
                finalizaJogo(cronometroID);
            }
        },1000);



})

}

function botaoReiniciar(){

$("#botaoReiniciar").click(function(){

    campo.attr("disabled", false);
    campo.val("");
    $("#contadorDePalavras").text("0");
    $("#contadorDeCaracteres").text("0");
    $("#tempoDigitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("errado");
    campo.removeClass("certo")

});

}

function inicializaMarcadores(){
    
    campo.on("input", function(){
        
        var frase = $(".frase").text();

        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel){

            campo.addClass("certo");
            campo.removeClass("errado")

        }else{

            campo.addClass("errado");
            campo.removeClass("certo");

        }


})

}

function finalizaJogo(cronometroID){

    campo.attr("disabled", true);
    clearInterval(cronometroID);
    campo.toggleClass("campo-desativado");
    adicionaPlacar();


}

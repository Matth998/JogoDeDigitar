$("#botaoFrase").click(fraseAleatoria);
$("#botaoFraseId").click(fraseEscolhida);


function fraseAleatoria(){

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocarFrase)
    .fail(function(){

    $("#erro").toggle();
    
    setTimeout(function(){

            $("#erro").toggle();


        },2000)
        
    })
    .always(function(){

        $("#spinner").toggle();

    });

}

function trocarFrase(data){

    var frase = $(".frase");
    var numAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);

}

function fraseEscolhida(){

    $("#spinner").toggle();

    var fraseId = $("#fraseId").val();

    var dados = { id: fraseId};

    $.get("http://localhost:3000/frases", dados, escolheFrase).fail(function(){

        $("#erro").toggle();
    
    setTimeout(function(){

            $("#erro").toggle();


        },2000)
        
    })
    .always(function(){

        $("#spinner").toggle();

    });

}

function escolheFrase(data){

    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);

}


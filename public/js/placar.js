$("#botaoPlacar").click(mostraPlacar);
$("#botaoSync").click(sincronizaPlacar);


function mostraPlacar(){

    $(".placar").stop().slideToggle(800);


}

function adicionaPlacar(){


    var tabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contadorDePalavras").text();

    var linha = criarLinha(usuario, numPalavras);
    linha.find(".botaoRemove").click(removeLinha);

    tabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();

}

function criarLinha(usuario, numPalavras){

    var linha = $("<tr>");
    var colunaUser = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botaoRemove").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUser);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return(linha);


}

function removeLinha(){

        event.preventDefault();
        var linha =  $(this).parent().parent();

        linha.fadeOut();

        setTimeout(function(){

            linha.remove();

        },1000);
        

}

function scrollPlacar() {

    var posicaoPlacar = $('.placar').offset().top;

    $('html, body').animate({ scrollTop: posicaoPlacar+"px"}, 1000);
}

function sincronizaPlacar(){

    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score);

    });

        var dados = {
            placar: placar
        };

        $.post("http://localhost:3000/placar", dados, function(){
            console.log("Placar sincronizado com sucesso");
            $(".tooltip").tooltipster("open").tooltipster("content", "Sincronizado com sucesso");
        }).fail(function(){

            $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");

        }).always(function(){
            
            setTimeout(() => {
                $(".tooltip").tooltipster("close");
            }, 1200);
            
        });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = criarLinha(this.usuario, this.pontos);

            linha.find(".botaoRemove").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}
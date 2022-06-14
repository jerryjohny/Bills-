/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var urlserv = document.getElementById('url').value;
function ajaxSendFormPopUp(url, placeholder, form, append) {
    var data = $("#" + form).serialize();
    append = (append === undefined) ? false : true;

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        beforeSend: function () {
            $("#loading").html("<div id='preloader'><div class='loader'><svg class='circular' viewBox='25 25 50 50'><circle class='path' cx='50' cy='50' r='20' fill='none' stroke-width='3' stroke-miterlimit='10' /></svg></div></div>");
            $("#exampleModal").modal("show");

        },
        success: function (data) {
            if (append) {
                $("#" + placeholder).append(data);
            } else {
                $("#" + placeholder).html(data);
            }
            $('body').remove('loading');
//            $("#loading").html("");
            $("#exampleModal").modal("show");
//                $("#exampleModal").removeClass('modal');

        },
        error: function (xhr) {
            $("#" + placeholder).html(xhr.statusText + xhr.responseText);
            $("#loading").html("<h1>envi</h1>");
        }
    });
}

function ajaxSendForm(url, placeholder, form, append) {
    var data = $("#" + form).serialize();
    append = (append === undefined) ? false : true;

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        beforeSend: function () {
            $("#loading").html("<div id='preloader'><div class='loader'><svg class='circular' viewBox='25 25 50 50'><circle class='path' cx='50' cy='50' r='20' fill='none' stroke-width='3' stroke-miterlimit='10' /></svg></div></div>");
            //$("#MyModal").modal("toggle");
        },
        success: function (data) {
            if (append) {
                $("#" + placeholder).append(data);
            } else {
                $("#" + placeholder).html(data);
            }
            $("#loading").html("");
            $("#myModal").modal("show");
        },
        error: function (xhr) {
            $("#" + placeholder).html(xhr.statusText + xhr.responseText);
            $("#loading").html("");
        }
    });
}


function chamaFormulario(id, url, event) {
    event.preventDefault();
    ajaxSendFormPopUp(url, "respostaModalPopUp");
}

function enviarFormulario(url, form, event) {
    event.preventDefault();
    ajaxSendForm(url, "msg", form);
}

function apagarDados(url, form, event) {
    event.preventDefault();
    ajaxSendForm(url, "msg", form);
}

//-------------------------------------------CHAMAR FUNCOES------------------------------------

$(document).ready(function () {

});

function getPagamento(id_utent) {
    var url = urlserv + "controle-pagamento/cadastrar-modal/" + id_utent;
    ajaxSendFormPopUp(url, "respostaModal");
}

function eliminaPagamento(id_utent) {
    var url = urlserv + "controle-pagamento/cadastrar-modal/" + id_utent;
    ajaxSendFormPopUp(url, "respostaModal", "SendDeletPagamento");
}

function setPagamento(ref_pagamento) {

    var url = urlserv + "controle-pagamento/cadastrar-modal/" + ref_pagamento;
    ajaxSendFormPopUp(url, "respostaModal", "SendCadPagamento");
   // imprimir(urlserv + 'controle-pagamento/imprimir/' + ref_pagamento);

}

function updatePermissao(id) {
    var url = urlserv + "controle-login/editar-permissao/" + id;
    //  alert(url);
    ajaxSendFormPopUp(url, "respostaModal", "SendEditPermissao");
}



function cancelarProforma(ref_proforma) {
    var url = urlserv + "controle-cotacao/cancelar-proforma/" + ref_proforma;
    //alert(url);
    ajaxSendFormPopUp(url, "respostaModal");
}

function cancelarFactura(ref_factura) {
    var url = urlserv + "controle-factura/cancelar-factura/" + ref_factura;
    //alert(url);
    ajaxSendFormPopUp(url, "respostaModal");
}

function cancelarPrfrmaRef(ref_proforma) {
    var url = urlserv + "controle-cotacao/cancelar-Proforma-id/" + ref_proforma;
    //alert(url);
    ajaxSendFormPopUp(url, "respostaModal", "SendCancelarProforma");
}

function cancelarFaturaRef(ref_factura) {
    var url = urlserv + "controle-factura/cancelar-factura-id/" + ref_factura;
    //alert(url);
    ajaxSendFormPopUp(url, "respostaModal", "SendCancelarProforma");
}


function getServico() {
    var url = urlserv + "controle-servicos/cadastrar-modal/";
    ajaxSendFormPopUp(url, "respostaModal");
}

function saveServico() {
    var url = urlserv + "controle-servicos/cadastrar-modal/";
    ajaxSendFormPopUp(url, "respostaModal", "SendCadServico");
}

function getServicoOrdem() {
    var url = urlserv + "controle-servicos/cadastrar-modal-ordem/";
    ajaxSendFormPopUp(url, "respostaModal");
}

function getReceita(id_atendimento) {

    var url = urlserv + "controle-receita/index/" + id_atendimento;
   ajaxSendFormPopUp(url, "respostaModal");

}

function getCusto(id)
{
    var xmlhttp;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {

            document.getElementById("valor").value = xmlhttp.responseText;
//            document.getElementById("quantidade").value = "";
//            document.getElementById("subtotal").value = "";

        } else if (xmlhttp.readyState != 4 && xmlhttp.status != 200) {

            document.getElementById("valor").value = "Buscando valor...";

        }
    }
    xmlhttp.open("GET", urlserv + "controle-factura/get-custo/" + id, true);
    xmlhttp.send();
}







$("body").on('click', "#cadCategoria", function (event) {
    event.preventDefault();
    // alert('j');
    var url = urlserv + "controle-carousel/index";
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendCadCatArtigo", function (event) {
    event.preventDefault();
    var url = urlserv + "controle-cat-artigo/cadastrar";
    ajaxSendForm(url, "respostaModal", "SendCadCatArtigo");
});


/////===========================================================

$("body").on('click', "#cadEntidade", function (event) {
    event.preventDefault();
    // alert('j');
    var url = urlserv + "controle-entidade/cadastrar";
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendCadEntidade", function (event) {
    event.preventDefault();
    var url = urlserv + "controle-entidade/cadastrar";
    ajaxSendForm(url, "respostaModal", "SendCadEntidade");
});





function imprimir(caminho) {
//alert('');
    window.open(caminho, 'Impressao', 'width=1024,height=850,scrollbars=yes');

}



//-----------------------------------------------------------------------------

$("body").on('click', "#sendEmail", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    // alert(id);
    var url = urlserv + "controle-send-email/getMessage/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});
$('body').on('submit', "#SendCadEmailSend", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    //alert('Aguarde...');
    var url = urlserv + "controle-send-email/cadastrar"
    ajaxSendFormPopUp(url, "respostaModal", "SendCadEmailSend");
});
//$('body').on('submit', "#SendCadCatArtigo", function (event) {
//    event.preventDefault();
//    var url = urlserv + "controle-cat-artigo/cadastrar";
//    ajaxSendForm(url, "respostaModal", "SendCadCatArtigo");
//});

//-----------------------------------------------------------


$("body").on('click', "#notificacao", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = urlserv + "Controle-notificacao/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendEditNotificacao", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    //   alert(id);
    var url = urlserv + "controle-notificacao/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendEditNotificacao");
});

//-----------------------------------------------------------

$("body").on('click', "#cadSubCategoria", function (event) {
    event.preventDefault();
    //alert('j');
    var url = urlserv + "controle-artigo/cadastrar";
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendCadArtigo", function (event) {
    event.preventDefault();
    //alert('l');
    var url = urlserv + "controle-artigo/cadastrar";
    ajaxSendForm(url, "respostaModal", "SendCadArtigo");
});

$("body").on('click', "#visualizarsubCategoria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = urlserv + "controle-artigo/visualizar/" + id;
    // alert(url);
    ajaxSendFormPopUp(url, "respostaModal");
});

$("body").on('click', "#editarSubCategoria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = urlserv + "controle-artigo/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendEditArtigo", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    //  alert(id);
    var url = urlserv + "controle-artigo/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendEditArtigo");
});

$("body").on('click', "#apagarSubCategoria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    // alert('f');
    var url = urlserv + "controle-artigo/apagar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendApagarArtigo", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    //alert(id);
    var url = urlserv + "controle-artigo/apagarID/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendApagarArtigo");
});

//-----------------------------------------------------------
$('body').on('submit', "#enviarEmail", function (event) {
    event.preventDefault();
    // var id = $(this).attr("name");
    alert('l');
    var url = urlserv + "controle-email/recuperarSenha";
    ajaxSendForm(url, "respostaModal", "enviarEmail");
});
//*******************************************************************************************
$("body").on('click', "#cadDetalhe", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    //alert(id);
    var url = urlserv + "controle-artigo/cadastrarDetalhe/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendCadDetalhes", function (event) {
    event.preventDefault();
    var id = document.getElementById('foto').value;
    //alert(id);
    var url = urlserv + "controle-artigo/cadastrarDetalhe/";
    ajaxSendForm(url, "respostaModal", "SendCadDetalhes");
});

//************************************************************************************************


$("body").on('click', "#visualizarUtilizador", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = urlserv + "controle-usuario/visualizar/" + id;
    // alert(url);
    ajaxSendFormPopUp(url, "respostaModal");
});

$("body").on('click', "#apagarUtilizador", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    // alert('f');
    var url = urlserv + "controle-usuario/apagar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendApagaUtilizador", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    ////alert(id);
    var url = urlserv + "controle-usuario/apagarID/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendApagaUtilizador");
});

//******************************************************************************************
$("body").on('click', "#apagarGaleria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    //alert('f');
    var url = urlserv + "controle-galeria/apagar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendApagaGaleria", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    // alert(id);
    var url = urlserv + "controle-galeria/apagarID/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendApagaGaleria");
});

//*************************************************************************

/*
 $('body').on('submit',"#sendDadosRotaEditar", function (event) {
 event.preventDefault();
 var id = $(this).attr("name");
 var url = "http://localhost/jogo/controle-rota/editar/"+id;
 ajaxSendFormPopUp(url, "respostaModalPopUp","sendDadosRotaEditar");
 });*/

$('body').on('submit', "#sendDadosTarefaEditar", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    var url = "http://localhost/jogo/controle-tarefa/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModalPopUp", "sendDadosTarefaEditar");
});

/*
 $('body').on('click',"#visualizarCategoria", function (event) {
 var id = $(this).attr("href");
 var url = urlserv+"controle-cat-artigo/visualizar/"+id;
 ajaxSendForm(url, "respostaModal");
 });*/

$("body").on('click', "#visualizarCategoria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = urlserv + "controle-cat-artigo/visualizar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$("body").on('click', "#editarCategoria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = urlserv + "controle-cat-artigo/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendEditCatArtigo", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    // alert(id);
    var url = urlserv + "controle-cat-artigo/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendEditCatArtigo");
});

$("body").on('click', "#apagarCategoria", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    // alert('f');
    var url = urlserv + "controle-cat-artigo/apagar/" + id;
    ajaxSendFormPopUp(url, "respostaModal");
});

$('body').on('submit', "#SendApagatCatArtigo", function (event) {
    event.preventDefault();
    var id = $(this).attr("name");
    ////alert(id);
    var url = urlserv + "controle-cat-artigo/apagarID/" + id;
    ajaxSendFormPopUp(url, "respostaModal", "SendApagatCatArtigo");
});


$('body').on('click', "#listarDadosTarefas", function (event) {
    var url = "http://localhost/jogo/controle-tarefa/index";
    ajaxSendForm(url, "respostaModal");
});

$('body').on('click', "#editarTarefa", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = "http://localhost/jogo/controle-tarefa/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModalPopUp");
});

$('body').on('click', "#apagarTarefa", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = "http://localhost/jogo/controle-tarefa/apagar/" + id;
    ajaxSendForm(url, "respostaModal");
});

$('body').on('click', "#editarRota", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = "http://localhost/jogo/controle-rota/editar/" + id;
    ajaxSendFormPopUp(url, "respostaModalPopUp");
});

$('body').on('click', "#apagarRota", function (event) {
    event.preventDefault();
    id = $(this).attr('href');
    var url = "http://localhost/jogo/controle-rota/apagar/" + id;
    ajaxSendForm(url, "respostaModal");
});

$("body").on('click', "#adicionarTerrefa", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = "http://localhost/jogo/controle-tarefa/cadastrar/" + id;
    ajaxSendFormPopUp(url, "respostaModalPopUp");
});

$("body").on('click', "#adicionarQuestao", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = "http://localhost/jogo/controle-questao/cadastrar/" + id;
    ajaxSendFormPopUp(url, "respostaModalPopUp");
});


//----------------------------------------------QUESTOES-----------------------------
$("body").on('click', "#cadAlternativasForm", function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var url = "http://localhost/jogo/controle-alternativa/cadastrar/" + id;
    chamaFormulario("respostaModalPopUp", url, event);
});

$("body").on('click', "#cadQuestaoForm", function (event) {
    var url = "http://localhost/jogo/controle-questao/cadastrar";
    chamaFormulario("cadQuestaoForm", url, event);
});

$('body').on('click', "#listarDadosQuestoes", function (event) {
    var url = "http://localhost/jogo/controle-questao/index";
    ajaxSendForm(url, "respostaModal");
});

/*
 * function openKCFinder(textarea) {
 window.KCFinder = {
 callBackMultiple: function(files) {
 window.KCFinder = null;
 textarea.value = "";
 for (var i = 0; i < files.length; i++)
 textarea.value += files[i] + "\n";
 }
 };
 window.open('/demo/kcfinder/browse.php?type=files&dir=files/public',
 'kcfinder_multiple', 'status=0, toolbar=0, location=0, menubar=0, ' +
 'directories=0, resizable=1, scrollbars=0, width=800, height=600'
 );
 }
 
 <textarea id="files" readonly="readonly" onclick="openKCFinder(this)">Click here and choose multiple files with the Ctrl/Command key.
 Then right click on one of them and choose "Select"</textarea>
 */
var urlserv = document.getElementById('url').value;
function valor(param) {
    var valores = [];
    $.each(param, function (key, val) {
        valores.push(val);
    })
    return valores;
}
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
function enviaDados(url, data, place) {
//    alert('ola '+url);
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        beforeSend: function () {
            
            $("#" + place).html("<div class='' > <div class='container-fluid'><div class='row'><div class='col-lg-5'></div><div class='col-lg-6'><br><br><br><br><br><br><br><br><br><i class='fa fa-spinner fa-pulse fa-5x fa-fw'></i></div></div></div></div>");
            //$("#MyModal").modal("toggle");
            
        },
        success: function (data) {
//            alert(data);
            $("#" + place).html(data);
        },
        error: function (xhr) {
            $("#" + place).html(" <div class='' ><div class='row'><div class='col-lg-5'></div><div class='col-lg-6'><br><br><br><br><br><br><br><br><br><h1 style='text-transform: capitalize'>" + xhr.statusText + " " + xhr.responseText + "</h1></div></div></div>");
            $("#loading").html("");
        }
    });
}

function enviarFormulario(url, place) {
    $.ajax({
        type: 'POST',
        url: url,
        data: new FormData($('.form-horizontal').get(0)),
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
            $("#loading").html("<div class=''><div class=''><div class='row'><div class='col-lg-5'></div><div class='col-lg-6'><br><br><br><br><br><br><br><br><br><img src='" + urlserv + "assets/images/loader.gif'/></div></div></div></div>");
            //  $("#exampleModal").modal("show");
        },
        success: function (data) {
           // alert(data);
            $("#" + place).html(data);
        },
        error: function (xhr) {
            alert('erro');
            $("#" + place).html(xhr.statusText + xhr.responseText);
        }
    });
}

function ajaxSendFormUpload(url, placeholder, append) {
    append = (append === undefined) ? false : true;
    $.ajax({
        type: 'POST',
        url: url,
        data: new FormData($('.form-horizontal').get(0)),
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
            $("#loading").html("<div id='preloader'><div class='loader'><svg class='circular' viewBox='25 25 50 50'><circle class='path' cx='50' cy='50' r='20' fill='none' stroke-width='3' stroke-miterlimit='10' /></svg></div></div>");
            $("#exampleModal").modal("show");

        },
        success: function (data) {
            // alert(data);
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
            alert('erro');
            $("#" + placeholder).html(xhr.statusText + xhr.responseText);
            $("#loading").html("<h1>envi</h1>");
        }
    });
}

//-------------------------------------------CHAMAR FUNCOES------------------------------------

function chamarTela(url) {
    ajaxSendFormPopUp(url, "respostaModal");
}

function enviarDados(url, form) {
    ajaxSendFormPopUp(url, "respostaModal", form);
}
function enviarDadosFile(url) {
    // alert(url);
    ajaxSendFormUpload(url, "respostaModal");
}

function imprimir(caminho) {
    window.open(caminho, 'Impressao', 'width=1024,height=850,scrollbars=yes');
}


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





// Sends user data to api
$('#register-form').submit(function (e) {

    e.preventDefault();

    let dados = $(this).serialize();

    cadastraUsuario(dados);
});

function cadastraUsuario (dados) {

    $.ajax({
        url: 'http://localhost:3000/api/usuarios/add',
        dataType: 'json',
        type: 'post',
        data: dados,

        success: function (response) {
            toastr.success('Usuário cadastrado com sucesso!', '', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                showDuration: "300",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });

            setTimeout(function () {
                $('.register-form').fadeOut('slow', function () {
                    $('.login-form').removeClass('hidden').fadeIn('slow');
                });
            }, 1500);
        },

        error: function (response) {

            toastr.error(response['responseJSON']['message'], '', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                showDuration: "300",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });
        }
    });
}

// Sends user data to api (Login)
$('#login-form').submit(function (e) {

    e.preventDefault();

    let dados = $(this).serialize();

    let nome = $('#nome').val();

    buscaUsuario(dados, nome);
});

function buscaUsuario (dados, nome) {

    $.ajax({
        url: 'http://localhost:3000/api/usuarios/login',
        dataType: 'json',
        type: 'post',
        data: dados,

        success: function (response) {

            localStorage.setItem('LOGADO', 'TRUE');
            localStorage.setItem('USUARIO_LOGADO', nome);

            toastr.success('Seja bem-vind@  ' + nome + '!', '', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                showDuration: "300",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });

            setTimeout(function () {
                usuarioLogado();
            }, 1500);
        },

        error: function (response) {

            toastr.error(response['responseJSON']['message'], '', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                showDuration: "300",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });
        }
    });
}

function inicioPagina () {
    $('#login').addClass('item-menu-ativo');
    $('.login').fadeIn('fast');
    $('.upload-form, #form-content').addClass('hidden').fadeOut('fast');
}

function usuarioLogado () {
    $('.login').addClass('hidden').fadeOut('fast');
    $('#login').removeClass('item-menu-ativo').fadeOut('fast');

    $('.upload-form').removeClass('hidden').fadeIn('fast');
    $('#upload-form').removeClass('hidden').addClass('item-menu-ativo').fadeIn('fast');
    $('#form-content').removeClass('hidden').fadeIn('fast');
}

function importaArquivo () {
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {

        var txt = reader.result;
        var registros = txt.split('\n');

        registros.pop();

        registros.forEach(function (registro) {
            formataRegistros(registro);
        });
    }
}

function formataRegistros (registro) {

    let tipo = registro.substring(0, 1);

    let data = registro.substring(1, 26);
    data = formataData(new Date(data));

    let produto = registro.substring(26, 56);
    let valor = registro.substring(56, 66);
    let vendedor = registro.substring(66, 86);

    let dados = {
        'tipo' : tipo,
        'data' : data,
        'produto' : produto,
        'valor' : valor,
        'vendedor' : vendedor
    }

    cadastraTransacoes(dados);
}

function cadastraTransacoes (dados) {

    $.ajax({
        url: 'http://localhost:3000/api/transacoes/add',
        dataType: 'json',
        type: 'post',
        data: dados,

        success: function (response) {

            setTimeout(function () {
                location.reload();
            }, 1500);
        },

        error: function (response) {

            toastr.error(response['responseJSON']['message'], '', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                showDuration: "300",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });
        }
    });
}

// Fetches and listing all transactions
function buscaTransacoes (page) {

    $.get('http://localhost:3000/api/transacoes?page=' + page, function (response) {

        var table_body = 'table-body';

        if (response['totalItems'] > 0) {

            $('#total-itens').html(response['totalItems']);
            $('#pagina-atual').val(response['currentPage']);
            $('#div-pagination').removeClass('hidden').fadeIn('slow');
            $('#div-upload').addClass('hidden').fadeOut('fast');

            desabilitaBotao(response['currentPage'], response['totalPages']);

            $('#' + table_body).empty();

            let valorTotal = 0;

            $.each(response['transacoes'], function (key, json) {

                let valor = parseInt(json['valor']);
                let valorCentavos = valor / 100000;
                let valorReal = valorCentavos.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' });

                valorTotal = calculaValores(json['tipo'], valorCentavos, valorTotal);

                $('#' + table_body)
                    .append(
                        '<tr>'+
                        '<td>'+ json['id'] +'</td>' +
                        '<td>'+ json['tipo'] +'</td>' +
                        '<td>'+ formataDataExibe(json['data']) +'</td>' +
                        '<td>'+ json['produto'] +'</td>' +
                        '<td>'+ valorReal +'</td>' +
                        '<td>'+ json['vendedor'] +'</td>' +
                        '</tr>'
                    );
            });

            $('#valor-total').html(valorTotal.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' }));

            // console.log(valorTotal)

        } else {
            $('#table-body')
                .html('<tr class="txt-center"><td colspan="7">Nenhum registro encontrado!</td></tr>');
            $('#div-pagination').addClass('hidden');
        }
    });
}

function calculaValores (tipo, valor, valorTotal) {

    if (tipo === '1' || tipo === '2' || tipo === '4') {
        valorTotal+= valor;
    } else {
        valorTotal-= valor;
    }

    return valorTotal;
}

// Changes date to database format
function formataData (data) {
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate() + ' ' + data.toLocaleTimeString();
}

// Changes the date to display to users
function formataDataExibe (data) {
    let date = new Date(data);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString();
}

function desabilitaBotao (currentPage, totalPages) {
    if (currentPage === 0) {
        $('#anterior').css({'pointer-events': 'none', 'color': '#CCCCCC'});
    } else {
        $('#anterior').css({'pointer-events': 'all', 'color': 'inherit'});
    }

    if (currentPage === (totalPages - 1)) {
        $('#proxima').css({'pointer-events': 'none', 'color': '#CCCCCC'});
    } else {
        $('#proxima').css({'pointer-events': 'all', 'color': 'inherit'});
    }
}

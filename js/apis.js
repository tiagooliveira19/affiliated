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

            toastr.success('Seja bem-vindo!', '', {
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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"
        integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous"
        referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js"
        integrity="sha512-sR3EKGp4SG8zs7B0MEUxDeq8rw9wsuGVYNfbbO/GLCJ59LBE4baEfQBVsP2Y/h2n8M19YV1mujFANO1yA3ko7Q==" crossorigin="anonymous"></script>
<script src="js/toastr.js"></script>
<script type="text/javascript" src="/js/menu.js"></script>
<script type="text/javascript" src="/js/apis.js"></script>
<script>

    $(document).ready(function () {

        // buscaFilmes(0);
        inicioPagina();

        let logado = localStorage.getItem('LOGADO');

        if (logado) {
            usuarioLogado();
        }

        $('#sign-out').click(function () {
            localStorage.removeItem('LOGADO');
            localStorage.removeItem('USUARIO_LOGADO');

            setTimeout(function () {
                location.reload();
            }, 300);
        });

        $('#load-file').click(function () {

            if ($('#upload-file').val() === '') {
                toastr.error('O campo arquivo não pode ser vazio!', '', {
                    closeButton: true,
                    progressBar: true,
                    positionClass: "toast-top-right",
                    preventDuplicates: true,
                    showDuration: "300",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut"
                });
            } else {
                importaArquivo();
            }
        });

        // Phone mask
        $('input[type="tel"]').inputmask({
            mask: ["(99) 9999-9999", "(99) 99999-9999"],
            keepStatic: true
        });

        // Change to login form
        $('#btn-register').click(function () {
            $('.login-form').fadeOut('slow', function () {
                $('.register-form').removeClass('hidden').fadeIn('slow');
            });
        });

        // Change to register form
        $('#btn-login').click(function () {
            $('.register-form').fadeOut('slow', function () {
                $('.login-form').removeClass('hidden').fadeIn('slow');
            });
        });

        $('#proxima').click(function () {

            let paginaAtual = $('#pagina-atual').val();
            let page = parseInt(paginaAtual) + 1;

            // buscaFilmes(page);
        });

        $('#anterior').click(function () {

            let paginaAtual = $('#pagina-atual').val();
            let page = parseInt(paginaAtual) - 1;

            // buscaFilmes(page);
        });
    });
</script>

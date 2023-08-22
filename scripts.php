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

        // Fetches and listing all transactions
        fetchesTransactions(0);

        // Changes layout structure when user is not logged
        startsPage();

        // Gets value of variable on localStorage
        let logged = localStorage.getItem('LOGADO');

        // Verifies if user is logged
        if (logged) {
            // Changes layout structure when user is logged
            userLogged();
        }

        // Signs out from application
        $('#sign-out').click(function () {

            // Cleans localStorage
            localStorage.removeItem('LOGADO');
            localStorage.removeItem('USUARIO_LOGADO');

            toastr.warning('See you later!', '', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                showDuration: "1500",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });

            // Reloads page
            setTimeout(function () {
                location.reload();
            }, 1800);
        });

        // Submits file to upload
        $('#load-file').click(function () {

            if ($('#upload-file').val() === '') {
                toastr.error('File field cannot be empty!', '', {
                    closeButton: true,
                    progressBar: true,
                    positionClass: "toast-top-right",
                    preventDuplicates: true,
                    showDuration: "300",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut"
                });
            } else {
                importesFile();
            }
        });

        // Phone mask
        $('input[type="tel"]').inputmask({
            mask: ["(99) 9999-9999", "(99) 99999-9999"],
            keepStatic: true
        });

        // Switches to login form
        $('#btn-register').click(function () {
            $('.login-form').fadeOut('slow', function () {
                $('.register-form').removeClass('hidden').fadeIn('slow');
            });
        });

        // Switches to register form
        $('#btn-login').click(function () {
            $('.register-form').fadeOut('slow', function () {
                $('.login-form').removeClass('hidden').fadeIn('slow');
            });
        });

        // Switches to next page
        $('#next').click(function () {

            let currentPage = $('#current-page').val();
            let page = parseInt(currentPage) + 1;

            fetchesTransactions(page);
        });

        // Switches to previous page
        $('#previous').click(function () {

            let currentPage = $('#current-page').val();
            let page = parseInt(currentPage) - 1;

            fetchesTransactions(page);
        });
    });
</script>

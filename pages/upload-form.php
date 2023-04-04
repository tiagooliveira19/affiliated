<div id="form-content">

    <div class="col-md-12 w-35 mt-3 cabecalho">
        <label class="cabecalho-label">Transações</label>
    </div>

    <div class="col-md-12 ml-45 mt-5 display-flex" id="div-aviso">
        <div class="col-md-3">
            <input class="form-control" type="text" id="search-filmes" placeholder="Nome filme/série">
        </div>

        <div class="col-md-3 ml-10">
            <button class="btn btn-primary" type="button" id="click-filmes">Pesquisar</button>
        </div>
    </div>

    <div class="col-md-12 mt-4 div-filmes">
        <p><span id="total-itens">0</span> registro(s) disponíveis em nossa base de dados:</p>

        <div class="col-md-11 margin-auto mt-5">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Título</th>
                        <th>Genêro</th>
                        <th>Descrição</th>
                        <th>Data de Lançamento</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr class="txt-center">
                        <td colspan="7">Nenhum registro encontrado!</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <input type="hidden" id="pagina-atual" value="">

        <div class="col-md-10 mt-4 mb-4 hidden" id="div-pagination">
            <div class="col-md-3"></div>
            <div class="col-md-4 txt-center margin-auto">
                <span class="arrow-pagination" id="anterior">
                    <i class="fa-solid fa-chevron-left"></i>
                </span>
                <span class="arrow-pagination" id="proxima">
                    <i class="fa-solid fa-chevron-right"></i>
                </span>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</div>

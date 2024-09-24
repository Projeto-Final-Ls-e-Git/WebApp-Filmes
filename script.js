const URL_API = 'http://localhost:3000/series';
let paginaAtual = 1;
let buscaAtual = '';
let totalSeries = 0;
async function buscarSeries(titulo = '', pagina = 1, limite = 10) {
    try {
        let url = `${URL_API}?pagina=${pagina}&limite=${limite}`;
        if (titulo) {
              url += `&titulo=${encodeURIComponent(titulo)}`;
        }
        const resposta = await fetch(url);
        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar dados da API:", erro);
        return null;
    }
}
function exibirSeries(series) {
    const listaSeries = document.getElementById('lista-series');
    listaSeries.innerHTML = '';
    if (series.length === 0) {
        listaSeries.innerHTML = '<p>Nenhuma série encontrada.</p>';
        return;
    }
    
    series.forEach(serie => {
        const elementoSerie = document.createElement('div');
        elementoSerie.className = 'serie';
        elementoSerie.innerHTML = `
            <img src="${serie.imagem}" alt="${serie.titulo}">
        `;

        const elementoTxt = document.createElement('div');
        elementoTxt.className = 'titulo-genero';
        elementoTxt.innerHTML = `
            <h2>${serie.titulo}</h2>
            <p>${serie.generos.join(' • ')}</p>
            <div>${serie.resumo}</div>
        `;
        
        listaSeries.appendChild(elementoSerie);
        elementoSerie.appendChild(elementoTxt);
    });
}
function atualizarPaginacao() {
    const elementoPaginacao = document.getElementById('paginacao');
    elementoPaginacao.innerHTML = '';
    const totalPaginas = Math.ceil(totalSeries / parseInt(document.getElementById('selecao-limite').value));
    if (paginaAtual > 1) {
        const botaoAnterior = document.createElement('button');
        botaoAnterior.textContent = 'Anterior';
        botaoAnterior.addEventListener('click', () => {
            carregarPagina(paginaAtual - 1);
            window.scrollTo(0, 0);
        });
        elementoPaginacao.appendChild(botaoAnterior);
    }
    const spanPaginaAtual = document.createElement('span');
    spanPaginaAtual.textContent = ` Página ${paginaAtual} de ${totalPaginas} `;
    elementoPaginacao.appendChild(spanPaginaAtual);
    if (paginaAtual < totalPaginas) {
        const botaoProxima = document.createElement('button');
        botaoProxima.textContent = 'Próxima';
        botaoProxima.addEventListener('click', () => {
            carregarPagina(paginaAtual + 1);
            window.scrollTo(0, 0);
        });
        elementoPaginacao.appendChild(botaoProxima);
    }
}
async function carregarPagina(pagina) {
    paginaAtual = pagina;
    const limite = parseInt(document.getElementById('selecao-limite').value);
    const dados = await buscarSeries(buscaAtual, paginaAtual, limite);
    if (dados) {
        exibirSeries(dados.data);
        totalSeries = dados.total;
        document.getElementById('total-series').textContent = `Total de séries: ${totalSeries}`;
        atualizarPaginacao();
    }
}
document.getElementById('formulario-busca').addEventListener('submit', async (e) => {
    e.preventDefault();
    buscaAtual = document.getElementById('entrada-busca').value.trim();
    paginaAtual = 1;
    await carregarPagina(paginaAtual);
});
document.getElementById('selecao-limite').addEventListener('change', () => {
    paginaAtual = 1;
    carregarPagina(paginaAtual);
});
// Carrega a primeira página ao iniciar
document.addEventListener('DOMContentLoaded', () => carregarPagina(1));
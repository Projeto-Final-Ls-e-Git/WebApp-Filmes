let paginaAtual = 1;
const limitePorPagina = 3;
let totalSeries = 0;

function carregarSeries(pagina) {
  fetch(
    `http://localhost:3000/series?pagina=${pagina}&limite=${limitePorPagina}`
  )
    .then((response) => response.json())
    .then((data) => {
      totalSeries = data.total;
      document.getElementById(
        "total-series"
      ).textContent = `Total de séries: ${totalSeries}`;

      const listaSeriesElement = document.getElementById("lista-series");
      listaSeriesElement.innerHTML = ""; // Limpa o conteúdo anterior

      data.data.forEach((serie) => {
        const serieCard = document.createElement("div");
        serieCard.className = "serie-card";
        serieCard.innerHTML = `
                    <h2>${serie.titulo}</h2>
                    <img src="${serie.imagem}" alt="${serie.titulo}">
                    <p><strong>Gêneros:</strong> ${serie.generos.join(", ")}</p>
                    <div>${serie.resumo}</div>
                `;
        listaSeriesElement.appendChild(serieCard);
      });

      atualizarPaginacao();
    })
    .catch((error) => {
      console.error("Erro ao buscar séries:", error);
      document.getElementById("lista-series").innerHTML =
        "<p>Erro ao carregar séries. Por favor, tente novamente mais tarde.</p>";
    });
}

function atualizarPaginacao() {
  const totalPaginas = Math.ceil(totalSeries / limitePorPagina);
  document.getElementById(
    "pagina-atual"
  ).textContent = `Página ${paginaAtual} / ${totalPaginas}`;
  document.getElementById("anterior").disabled = paginaAtual === 1;
  document.getElementById("proximo").disabled = paginaAtual === totalPaginas;
}

document.getElementById("anterior").addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    carregarSeries(paginaAtual);
  }
});

document.getElementById("proximo").addEventListener("click", () => {
  const totalPaginas = Math.ceil(totalSeries / limitePorPagina);
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    carregarSeries(paginaAtual);
  }
});

// Carregar a primeira página ao iniciar
carregarSeries(paginaAtual);

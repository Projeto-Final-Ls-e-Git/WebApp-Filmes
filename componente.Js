function criarComponenteSerie(data){
    const serie = data.data[0]
    const conteiner = document.createElement("div")

    const titulo = document.createElement("h1")
    titulo.textContent = serie.titulo
    conteiner.appendChild(titulo)

    const generos = document.createElement("ul")
    if(Array.isArray(serie.generos)){
        serie.generos.forEach(midia => {
            const item = document.createElement("li")
            item.textContent = midia
            generos.appendChild(item)
        });
    }
    conteiner.appendChild(generos)

    const imagem = document.createElement("img")
    imagem.src = serie.imagem
    conteiner.appendChild(imagem)

    const sinopse = document.createElement("p")
    sinopse.textContent = serie.resumo
    conteiner.appendChild(sinopse)

    return conteiner
}
export default criarComponenteSerie
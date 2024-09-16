async function buscarPorTitulo(titulo) {
    const resposta = await fetch(`http://localhost:3000/series?titulo=${encodeURIComponent(titulo)}`)
    if(!resposta.ok){
        console.log("Mídia não encontrada")
        return
    }
    const data = await resposta.json()
    return data
}

async function buscarConteudo(pagina, limite) {
    const resposta = await fetch(`http://localhost:3000/series?pagina=${pagina}&limite=${limite}`)
    if(!resposta.ok){
        console.log("Mídia não encontrada")
        return
    }
    const data = await resposta.json()
    return data
}

console.log(await buscarConteudo(2, 5))



/*export{buscarConteudo, buscarPorTitulo}*/

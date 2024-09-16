async function buscarporTitulo(titulo) {
    const resposta = await fetch(`http://localhost:3000/series?titulo=${encodeURIComponent(titulo)}`)
    if(!resposta.ok){
        console.log("Mídia não encontrada")
        return
    }
    const data = await resposta.json()
    return data
}



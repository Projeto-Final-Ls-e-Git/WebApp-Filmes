import { buscarPorTitulo } from "./api";
import criarComponenteSerie from "./componente.Js";

document.getElementsByClassName("botao-busca").addEventListener("click", async()=>{
    const titulo = document.getElementById('barra-busca').value;
    console.log(titulo)
    if (!titulo) {
        console.error('O título não pode estar vazio');
        return;
    }
    try {
        const serie = await buscarPorTitulo(titulo);
        const component = criarComponenteSerie(serie);
        /*document.querySelector('.green-box').appendChild(component);*/
        console.log('ok');
        console.log(component)
    } catch (error) {
        console.error('Erro:', error);
    }
})
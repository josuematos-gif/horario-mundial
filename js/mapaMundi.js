const mapa = document.querySelector("#mapa-mundi")

//Função para "Expandir" e "Reduzir" o Mapa Mundi
mapa.addEventListener('click', () => {mapa.classList.toggle('expandido')

    const instrucao = document.querySelector(".instrucao")
    if (mapa.classList.contains('expandido')) {
        instrucao.textContent = `Click Novamente para reduzir`;
    } else {
        instrucao.textContent = `Click na imagem para expandir`;
    }
})
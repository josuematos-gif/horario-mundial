
const dia = document.querySelector('#dia')
const mes = document.querySelector('#mes')
const ano = document.querySelector('#ano')
const hora = document.querySelector('#horas')
const minuto = document.querySelector('#minutos')
const segundo = document.querySelector('#segundos')
const btinform = document.querySelector('#btinform')
const inputpaís = document.querySelector('#nome')
const calcule = document.querySelector('#calcule')
const resultado = document.querySelector('#resultado')
const como_usa = document.querySelector('#como')
const btreset = document.querySelector('#btreset')
const fuso = document.querySelector('#fuso')

let intervaloLocal = setInterval(relogio, 1000)
let intervaloMundial = null;
let intervaloAtivo = null;

btinform.addEventListener('click', informacao)
calcule.addEventListener('click', mostrarHoraMundial)
btreset.addEventListener('click', resetaRelogio)

function preencherInput(texto) {
    
    inputpaís.value = texto; // "Joga" o texto no input
    
    // Opcional: Dispara o filtro automaticamente após preencher
    input.dispatchEvent(new Event('keyup')); 
}

// Função Única de Inicialização
function iniciarRelogio(funcao, parametro = null) {
    if (intervaloAtivo) clearInterval(intervaloAtivo); // LIMPA TUDO ANTES DE COMEÇAR
    
    // Executa a primeira vez sem delay
    parametro ? funcao(parametro) : funcao(); 
    
    // Define o novo intervalo
    intervaloAtivo = setInterval(() => {
        parametro ? funcao(parametro) : funcao();
    }, 1000);
}

function informacao(){
    if (como_usa.textContent !== ""){
        como_usa.textContent = ""
    } else {    
        como_usa.textContent = `
            ✅  **COMO USAR:** Digite o Estado, ou fuso horário no formato IANA (Região/Cidade, Ex: Asia/Tokyo).
            ⚠️  O código aceita nome de cidade, como entrada, para selecionar fuso horario (Ex: "Salvador"). 
            ➡️  Use o botão "Ver Horário" para atualizar, ou o "Resetar" para voltar à hora local.`;
        como_usa.style.color = "black"
    }
}

let timerMenagem;

function exibirMensagem(texto, cor, tempo = 5000){
    resultado.textContent = texto;
    resultado.style.color = cor;
    resultado.style.opacity = '1';

    if (timerMenagem) clearTimeout(timerMenagem);
        timerMenagem = setTimeout(() => {
            resultado.style.opacity = '0';
            setTimeout(() => {resultado.textContent = ''; }, 300) 
    }, tempo);
}

function mostrarHoraMundial(){
    clearInterval(intervaloLocal); 
    if (intervaloMundial) {
        clearInterval(intervaloMundial);
    }
    const local = inputpaís.value.trim();
    

    if (local === "") {
        exibirMensagem("Erro: A entrada fornecida contém caracteres ou informações inválidas. O sistema não conseguiu reconhecer o conteúdo. Revise o texto e tente novamente.", "red");
        return;
    }
   

    atualizarHoraMundial(local);

    fuso.textContent = `Exibindo horário para: ${local}`;
    fuso.style.color = "black";
        
    intervaloMundial = setInterval(() => atualizarHoraMundial(local), 1000);
    
}

function resetaRelogio(){
    if (intervaloMundial){
        clearInterval(intervaloMundial)
    }
    inputpaís.value = ''
    fuso.textContent = ''
    resultado.textContent = `Relógio resetado. Exibindo hora local.`;
    resultado.style.color = "black";
    relogio();
    intervaloLocal = setInterval(relogio, 1000);
}

function atualizarHoraMundial(local) {
    try {
        const hoje = new Date();
        
        const opcoesHora = {
            timeZone: local,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };

        const opcoesData = {
            timeZone: local,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };

        // .replace(/\u200E/g, '') limpa caracteres invisíveis que bugam o tamanho da string
        const horaFormatada = hoje.toLocaleTimeString("pt-BR", opcoesHora).replace(/\u200E/g, '');
        const partesHora = horaFormatada.split(":");
        
        // Garantimos 2 dígitos limpando espaços e usando padStart
        hora.textContent = partesHora[0].trim().padStart(2, '0');
        minuto.textContent = partesHora[1].trim().padStart(2, '0');
        segundo.textContent = partesHora[2].trim().padStart(2, '0');

        const dataFormatada = hoje.toLocaleDateString("pt-BR", opcoesData).replace(/\u200E/g, '');
        const partesData = dataFormatada.split("/");
        dia.textContent = partesData[0].trim().padStart(2, '0');
        mes.textContent = partesData[1].trim().padStart(2, '0');
        ano.textContent = partesData[2].trim();

        return true; 
    } catch (erro) {
        resultado.textContent = "Erro: Fuso horário inválido.";
        resultado.style.color = "red";
        return false;
    }
}

function relogio() {
    const hoje = new Date();
    
    // Usamos String(...) + padStart(2, '0') para garantir 2 dígitos sempre
    hora.textContent = String(hoje.getHours()).padStart(2, '0');
    minuto.textContent = String(hoje.getMinutes()).padStart(2, '0');
    segundo.textContent = String(hoje.getSeconds()).padStart(2, '0');
    
    dia.textContent = String(hoje.getDate()).padStart(2, '0');
    mes.textContent = String(hoje.getMonth() + 1).padStart(2, '0');
    ano.textContent = hoje.getFullYear();
}

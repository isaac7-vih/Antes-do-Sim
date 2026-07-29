// Data que vocês se conheceram: 04/03/2026 às 09:11
const DATA_INICIO = new Date('2026-03-04T09:11:00');
const ordemDasTelas = ['abertura', 'lembrancas', 'contador', 'musica', 'carta', 'pedido', 'final'];
let telaAtual = 0;

// Som suave de digitação + vibração
const somTeclado = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-typewriter-key-press-1222.mp3');
somTeclado.volume = 0.06;
function tocarTeclaEVibrar() {
    const somClone = somTeclado.cloneNode();
    somClone.volume = 0.06;
    somClone.play().catch(() => {});
    if (navigator.vibrate) navigator.vibrate(10);
}

// Barra de progresso
function atualizarBarraProgresso(){
    const percentual = ((telaAtual + 1) / ordemDasTelas.length) * 100;
    document.getElementById('barra').style.width = `${percentual}%`;
}

// Navegação entre telas
function proximaTela() {
    if(telaAtual >= ordemDasTelas.length - 1) return;
    document.getElementById(ordemDasTelas[telaAtual]).classList.remove('ativa');
    setTimeout(() => {
        telaAtual++;
        document.getElementById(ordemDasTelas[telaAtual]).classList.add('ativa');
        atualizarBarraProgresso();
        // Inicia animação quando chegar na tela
        if(ordemDasTelas[telaAtual] === 'lembrancas') setTimeout(escreverLembrancas, 800);
        if(ordemDasTelas[telaAtual] === 'carta') setTimeout(escreverCarta, 800);
    }, 800);
}

// Contador de tempo
function atualizarContador(){
    const agora = new Date();
    const diferenca = agora - DATA_INICIO;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    document.getElementById('tempo').innerHTML = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
}
setInterval(atualizarContador, 1000);
atualizarContador();

// Criar estrelas
function criarEstrelas(){
    const ceu = document.getElementById('fundo-estrelas');
    for(let i=0; i<150; i++){
        const estrela = document.createElement('div');
        estrela.classList.add('estrela');
        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.top = `${Math.random() * 100}%`;
        estrela.style.animationDelay = `${Math.random() * 3}s`;
        ceu.appendChild(estrela);
    }
}
criarEstrelas();

// Lembranças — aparecendo uma por uma
const lembrancas = [
    { titulo: "Primeira Conversa", texto: "Foi ali, no intervalo, que eu ouvi a sua voz pela primeira vez... e já sabia que algo diferente ia mudar a minha vida para sempre." },
    { titulo: "Primeira Foto", texto: "Cada detalhe seu ficou guardado no meu coração, como o lugar mais bonito que eu já conheci." },
    { titulo: "Primeiro 'Eu Te Amo'", texto: "Quando eu disse isso, não foi só uma frase: foi a verdade mais forte e verdadeira que eu já senti." },
    { titulo: "Primeiro Beijo", texto: "Naquele momento o mundo parou, e só existia eu e você. E eu sabia que era você." },
    { titulo: "Por Quem Me Apaixonei", texto: "Me apaixonei por você inteira: pelo seu jeito, seu sorriso, sua calma e por fazer eu me sentir completo." }
];
let indiceLembranca = 0, letraL = 0;
const elemTitulo = document.getElementById('titulo-lembranca');
const elemTextoL = document.getElementById('texto-lembranca');
function escreverLembrancas(){
    if(indiceLembranca >= lembrancas.length) return;
    const item = lembrancas[indiceLembranca];
    elemTitulo.textContent = item.titulo;
    const frase = item.texto;
    letraL = 0;
    elemTextoL.textContent = '';
    function digitar(){
        if(letraL < frase.length){
            elemTextoL.textContent += frase[letraL];
            tocarTeclaEVibrar();
            letraL++;
            setTimeout(digitar, 45);
        } else {
            indiceLembranca++;
            setTimeout(escreverLembrancas, 4000);
        }
    }
    digitar();
}

// Carta com o seu texto
const textoCarta = `neném, eu sei que demorei, mas cada segundo valeu a pena pra eu te mostrar o quanto você é importante pra mim. O amor que eu sinto não pode ficar só em palavras faladas, ele precisa ser dito, mostrado e eternizado.

Hoje eu estou aqui, com o coração batendo forte, pra te dizer que você é tudo pra mim. Cada detalhe seu, cada sorriso, cada momento ao seu lado fez eu ter certeza: é você quem eu quero para toda a vida.

Eu te amo muito, muito mesmo, VICTORIA. Você transformou meus dias, deu cor ao meu mundo e fez eu entender o que é amar de verdade. E hoje, eu quero que a gente siga juntos, eternizando esse amor a cada dia que passar.`;
let letraC = 0;
const elemTextoC = document.getElementById('texto-carta');
function escreverCarta(){
    if(letraC < textoCarta.length){
        elemTextoC.textContent += textoCarta[letraC];
        tocarTeclaEVibrar();
        letraC++;
        setTimeout(escreverCarta, 45);
    }
}

// Inicia tudo
window.addEventListener('load', () => {
    atualizarBarraProgresso();
});
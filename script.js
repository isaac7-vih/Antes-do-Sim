// ==============================
// CONFIGURAÇÕES EXATAS
// ==============================
const DATA_INICIO = new Date('2026-03-04T09:11:00');
const ordemDasTelas = ['abertura', 'lembrancas', 'contador', 'musica', 'carta', 'pedido', 'final'];
let telaAtual = 0;

// ==============================
// SOM SUAVE + VIBRAÇÃO NA DIGITAÇÃO
// ==============================
const somTeclado = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-typewriter-key-press-1222.mp3');
somTeclado.volume = 0.06;

function tocarTeclaEVibrar() {
  const somClone = somTeclado.cloneNode();
  somClone.volume = 0.06;
  somClone.play().catch(() => {});
  if (navigator.vibrate) navigator.vibrate(10);
}

// ==============================
// NAVEGAÇÃO - 100% FUNCIONAL
// ==============================
function atualizarBarraProgresso(){
  const percentual = ((telaAtual + 1) / ordemDasTelas.length) * 100;
  document.getElementById('barra').style.width = `${percentual}%`;
}

function proximaTela() {
  if(telaAtual >= ordemDasTelas.length - 1) return;

  document.getElementById(ordemDasTelas[telaAtual]).classList.remove('ativa');
  
  setTimeout(() => {
    telaAtual++;
    document.getElementById(ordemDasTelas[telaAtual]).classList.add('ativa');
    atualizarBarraProgresso();
    // Se for a tela de lembranças, começa a escrever automaticamente
    if(ordemDasTelas[telaAtual] === 'lembrancas'){
      setTimeout(escreverLembrancas, 1000);
    }
    // Se for a carta, começa a escrever
    if(ordemDasTelas[telaAtual] === 'carta'){
      setTimeout(escreverCarta, 1500);
    }
  }, 800);
}

// ==============================
// CONTADOR DE TEMPO
// ==============================
function atualizarContador(){
  const agora = new Date();
  const diferenca = agora - DATA_INICIO;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  document.getElementById('contador-tempo').innerHTML = `
    ${dias} dias, ${horas}h ${minutos}m ${segundos}s
  `;
}
setInterval(atualizarContador, 1000);
atualizarContador();

// ==============================
// ESTRELAS NO FUNDO
// ==============================
function criarEstrelas(){
  const ceu = document.getElementById('estrelas');
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

// ==============================
// LEMBRANÇAS - APARECENDO UMA POR UMA
// ==============================
const lembrancas = [
  {
    titulo: "Primeira Conversa",
    texto: "Foi ali, no intervalo, que eu ouvi a sua voz pela primeira vez... e já sabia que algo diferente ia acontecer."
  },
  {
    titulo: "Primeira Foto",
    texto: "Cada detalhe seu ficou guardado no meu coração como o meu lugar favorito no mundo."
  },
  {
    titulo: "Primeiro 'Eu Te Amo'",
    texto: "Quando disse isso, não foi só uma frase — foi a verdade mais pura que eu já senti em toda a minha vida."
  },
  {
    titulo: "Primeiro Beijo",
    texto: "Naquele momento, o mundo parou... e eu só queria que o tempo nunca mais passasse."
  },
  {
    titulo: "Por Quem Me Apaixonei",
    texto: "Me apaixonei por você inteira: pelo seu jeito, seu sorriso, sua calma e por me fazer sentir especial todos os dias."
  }
];

let indiceLembranca = 0;
let letra = 0;
const elemTitulo = document.getElementById('titulo-lembranca');
const elemTexto = document.getElementById('texto-lembranca');

function escreverLembrancas(){
  if(indiceLembranca >= lembrancas.length) return;
  
  const item = lembrancas[indiceLembranca];
  elemTitulo.textContent = item.titulo;
  const frase = item.texto;
  letra = 0;
  elemTexto.textContent = '';

  function digitar(){
    if(letra < frase.length){
      elemTexto.textContent += frase[letra];
      tocarTeclaEVibrar();
      letra++;
      setTimeout(digitar, 45);
    } else {
      indiceLembranca++;
      setTimeout(escreverLembrancas, 4000); // espera 4 seg e mostra a próxima
    }
  }
  digitar();
}

// ==============================
// ANIMAÇÃO DA CARTA
// ==============================
const textoCarta = `neném, eu sei que demorei, mas cada segundo valeu a pena pra eu te mostrar o quanto você é importante pra mim. O amor que eu sinto não pode ficar só em palavras faladas, ele precisa ser dito, mostrado e eternizado.

Hoje eu estou aqui, com o coração batendo forte, pra te dizer que você é tudo pra mim. Cada detalhe seu, cada sorriso, cada momento ao seu lado fez eu ter certeza: é você quem eu quero para toda a vida.

Eu te amo muito, muito mesmo, VICTORIA. Você transformou meus dias, deu cor ao meu mundo e fez eu entender o que é amar de verdade. E hoje, eu quero que a gente siga juntos, eternizando esse amor a cada dia que passar.`;

let letraCarta = 0;
const elementoCarta = document.getElementById('texto-carta');

function escreverCarta(){
  if(letraCarta < textoCarta.length){
    elementoCarta.textContent += textoCarta[letraCarta];
    tocarTeclaEVibrar();
    letraCarta++;
    setTimeout(escreverCarta, 45);
  }
}

// ==============================
// INICIA TUDO
// ==============================
window.addEventListener('load', () => {
  atualizarBarraProgresso();
});
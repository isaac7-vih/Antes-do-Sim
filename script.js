// 📅 Data do início do relacionamento
const DATA_INICIO = new Date('2026-03-04T00:00:00');

// ✨ Cria as estrelas de fundo
const fundoEstrelas = document.getElementById('fundo-estrelas');
for(let i = 0; i < 220; i++){
    const estrela = document.createElement('div');
    estrela.classList.add('estrela');
    estrela.style.width = estrela.style.height = (Math.random() * 2.8 + 0.4) + 'px';
    estrela.style.left = `${Math.random() * 100}%`;
    estrela.style.top = `${Math.random() * 100}%`;
    estrela.style.animationDelay = `${Math.random() * 3}s`;
    fundoEstrelas.appendChild(estrela);
}

// 📑 Controle de navegação entre telas
const ordemDasTelas = ['abertura', 'contador', 'historia', 'musica', 'galeria', 'carta', 'pedido', 'final'];
let telaAtual = 0;

function atualizarBarraProgresso(){
    const percentual = ((telaAtual + 1) / ordemDasTelas.length) * 100;
    document.getElementById('barra').style.width = `${percentual}%`;
}

function proximaTela() {
  if(telaAtual < ordemDasTelas.length - 1){
    document.getElementById(ordemDasTelas[telaAtual]).classList.remove('ativa');
    setTimeout(() => {
      telaAtual++;
      document.getElementById(ordemDasTelas[telaAtual]).classList.add('ativa');
      atualizarBarraProgresso();
    }, 800);
  }
}

// ⏳ Contador de tempo juntos
function atualizarContador(){
    const agora = new Date();
    const diferenca = agora - DATA_INICIO;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    document.getElementById('tempo').innerText = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
}
setInterval(atualizarContador, 1000);

// 💌 Efeito de digitação na carta
const textoDaCarta = `Neném...

Talvez você tenha percebido que, durante todo esse caminho, eu falei sobre o quanto você mudou a minha vida.

Mas existe uma pergunta que ficou guardada até agora. Porque eu queria fazer ela olhando para tudo aquilo que construímos juntos.

Cada segundo, cada sorriso, cada momento... tudo me levou até aqui.`;

let posicaoLetra = 0;
const areaCarta = document.getElementById('texto-carta');
const botaoContinuar = document.getElementById('btn-carta');

function escreverCarta(){
    if(posicaoLetra < textoDaCarta.length){
        areaCarta.innerText += textoDaCarta.charAt(posicaoLetra);
        posicaoLetra++;
        setTimeout(escreverCarta, 45);
    } else {
        botaoContinuar.style.display = 'inline-block';
    }
}

const observador = new MutationObserver(() => {
    if(document.getElementById('carta').classList.contains('ativa')){
        setTimeout(escreverCarta, 1000);
        observador.disconnect();
    }
});
observador.observe(document.getElementById('carta'), {attributes: true});

// ❤️ Efeitos quando ela aceitar
function aceitou(){
    proximaTela();

    // Fundo brilha suavemente
    document.body.style.transition = 'background 2s ease';
    document.body.style.background = 'radial-gradient(circle at center, #2b2410 0%, #1a150b 40%, #000000 100%)';

    // Chuva de corações
    for(let i = 0; i < 80; i++){
        setTimeout(() => {
            const coracao = document.createElement('div');
            coracao.innerHTML = Math.random() > 0.5 ? '❤️' : '🤍';
            coracao.style.position = 'fixed';
            coracao.style.left = `${Math.random() * 100}%`;
            coracao.style.top = `-40px`;
            coracao.style.fontSize = `${Math.random() * 24 + 16}px`;
            coracao.style.color = Math.random() > 0.6 ? '#ffd700' : '#ff4d6d';
            coracao.style.zIndex = '9999';
            coracao.style.animation = `cairSuave ${Math.random() * 3 + 2.5}s ease-in forwards`;
            document.body.appendChild(coracao);
            setTimeout(() => coracao.remove(), 5500);
        }, i * 50);
    }

    // ANIMAÇÃO SEQUENCIAL EXATA COMO VOCÊ PEDIU
document.addEventListener('DOMContentLoaded', function() {
  const momentos = [
    {
      titulo: "04/03, às 9h11 da manhã",
      texto: "Desde a primeira vez que a gente conversou, eu já senti algo completamente diferente de tudo o que eu já tinha sentido. Naquele exato momento eu já sabia que estava apaixonado... só que o medo de parecer muito emocionado tomou conta de mim, e eu não tive coragem de dizer logo de cara."
    },
    {
      titulo: "O primeiro sorriso",
      texto: "E naquele primeiro sorriso que você deu para mim... eu já me perdi de vez. Não existe nada mais lindo, nada mais perfeito em todo o universo. Ele simplesmente mudou tudo em minha vida."
    },
    {
      titulo: "O primeiro \"eu te amo\"",
      texto: "Eu tinha medo de dizer, achava que era cedo demais... mas a verdade é que eu já te amava muito antes de conseguir falar. Quando eu finalmente disse baixinho, foi a coisa mais verdadeira que já saiu da minha boca."
    },
    {
      titulo: "O primeiro beijo",
      texto: "Naquele instante eu senti algo que não tem nome. Foi como se o mundo inteiro tivesse parado só para nós dois. Foi o momento mais forte, mais verdadeiro e mais perfeito que eu já vivi em toda a minha vida. E ali eu tive certeza: nunca mais a minha vida seria a mesma."
    },
    {
      titulo: "Hoje",
      texto: "Hoje, quando eu olho para trás, eu vejo o quanto eu mudei... o quanto você me fez mudar para melhor. Você transformou a minha vida: deixou ela muito mais colorida, muito mais alegre, muito mais cheia de vida. Hoje eu sei que sem você eu não saberia onde estaria, não saberia como seria a minha vida. Eu te agradeço tanto, muito mesmo, por ter aparecido, por ter entrado e por ter ficado aqui comigo. Quando eu penso em como era antes de você... eu vejo que hoje é impossível, simplesmente impossível viver sem você. Minha vida não faz mais sentido se não for ao seu lado. E hoje eu choro, choro muito... de felicidade, de gratidão, de amor. Choro porque você chegou e fez tudo valer a pena. Choro porque você é a melhor coisa que já me aconteceu em toda a minha vida."
    }
  ];

  // CRIA O ESPAÇO ONDE VAI APARECER OS TEXTOS
  const container = document.createElement('div');
  container.className = 'espaco-momentos';
  document.body.appendChild(container);

  let indice = 0;

  function mostrarProximo() {
    if (indice >= momentos.length) return;

    // LIMPA O ANTERIOR
    container.innerHTML = '';

    // CRIA O NOVO TEXTO
    const caixa = document.createElement('div');
    caixa.className = 'cada-momento';
    caixa.style.opacity = '0';
    caixa.style.transition = 'opacity 0.8s ease';

    const titulo = document.createElement('h3');
    titulo.textContent = momentos[indice].titulo;

    const texto = document.createElement('p');
    texto.className = 'texto-escrito';

    caixa.appendChild(titulo);
    caixa.appendChild(texto);
    container.appendChild(caixa);

    // FAZ APARECER SUAVEMENTE
    setTimeout(() => caixa.style.opacity = '1', 100);

    // ANIMAÇÃO DE ESCREVER LETRA POR LETRA
    let letra = 0;
    const frase = momentos[indice].texto;
    function escrever() {
      if (letra < frase.length) {
        texto.textContent += frase[letra];
        tocarTeclaEVibrar();
        letra++;
        setTimeout(escrever, 45);
      } else {
        // DEPOIS DE TERMINAR DE ESCREVER: ESPERA 2 SEGUNDOS → SAI SUAVE → VEM O PRÓXIMO
        setTimeout(() => {
          caixa.style.opacity = '0';
          setTimeout(() => {
            indice++;
            mostrarProximo();
          }, 800);
        }, 2000); // AQUI ESTÃO OS 2 SEGUNDOS QUE VOCÊ PEDIU!
      }
    }
    escrever();
  }

  // COMEÇA TUDO AUTOMATICAMENTE
  mostrarProximo();
});
// SOM SUAVE + VIBRAÇÃO LEVE NA DIGITAÇÃO
const somTeclado = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-typewriter-key-press-1222.mp3');
somTeclado.volume = 0.06;

function tocarTeclaEVibrar() {
  const somClone = somTeclado.cloneNode();
  somClone.volume = 0.06;
  somClone.play().catch(() => {});

  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
}
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

function proximaTela(){
    if(telaAtual < ordemDasTelas.length - 1){
        document.getElementById(ordemDasTelas[telaAtual]).classList.remove('ativa');
        telaAtual++;
        setTimeout(() => {
            document.getElementById(ordemDasTelas[telaAtual]).classList.add('ativa');
            atualizarBarraProgresso();
        }, 1500);
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

    // Texto especial dentro do papel antigo
    setTimeout(() => {
    const caixa = document.getElementById('caixa-texto-final');
    const textoFinal = `Você chegou devagar e de repente tomou conta de todo o meu coração. Fez eu ver que o amor não é apenas palavras, é presença, é cuidado, é querer estar junto não importa o que aconteça.

Com você eu aprendi o que é ser feliz de verdade. Cada detalhe seu, cada sorriso, cada conversa… tudo fez eu ter certeza que esperei a vida inteira por alguém como você.

Hoje eu te peço para ficar comigo para sempre, porque ao seu lado é o meu lugar.`;

    let letra = 0;
    caixa.innerText = '';
    function escreverFinal(){
        if(letra < textoFinal.length){
            caixa.innerText += textoFinal.charAt(letra);
            letra++;
            setTimeout(escreverFinal, 45);
        }
    }
    escreverFinal();
}, 2000);
}

// 🎬 Animação extra dos corações
const estiloExtra = document.createElement('style');
estiloExtra.textContent = `
@keyframes cairSuave {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
`;
document.head.appendChild(estiloExtra);

// Inicializa a barra de progresso
atualizarBarraProgresso();
// CÓDIGO ANTI-ERRO PARA CARREGAR FOTOS
document.addEventListener('DOMContentLoaded', function() {
  const listaFotos = ['h1', 'h2', 'h3', 'h4', 'h5', 'capa-musica', 'papal'];
  
  listaFotos.forEach(nome => {
    const img = document.querySelector(`[data-foto="${nome}"]`);
    if (!img) return;

const tentativas = [
  `${nome}.jpg?v=3`,
  `${nome}.JPG?v=3`,
  `${nome}.png?v=3`,
  `${nome}.PNG?v=3`,
  `${nome}.jpeg?v=3`
];

    let indice = 0;
    function tentarProxima() {
      if (indice >= tentativas.length) return;
      img.src = tentativas[indice];
      indice++;
    }

    img.onerror = tentarProxima;
    img.onload = () => console.log(`✅ ${nome} carregou!`);
    tentarProxima();
  });
});
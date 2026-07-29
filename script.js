const DATA_INICIO = new Date('2026-03-04T09:11:00');
const ordemDasTelas = ['abertura', 'lembrancas', 'contador', 'musica', 'primeira-carta', 'segunda-carta', 'pedido', 'final'];
let telaAtual = 0;

const somTeclado = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-typewriter-key-press-1222.mp3');
somTeclado.volume = 0.05;
function tocarTeclaEVibrar() {
    const somClone = somTeclado.cloneNode();
    somClone.volume = 0.05;
    somClone.play().catch(() => {});
    if (navigator.vibrate) navigator.vibrate(15);
}

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
        
        if(ordemDasTelas[telaAtual] === 'lembrancas') setTimeout(escreverLembrancas, 1200);
        if(ordemDasTelas[telaAtual] === 'primeira-carta') setTimeout(escreverPrimeiraCarta, 1200);
        if(ordemDasTelas[telaAtual] === 'segunda-carta') setTimeout(escreverSegundaCarta, 1200);
    }, 1200);
}

function tocarMusica(){ document.getElementById('audio').play(); }
function pausarMusica(){ document.getElementById('audio').pause(); }

function atualizarContador(){
    const agora = new Date();
    const diferenca = agora - DATA_INICIO;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    document.getElementById('tempo').innerHTML = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}
setInterval(atualizarContador, 1000);
atualizarContador();

function criarEstrelas(){
    const fundo = document.getElementById('estrelas-fundo');
    const meio = document.getElementById('estrelas-meio');
    const frente = document.getElementById('estrelas-frente');
    for(let i=0; i<300; i++){
        const e = document.createElement('div');
        e.classList.add('estrela');
        e.style.left = `${Math.random()*100}%`;
        e.style.top = `${Math.random()*100}%`;
        e.style.animationDelay = `${Math.random()*5}s`;
        if(i<150) fundo.appendChild(e);
        else if(i<250) meio.appendChild(e);
        else frente.appendChild(e);
    }
}
criarEstrelas();

const lembrancas = [
    { titulo: "Primeira Conversa", texto: "Foi ali, naquela manhã de intervalo, que eu ouvi a sua voz pela primeira vez. Eu nem imaginava que aquele momento simples ia mudar a minha vida inteira para sempre. Desde ali, eu já senti que tinha encontrado algo diferente, algo verdadeiro." },
    { titulo: "Primeira Foto", texto: "Quando tiramos a primeira foto, eu fiquei olhando para ela horas depois. Cada detalhe seu, cada sorriso, tudo ficou guardado no meu coração como o lugar mais bonito que eu já conheci." },
    { titulo: "Primeiro 'Eu Te Amo'", texto: "Quando eu disse 'eu te amo' pela primeira vez, não foi uma frase jogada. Foi tudo o que eu sentia, tudo o que eu vinha guardando e que finalmente encontrou você para morar. Foi a verdade mais pura que eu já falei na minha vida." },
    { titulo: "Primeiro Beijo", texto: "Naquele instante, o mundo parou. Não existia mais ninguém, nada ao redor, só nós dois. E naquele beijo eu tive a certeza absoluta: era você. Sempre foi você." },
    { titulo: "Por Quem Me Apaixonei", texto: "Eu não me apaixonei só pelo seu rosto ou pelo seu jeito de falar. Eu me apaixonei por você inteira: pelo seu coração bom, pela sua calma, por como você me faz sentir especial todos os dias. Me apaixonei por quem você é, e isso é tudo para mim." }
];
let indiceL = 0, letraL = 0;
const elemTitulo = document.getElementById('titulo-lembranca');
const elemTextoL = document.getElementById('texto-lembranca');
function escreverLembrancas(){
    if(indiceL >= lembrancas.length) return;
    const item = lembrancas[indiceL];
    elemTitulo.textContent = item.titulo;
    const frase = item.texto;
    letraL = 0;
    elemTextoL.textContent = '';
    function digitar(){
        if(letraL < frase.length){
            elemTextoL.textContent += frase[letraL];
            tocarTeclaEVibrar();
            letraL++;
            setTimeout(digitar, 65);
        } else {
            indiceL++;
            setTimeout(escreverLembrancas, 5500);
        }
    }
    digitar();
}

const textoPrimeiraCarta = `neném, eu sei que demorei muito para te dizer tudo isso, mas cada segundo de espera valeu a pena para eu poder colocar aqui tudo o que você significa para mim. O amor que eu sinto não pode ficar escondido, ele precisa ser mostrado, dito e eternizado para o mundo todo ver.

Você chegou devagar, e hoje é a pessoa mais importante da minha vida. Você deu cor aos meus dias mais cinzentos, me ensinou o que é amar de verdade e me fez entender que o amor não é só palavras, é presença, é cuidado, é estar lá um para o outro em todos os momentos.`;
let letraP = 0;
const elemP = document.getElementById('texto-primeira-carta');
function escreverPrimeiraCarta(){
    if(letraP < textoPrimeiraCarta.length){
        elemP.textContent += textoPrimeiraCarta[letraP];
        tocarTeclaEVibrar();
        letraP++;
        setTimeout(escreverPrimeiraCarta, 65);
    }
}

const textoSegundaCarta = `E hoje, depois de tudo o que vivemos, eu não quero mais ficar só no "ficar". Eu quero ser seu, de verdade, para todos os dias. Quero poder dizer para todo mundo quem é a dona do meu coração. Quero poder te cuidar, te amar e estar ao seu lado em todos os momentos, bons e ruins.

Victoria, você é tudo para mim. Você é o meu sorriso, a minha paz, o meu lugar. E eu não quero mais nada nessa vida se não for ao seu lado.`;
let letraS = 0;
const elemS = document.getElementById('texto-segunda-carta');
function escreverSegundaCarta(){
    if(letraS < textoSegundaCarta.length){
        elemS.textContent += textoSegundaCarta[letraS];
        tocarTeclaEVibrar();
        letraS++;
        setTimeout(escreverSegundaCarta, 65);
    }
}

window.addEventListener('load', atualizarBarraProgresso);
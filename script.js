const DATA_INICIO = new Date('2026-03-04T09:11:00');
const ordemTelas = ['abertura','lembrancas','contador','carta','pedido','final'];
let telaAtual = 0;
let indiceMomento = 0;
let textoAtual = '';
let posicaoLetra = 0;
let intervalo;

// CRIA 300 ESTRELAS DE VERDADE, SE MEXENDO EM CAMADAS
function criarEstrelas(){
    const fundo = document.getElementById('estrelas-fundo');
    const meio = document.getElementById('estrelas-meio');
    const frente = document.getElementById('estrelas-frente');
    for(let i=0; i<300; i++){
        const e = document.createElement('div');
        e.classList.add('estrela');
        e.style.left = `${Math.random()*100}%`;
        e.style.top = `${Math.random()*100}%`;
        e.style.animationDelay = `${Math.random()*4}s`;
        if(i<150) fundo.appendChild(e);
        else if(i<240) meio.appendChild(e);
        else frente.appendChild(e);
    }
}

// SEUS TEXTOS EXATOS
const momentos = [
    {
        titulo: "Desde a primeira vez que a gente conversou",
        texto: "Desde a primeira vez que a gente conversou, eu já senti algo completamente diferente de tudo o que eu já tinha sentido. Naquele exato momento eu já sabia que estava apaixonado... só que o medo de parecer muito emocionado tomou conta de mim, e eu não tive coragem de dizer logo de cara."
    },
    {
        titulo: "✨ O primeiro sorriso",
        texto: "E naquele primeiro sorriso que você deu para mim... eu já me perdi de vez. Não existe nada mais lindo, nada mais perfeito em todo o universo. Ele simplesmente mudou tudo em minha vida."
    },
    {
        titulo: "💛 O primeiro 'eu te amo'",
        texto: "Eu tinha medo de dizer, achava que era cedo demais... mas a verdade é que eu já te amava muito antes de conseguir falar. Quando eu finalmente disse baixinho, foi a coisa mais verdadeira que já saiu da minha boca."
    },
    {
        titulo: "💋 O primeiro beijo",
        texto: "Naquele instante eu senti algo que não tem nome. Foi como se o mundo inteiro tivesse parado só para nós dois. Foi o momento mais forte, mais verdadeiro e mais perfeito que eu já vivi em toda a minha vida. E ali eu tive certeza: nunca mais a minha vida seria a mesma."
    },
    {
        titulo: "❤️ Hoje",
        texto: "Hoje, quando eu olho para trás, eu vejo o quanto eu mudei... o quanto você me fez mudar para melhor. Você transformou a minha vida: deixou ela muito mais colorida, muito mais alegre, muito mais cheia de vida. Hoje eu sei que sem você eu não saberia onde estaria, não saberia como seria a minha vida. Eu te agradeço tanto, muito mesmo, por ter aparecido, por ter entrado e por ter ficado aqui comigo. Quando eu penso em como era antes de você... eu vejo que hoje é impossível, simplesmente impossível viver sem você. Minha vida não faz mais sentido se não for ao seu lado. E hoje eu choro, choro muito... de felicidade, de gratidão, de amor. Choro porque você chegou e fez tudo valer a pena. Choro porque você é a melhor coisa que já me aconteceu em toda a minha vida."
    }
];

const textoCarta = `Bee, existe uma coisa que eu preciso que você saiba. Desde que você entrou na minha vida, eu nunca mais fui o mesmo. Você mudou a forma como eu vejo o amor, mudou a forma como eu enxergo o futuro e, principalmente, mudou a forma como eu vejo a mim mesmo.

Ao seu lado, eu aprendi que amar alguém é muito mais do que dizer “eu te amo”. Amar é escolher, cuidar, permanecer e fazer questão da presença da outra pessoa todos os dias.

E, sem perceber, foi exatamente isso que aconteceu comigo. Todos os dias, sem exceção, eu escolho você. Escolho o seu sorriso, o seu jeito, a sua companhia e até os pequenos momentos que, quando estou com você, se tornam inesquecíveis.

Você fez do meu coração um lugar mais leve, mais feliz e mais cheio de esperança. E, se hoje eu pudesse fazer apenas um pedido, seria que a vida continuasse me dando a oportunidade de viver muitos outros momentos ao seu lado, porque, sinceramente, foi em você que eu encontrei tudo aquilo que eu nem sabia que estava procurando.`;

const textoFinal = `Bee, se você chegou até aqui, é porque percorreu cada pedacinho da história que eu quis contar. Mas, na verdade, tudo isso teve um único motivo: mostrar que você é a melhor escolha que a vida poderia ter me dado.

Eu não sei o que o futuro reserva para nós, mas sei que quero descobrir cada capítulo ao seu lado. Quero continuar fazendo você sorrir, estar presente nos seus dias bons e segurar sua mão nos dias difíceis.

Obrigado por aceitar ser minha para sempre. Eu te amo, meu amor! ❤️`;

// DIGITAÇÃO NA VELOCIDADE IDEAL
function digitar(elemento, texto){
    clearInterval(intervalo);
    textoAtual = texto;
    posicaoLetra = 0;
    elemento.textContent = '';
    intervalo = setInterval(() => {
        if(posicaoLetra < texto.length){
            elemento.textContent += texto[posicaoLetra];
            posicaoLetra++;
        } else {
            clearInterval(intervalo);
        }
    }, 52);
}

function proximoTexto(){
    indiceMomento++;
    if(indiceMomento >= momentos.length) {
        alert("Já viu todas as lembranças! Clique em Próxima etapa");
        return;
    }
    carregarMomento();
}


function proximaTela(){
    if(telaAtual >= ordemTelas.length -1) return;
    document.getElementById(ordemTelas[telaAtual]).classList.remove('ativa');
    telaAtual++;
    document.getElementById(ordemTelas[telaAtual]).classList.add('ativa');

    if(ordemTelas[telaAtual] === 'lembrancas'){
        indiceMomento = 0;
        carregarMomento();
    }
    if(ordemTelas[telaAtual] === 'carta'){
        digitar(document.getElementById('texto-carta'), textoCarta);
    }
    // AQUI ESTAVA FALTANDO GARANTIR QUE VAI RODAR:
    if(ordemTelas[telaAtual] === 'final'){
        setTimeout(() => {
            digitar(document.getElementById('texto-final'), textoFinal);
        }, 800); // Espera só um pouquinho para aparecer suave
    }
}

function carregarMomento(){
    if(indiceMomento >= momentos.length) return;
    const m = momentos[indiceMomento];
    document.getElementById('titulo-momento').textContent = m.titulo;
    digitar(document.getElementById('texto-momento'), m.texto);
}

// MÚSICA CERTA
function tocarMusica(){ document.getElementById('player').play().catch(e=>console.log("Clique para tocar")); }
function pausarMusica(){ document.getElementById('player').pause(); }

// NAVEGAÇÃO SUAVE
function proximaTela(){
    if(telaAtual >= ordemTelas.length -1) return;
    document.getElementById(ordemTelas[telaAtual]).classList.remove('ativa');
    telaAtual++;
    document.getElementById(ordemTelas[telaAtual]).classList.add('ativa');

    if(ordemTelas[telaAtual] === 'lembrancas'){
        indiceMomento = 0;
        carregarMomento();
    }
    if(ordemTelas[telaAtual] === 'carta'){
        digitar(document.getElementById('texto-carta'), textoCarta);
    }
    if(ordemTelas[telaAtual] === 'final'){
        digitar(document.getElementById('texto-final'), textoFinal);
    }
}

function carregarMomento(){
    if(indiceMomento >= momentos.length) return;
    const m = momentos[indiceMomento];
    document.getElementById('titulo-momento').textContent = m.titulo;
    digitar(document.getElementById('texto-momento'), m.texto);
    indiceMomento++;
}

// CONTADOR EXATO
function atualizarContador(){
    const agora = new Date();
    const dif = agora - DATA_INICIO;
    const d = Math.floor(dif / 86400000);
    const h = Math.floor((dif % 86400000) / 3600000);
    const m = Math.floor((dif % 3600000) / 60000);
    const s = Math.floor((dif % 60000) / 1000);
    document.getElementById('contador-tempo').innerHTML = `${d} dias, ${h}h ${m}m ${s}s`;
}

// CHUVA DE CORAÇÕES
function aceitou(){
    document.getElementById('pedido').classList.remove('ativa');
    const chuva = document.getElementById('chuva-coracoes');
    chuva.style.display = 'block';
    
    for(let i=0; i<100; i++){
        setTimeout(() => {
            const cor = document.createElement('div');
            cor.classList.add('coracao');
            cor.innerHTML = '❤️';
            cor.style.fontSize = `${Math.random()*28 + 12}px`;
            cor.style.left = `${Math.random()*100}%`;
            cor.style.animationDuration = `${Math.random()*2 + 4}s`;
            chuva.appendChild(cor);
        }, i * 60);
    }

    setTimeout(() => {
        chuva.style.display = 'none';
        document.getElementById('final').classList.add('ativa');
    }, 6500);
}

// INICIA TUDO PERFEITAMENTE
criarEstrelas();
setInterval(atualizarContador, 1000);
digitar(document.getElementById('texto-abertura'), 'Toda grande história tem um começo... e a nossa começou ali.');
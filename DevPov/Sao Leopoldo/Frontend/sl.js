const perguntas = [
  {
    pergunta:
      "Seu primeiro dia de aula de programação começa em 1 hora. O que você faz?",
    opcoes: [
      "a) Chego com antecedência e testo meu notebook antes",
      "b) Levo um caderno para anotações e meu carregador",
      "c) Assisto um vídeo rápido de introdução no caminho",
    ],
    recompensaDinheiro: 500,
  },
  {
    pergunta: "Ao digitar seu primeiro código, aparece um erro vermelho. Você:",
    opcoes: [
      "a) Leio a mensagem de erro com calma para entender",
      "b) Peço ajuda ao professor ou colega",
      "c) Verifico se fechei todos os parênteses e chaves",
    ],
    recompensaDinheiro: 600,
  },
  {
    pergunta:
      "O professor explica sobre 'funções'. Você não entendeu. O que faz?",
    opcoes: [
      "a) Anoto a dúvida para pesquisar depois",
      "b) Levanto a mão e peço para repetir",
      "c) Procuro exemplos práticos na internet",
    ],
    recompensaDinheiro: 700,
  },
  {
    pergunta: "Na hora de instalar o VS Code, você:",
    opcoes: [
      "a) Segue um tutorial passo a passo",
      "b) Pergunta qual versão baixar",
      "c) Testo as extensões recomendadas",
    ],
    recompensaDinheiro: 800,
  },
  {
    pergunta: "Um colega diz que HTML não é linguagem de programação. Você:",
    opcoes: [
      "a) Concordo, pois é uma linguagem de marcação",
      "b) Pesquiso para entender a diferença",
      "c) Pergunto por que ele diz isso",
    ],
    recompensaDinheiro: 900,
  },
  {
    pergunta: "Seu código funciona, mas parece confuso. O que você faz?",
    opcoes: [
      "a) Adiciono comentários para explicar",
      "b) Peço feedback a alguém experiente",
      "c) Tento refatorar para ficar mais claro",
    ],
    recompensaDinheiro: 1000,
  },
  {
    pergunta: "PARABÉNS! Você terminou o básico. Agora vai:",
    opcoes: [
      "a) Dizer que já é pleno no LinkedIn",
      "b) Fazer um curso mais avançado na mesma linguagem",
      "c) Tentar criar um projetinho pessoal",
    ],
    respostaCorreta: 2,
    recompensaDinheiro: 1500,
    requercasa: true,
  },
];

let perguntaAtual = 0;
let xp = 0;
let dinheiro = 0;
let casaComprado = false;
const xpTotalAdicional = 5000;
const xpPorPergunta = Math.floor(xpTotalAdicional / perguntas.length);
const xpExtraFinal = xpTotalAdicional - xpPorPergunta * (perguntas.length - 1);

let modalTarefas;
let perguntaTexto;
let opcoesContainer;
let proximaBtn;
let xpDisplay;
let dinheiroDisplay;

document.addEventListener("DOMContentLoaded", () => {
  modalTarefas = document.getElementById("modal-tarefas");
  perguntaTexto = document.getElementById("pergunta-texto");
  opcoesContainer = document.getElementById("opcoes-container");
  proximaBtn = document.getElementById("proxima-btn");
  xpDisplay = document.getElementById("xp");
  dinheiroDisplay = document.getElementById("dinheiro");

  xpDisplay.textContent = xp;
  dinheiroDisplay.textContent = dinheiro;
});

function abrirApp(app) {
  if (app === "Tarefas") {
    modalTarefas.classList.remove("hidden");
    mostrarPergunta();
  } else if (app === "Loja") {
    abrirLoja();
  }
}

function abrirLoja() {
  let modalLoja = document.getElementById("modal-loja");
  if (!modalLoja) {
    modalLoja = document.createElement("div");
    modalLoja.id = "modal-loja";
    modalLoja.className = "modal";
    modalLoja.innerHTML = `
      <div class="modal-content">
        <span class="close" onclick="fecharModalLoja()">&times;</span>
        <h2>🛒 Loja de Itens</h2>
        <div id="itens-loja">
          <div class="item-loja">
            <h3>🏠 Casa em Porto Alegre</h3>
            <p>Necessário para trabalhar em Porto</p>
            <p><strong>Preço: $${dinheiro}</strong></p>
            <button onclick="comprarCasa()">Comprar</button>
            <p id="casa-status">${
              casaComprado ? "Comprado ✅" : "Não comprado ❌"
            }</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalLoja);
  } else {
    const precocasaElement = modalLoja.querySelector(".item-loja p strong");
    if (precocasaElement) {
      precocasaElement.textContent = `Preço: $${dinheiro}`;
    }

    const casaStatusDisplay = document.getElementById("casa-status");
    if (casaStatusDisplay) {
      casaStatusDisplay.textContent = casaComprado
        ? "Comprado ✅"
        : "Não comprado ❌";
      casaStatusDisplay.style.color = casaComprado ? "#4CAF50" : "#f44336";
    }
    modalLoja.classList.remove("hidden");
  }
}

function fecharModalLoja() {
  const modalLoja = document.getElementById("modal-loja");
  if (modalLoja) {
    modalLoja.classList.add("hidden");
  }
}

function fecharModal() {
  modalTarefas.classList.add("hidden");
}

function mostrarPergunta() {
  if (perguntaAtual >= perguntas.length) {
    perguntaTexto.textContent = `🎉 Missão concluída! Você ganhou +${xpTotalAdicional} XP e agora tem ${xp} XP no total.`;
    [];
    opcoesContainer.innerHTML = `<button onclick="window.location.href='../../Porto%20Alegre/Frontend/desktopPortoAlegre.html'">Ir para a próxima fase!</button>`;
    proximaBtn.classList.add("hidden");
    return;
  }

  function vitoria() {
    window.location.href = "WIN.html";
  }

  function gameOver() {
    window.location.href = "LOOSE.html";
  }

  const pergunta = perguntas[perguntaAtual];

  if (pergunta.requercasa && !casaComprado) {
    mostrarModalCompracasa();
    return;
  }

  perguntaTexto.textContent = pergunta.pergunta;
  opcoesContainer.innerHTML = "";
  proximaBtn.classList.add("hidden");

  pergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.className = "opcao-btn";
    botao.textContent = opcao;
    botao.onclick = () => selecionarOpcao(index);
    opcoesContainer.appendChild(botao);
  });
}

function selecionarOpcao(opcaoIndex) {
  const pergunta = perguntas[perguntaAtual];
  const botoes = document.querySelectorAll(".opcao-btn");

  if (
    perguntaAtual === perguntas.length - 1 &&
    pergunta.respostaCorreta !== undefined &&
    opcaoIndex !== pergunta.respostaCorreta
  ) {
    perguntaTexto.textContent =
      "⚠️ Essa não é a atitude esperada de um profissional na nossa empresa. Tente novamente!";
    return;
  }

  botoes.forEach((botao) => {
    botao.disabled = true;
    botao.style.opacity = "0.7";
  });

  botoes[opcaoIndex].style.backgroundColor = "#4CAF50";

  dinheiro += pergunta.recompensaDinheiro;
  dinheiroDisplay.textContent = dinheiro;

  if (
    perguntaAtual !== perguntas.length - 1 ||
    opcaoIndex === pergunta.respostaCorreta
  ) {
    if (perguntaAtual === perguntas.length - 1) {
      xp += xpExtraFinal;
    } else {
      xp += xpPorPergunta;
    }
    xpDisplay.textContent = xp;
  }

  proximaBtn.classList.remove("hidden");
}

function proximaPergunta() {
  perguntaAtual++;
  mostrarPergunta();
}

function mostrarModalCompracasa() {
  const modalCompra = document.createElement("div");
  modalCompra.id = "modal-compra";
  modalCompra.className = "modal";
  modalCompra.innerHTML = `
    <div class="modal-content">
      <h2>🛂 Casa de Trabalho Porto Alegre - Obrigatório</h2>
      <p>Para trabalhar em Porto Alegre, você precisa alugar uma casa de trabalho.</p>
      <p><strong>Preço: $${dinheiro}</strong></p>
      <p>Seu saldo atual: $${dinheiro}</p>
      <div style="margin-top: 30px;">
        <button onclick="comprarCasa(true)">Comprar Agora</button>
        <button onclick="fecharModalCompra()">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalCompra);
}

function fecharModalCompra() {
  const modal = document.getElementById("modal-compra");
  if (modal) {
    modal.remove();
  }
}

function comprarCasa(automatico = false) {
  if (dinheiro > 0) {
    dinheiro = 0;
    casaComprado = true;
    dinheiroDisplay.textContent = dinheiro;

    const casaStatusDisplay = document.getElementById("casa-status");
    if (casaStatusDisplay) {
      casaStatusDisplay.textContent = "Comprado ✅";
      casaStatusDisplay.style.color = "#4CAF50";
    }

    fecharModalCompra();

    if (perguntaAtual === 6) {
      modalTarefas.classList.remove("hidden");
      mostrarPergunta();
    } else {
      modalTarefas.classList.remove("hidden");
      mostrarPergunta();
    }
  } else {
    alert("❌ Você não tem dinheiro! Complete tarefas para ganhar dinheiro.");
    fecharModalCompra();
  }
}

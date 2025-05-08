const perguntas = [
  {
    pergunta:
      "Você foi chamado para uma entrevista no centro da cidade às 9h. Mora na zona leste e está em dúvida sobre o transporte. O que faz?",
    opcoes: [
      "a) Acordo às 8h e pego um ônibus direto",
      "b) Saio com 2h de antecedência e planejo a rota",
      "c) Peço carona e deixo no destino",
    ],
    recompensaDinheiro: 800,
  },
  {
    pergunta:
      "O recrutador pergunta sobre sua experiência com trabalho em equipe. Você…",
    opcoes: [
      "a) Diz que prefere trabalhar sozinho",
      "b) Conta como resolveu um problema em grupo",
      "c) Diz que nunca trabalhou em equipe",
    ],
    recompensaDinheiro: 950,
  },
  {
    pergunta:
      "Na startup, um colega propõe uma solução inovadora mas arriscada. Você…",
    opcoes: [
      "a) Critica a ideia na frente de todos",
      "b) Sugere analisar prós e contras",
      "c) Ignora e continua trabalhando",
    ],
    recompensaDinheiro: 1100,
  },
  {
    pergunta: "Seu chefe pede um relatório urgente com pouco tempo. Você…",
    opcoes: [
      "a) Copia da internet",
      "b) Pede ajuda e faz o melhor",
      "c) Faz rápido sem revisar",
    ],
    recompensaDinheiro: 850,
  },
  {
    pergunta:
      "Acontece uma reunião na empresa, em um assunto no qual você domina. Você...",
    opcoes: ["a) Domina a conversa", "b) Contribui e ouve", "c) Não participa"],
    recompensaDinheiro: 1200,
  },
  {
    pergunta: "Recebe uma proposta com salário abaixo do esperado. Você…",
    opcoes: [
      "a) Aceita, renegociando o salário",
      "b) Avalia aprendizado e crescimento",
      "c) Aceita sem questionar",
    ],
    recompensaDinheiro: 1500,
  },
  {
    pergunta:
      "Parabéns pela promoção! Seu novo chefe na Califórnia transfere você para lá:",
    opcoes: [
      "a) Você aceitar sem pensar duas vezes",
      "b) Começa a estudar seu inglês imediatamente",
      "c) Você fica pois gosta de sua vida em São Paulo",
    ],
    respostaCorreta: 1,
    requerVisto: true,
  },
];

let perguntaAtual = 0;
let xp = 10000;
let dinheiro = 0;
let vistoComprado = false;
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
            <h3>🛂 Visto de Trabalho EUA</h3>
            <p>Necessário para trabalhar em São Francisco</p>
            <p><strong>Preço: $${dinheiro}</strong></p>
            <button onclick="comprarVisto()">Comprar</button>
            <p id="visto-status">${
              vistoComprado ? "Comprado ✅" : "Não comprado ❌"
            }</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalLoja);
  } else {
    const precoVistoElement = modalLoja.querySelector(".item-loja p strong");
    if (precoVistoElement) {
      precoVistoElement.textContent = `Preço: $${dinheiro}`;
    }

    const vistoStatusDisplay = document.getElementById("visto-status");
    if (vistoStatusDisplay) {
      vistoStatusDisplay.textContent = vistoComprado
        ? "Comprado ✅"
        : "Não comprado ❌";
      vistoStatusDisplay.style.color = vistoComprado ? "#4CAF50" : "#f44336";
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
    opcoesContainer.innerHTML = `<button onclick="window.location.href='../../São%20Francisco/Frontend/SF.html'">Ir para a próxima fase</button>`;
    proximaBtn.classList.add("hidden");
    return;
  }

  const pergunta = perguntas[perguntaAtual];

  if (pergunta.requerVisto && !vistoComprado) {
    mostrarModalCompraVisto();
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

function mostrarModalCompraVisto() {
  const modalCompra = document.createElement("div");
  modalCompra.id = "modal-compra";
  modalCompra.className = "modal";
  modalCompra.innerHTML = `
    <div class="modal-content">
      <h2>🛂 Visto de Trabalho EUA - Obrigatório</h2>
      <p>Para trabalhar em São Francisco, você precisa adquirir seu visto de trabalho.</p>
      <p><strong>Preço: $${dinheiro}</strong></p>
      <p>Seu saldo atual: $${dinheiro}</p>
      <div style="margin-top: 30px;">
        <button onclick="comprarVisto(true)">Comprar Agora</button>
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

function comprarVisto(automatico = false) {
  if (dinheiro > 0) {
    dinheiro = 0;
    vistoComprado = true;
    dinheiroDisplay.textContent = dinheiro;

    const vistoStatusDisplay = document.getElementById("visto-status");
    if (vistoStatusDisplay) {
      vistoStatusDisplay.textContent = "Comprado ✅";
      vistoStatusDisplay.style.color = "#4CAF50";
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

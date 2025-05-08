let xp = 15000;
let dinheiro = 500;
let comprouVR = false;
let abriuEscolhas = false;

// Atualizar valores na tela ao iniciar
document.getElementById("xp").innerText = xp;
document.getElementById("dinheiro").innerText = dinheiro;

function abrirApp(app) {
  fecharModal(); // fecha todos antes de abrir
  abrirModal(app);
}

function abrirModal(app) {
  let modalId = "";

  switch (app) {
    case "Email":
      modalId = "modal-email";
      break;
    case "Google":
      modalId = "modal-google";
      break;
    case "VSCode":
      modalId = "modal-vscode";
      break;
    case "GitHub":
      modalId = "modal-github";
      break;
    case "Tarefas":
      modalId = "modal-tarefas";
      break;
    case "Loja":
      modalId = "modal-loja";
      break;
    case "Final":
      modalId = "modal-final";
      break;
    default:
      console.error("App desconhecido:", app);
      return;
  }

  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
  }
}

function fecharModal() {
  const modais = document.querySelectorAll(".modal");
  modais.forEach((modal) => {
    modal.style.display = "none";
  });
}

function comprarItem() {
  if (dinheiro >= 1000) {
    dinheiro -= 1000;
    comprouVR = true;
    atualizarTela();
    mostrarToast("Você comprou o Óculos VR!");
  } else {
    mostrarToast("Dinheiro insuficiente!");
  }
}

function completarTask(task) {
  let ganhoXp = 0;
  let ganhoDinheiro = 0;

  switch (task) {
    case "comprar-dados":
    case "google-dorking":
    case "atualizar-algoritmo":
    case "debug":
    case "reuniao":
      ganhoXp = 500;
      ganhoDinheiro = 200;
      break;
    case "especial-vr":
      if (comprouVR) {
        ganhoXp = Math.random() > 0.5 ? 2500 : -100;
        ganhoDinheiro = 100;
      } else {
        mostrarToast("Você precisa comprar o Óculos VR primeiro!");
        return;
      }
      break;
    default:
      console.error("Tarefa desconhecida:", task);
      return;
  }

  xp = Math.min(xp + ganhoXp, 20000);
  dinheiro += ganhoDinheiro;
  atualizarTela();

  if (task === "especial-vr" && ganhoXp < 0) {
    mostrarToast("Você falhou na tarefa VR e perdeu 100 XP!");
  } else {
    mostrarToast(`+${ganhoXp} XP | +$${ganhoDinheiro}`);
  }

  fecharModal();

  if (xp >= 19000 && !abriuEscolhas) {
    abriuEscolhas = true;
    setTimeout(() => abrirModal("Final"), 500);
  }
}

function atualizarTela() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("dinheiro").innerText = dinheiro;
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.innerText = mensagem;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = "toast";
  }, 2000);
}

function escolherFinal(destino) {
  fecharModal();
  if (destino === "empresa") {
    vitoria();
  } else if (destino === "bigtech") {
    gameOver();
  }
}

function vitoria() {
  window.location.href = "WIN.html";
}

function gameOver() {
  window.location.href = "LOOSE.html";
}

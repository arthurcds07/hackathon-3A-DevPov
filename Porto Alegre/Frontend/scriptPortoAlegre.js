
let xp = 5000;
let dinheiro = 0;
const idJogador = "jogador1";


// Atualiza os valores na tela
function atualizarInfoJogador() {
  document.getElementById('dinheiro').textContent = dinheiro;
  document.getElementById('xp').textContent = xp;
}

// Puxa o progresso do jogador
async function carregarProgresso() {
  try {
    const resposta = await fetch(`http://localhost:3000/progresso/${idJogador}`);
    if (!resposta.ok) {
      throw new Error('Não foi possível carregar o progresso.');
    }

    const dados = await resposta.json();
    dinheiro = dados.money;
    xp = dados.xp;
    atualizarInfoJogador();
  } catch (erro) {
    console.error('Erro ao carregar progresso:', erro);
  }
}


async function salvarProgresso() {
  try {
    await fetch(`http://localhost:3000/progresso/${idJogador}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ money: dinheiro, xp: xp })
    });
  } catch (error) {
    console.error(error);
  }
}




// Função para atualizar o XP no HTML
function atualizarXP() {
  const xpElemento = document.getElementById('xp');
  xpElemento.textContent = xp;
}

// Função para atualizar o dinheiro no HTML (se precisar)
function atualizarDinheiro() {
  const dinheiroElemento = document.getElementById('dinheiro');
  dinheiroElemento.textContent = `$${dinheiro}`;
}


// Função para abrir um modal
function abrirModal(idModal) {
  document.getElementById(idModal).classList.remove('hidden');
}

// Função para fechar um modal
function fecharModal(idModal) {
  document.getElementById(idModal).classList.add('hidden');
}


// Função para abrir o modal de cada app
function abrirApp(app) {
  switch (app) {
    case 'Email':
      abrirModal('modal-email');
      break;
    case 'Tarefas':
      abrirModal('modal-tarefas');
      break;
    case 'VSCode':
      abrirModal('modal-vscode');
      break;
    case 'Loja':
      abrirModal('modal-loja');
      break;
    default:
      console.log(`App ${app} clicado (não tem funcionalidade ainda)`);
  }
}


// TAREFAS!!
// Funções individuais para cada tarefa
function fazerMelhorarGithub() {
  const botao = document.getElementById('tarefa-github');
  botao.disabled = true;
  setTimeout(() => {
    ganharXP(100);
    botao.disabled = false;
  }, 5000); // 5 segundos
}

function fazerEspecializarLinguagem() {
  const botao = document.getElementById('tarefa-linguagem');
  botao.disabled = true;
  setTimeout(() => {
    ganharXP(200);
    botao.disabled = false;
  }, 10000); // 10 segundos
}

function fazerFreelancer() {
  const botao = document.getElementById('tarefa-freelancer');
  botao.disabled = true;
  setTimeout(() => {
    ganharXP(300);
    ganharDinheiro(100); // Ganha $100 também
    botao.disabled = false;
  }, 15000); // 15 segundos
}

// Funções pra xp, dinheiro e progresso
function ganharXP(qtd) {
  xp += qtd;
  atualizarXP();
  verificarProgressoParaTrabalho(); // Verifica se atingiu 6000 XP
  taskFinal(); // Verifica se atingiu 9000 XP
  verificarProgresso(); // Verifica se atingiu 10000 XP
  salvarProgresso(); 


}

function ganharDinheiro(qtd) {
  dinheiro += qtd;
  atualizarDinheiro();
  salvarProgresso();
}




// Função para verificar se atingiu 6000 XP e alterar o email e a loja
function verificarProgressoParaTrabalho() {
  if (xp >= 6000) {
    // Atualiza o conteúdo do email
    document.getElementById('email-conteudo').innerHTML = `
      <p>Parabéns DevPlayer!</p>
      <p>Você foi aceito para a vaga de emprego em Porto Alegre! 🎉</p>
      <p>Prepare-se para novos desafios e continue sua jornada!</p>
    `;

    // Atualiza o conteúdo da loja

    
    document.getElementById('modal-loja').innerHTML = `
      <div class="modal-conteudo">
       <button class="fechar-modal fechar-modal-loja" onclick="fecharModal('modal-loja')">✖</button>
        <h2>🛒Loja</h2>
        <p>Comprar Máquina de Café Expresso por $300?</p>
        <button onclick="comprarCafe()" class='botao-comprar'>Comprar</button>
      </div>
    `;
    const botaoComprar = document.querySelector('.botao-comprar');
    botaoComprar.style.backgroundColor = '#4F46E5';
    botaoComprar.style.display = 'block';
    botaoComprar.style.width = '100%';
    botaoComprar.style.margin = '10px 0';
    botaoComprar.style.padding = '12px 20px';
    botaoComprar.style.color = 'white';  
    botaoComprar.style.fontSize = '16px'; 
    botaoComprar.style.fontWeight = 'bold'; 
    botaoComprar.style.border = 'none'; 
    botaoComprar.style.borderRadius = '8px'; 
    botaoComprar.style.cursor = 'pointer';
    botaoComprar.style.transition = 'background-color 0.3s ease, transform 0.2s ease'; 

    atualizarLoja(); 
    salvarProgresso();
  }
}

// Função para a task final
function taskFinal() {
  if (xp >= 9000) {
    alert("Você tem um novo e-mail!");

    document.getElementById('email-conteudo').innerHTML = `
      
      <p>Olá DevPlayer!</p>
      <p>Vemos que está se dando muito bem aí em Porto Alegre, mas será que não chegou a hora de buscar novos desafios?</p>
      <p>Faça as escolhas certas para sua vida e busque novos desafios!</p>
      <button onclick="iniciarDesafioFinal()" class="botao-aceitar-desafio">Aceitar o Desafio</button>
     
    `;

    // Desabilitar as tarefas
    document.getElementById('tarefa-github').disabled = true;
    document.getElementById('tarefa-linguagem').disabled = true;
    document.getElementById('tarefa-freelancer').disabled = true;
    document.getElementById('virar-noite-codando').disabled = true;
  }
}


function iniciarDesafioFinal() {
  // Mostra o modal do desafio final
 
  document.getElementById('modal-desafio-final').classList.remove('hidden');
  document.getElementById('modal-email').classList.add('hidden');  
  // Monta as 3 primeiras opções
  document.getElementById('opcoes-finais').innerHTML = `

    <div class="escolhas">
    <button onclick="escolhaInicial('startup')" class="botao-aceitar">Trabalhar em Startup Pequena</button>
    <button onclick="escolhaInicial('freelancer')" class="botao-aceitar">Virar Freelancer Tempo Integral</button>
    <button onclick="escolhaInicial('multinacional')" class="botao-aceitar">Entrar em Multinacional de Tecnologia</button>
    </div>
  `;
}

//ESCOLHA CERTA
function escolhaInicial(escolha) {
  if (escolha === 'multinacional') {
    // Escolha correta! Avança para próxima etapa
    document.getElementById('opcoes-finais').innerHTML = `

     <div class="escolhas">
      <h3>Qual caminho seguir dentro da multinacional?</h3>
      <button onclick="escolhaFinal('gestao')" class="botao-aceitar">Seguir carreira de gestão</button>
      <button onclick="escolhaFinal('especialista')" class="botao-aceitar">Especializar em tecnologia</button>
      </div>
    `;
  } else {
    // ESCOLHA ERRADA! 
    alert("Escolha errada! Você perdeu o jogo 😢");
    location.reload(); // Recarrega a página
  }
}

function escolhaFinal(caminho) {
  if (caminho === 'especialista') {
    // ESCOLHA CERTA!
    alert("Parabéns! Você se tornou um Dev Sênior! 🎉");
    xp += 1000; // Garante que tenha 10.000 XP 
    salvarProgresso(); 
    verificarProgresso(); // Verifica se atingiu 10.000 XP
  } else {
    // ESCOLHA ERRADA!
    alert("Escolha errada! Você perdeu o jogo 😢");
    location.reload();
  }
}

let cafeComprado = false; //`Para verificar se a máquina de café foi comprada

// Função para comprar a máquina de café
function comprarCafe() {
  if (dinheiro >= 300) {
    dinheiro -= 300;
    cafeComprado = true; // Marcar como comprado
    atualizarDinheiro();
    alert("Você comprou a Máquina de Café Expresso! Agora você pode virar a noite codando no VSCode.");
    desbloquearVirarNoiteCodando(); 
    fecharModal('modal-loja');
    atualizarLoja(); // Atualizar a loja depois da compra
    salvarProgresso();
  } else {
    alert("Você não tem dinheiro suficiente para comprar a Máquina de Café Expresso.");
  }
}

function atualizarLoja() {
  if (cafeComprado) {
    document.getElementById('modal-loja').innerHTML = `
      <div class="modal-conteudo">
        <button class="fechar-modal" onclick="fecharModal('modal-loja')">✖</button>
        <h2>🛒 Loja</h2>
        <p>Você já comprou a Máquina de Café Expresso!</p>
      </div>
    `;
  } else {
    document.getElementById('modal-loja').innerHTML = `
      <div class="modal-conteudo">
        <button class="fechar-modal fechar-modal-loja" onclick="fecharModal('modal-loja')">✖</button>
        <h2>🛒 Loja</h2>
        <p>Comprar Máquina de Café Expresso por $300?</p>
        <button onclick="comprarCafe()" class='botao-comprar'>Comprar</button>
      </div>
    `;
    const botaoComprar = document.querySelector('.botao-comprar');
    botaoComprar.style.backgroundColor = '#4F46E5';
    botaoComprar.style.display = 'block';
    botaoComprar.style.width = '100%';
    botaoComprar.style.margin = '10px 0';
    botaoComprar.style.padding = '12px 20px';
    botaoComprar.style.color = 'white';  
    botaoComprar.style.fontSize = '16px'; 
    botaoComprar.style.fontWeight = 'bold'; 
    botaoComprar.style.border = 'none'; 
    botaoComprar.style.borderRadius = '8px'; 
    botaoComprar.style.cursor = 'pointer';
    botaoComprar.style.transition = 'background-color 0.3s ease, transform 0.2s ease'; 
  }
}



// Função para desbloquear a ação no VSCode
function desbloquearVirarNoiteCodando() {
  const acoesVSCode = document.getElementById('acoes-vscode');

  // Evitar adicionar o botão duas vezes
  if (document.getElementById('virar-noite-codando')) return;

  const botao = document.createElement('button');
  botao.id = 'virar-noite-codando';
  botao.textContent = 'Virar a Noite Codando (+500XP)';
  botao.style.display = 'block';
  botao.style.width = '100%';
  botao.style.margin = '10px 0';
  botao.style.padding = '12px 20px';
  botao.style.backgroundColor = '#4F46E5';
  botao.style.color = 'white';
  botao.style.fontSize = '16px';
  botao.style.fontWeight = 'bold';
  botao.style.border = 'none';
  botao.style.borderRadius = '8px';
  botao.style.cursor = 'pointer';
  botao.style.transition = 'background-color 0.3s ease, transform 0.2s ease';

  // Eventos de hover e desabilitado igual o das tarefas
  botao.addEventListener('mouseover', () => {
    if (!botao.disabled) {
      botao.style.backgroundColor = '#9CA3AF'; 
    }
  });
  botao.addEventListener('mouseout', () => {
    if (!botao.disabled) {
      botao.style.backgroundColor = '#4F46E5';
    }
  });

  botao.onclick = virarNoiteCodando;

  acoesVSCode.appendChild(botao);
}

// Função para virar a noite codando
function virarNoiteCodando(event) {
  const botao = event.currentTarget;
  botao.disabled = true;
  botao.style.backgroundColor = '#9CA3AF'; // Cinza ao desabilitar
  botao.style.cursor = 'not-allowed';
  setTimeout(() => {
    ganharXP(500);
    botao.disabled = false;
    botao.style.backgroundColor = '#4F46E5'; 
    botao.style.cursor = 'pointer';
  }, 20000); // 20 segundos
}


// Função que verifica o XP para transição de fase
function verificarProgresso() {
  if (xp >= 10000) {
    alert("Parabéns! Você atingiu um novo patamar e irá se mudar para São Paulo!");
    window.location.href = "desktopSaoPaulo.html"; // Redireciona para a fase 3
  }
}


// Inicializar a página com os valores corretos
atualizarXP();
atualizarDinheiro();


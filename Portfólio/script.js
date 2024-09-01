const text = "desenvolvedor front-end"; // Texto que será "digitado"
const typingSpeed = 100; // Velocidade de digitação (ms entre cada letra)
let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, typingSpeed);
  }
}

window.onload = function () {
  typeWriter();
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// --------------------> //

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("chatbot-header");
  const toggleIcon = document.getElementById("chatbot-toggle-icon");
  const sendButton = document.getElementById("chatbot-send");
  const inputField = document.getElementById("chatbot-input");
  const messageArea = document.getElementById("chatbot-messages");

  if (header && toggleIcon && sendButton && inputField && messageArea) {
    header.addEventListener("click", toggleChatbot);
    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    function toggleChatbot() {
      const chatbotBody = document.getElementById("chatbot-body");

      if (chatbotBody.classList.contains("open")) {
        chatbotBody.classList.remove("open");
        toggleIcon.innerHTML =
          '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 15.5l6-6H6z"/>'; // Seta para baixo
      } else {
        chatbotBody.classList.add("open");
        toggleIcon.innerHTML =
          '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 8.5l6 6H6z"/>'; // Seta para cima
        if (messageArea.children.length === 0) {
          showWelcomeMessage(); // Exibir mensagem de boas-vindas ao abrir o chatbot
        } else {
          // Rolagem automática para o final da área de mensagens ao abrir
          messageArea.scrollTop = messageArea.scrollHeight;
        }
      }
    }

    function sendMessage() {
      const message = inputField.value.trim();

      if (message !== "") {
        appendMessage("user", message);
        processUserInput(message);
        inputField.value = "";
      }
    }

    function appendMessage(sender, message, callback) {
      const messageDiv = document.createElement("div");
      messageDiv.className =
        "message " + (sender === "user" ? "user-message" : "bot-message");
      messageArea.appendChild(messageDiv);

      if (sender === "bot") {
        if (callback) {
          typeHTMLMessage(messageDiv, message, callback);
        } else {
          messageDiv.innerHTML = message;
          messageArea.scrollTop = messageArea.scrollHeight; // Rolagem automática para o final
        }
      } else {
        messageDiv.innerHTML = message;
        messageArea.scrollTop = messageArea.scrollHeight; // Rolagem automática para o final
      }
    }

    function typeHTMLMessage(element, html, callback) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      element.appendChild(tempDiv);

      function typeNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          let index = 0;
          const text = node.textContent || "";
          node.textContent = ""; // Limpa o texto para começar a "digitar"

          const speed = 20; // Velocidade da digitação

          function type() {
            if (index < text.length) {
              node.textContent += text.charAt(index);
              index++;

              // Rolagem automática durante a digitação
              messageArea.scrollTop = messageArea.scrollHeight;

              setTimeout(type, speed);
            } else {
              // Chama o callback após a digitação do texto
              if (callback) callback();
            }
          }

          type();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(typeNode);
        }
      }

      // Inicia o efeito de digitação para o primeiro nó filho
      if (tempDiv.firstChild) {
        typeNode(tempDiv.firstChild);
      } else {
        // Se não houver nós filhos, apenas adiciona o HTML como está
        element.innerHTML = html;
        if (callback) callback();
      }
    }

    function showWelcomeMessage() {
      const messages = [
        "Bem-vindo! Escolha uma das opções abaixo clicando no botão ou digitando o número correspondente:",
        "<button class='option-button' data-option='1'>1. Currículo</button>",
        "<button class='option-button' data-option='2'>2. Telefone</button>",
        "<button class='option-button' data-option='3'>3. E-mail</button>",
        "<button class='option-button' data-option='4'>4. LinkedIn</button>",
        "<button class='option-button' data-option='5'>5. Instagram</button>",
        "<button class='option-button' data-option='6'>6. Sobre mim</button>",
        "<button class='option-button' data-option='7'>7. Conhecimentos</button>",
        "<button class='option-button' data-option='8'>8. Objetivo</button>",
        "<button class='option-button' data-option='9'>9. Projetos</button>",
        "<button class='option-button' data-option='10'>10. GitHub</button>",
        "<button class='option-button' data-option='11'>11. Workana</button>"
      ];

      function sendSequentialMessages(index) {
        if (index < messages.length) {
          appendMessage("bot", messages[index], () =>
            sendSequentialMessages(index + 1)
          );
        }
      }

      sendSequentialMessages(0);

      // Remove o event listener anterior antes de adicionar um novo
      messageArea.removeEventListener("click", handleOptionClick);
      messageArea.addEventListener("click", handleOptionClick);
    }

    function handleOptionClick(e) {
      if (e.target && e.target.classList.contains("option-button")) {
        const selectedOption = e.target.getAttribute("data-option");
        if (selectedOption) {
          processUserInput(selectedOption);
        }
      }
    }

    function processUserInput(input) {
      let response;

      if (input.trim() !== "0") {
        showTypingIndicator();
      }

      switch (input.trim()) {
        case "1":
          response =
            "Aqui está o link para o meu currículo: <a href='https://drive.google.com/file/d/1p4JCDKK8A0xTvwkjcYGWu8hLtSBfYq-9/view?usp=sharing' target='_blank' id='myText' class='link-1'>Meu Currículo</a>.";
          break;
        case "2":
          response =
            "Segue o link: <a href='https://wa.me/5531998728797?text=Leonardo%20-%20Analista%20de%20Sistemas%20-%20Desenvolvedor' class='link-1'>Telefone</a>.";
          break;
        case "3":
          response =
            "Você pode enviar um e-mail para: <a href='mailto:leonardo.igoraraujo@hotmail.com' class='link-1'>leonardo.igoraraujo@hotmail.com</a>.";
          break;
        case "4":
          response =
            "Confira meu LinkedIn: <a href='https://www.linkedin.com/in/leonardo-igor-5665b7209/' target='_blank' class='link-1'>Meu LinkedIn</a>.";
          break;
        case "5":
          response =
            "Siga-me no Instagram: <a href='https://www.instagram.com/leo_homepage/' target='_blank' class='link-1'>Meu Instagram</a>.";
          break;
        case "6":
          response =
            "Atualmente, faço Análise e Desenvolvimento de Sistemas na PUC Minas. Em paralelo, estudo conteúdo full-stack na plataforma freeCodeCamp. Tenho um perfil na Workana, que é um site para trabalho freelancer, e busco por oportunidades na área de desenvolvimento front-end. Também ajudo na escrita de artigos e produção de conteúdo.";
          break;
        case "7":
          response =
            "Tenho conhecimentos em HTML, CSS, JavaScript, Figma, Bootstrap, React Native, e muito mais.";
          break;
        case "8":
          response =
            "Meu objetivo é trabalhar como desenvolvedor front-end, que é a área que eu mais me divirto. Gosto de criar páginas, aplicações e ver o projeto ganhando sua forma visual e suas funcionalidades. Entretando, tenho estudado sobre banco de dados e em breve devo me tornar um desenvolvedor full-stack.";
          break;
        case "9":
          response =
            "Confira alguns dos meus projetos na seção de 'Trabalhos' e no <a href='https://github.com/leosportt' target='_blank' class='link-1'>meu GitHub</a>.";
          break;
        case "10":
          response =
            "Segue o link do meu GitHub: <a href='https://github.com/leosportt' target='_blank' class='link-1'>Meu GitHub</a>.";
          break;
        case "11":
          response =
            "Veja meu perfil no Workana: <a href='https://www.workana.com/freelancer/be83c6385210f6fdfa7abcf023f656f5' target='_blank' class='link-1'>Meu Workana</a>.";
          break;
        case "0":
          response = "Voltando ao menu principal...";
          appendMessage("bot", response);
          showWelcomeMessage(); // Exibir mensagem de boas-vindas novamente
          return;
        default:
          response =
            "Desculpe, não entendi. Por favor, escolha uma opção válida.";
          removeTypingIndicator();
          appendMessage("bot", response, showWelcomeMessage); // Envia a mensagem de erro e depois a welcomeMessage
          return;
      }

      setTimeout(() => {
        removeTypingIndicator();
        appendMessage("bot", response);
        if (input.trim() !== "0") {
          showReturnToMenu(); // Chama a função para mostrar o botão de retorno após 5 segundos
        }
      }, 3000); // Ajuste o tempo conforme necessário
    }

    function showReturnToMenu() {
      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          const returnButton =
            "<button class='option-button' data-option='0'>0. Voltar ao menu</button>";
          appendMessage("bot", returnButton);
        }, 1000); // Tempo de exibição dos pontinhos
      }, 1000); // Tempo antes de exibir os pontinhos
    }

    function showTypingIndicator() {
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "message bot-message typing-indicator";

      // Cria três span para os pontinhos
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement("span");
        typingIndicator.appendChild(dot);
      }

      messageArea.appendChild(typingIndicator);
      messageArea.scrollTop = messageArea.scrollHeight;
    }

    function removeTypingIndicator() {
      const typingIndicator = document.querySelector(".typing-indicator");
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }
  }
});














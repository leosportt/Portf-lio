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

document
  .getElementById("chatbot-header")
  .addEventListener("click", toggleChatbot);

function toggleChatbot() {
  var chatbotBody = document.getElementById("chatbot-body");
  var toggleIcon = document
    .getElementById("chatbot-toggle-icon")
    .querySelector("svg");

  if (chatbotBody.classList.contains("open")) {
    chatbotBody.classList.remove("open");
    toggleIcon.innerHTML =
      '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 15.5l6-6H6z"/>'; // Seta para baixo
  } else {
    chatbotBody.classList.add("open");
    toggleIcon.innerHTML =
      '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 8.5l6 6H6z"/>'; // Seta para cima
    displayWelcomeMessage();
  }
}

function displayWelcomeMessage() {
  var welcomeMessage = `
        Olá! Seja bem-vindo ao meu site.\n\n
        Como posso ajudar você hoje? Escolha uma opção digitando o número correspondente:\n\n
        1. Currículo\n
        2. Número de telefone\n
        3. E-mail\n
        4. LinkedIn\n
        5. Instagram\n
        6. Informações sobre mim\n
        7. Conhecimentos\n
        8. Certificações\n
        9. Projetos\n
        10. GitHub\n
        11. Workana
    `;
  typeMessage("bot", welcomeMessage);
}

document.getElementById("chatbot-send").addEventListener("click", sendMessage);
document
  .getElementById("chatbot-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

function sendMessage() {
  var inputField = document.getElementById("chatbot-input");
  var message = inputField.value.trim();

  if (message !== "") {
    appendMessage("user", message);
    getBotResponse(message);
    inputField.value = "";
  }
}

function appendMessage(sender, message) {
  var messageArea = document.getElementById("chatbot-messages");
  var messageDiv = document.createElement("div");
  messageDiv.className =
    "message " + (sender === "user" ? "user-message" : "bot-message");
  messageDiv.textContent = message; // Usar textContent para texto puro
  messageArea.appendChild(messageDiv);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function typeMessage(sender, message) {
  var messageArea = document.getElementById("chatbot-messages");
  var messageDiv = document.createElement("div");
  messageDiv.className =
    "message " + (sender === "user" ? "user-message" : "bot-message");
  messageArea.appendChild(messageDiv);

  var i = 0;
  var speed = 10; // Velocidade do efeito de digitação (em milissegundos)

  function typingEffect() {
    if (i < message.length) {
      messageDiv.textContent += message.charAt(i); // Adicionar texto puro
      i++;
      setTimeout(typingEffect, speed);
    }
  }

  typingEffect();
  messageArea.scrollTop = messageArea.scrollHeight;
}

function getBotResponse(message) {
  var lowerCaseMessage = message.trim().toLowerCase();
  var options = {
    1: "currículo",
    2: "número de telefone",
    3: "e-mail",
    4: "linkedin",
    5: "instagram",
    6: "informações sobre mim",
    7: "conhecimentos",
    8: "certificações",
    9: "projetos",
    10: "github",
    11: "workana"
  };

  if (options[lowerCaseMessage]) {
    provideInformation(options[lowerCaseMessage]);
  } else {
    var response = `
            Desculpe, não entendi sua escolha.\n\n
            Por favor, digite um número de 1 a 11 para escolher uma opção:\n\n
            1. Currículo\n
            2. Número de telefone\n
            3. E-mail\n
            4. LinkedIn\n
            5. Instagram\n
            6. Informações sobre mim\n
            7. Conhecimentos\n
            8. Certificações\n
            9. Projetos\n
            10. GitHub\n
            11. Workana
        `;
    setTimeout(function () {
      typeMessage("bot", response);
    }, 1000);
  }
}

function provideInformation(option) {
  var responses = {
    currículo: "Você pode visualizar meu currículo [aqui](#).",
    "número de telefone": "Meu número de telefone é (XX) XXXX-XXXX.",
    "e-mail": "Você pode me enviar um e-mail para exemplo@dominio.com.",
    linkedin: "Confira meu LinkedIn [aqui](#).",
    instagram: "Siga-me no Instagram [aqui](#).",
    "informações sobre mim":
      "Sou um desenvolvedor front-end com experiência em várias tecnologias web.",
    conhecimentos:
      "Tenho conhecimentos em HTML, CSS, JavaScript, React, e outras tecnologias front-end.",
    certificações: "Possuo certificações em desenvolvimento web e JavaScript.",
    projetos: "Confira meus projetos na seção de portfólio do meu site.",
    github: "Veja meu perfil no GitHub [aqui](#).",
    workana: "Confira meu perfil no Workana [aqui](#)."
  };

  var response = responses[option] || "Desculpe, não entendi sua solicitação.";

  setTimeout(function () {
    typeMessage("bot", response);
  }, 1000);
}

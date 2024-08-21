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

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('chatbot-header');
    const toggleIcon = document.getElementById('chatbot-toggle-icon');
    const sendButton = document.getElementById('chatbot-send');
    const inputField = document.getElementById('chatbot-input');
    const messageArea = document.getElementById('chatbot-messages');

    if (header && toggleIcon && sendButton && inputField && messageArea) {
        header.addEventListener('click', toggleChatbot);
        sendButton.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function toggleChatbot() {
            const chatbotBody = document.getElementById('chatbot-body');

            if (chatbotBody.classList.contains('open')) {
                chatbotBody.classList.remove('open');
                toggleIcon.innerHTML = '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 15.5l6-6H6z"/>'; // Seta para baixo
            } else {
                chatbotBody.classList.add('open');
                toggleIcon.innerHTML = '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 8.5l6 6H6z"/>'; // Seta para cima
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
                appendMessage('user', message);
                processUserInput(message);
                inputField.value = '';
            }
        }

        function appendMessage(sender, message, callback) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ' + (sender === 'user' ? 'user-message' : 'bot-message');
            messageArea.appendChild(messageDiv);

            typeMessage(messageDiv, message, callback);
        }

        function typeMessage(element, text, callback) {
            let index = 0;
            const speed = 20; // Velocidade da digitação

            function type() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;

                    // Scroll automático durante a digitação
                    messageArea.scrollTop = messageArea.scrollHeight;

                    setTimeout(type, speed);
                } else {
                    // Rolagem automática após a mensagem ser completamente digitada
                    messageArea.scrollTop = messageArea.scrollHeight;
                    if (callback) callback(); // Chama o callback após a mensagem ser digitada
                }
            }

            type();
        }

        function showWelcomeMessage() {
            const messages = [
                "Bem-vindo! Escolha uma das opções abaixo digitando o número correspondente ou clicando na opção:",
                "1. Currículo",
                "2. Número de Telefone",
                "3. E-mail",
                "4. LinkedIn",
                "5. Instagram",
                "6. Informações sobre mim",
                "7. Conhecimentos (skills)",
                "8. Certificações",
                "9. Projetos",
                "10. GitHub",
                "11. Perfil no site Workana"
            ];

            // Função recursiva para enviar cada mensagem sequencialmente
            function sendSequentialMessages(index) {
                if (index < messages.length) {
                    appendMessage('bot', messages[index], () => sendSequentialMessages(index + 1));
                }
            }

            sendSequentialMessages(0);
        }

        function processUserInput(input) {
            let response;

            switch (input.trim()) {
                case '1':
                    response = "Aqui está o link para o meu currículo: [link do currículo]";
                    break;
                case '2':
                    response = "Meu número de telefone é: (XX) XXXXX-XXXX";
                    break;
                case '3':
                    response = "Você pode enviar um e-mail para: seuemail@dominio.com";
                    break;
                case '4':
                    response = "Confira meu LinkedIn: [link do LinkedIn]";
                    break;
                case '5':
                    response = "Siga-me no Instagram: [link do Instagram]";
                    break;
                case '6':
                    response = "Sou um desenvolvedor front-end apaixonado por criar interfaces incríveis.";
                    break;
                case '7':
                    response = "Tenho conhecimentos em HTML, CSS, JavaScript, React, e muito mais.";
                    break;
                case '8':
                    response = "Possuo certificações em várias tecnologias e metodologias.";
                    break;
                case '9':
                    response = "Confira meus projetos na seção de portfólio!";
                    break;
                case '10':
                    response = "Aqui está meu GitHub: [link do GitHub]";
                    break;
                case '11':
                    response = "Veja meu perfil no Workana: [link do Workana]";
                    break;
                default:
                    response = "Desculpe, não entendi. Por favor, escolha uma opção válida.";
                    appendMessage('bot', response, showWelcomeMessage); // Envia a mensagem de erro e depois a welcomeMessage
                    return;
            }

            appendMessage('bot', response);
        }
    }
});















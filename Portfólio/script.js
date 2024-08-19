const text = "desenvolvedor front-end";  // Texto que será "digitado"
const typingSpeed = 100;  // Velocidade de digitação (ms entre cada letra)
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
    }
}

window.onload = function() {
    typeWriter();
};

// Declara uma lista vazia para armazenar números já escolhidos
let listNumbers = [];

// Define o limite superior para o número aleatório a ser gerado
let limitNumber = 1000;

// Habilita o botão de verificar número chamando a função ableDisable()
ableDisable();

// Gera um número aleatório e o armazena em secretNumber
let secretNumber = randomNumber();

// Inicializa o contador de tentativas com valor 1
let tryes = 1;

// Inicializa uma variável que será usada para exibir "trye" ou "tryes" dependendo do número de tentativas
let wordTrye = "";

// Função para atualizar o conteúdo de um elemento HTML, buscando pelo seletor tag e atribuindo o texto text
function textField(tag, text) {
    let field = document.querySelector(tag); // Seleciona o elemento HTML pelo seletor fornecido
    field.innerHTML = text; // Atualiza o conteúdo do elemento com o texto fornecido
    responsiveVoice.speak(text, 'US English Female', {rate:1.2});
}

// Função para definir a mensagem inicial do jogo
function initialMessage() {
    textField('h1', 'Secret number game'); // Define o título do jogo
    textField('p', 'Choose a number from 1 to 1000'); // Define a instrução do jogo
}

// Chama a função para exibir a mensagem inicial
initialMessage();

// Função que gera um número aleatório único entre 1 e o limite definido por limitNumber
function randomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1); // Gera um número aleatório entre 1 e limitNumber
    let elementsList = listNumbers.length; // Armazena o tamanho atual da lista listNumbers

    // Limpa a lista se já contiver todos os números possíveis até o limite
    if (elementsList == limitNumber) {
        listNumbers = [];
    }

    // Garante que o número gerado ainda não foi usado
    if (listNumbers.includes(chosenNumber)) {
        return randomNumber(); // Gera um novo número se já estiver na lista
    } else {
        listNumbers.push(chosenNumber); // Adiciona o número à lista
        return chosenNumber; // Retorna o número gerado
    }
}

// Função para limpar o campo de entrada do usuário
function cleanField() {
    userNumber = document.querySelector('input'); // Seleciona o campo de entrada
    userNumber.value = ""; // Limpa o valor do campo
}

// Função que habilita o botão "verify" ao remover o atributo "disabled"
function ableDisable() {
    document.getElementById('verify').removeAttribute('disabled');
}

// Função que verifica se o número inserido pelo usuário é o número secreto
function verifyNumber() {
    let userNumber = document.querySelector('input').value; // Armazena o valor inserido pelo usuário

    // Verifica se o número do usuário é igual ao número secreto
    if (userNumber == secretNumber) {
        document.getElementById('verify').setAttribute('disabled', true); // Desabilita o botão de verificar
        cleanField(); // Limpa o campo de entrada do usuário

        // Define "trye" ou "tryes" dependendo da quantidade de tentativas
        wordTrye = tryes > 1 ? 'tryes' : 'trye';

        // Exibe mensagem de sucesso
        textField('h1', 'CONGRATULATIONS!');
        textField('p', `You found the secret number with ${tryes} ${wordTrye}.`);

        // Habilita o botão de reiniciar o jogo
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        // Informa ao usuário se o número inserido é maior ou menor que o número secreto
        if (userNumber > secretNumber) {
            textField('h1', 'Almost there...');
            textField('p', `The secret number is minor than ${userNumber}`);
        } else {
            textField('h1', 'Almost there...');
            textField('p', `The secret number is bigger than ${userNumber}`);
        }
        tryes++; // Incrementa o contador de tentativas
        cleanField(); // Limpa o campo de entrada do usuário
    }
}

// Função para iniciar um novo jogo
function newGame() {
    ableDisable(); // Habilita o botão de verificar
    secretNumber = randomNumber(); // Gera um novo número secreto
    cleanField(); // Limpa o campo de entrada do usuário
    tryes = 1; // Reseta o contador de tentativas
    initialMessage(); // Exibe a mensagem inicial do jogo
    document.getElementById('restart').setAttribute('disabled', true); // Desabilita o botão de reiniciar
}

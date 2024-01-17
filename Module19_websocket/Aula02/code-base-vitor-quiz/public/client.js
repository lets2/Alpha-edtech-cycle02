const ws = new WebSocket("ws://localhost:3000");

/**
O que as variáveis globais representam no HTML:

        ┌───────────────┐     ┌─────────────┐
        │ usernameInput │     │ enterButton │
        └───────────────┘     └─────────────┘

        gameContainer
┌─────────────────────────────────────────────────┐
│                                                 │
│ ┌──────────────────────┐ ┌────────────────────┐ │
│ │ newQuestionInput     │ │addQuestionButton   │ │
│ └──────────────────────┘ └────────────────────┘ │
│                                                 │
│               questionsContainer                │
│  ┌───────────────────────────────────────────┐  │
│  │                                           │  │
│  │   ┌───────────────────────────────┐       │  │
│  │   │                               │       │  │
│  │   │         <questão>             │       │  │
│  │   └───────────────────────────────┘       │  │
│  │                                           │  │
│  │   ┌───────────────────────────────┐       │  │
│  │   │                               │       │  │
│  │   │         <questão>             │       │  │
│  │   └───────────────────────────────┘       │  │
│  │                                           │  │
│  │                   .                       │  │
│  │                   .                       │  │
│  │                   .                       │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
 */

const usernameInput = document.getElementById("username");
const enterButton = document.getElementById("enterButton");

const gameContainer = document.getElementById("gameContainer");

const newQuestionInput = document.getElementById("newQuestion");
const addQuestionButton = document.getElementById("addQuestionButton");

const questionsContainer = document.getElementById("questions");

// ===========================================
// FUNÇÕES UTILITÁRIAS PARA MANIPULAR O DOM
// ===========================================

/**
 *
 * Adiciona uma nova questão ao HTML.
 *
 * @param {{id: number, author: string, text: string, yes: number, no: number}} question - Objeto representando uma questão.
 * @param {() => void} clickedYes - Função de clique do botão "Sim" da questão. Será invocada sem argumentos.
 * @param {() => void} clickedNo - Função de clique do botão "Não" da questão. Será invocada sem argumentos.
 */
function addQuestionToUI(question, clickedYes, clickedNo) {
  if (typeof question.id !== "number") {
    const errorString = `Tentou adicionar à UI uma questão, mas question.id não é um número`;
    console.error(errorString);
    console.error("question: ", question);
    alert(errorString);
    return;
  }

  if (typeof clickedYes !== "function") {
    const errorString = `Tentou adicionar à UI uma questão, mas clickedYes não é uma função`;
    console.error(errorString);
    alert(errorString);
    return;
  }

  if (typeof clickedNo !== "function") {
    const errorString = `Tentou adicionar à UI uma questão, mas clickedNo não é uma função`;
    console.error(errorString);
    alert(errorString);
    return;
  }

  if (questionsContainer.querySelector(`[data-question_id="${question.id}"]`)) {
    const errorString = `Tentou adicionar à UI uma questão com id ${question.id}, mas esse id já existe na UI`;
    console.error(errorString);
    console.error("question: ", question);
    alert(errorString);
    return;
  }

  if (typeof question.author !== "string") {
    const errorString = `Tentou adicionar à UI uma questão, mas question.author não é uma string`;
    console.error(errorString);
    console.error("question: ", question);
    alert(errorString);
    return;
  }

  if (typeof question.text !== "string") {
    const errorString = `Tentou adicionar à UI uma questão, mas question.text não é uma string`;
    console.error(errorString);
    console.error("question: ", question);
    alert(errorString);
    return;
  }

  if (typeof question.yes !== "number") {
    const errorString = `Tentou adicionar à UI uma questão, mas question.yes não é um número`;
    console.error(errorString);
    console.error("question: ", question);
    alert(errorString);
    return;
  }

  if (typeof question.yes !== "number") {
    const errorString = `Tentou adicionar à UI uma questão, mas question.no não é um número`;
    console.error(errorString);
    console.error("question: ", question);
    alert(errorString);
    return;
  }

  const questionDiv = document.createElement("div");
  questionDiv.dataset["question_id"] = question.id;
  questionDiv.innerHTML = `
    <p>Autor: ${question.author}</p>
    <p>Pergunta: ${question.text}</p>
    <button class="yes">Sim (${question.yes})</button>
    <button class="no">Não (${question.no})</button>
  `;
  questionDiv
    .querySelector(".yes")
    .addEventListener("click", () => clickedYes());
  questionDiv.querySelector(".no").addEventListener("click", () => clickedNo());
  questionsContainer.appendChild(questionDiv);
}

/**
 *
 * Atualiza a contagem de um dos botões de uma certa questão no HTML (a questão já deve
 * existir no HTML)
 *
 * @param {{questionId: number, answer: "yes" | "no", count: number}} update - Objeto
 * representando a nova contagem de uma das respostas de uma questão
 */
function updateVoteCountUI(update) {
  const questionDiv = questionsContainer.querySelector(
    `[data-question_id="${update.questionId}"]`
  );

  if (!questionDiv) {
    const errorString = `Tentou atualizar voto da questão com id ${update.questionId}, mas ela não estava presente no HTML`;
    console.error(errorString);
    console.error("update: ", update);
    alert(errorString);
    return;
  }

  if (update.answer !== "yes" && update.answer !== "no") {
    const errorString = `Tentou atualizar voto da questão com id ${update.questionId} na resposta "${update.answer}", mas a resposta só pode ser "yes" ou "no"`;
    console.error(errorString);
    console.error("update: ", update);
    alert(errorString);
    return;
  }

  if (typeof update.count !== "number") {
    const errorString = `Tentou atualizar voto da questão com id ${update.questionId}, mas a propriedade update.count não é um número`;
    console.error(errorString);
    console.error("update: ", update);
    alert(errorString);
    return;
  }

  const button = questionDiv.querySelector(`.${update.answer}`);
  button.textContent = `${update.answer === "yes" ? "Sim" : "Não"} (${
    update.count
  })`;
}

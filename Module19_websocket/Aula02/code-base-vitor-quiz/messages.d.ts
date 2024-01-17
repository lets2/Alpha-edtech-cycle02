// Mensagens enviadas do cliente para o servidor (cliente => servidor)

interface EnterMessage {
  type: "enter";
  // username com o qual o cliente quer entrar
  username: string;
}

interface NewQuestionMessage {
  type: "newQuestion";
  // texto da pergunta que o cliente quer criar
  text: string;
}

interface VoteMessage {
  type: "vote";
  // id da questão onde o cliente quer votar
  questionId: number;
  // em qual resposta o cliente quer votar
  answer: "yes" | "no";
}

// Mensagens enviadas do servidor para os clientes (servidor => cliente)

interface EnterErrorMessage {
  type: "enterError";
  // razão pela qual o cliente não pôde entrar
  message: string;
}

interface EnterSuccessMessage {
  type: "enterSuccess";
  // mensagem genérica de boas-vindas
  message: string;
}

interface AllQuestionsMessage {
  type: "allQuestions";
  // array contendo cada questão que o servidor armazena
  questions: Array<{
    id: number;
    text: string;
    yes: number;
    no: number;
  }>;
}

interface NewQuestionServerMessage {
  type: "newQuestion";
  id: number;
  author: string;
  text: string;
  yes: number;
  no: number;
}

interface VoteUpdateMessage {
  type: "voteUpdate";
  questionId: number;
  answer: "yes" | "no";
  count: number;
}

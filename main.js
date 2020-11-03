
const startBtn = document.querySelector('.start-btn');
const quizContainer = document.querySelector('.question-container');
const nextBtn = document.querySelector('.next-btn');
const questionElement = document.getElementById('question');
const answerBtn = document.getElementsByClassName('answer-btn')
//const answerButtons= document.querySelector('.question-container')

startBtn.addEventListener('click', startGame);

nextBtn.addEventListener('click', ()=>{
  questionIndex++;
  nextQuestion();
});

let questionIndex, shuffledQuestions;


function startGame() {
  startBtn.classList.add('hide');
  quizContainer.classList.remove('hide');

  shuffledQuestions = questions.sort(() => Math.random()-.5) //perguntas aparecem de forma aleatoria
  questionIndex = 0;
  nextQuestion();
};



function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  addStatusClass(document.body, correct); //para depois permitir verificar se é correct/wrong
  //preciso converter para um array, já que preciso de forEach() para iterar sobre os botoes e atribuir um status/class
  Array.from(answerBtn[0].children).forEach(button => {
    addStatusClass(button, button.dataset.correct) //recebe o elemento e o dataset
  })
  if(shuffledQuestions.length > questionIndex+1){ 
    nextBtn.classList.remove('hide');

  }else {
    startBtn.innerText= 'Restart';
    startBtn.classList.remove('hide');
  }
};


function addStatusClass(element, correct) { //recebe o elemento e se é correct ou nao 
  //depois uso as classes para alterar o background.
  removeStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else element.classList.add('wrong');

}


function removeStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}



function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach(answer => {

    const button = document.createElement('button');
    button.innerText = answer.text;
    //console.log(answer)
    button.classList.add("btn", "btn-dark");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer)
    answerBtn[0].appendChild(button);
  });
}



function nextQuestion() {
  reset();//faço antes de mostrar para apagar somente o que já tem lá e depois criar os btn 'novos'
  showQuestion(shuffledQuestions[questionIndex]);
}

function reset() {//apagar os btn que já tinha e aparecer somente os das respostas
  nextBtn.classList.add('hide');
  while (answerBtn[0].firstChild) {//enquanto existir filhos no elemento, removo-os
    answerBtn[0].removeChild(answerBtn[0].firstChild);
  }

}

const questions = [
  {
    question: "How many movies are there in the MCU??",
    answers: [
      {
        text: '24', correct: true
      },
      {
        text: '20', correct: false
      },
      {
        text: '25', correct: false
      },
      {
        text: '18', correct: false
      }
    ]
  },
  {
    question: "Who doesn't belong to the Captain America's Team in Captain America: Civil War?",
    answers: [
      {
        text: 'Hawkeye', correct: false
      },
      {
        text: 'Falcon', correct: false
      },
      {
        text: 'Black Widow ', correct: true
      },
      {
        text: 'Scarlet Witch', correct: false
      }
    ]
  },
  {
    question: "In which movie do we see Thanos for the first time?",
    answers: [
      {
        text: 'Avengers: Infinity War', correct: false
      },
      {
        text: 'Guardians of the Galaxy.', correct: true
      },
      {
        text: 'Guardians of the Galaxy Vol.2.', correct: false
      },
      {
        text: 'Thor: Ragnarok.', correct: false
      }
    ]
  },
  {
    question: "Which avenger does Thor find in Thor: Ragnarok?",
    answers: [
      {
        text: 'Valkyrie', correct: false
      },
      {
        text: 'Loki', correct: false
      },
      {
        text: 'Iron-Man', correct: false
      },
      {
        text: 'Hulk', correct: true
      }
    ]
  },
  {
    question: "Who is the person real name that does special participation in all MCU movies?",
    answers: [
      {
        text: 'Stan Lee', correct: true
      },
      {
        text: 'Stand Lee', correct: false
      },
      {
        text: 'Bruce Lee', correct: false
      },
      {
        text: 'Stan Li', correct: false
      }
    ]
  },
  {
    question: "Who finds Spider-Man and turns him into an Avanger?",
    answers: [
      {
        text: 'Falcon', correct: false
      },
      {
        text: 'Iron-Man', correct: true
      },
      {
        text: 'Captain America', correct: false
      },
      {
        text: 'Doctor Strange', correct: false
      }
    ]
  },
]
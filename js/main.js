(() => {
  function createGame() {
    //Выбираем div для приложения
    const APP = document.getElementById('app');

    const WAIT_TIME_MS = 500;
    const TIMER_S = 60;
    const MAX_NUM_ROW = 6;

    let cardNum = 0;
    let timerID;
    let selectedCards = [];
    let yesCardsNum = 0;


    //Создаем список для карточек
    const list = document.createElement('ul');
    list.classList.add('list');

    //Кнопка "Сыграть еще раз"
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Сыграть ещё раз';
    playAgainButton.classList.add('button');
    playAgainButton.addEventListener('click', () => {
      deleteGame();
      createGame();
    })

    //Форма начала игры
    const form = document.createElement('form');
    const startGameButton = document.createElement('button');
    const cardsNumInput = document.createElement('input');
    const cardsNumInputLabel = document.createElement('label');

    startGameButton.textContent = 'Начать игру';
    startGameButton.classList.add('button');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.classList.contains('error')) {
        cardNum = Math.pow(parseInt(cardsNumInput.value), 2);
        list.style.setProperty('--row-num', parseInt(cardsNumInput.value));
        form.remove();
        startGame();
      } else return;
    });

    cardsNumInput.placeholder = 'Чётное число от 2 до 10';
    cardsNumInput.id = 'cardNum';
    cardsNumInput.value = 4;
    cardsNumInput.classList.add('form__input');
    cardsNumInput.type = 'number';
    cardsNumInput.addEventListener('input', function () {
      if ((parseInt(this.value) % 2 > 0) || (parseInt(this.value) <= 0) || (parseInt(this.value) > MAX_NUM_ROW)) {
        form.classList.add('error');
      } else {
        form.classList.remove('error');
      }
    })
    cardsNumInputLabel.classList.add('form__label');
    cardsNumInputLabel.textContent = 'Кол-во карточек по вертикали/горизонтали';
    cardsNumInputLabel.setAttribute('for', 'cardNum');
    form.classList.add('form');

    form.append(cardsNumInputLabel);
    form.append(cardsNumInput);
    form.append(startGameButton);

    //Таймер
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    timerDisplay.textContent = TIMER_S;


    //Функция создания номеров карточек и их перемешивание
    function arrayCardNumbersCreateAndMix() {
      let arrayCardNumbers = [];
      //создаем номера от 1 до половины числа карточек
      for (let i = 1; i <= cardNum / 2; i++) {
        arrayCardNumbers.push(i);
        arrayCardNumbers.push(i);
      }
      //алгоритм Фишера-Йетса
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      shuffle(arrayCardNumbers);

      //вызываем функцию создания карточек
      for (let i = 0; i < cardNum; i++) {
        cardCreate(arrayCardNumbers[i]);
      }
    }


    //Функция создания карточки
    function cardCreate(number) {
      const card = document.createElement('li');
      const innerCard = document.createElement('div');
      card.classList.add('list__card');
      innerCard.classList.add('list__inner-card');
      innerCard.textContent = number;
      card.append(innerCard);

      //Событие клик
      card.addEventListener('click', function () {
        if ((!(this.classList.contains('yes') || this.classList.contains('selected'))) && selectedCards.length <= 1) {
          this.classList.add('selected');
          compare();
        }
      });

      list.append(card);
    }


    //Функция сравнения карточек
    function compare() {
      selectedCards = document.querySelectorAll('.selected');
      if (selectedCards.length === 2) {
        setTimeout(function () {
          if (selectedCards[0].textContent === selectedCards[1].textContent) {
            selectedCards[0].classList.add('yes');
            selectedCards[1].classList.add('yes');
            yesCardsNum += 2;
            if (yesCardsNum === cardNum) {
              endGame();
            }
          }
          selectedCards[0].classList.remove('selected');
          selectedCards[1].classList.remove('selected');
          selectedCards = [];
        }, WAIT_TIME_MS);
      }
    }


    //Запуск игры
    function startGame() {
      arrayCardNumbersCreateAndMix();
      APP.append(timerDisplay);
      APP.append(list);

      timerID = setInterval(() => {
        timerDisplay.textContent = parseInt(timerDisplay.textContent) - 1;

        if (parseInt(timerDisplay.textContent) === 0) {
          clearInterval(timerID);
          timerDisplay.textContent = 'Время вышло!';
          endGame();
        }
      }, 1000);
    }

    //Завершение игры (когда крайние карточки были найдены)
    function endGame() {
      clearInterval(timerID);
      let listCards = document.querySelectorAll('.list__card');
      for (listCard of listCards) {
        listCard.classList.add('yes');
      }
      APP.append(playAgainButton);
    }

    //Удалить игру
    function deleteGame() {
      APP.innerHTML = '';
    }

    APP.append(form);
  }



  document.addEventListener('DOMContentLoaded', () => {
    createGame();
  });
})();

(() => {
  function createGame() {
    //Выбираем div для приложения
    const APP = document.getElementById('app');

    const WAIT_TIME_MS = 500;
    const CARD_NUM = 16;
    const TIMER_S = 60;

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

    //Кнопка "Начать игру"
    const startGameButton = document.createElement('button');
    startGameButton.textContent = 'Начать игру';
    startGameButton.classList.add('button');
    startGameButton.addEventListener('click', function () {
      this.remove();
      startGame()
    });

    //Таймер
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    timerDisplay.textContent = TIMER_S;


    //Функция создания номеров карточек и их перемешивание
    function arrayCardNumbersCreateAndMix() {
      let arrayCardNumbers = [];
      //создаем номера от 1 до половины числа карточек
      for (let i = 1; i <= CARD_NUM / 2; i++) {
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
      for (let i = 0; i < CARD_NUM; i++) {
        cardCreate(arrayCardNumbers[i]);
      }
    }


    //Функция создания карточки
    function cardCreate(number) {
      const card = document.createElement('li');
      card.classList.add('list__card');
      card.textContent = number;

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
            if (yesCardsNum === CARD_NUM) {
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

    APP.append(startGameButton);
  }



  document.addEventListener('DOMContentLoaded', () => {
    createGame();
  });
})();

(() => {
  //Выбираем div для приложения
  const APP = document.getElementById('app');

  const WAIT_TIME_MS = 300;
  const CARD_NUM = 16;

  let selectedCards = [];
  let arrayCardNumbers = [];

  //Создаем список для карточек
  const list = document.createElement('ul');
  list.classList.add('list');


  //Функция создания номеров карточек и их перемешивание
  function arrayCardNumbersCreateAndMix() {
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
    console.log(selectedCards);
    if (selectedCards.length === 2) {
      setTimeout(function () {
        if (selectedCards[0].textContent === selectedCards[1].textContent) {
          selectedCards[0].classList.add('yes');
          selectedCards[1].classList.add('yes');
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
    APP.append(list);
  }



  document.addEventListener('DOMContentLoaded', () => {
    startGame();
  });
})();

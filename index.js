const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

alert('Введите время в формате ,как указано!');
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
      if(inputEl.value.match(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/)){
      let hours;
      let minutes;
      let second;
      switch(String(seconds).length){
        case 6 :
          hours = Math.floor(seconds/10000)
          minutes = +String(seconds).slice(2,4); // введён 0 на 1ю позицию в таймер 
          second = +String(seconds).slice(4,6)
        break;
        case 5 :
          hours = Math.floor(seconds/10000)
          minutes = +String(seconds).slice(1,3);// введён 0 на две первые позиции в таймер
          second = +String(seconds).slice(3,5)
        break;
        case 4 :
          hours = 0
          minutes = +String(seconds).slice(0,2);// введён 0 на 3 первые позиции в таймер
          second = +String(seconds).slice(2,4)
        break;  
        case 3 :
          hours = 0
          minutes = +String(seconds).slice(0,1);// введён 0 на 4 первые позиции в таймер
          second = +String(seconds).slice(1,3)
        break;  
        case 2 :
          hours = 0
          minutes = 0;
          second = +String(seconds).slice(0,2)// введён 0 на 5 первых позиций в таймер
        break;  
        case 1 :
          hours = 0
          minutes = 0;
          second = +String(seconds).slice(0,1)// введён 0 на 6 первых позиций в таймер
        break;  
  }
    const timer = () => {
      if(hours >= 0 && second >= 0){
        second = second - 1;
        
        if(minutes==-1){
          hours = hours-1;
          minutes = 59 
        }
        if(second == -1) {
          if(minutes > 0){
            minutes = minutes - 1;
            second = 59
          }else{
            hours = hours-1; //Случай ,когда минуты кончились
            minutes = 59
            second = 59
          }
        }
        //условие ,только для того чтобы в конце осталось не 00:00:01, а 00:00:00
        if(hours < 0 && minutes == 59 && second == 59) {
          second = 0;
          hours = 0; 
          minutes = 0
          inputEl.value = 'Time is elapsed';
          alert('Время истекло. Для повтора введите новое время')
          clearInterval(timerId)
        }
      }    
      timerEl.textContent = `${hours<10?'0'+hours:hours} : ${minutes<10?'0'+minutes:minutes} : ${second<10?'0'+second:second}`   
    }
    const timerId = setInterval(timer, 1000)
    }else{
      alert('Введите время в формате ,как указано!');
    }
  };
}


const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  
  // Проверка , что вводятся именно числа или ':', а также пользователь не сможет ввести ':' вместо цифр, при этом если на места двоеточий пользователь вводит цифры  - то они станут двоеточием автоматически(строка 101-106),при попытке ввода 60 и более секунд и минут выйдет предупреждение(строка 93-100)
  if(!Array.from(inputEl.value).every(symbol => symbol.match(/[0-9]|:/)) || inputEl.value[0]=== ':' || inputEl.value[1]=== ':' || inputEl.value[3]=== ':' || inputEl.value[4]=== ':' || inputEl.value[6]=== ':' || inputEl.value[7]=== ':'){
    alert('Вы не соблюли формат ввода.Пробелы и буквы не допускаются')   
    inputEl.value = '';
  }
  if(inputEl.value[3] > 5 ) {
    alert('Количество минут и секунд не может быть больше 59')
    inputEl.value=''
  }
  if(inputEl.value[6] > 5 ) {
    alert('Количество минут и секунд не может быть больше 59')
    inputEl.value=''
  }
  if(inputEl.value.length === 3 && inputEl.value.slice(0, -1) !== ':'){
    inputEl.value = inputEl.value.slice(0, -1) + ':';
  }
  if(inputEl.value.length === 6 && inputEl.value.slice(0, -1) !== ':'){
    inputEl.value = inputEl.value.slice(0, -1) + ':';
  }    
    // Очистите input так, чтобы в значении
    // оставались только числа
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value.replace(/:/g, ''));
  animateTimer(seconds)
  inputEl.value = '';
});
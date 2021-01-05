const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
//选择所有类为.figure-part的元素
const figureParts = document.querySelectorAll('.figure-part');
// console.log(figureParts.length);

const words = ['application', 'programming', 'interface', 'wizard'];

let seletedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//显示隐藏的字母
function displayWord() {
  wordEl.innerHTML = `
  ${seletedWord
    .split('')
    .map(
      letter => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
      `
    )
    .join('')}
  `;
  //刪除換行標記
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === seletedWord) {
    finalMessage.innerText = '恭喜，你赢了!😊';
    popup.style.display = 'flex';
  }
}

//更新输入错误的字母
function updateWrongLettersEl() {
  //显示错误的数字
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  //显示身体的部分
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
  // 检查是否输了，显示modal
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = '很遗憾，你输了. 😕';
    popup.style.display = 'flex';
  }
}
//显示提醒,两秒后移除提醒 牛逼！
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
//按下字母函数
window.addEventListener('keydown', e => {
  // console.log(e.keyCodes);
  //只监听a-z
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (seletedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});
//重新开始游戏，再玩一次
playAgainBtn.addEventListener('click', () => {
  //清空数组
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //重新选择字母
  let seletedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = 'none';
});
displayWord();

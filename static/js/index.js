function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var LETTER_POOL = getEl('letter-pool'),
TEMP_LETTER_POOL = getEl('temp-letter-pool'),
LETTER_OVERLAY = getEl('letter-overlay'),
CHAT_MESSAGE_COLUMN_WRAPPER = getEl('chat-message-column-wrapper'),
CHAT_MESSAGE_COLUMN = getEl('chat-message-column'),
MESSAGE_INPUT = getEl('message-input'),
MESSAGE_INPUT_FIELD = getEl('message-input-field'),
CHAT_BOT_MOOD = getEl('chat-bot-mood'),
CHAT_BOT_MOOD_VALUE = getEl('chat-bot-mood-value');

var STATE = {
  isUserSendingMessage: false,
  isChatBotSendingMessage: false,
  letterPool: {
    transitionPeriod: 30000,
    intervals: [] },

  moods: ['friendly', 'confused', 'boastful'],
  currentMood: '',
  chatbotMessageIndex: 0,
  nLetterSets: 4 };

var getRandMood = function getRandMood() {
  var rand = getRand(1, 3);
  return STATE.moods[rand - 1];
};

function setChatbotMood0() {
  STATE.currentMood = STATE.moods[0];
  for (var i = 0; i < STATE.moods.length; i++) {
    removeClass(CHAT_BOT_MOOD, STATE.moods[i]);
  }
  addClass(CHAT_BOT_MOOD, STATE.currentMood);
  CHAT_BOT_MOOD_VALUE.innerHTML = STATE.currentMood;
};

var setChatbotMood = function setChatbotMood() {
  STATE.currentMood = getRandMood();
  for (var i = 0; i < STATE.moods.length; i++) {
    removeClass(CHAT_BOT_MOOD, STATE.moods[i]);
  }
  addClass(CHAT_BOT_MOOD, STATE.currentMood);
  CHAT_BOT_MOOD_VALUE.innerHTML = STATE.currentMood;
};

var getRandGreeting = function getRandGreeting() {
  var rand = 0;
//STATE.currentMood=STATE.moods[0]
//switch (STATE.currentMood) {
//  case 'friendly':
      rand = getRand(1, greetings.friendly.length);
      return greetings.friendly[rand - 1];
//  case 'suspicious':
//    rand = getRand(1, greetings.suspicious.length);
//    return greetings.suspicious[rand - 1];
//  case 'boastful':
//    rand = getRand(1, greetings.boastful.length);
//    return greetings.boastful[rand - 1];
//  default:
//    break;}

};

var getRandConvo = function getRandConvo() {
  var rand = 0;
  switch (STATE.currentMood) {
    case 'friendly':
      rand = getRand(1, convo.friendly.length);
      return convo.friendly[rand - 1];
    case 'confused':
      rand = getRand(1, convo.confused.length);
      return convo.confused[rand - 1];
    case 'boastful':
      rand = getRand(1, convo.boastful.length);
      return convo.boastful[rand - 1];
    default:
      break;}

};

var createLetter = function createLetter(cName, val) {
  var letter = document.createElement('div');
  addClass(letter, cName);
  setAttr(letter, 'data-letter', val);
  letter.innerHTML = val;
  return letter;
};

var getAlphabet = function getAlphabet(isUpperCase) {
  var letters = [];
  for (var i = 65; i <= 90; i++) {
    var val = String.fromCharCode(i),
    letter = null;
    if (!isUpperCase) val = val.toLowerCase();
    letter = createLetter('pool-letter', val);
    letters.push(letter);
  }
  return letters;
};

var startNewLetterPath = function startNewLetterPath(letter, nextRand, interval) {
  clearInterval(interval);
  nextRand = getRandExcept(1, 4, nextRand);
  var nextPos = getRandPosOffScreen(nextRand),
  transitionPeriod = STATE.letterPool.transitionPeriod,
  delay = getRand(0, STATE.letterPool.transitionPeriod),
  transition = 'left ' + transitionPeriod + 'ms linear ' + delay + 'ms, top ' + transitionPeriod + 'ms linear ' + delay + 'ms, opacity 0.5s';
  setElPos(letter, nextPos.x, nextPos.y);
  setStyle(letter, 'transition', transition);
  interval = setInterval(function () {
    startNewLetterPath(letter, nextRand, interval);
  }, STATE.letterPool.transitionPeriod + delay);
  STATE.letterPool.intervals.push(interval);
};

var setRandLetterPaths = function setRandLetterPaths(letters) {var _loop = function _loop(
  i) {
    var letter = letters[i],
    startRand = getRand(1, 4),
    nextRand = getRandExcept(1, 4, startRand),
    startPos = getRandPosOffScreen(startRand),
    nextPos = getRandPosOffScreen(nextRand),
    transitionPeriod = STATE.letterPool.transitionPeriod,
    delay = getRand(0, STATE.letterPool.transitionPeriod) * -1,
    transition = 'left ' + transitionPeriod + 'ms linear ' + delay + 'ms, top ' + transitionPeriod + 'ms linear ' + delay + 'ms, opacity 0.5s';

    setElPos(letter, startPos.x, startPos.y);
    setStyle(letter, 'transition', transition);
    addClass(letter, 'invisible');
    LETTER_POOL.appendChild(letter);
    setTimeout(function () {
      setElPos(letter, nextPos.x, nextPos.y);
      removeClass(letter, 'invisible');
      var interval = setInterval(function () {
        startNewLetterPath(letter, nextRand, interval);
      }, STATE.letterPool.transitionPeriod + delay);
    }, 1);};for (var i = 0; i < letters.length; i++) {_loop(i);
  }
};

var fillLetterPool = function fillLetterPool() {var nSets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  for (var i = 0; i < nSets; i++) {
    var lCaseLetters = getAlphabet(false),
    uCaseLetters = getAlphabet(true);
    setRandLetterPaths(lCaseLetters);
    setRandLetterPaths(uCaseLetters);
  }
};

var findMissingLetters = function findMissingLetters(letters, lCount, isUpperCase) {
  var missingLetters = [];var _loop2 = function _loop2(
  i) {
    var val = isUpperCase ? String.fromCharCode(i) : String.fromCharCode(i).toLowerCase(),
    nLetter = letters.filter(function (letter) {return letter === val;}).length;
    if (nLetter < lCount) {
      var j = nLetter;
      while (j < lCount) {
        missingLetters.push(val);
        j++;
      }
    }};for (var i = 65; i <= 90; i++) {_loop2(i);
  }
  return missingLetters;
};

var replenishLetterPool = function replenishLetterPool() {var nSets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var poolLetters = LETTER_POOL.childNodes;
  var charInd = 65,
  currentLetters = [],
  missingLetters = [],
  lettersToAdd = [];

  for (var i = 0; i < poolLetters.length; i++) {
    currentLetters.push(poolLetters[i].dataset.letter);
  }
  missingLetters = [].concat(_toConsumableArray(missingLetters), _toConsumableArray(findMissingLetters(currentLetters, nSets, false)));
  missingLetters = [].concat(_toConsumableArray(missingLetters), _toConsumableArray(findMissingLetters(currentLetters, nSets, true)));
  for (var _i = 0; _i < missingLetters.length; _i++) {
    var _val = missingLetters[_i];
    lettersToAdd.push(createLetter('pool-letter', _val));
  }
  setRandLetterPaths(lettersToAdd);
};

var clearLetterPool = function clearLetterPool() {
  removeAllChildren(LETTER_POOL);
};

var scrollToBottomOfMessages = function scrollToBottomOfMessages() {
  CHAT_MESSAGE_COLUMN_WRAPPER.scrollTop = CHAT_MESSAGE_COLUMN_WRAPPER.scrollHeight;
};

var checkMessageColumnHeight = function checkMessageColumnHeight() {
  if (CHAT_MESSAGE_COLUMN.clientHeight >= window.innerHeight) {
    removeClass(CHAT_MESSAGE_COLUMN, 'static');
  } else
  {
    addClass(CHAT_MESSAGE_COLUMN, 'static');
  }
};

var appendContentText = function appendContentText(contentText, text) {
  for (var i = 0; i < text.length; i++) {
    var _letter = document.createElement('span');
    _letter.innerHTML = text[i];
    setAttr(_letter, 'data-letter', text[i]);
    contentText.appendChild(_letter);
  }
};

var createChatMessage = function createChatMessage(text, isReceived) {
  var message = document.createElement('div'),
  profileIcon = document.createElement('div'),
  icon = document.createElement('i'),
  content = document.createElement('div'),
  contentText = document.createElement('h1'),
  direction = isReceived ? 'received' : 'sent';

  addClass(content, 'content');
  addClass(content, 'invisible');
  addClass(contentText, 'text');
  addClass(contentText, 'invisible');
  appendContentText(contentText, text);
  content.appendChild(contentText);

  addClass(profileIcon, 'profile-icon');
  addClass(profileIcon, 'invisible');
  profileIcon.appendChild(icon);

  addClass(message, 'message');
  addClass(message, direction);

  if (isReceived) {
    addClass(icon, 'fab');
    addClass(icon, 'fa-cloudsmith');
    addClass(message, STATE.currentMood);
    message.appendChild(profileIcon);
    message.appendChild(content);
  } else
  {
    addClass(icon, 'far');
    addClass(icon, 'fa-user');
    message.appendChild(content);
    message.appendChild(profileIcon);
  }

  return message;
};

var findLetterInPool = function findLetterInPool(targetLetter) {
  var letters = LETTER_POOL.childNodes,
  foundLetter = null;
  for (var i = 0; i < letters.length; i++) {
    var nextLetter = letters[i];
    if (nextLetter.dataset.letter === targetLetter && !nextLetter.dataset.found) {
      foundLetter = letters[i];
      setAttr(foundLetter, 'data-found', true);
      break;
    }
  }
  return foundLetter;
};

var createOverlayLetter = function createOverlayLetter(val) {
  var overlayLetter = document.createElement('span');
  addClass(overlayLetter, 'overlay-letter');
  addClass(overlayLetter, 'in-flight');
  overlayLetter.innerHTML = val;
  return overlayLetter;
};

var removePoolLetter = function removePoolLetter(letter) {
  addClass(letter, 'invisible');
  setTimeout(function () {
    removeChild(LETTER_POOL, letter);
  }, 500);
};

var setElPosFromRight = function setElPosFromRight(el, x, y) {
  setStyle(el, 'right', x + 'px');
  setStyle(el, 'top', y + 'px');
};

var animateOverlayLetter = function animateOverlayLetter(letter, contentText, finalPos, isReceived) {
  removePoolLetter(letter);
  var initPos = letter.getBoundingClientRect(),
  overlayLetter = createOverlayLetter(letter.dataset.letter);
  if (isReceived) {
    setElPos(overlayLetter, initPos.left, initPos.top);
  } else
  {
    setElPosFromRight(overlayLetter, window.innerWidth - initPos.right, initPos.top);
  }
  LETTER_OVERLAY.appendChild(overlayLetter);
  setTimeout(function () {
    if (isReceived) {
      setElPos(overlayLetter, finalPos.left, finalPos.top);
    } else
    {
      setElPosFromRight(overlayLetter, window.innerWidth - finalPos.right, finalPos.top);
    }
    setTimeout(function () {//asdf
      removeClass(contentText, 'invisible');
      addClass(overlayLetter, 'invisible');
      setTimeout(function () {
        removeChild(LETTER_OVERLAY, overlayLetter);
      }, 1000);
    }, 1500);
  }, 100);
};

var animateMessageLetters = function animateMessageLetters(message, isReceived) {
  var content = message.getElementsByClassName('content')[0],
  contentText = content.getElementsByClassName('text')[0],
  letters = contentText.childNodes,
  textPos = contentText.getBoundingClientRect();
  for (var i = 0; i < letters.length; i++) {
    var _letter2 = letters[i],
    targetLetter = findLetterInPool(_letter2.dataset.letter),
    finalPos = _letter2.getBoundingClientRect();
    if (targetLetter) {
      animateOverlayLetter(targetLetter, contentText, finalPos, isReceived);
    } else
    {(function () {
        var tempLetter = createLetter('temp-letter', _letter2.dataset.letter),
        pos = getRandPosOffScreen();
        addClass(tempLetter, 'invisible');
        setElPos(tempLetter, pos.x, pos.y);
        TEMP_LETTER_POOL.appendChild(tempLetter);
        animateOverlayLetter(tempLetter, contentText, finalPos, isReceived);
        setTimeout(function () {
          removeChild(TEMP_LETTER_POOL, tempLetter);
        }, 100);})();
    }
  }
};

var addChatMessage = function addChatMessage(text, isReceived) {
  var message = createChatMessage(text, isReceived),
  content = message.getElementsByClassName('content')[0],
  contentText = content.getElementsByClassName('text')[0],
  profileIcon = message.getElementsByClassName('profile-icon')[0];
  CHAT_MESSAGE_COLUMN.appendChild(message);
  toggleInput();
  setTimeout(function () {
    removeClass(profileIcon, 'invisible');
    setTimeout(function () {
      removeClass(content, 'invisible');
      setTimeout(function () {
        animateMessageLetters(message, isReceived);
        setTimeout(function () {return replenishLetterPool(STATE.nLetterSets);}, 2500);
      }, 1000);
    }, 250);
  }, 250);
};

var checkIfInputFieldHasVal = function checkIfInputFieldHasVal() {return MESSAGE_INPUT_FIELD.value.length > 0;};

var clearInputField = function clearInputField() {
  QUESTION = MESSAGE_INPUT_FIELD.value;
  MESSAGE_INPUT_FIELD.value = '';
};

var disableInputField = function disableInputField() {
  MESSAGE_INPUT_FIELD.blur();
  MESSAGE_INPUT_FIELD.value = '';
  MESSAGE_INPUT_FIELD.readOnly = true;
};

var enableInputField = function enableInputField() {
  MESSAGE_INPUT_FIELD.readOnly = false;
  MESSAGE_INPUT_FIELD.focus();
};

// @shesl-meow
function askphp(question){
    var result = false;
    $.ajax({
        type: "POST",
        url: "/ajax/ask/",
        dataType: 'json',
        async: false,
        data:{"input": question},

        success: function (data) {
            result = data;
        }
    });
    return result;
}
// @shesl-meow

var QUESTION = "";
var ANSWER = "NONE";

var getChatbotMessageText = function() {
  ANSWER = STATE.chatbotMessageIndex ? askphp(QUESTION) : getRandGreeting();
};

var sendChatbotMessage = function sendChatbotMessage() {
  getChatbotMessageText();
  STATE.isChatBotSendingMessage = true;
  addChatMessage(ANSWER, true);
  STATE.chatbotMessageIndex++;
  setTimeout(function () {
    STATE.isChatBotSendingMessage = false;
    toggleInput();
  }, 4000);
};

var sendUserMessage = function sendUserMessage() {
  STATE.isUserSendingMessage = true;
  addChatMessage(MESSAGE_INPUT_FIELD.value, false);
  setTimeout(function () {
    STATE.isUserSendingMessage = false;
    toggleInput();
  }, 4000);
};

var onEnterPress = function onEnterPress(e) {
  sendUserMessage();
  setTimeout(function () {
    sendChatbotMessage();
  }, 4000);
  toggleInput();
  clearInputField();
};

var initLetterPool = function initLetterPool() {
  clearLetterPool();
  fillLetterPool(STATE.nLetterSets);
};

var init = function init() {
  setChatbotMood0();
  initLetterPool();
  sendChatbotMessage();
  toggleInput();
  setMoodInterval(getRandMoodInterval());
};

var resetTimeout = null;
var resetLetterPool = function resetLetterPool() {
  var intervals = STATE.letterPool.intervals;
  for (var i = 0; i < intervals.length; i++) {
    clearInterval(intervals[i]);
  }
  clearTimeout(resetTimeout);
  clearLetterPool();
  resetTimeout = setTimeout(function () {
    initLetterPool();
  }, 200);
};

var toggleInput = function toggleInput() {
  if (checkIfInputFieldHasVal() && canSendMessage()) {
    addClass(MESSAGE_INPUT, 'send-enabled');
  } else
  {
    removeClass(MESSAGE_INPUT, 'send-enabled');
  }
};

var isValidLetter = function isValidLetter(e) {
  return !e.ctrlKey &&
  e.key !== 'Enter' &&
  e.keyCode !== 8 &&
  e.keyCode !== 9 &&
  e.keyCode !== 13;
};

var canSendMessage = function canSendMessage() {return !STATE.isUserSendingMessage && !STATE.isChatBotSendingMessage;};

var getRandMoodInterval = function getRandMoodInterval() {return getRand(20000, 40000);};

var moodInterval = null;
var setMoodInterval = function setMoodInterval(time) {
  moodInterval = setInterval(function () {
    clearInterval(moodInterval);
    setChatbotMood();
    setMoodInterval(getRandMoodInterval());
  }, time);
};

MESSAGE_INPUT_FIELD.onkeypress = function (e) {
  if (checkIfInputFieldHasVal() && e.key === 'Enter') {
    removeClass(MESSAGE_INPUT, 'send-enabled');
    if (canSendMessage()) {
      onEnterPress(e);
    }
  }
};

MESSAGE_INPUT_FIELD.onkeyup = function () {
  toggleInput();
};

MESSAGE_INPUT_FIELD.oncut = function () {return toggleInput();};

window.onload = function () {return init();};

window.onfocus = function () {return resetLetterPool();};

window.onresize = _.throttle(resetLetterPool, 200);

var greetings = {
  friendly: [
  "你好呀，我是上知天文下知地理的南小开",
  "嘿，你好，我是南小开"],
confused: [
"我不知道，妈妈还没有告诉我",
"小开肚子里还没吃这个知识，不如你告诉我吧"],

boastful: [
"我可厉害了",
"哈哈哈，我是最棒的"] };



var convo = {
  friendly: [
  "What a great thing you just said. I'm so glad you said it.",
  "Ahh, yes, I agree. It is so great to say things, isn't it?",
  "Please, tell me more. It brings me such joy to respond to the things you say.",
  "Ahh, yes valid point. Or was it? Either way, you're fantastic!",
  "Anyways, did I mention that I hope you're having a great day? If not, I hope it gets better!"],

  confused: [
  "我不知道，妈妈还没有告诉我",
  "小开肚子里还没吃这个知识，不如你告诉我吧",
  "我不明白你在说什么",
  "I just don't know if I can trust that thing you just said...",
  "Oh, interesting. I totally believe you. (Not really)",
  "Uh-huh, yeah, listen...I'm not going to fully invest in this conversation until I'm certain I know your motive.",
  "Wait, what the heck is that?? Oh, phewf, it's just another rogue letter 'R' that escaped the letter pool.",
  "You can't fool me, I know that's not true!"],

  boastful: [
  "我可厉害了",
  "哈哈哈，我是最棒的",
  "That's interesting. I'll have you know that I have an extremely advanced learning algorithm that analyzes everything you say...well, not really, but I wish.",
  "Hey, while I have you, I should probably tell you that I can respond in 4 seconds flat. Which is pretty fast if you ask me.", 'Listen, that\'s neat and all, but look how fast I can calculate this math problem: 12345 * 67890 = ' +
  12345 * 67890 + '. Didn\'t even break a sweat.',
  "Oh, I forgot to mention that I've existed for over 100,000 seconds and that's something I'm quite proud of.",
  "Wow, thats pretty cool, but I can hold my breath for all of eternity. And it took me 0 seconds to gain that ability."] };
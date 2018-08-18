function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

var
LETTER_OVERLAY = getEl('letter-overlay'),
CHAT_MESSAGE_COLUMN_WRAPPER = getEl('chat-message-column-wrapper'),
CHAT_MESSAGE_COLUMN = getEl('chat-message-column'),
$("#message-input") = getEl('message-input'),
$("#message-input-field") = getEl('message-input-field'),


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

var setRandLetterPaths = function (letters) {
  var _loop = function _loop(i) {
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
    $("#temp-letter").appendChild(letter);
    setTimeout(function () {
      setElPos(letter, nextPos.x, nextPos.y);
      removeClass(letter, 'invisible');
      var interval = setInterval(function () {
        startNewLetterPath(letter, nextRand, interval);
      }, STATE.letterPool.transitionPeriod + delay);
    }, 1);};
  for (var i = 0; i < letters.length; i++) {_loop(i);
  }
};

var fillLetterPool = function fillLetterPool() {
  var nSets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
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
  var poolLetters = $("#temp-letter").childNodes;
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
  removeAllChildren($("#temp-letter"));
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

var findLetterInPool = function findLetterInPool(targetLetter) {
  var letters = $("#temp-letter").childNodes,
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
    removeChild($("#temp-letter"), letter);
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
        $("#temp-letter-pool").appendChild(tempLetter);
        animateOverlayLetter(tempLetter, contentText, finalPos, isReceived);
        setTimeout(function () {
          removeChild($("#temp-letter-pool"), tempLetter);
        }, 100);})();
    }
  }
};


var clearInputField = function clearInputField() {
  QUESTION = $("#message-input-field").value;
  $("#message-input-field").value = '';
};

var disableInputField = function disableInputField() {
  $("#message-input-field").blur();
  $("#message-input-field").value = '';
  $("#message-input-field").readOnly = true;
};

var enableInputField = function enableInputField() {
  $("#message-input-field").readOnly = false;
  $("#message-input-field").focus();
};

// var getChatbotMessageText = function() {
//   ANSWER = STATE.chatbotMessageIndex ? askphp(QUESTION) : getRandGreeting();
// };


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



var isValidLetter = function isValidLetter(e) {
  return !e.ctrlKey &&
  e.key !== 'Enter' &&
  e.keyCode !== 8 &&
  e.keyCode !== 9 &&
  e.keyCode !== 13;
};


$("#message-input-field").onkeypress = function (e) {
  if (checkIfInputFieldHasVal() && e.key === 'Enter') {
    removeClass($("#message-input"), 'send-enabled');
    if (canSendMessage()) {
      onEnterPress(e);
    }
  }
};

$("#message-input-field").onkeyup = function () {
  toggleInput();
};

$("#message-input-field").oncut = function () {return toggleInput();};

window.onload = function () {return init();};

window.onfocus = function () {return resetLetterPool();};

window.onresize = _.throttle(resetLetterPool, 200);

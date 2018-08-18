function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var
$("#letter-overlay") = getEl('letter-overlay'),
CHAT_MESSAGE_COLUMN_WRAPPER = getEl('chat-message-column-wrapper'),
CHAT_MESSAGE_COLUMN = getEl('chat-message-column'),
$("#message-input") = getEl('message-input'),
$("#message-input-field") = getEl('message-input-field'),


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

var init = function init() {
  setChatbotMood0();
  initLetterPool();
  sendChatbotMessage();
  toggleInput();
  setMoodInterval(getRandMoodInterval());
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

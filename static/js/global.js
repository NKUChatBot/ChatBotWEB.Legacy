
var STATE = {
  isUserSendingMessage: false,
  isChatBotSendingMessage: false,
  letterPool: {
    transitionPeriod: 30000,
    intervals: [] },

  chatbotMessageIndex: 0,
  nLetterSets: 4 };


function checkIfInputFieldHasVal() {
    return $("#message-input-field").value.length > 0;
};

function canSendMessage() {
    return !STATE.isUserSendingMessage && !STATE.isChatBotSendingMessage;
};

var toggleInput = function toggleInput() {
  (checkIfInputFieldHasVal() && canSendMessage()) ? addClass($("#message-input"), 'send-enabled') : removeClass($("#message-input"), 'send-enabled');
};


function TypingListener() {
    this.field = $("#message-input-field");
    this.chatbot = new ChatbotManager();
    this.chatbot.startRandMood();
}

TypingListener.prototype.clearInputField = function () {

}

TypingListener.prototype.disableInputField = function () {
    this.field.blur();
    this.field.value = "";
    this.field.readOnly = true;
    return this;
};

TypingListener.prototype.enableInputField = function () {
    this.field.readOnly = false;
    this.field.focus();
    return this;
};

TypingListener.prototype.onEnterPress = function (e) {
    let sender = new MessageSender(this.field.value);
    sender.sendUserMessage();
    setTimeout(function () {
        sender.sendChatbotMessage(this.chatbot.CurrentMood);
    }, 4000);
    toggleInput();
    this.field.value = '';
    return this;
};


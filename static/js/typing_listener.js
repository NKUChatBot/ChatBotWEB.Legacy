
function TypingListener() {
    this.input = $("#message-input");
    this.field = $("#message-input-field");
    this.InvalidKey = ['Enter', 8, 9, 13];
}

TypingListener.prototype.checkIfInputFieldHasVal = function () {
    return this.field.value.length > 0;
};

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

TypingListener.prototype.isValidLetter = function (e) {
    return !(e.ctrlKey || this.InvalidKey.includes(e.key));
};

TypingListener.prototype.startListen = function(chatbot){
    let self = this;
    this.field.onkeypress = function (e) {
        e.key === 'Enter' && (function () {
            self.input.removeClass('send-enabled');

            let sender = new MessageSender(self.field.value);
            self.field.value = "";
            sender.sendUserMessage();
            setTimeout(function () {
                sender.askChatbot();
                sender.sendChatbotMessage(chatbot.CurrentMood);
            }, 4000);

            self.input.addClass("send-enabled");
        })();
    };
    return this;
};

let typer = new TypingListener();
typer.startListen(chatbot);
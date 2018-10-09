
function TypingListener() {
    this.box = $("#message-input-box");
    this.field = $("#message-input-field");
    this.button = $("#send-message-button");
    this.InvalidKey = ['Enter', 8, 9, 13];
}


TypingListener.prototype.disableInput = function () {
    this.box.removeClass("send-enable");
    this.field.blur();
    this.field.val("");
    this.field.readOnly = true;
    return this;
};

TypingListener.prototype.enableInput = function () {
    this.box.addClass("send-enable");
    this.field.readOnly = false;
    this.field.focus();
    return this;
};

TypingListener.prototype.isValidLetter = function (e) {
    return !(e.ctrlKey || this.InvalidKey.includes(e.key));
};

TypingListener.prototype.startAsking = function () {
    let self = this;
    let sender = new MessageSender(this.field.val());
    this.disableInput();

    sender.sendUserMessage().askChatbot();
    setTimeout(function () {
        sender.sendChatbotMessage(chatbot.CurrentMood);
        self.enableInput();
    }, 4000);
};

TypingListener.prototype.startListen = function(){
    let self = this;

    this.field.on("keypress", function (e) {
        if(e.key === 'Enter'){ self.startAsking();}
    });

    this.button.on("click", function () { self.startAsking();});

    window.onfocus = function () { letterPool.resetPoolLetter();};

    window.onresize = function () { letterPool.resetPoolLetter();};

    return this;
};

let typer = new TypingListener();
typer.startListen(chatbot);
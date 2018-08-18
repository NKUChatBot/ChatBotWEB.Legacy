
function MessageSender(text){
    this.QUESTION = text;
    this.ANSWER = "This is a default answer";
}

MessageSender.prototype.askChatbot = function(question){
    $.ajax({
        url: "/ajax/ask/", type: "POST", dataType: "json", async:false,
        data: {"input": question}
    })
        .done(function(data){this.ANSWER = data;})
        .fail(function(){this.ANSWER = "Sorry QA program fail!"});
    return this.ANSWER;
};

MessageSender.prototype.getChatbotGreet = function(greetingType){
    $.ajax({
        url: "/ajax/greet/", type: "POST", dataType: "json", async:false,
        data: {"input": greetingType}
    })
        .done(function (data) { this.ANSWER = data;})
        .fail(function(){this.ANSWER = "Sorry Greeting program fail!"});
    return this.ANSWER;
}

MessageSender.prototype.sendUserMessage = function () {
    STATE.isUserSendingMessage = true;
    let sender = new MessageViewer(this.QUESTION);
    sender.createChatMessage().addChatMessage();
    setTimeout(function () {
        STATE.isUserSendingMessage = false;
        toggleInput();
    }, 4000);
    return this;
};

MessageSender.prototype.sendChatbotMessage = function (chatbotMood) {
    STATE.isChatBotSendingMessage = true;
    let sender = new MessageViewer(this.ANSWER, chatbotMood);
    sender.createChatMessage().addChatMessage();
    setTimeout(function () {
        STATE.isChatBotSendingMessage = false;
        toggleInput();
    }, 4000);
    return this;
};

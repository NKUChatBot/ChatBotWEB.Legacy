
function MessageSender(text){
    this.QUESTION = text;
    this.ANSWER = "This is a default answer";
}

MessageSender.prototype.askChatbot = function(){
    let self = this;
    $.ajax({
        url: "/ajax/ask/", type: "POST", dataType: "json", async:false,
        data: {"input": self.QUESTION}
    })
        .done(function(data){self.ANSWER = data;})
        .fail(function(){self.ANSWER = "Sorry QA program fail!"});
    return this.ANSWER;
};

MessageSender.prototype.getChatbotGreet = function(greetingType){
    let self = this;
    $.ajax({
        url: "/ajax/greet/", type: "POST", dataType: "json", async:false,
        data: {"input": greetingType}
    })
        .done(function (data) { self.ANSWER = data;})
        .fail(function(){ self.ANSWER = "Sorry Greeting program fail!"});
    return this.ANSWER;
};

MessageSender.prototype.sendUserMessage = function () {
    let sender = new MessageViewer(this.QUESTION);
    sender.createChatMessage().addChatMessage();
    setTimeout(function () {
        //toggleInput();
    }, 4000);
    return this;
};

MessageSender.prototype.sendChatbotMessage = function () {
    let viewer = new MessageViewer(this.ANSWER, chatbot.CurrentMood);
    viewer.createChatMessage().addChatMessage();
    setTimeout(function () {
        //toggleInput();
    }, 4000);
    return this;
};

let initsender = new MessageSender();
initsender.getChatbotGreet('init');
initsender.sendChatbotMessage(chatbot.CurrentMood);
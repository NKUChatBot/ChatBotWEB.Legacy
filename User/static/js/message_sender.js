
function MessageSender(text){
    this.QUESTION = text;
    this.ANSWER = "This is a default answer";
}

MessageSender.prototype.askChatbot = function(){
    let self = this;
    $.ajax({
        url: "/ask/", type: "POST", dataType: "json", async:false,
        data: {"input": self.QUESTION},
        success:function(res){self.ANSWER = res.data;},
        error:function(){self.ANSWER = "Sorry QA program fail!"}
    });
    return this;
};

MessageSender.prototype.getChatbotGreet = function(greetingType){
    let self = this;
    $.ajax({
        url: "/greet/", type: "POST", dataType: "json", async:false,
        data: {"mood": greetingType}
    })
        .done(function (data) {self.ANSWER = data.data;})
        .fail(function(){ self.ANSWER = "Sorry Greeting program fail!"});
    return this.ANSWER;
};

MessageSender.prototype.sendUserMessage = function () {
    let viewer = new MessageViewer(this.QUESTION);
    viewer.createChatMessage().addChatMessage();
    return this;
};

MessageSender.prototype.sendChatbotMessage = function () {
    let viewer = new MessageViewer(this.ANSWER, chatbot.CurrentMood);
    viewer.createChatMessage().addChatMessage();
    return this;
};

let initsender = new MessageSender();
initsender.getChatbotGreet('init');
initsender.sendChatbotMessage(chatbot.CurrentMood);
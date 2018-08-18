
function MessageViewer(text, robotMood){
    this.QAState = robotMood ? 'answer' : 'question';
    this.messageText = text;
    this.Mood = robotMood;

    this.createChatMessage();
}

MessageViewer.prototype.createChatMessage = function(){
    let self = this;
    this.message= $('<div />', {'class':['message',this.QAState, this.Mood || ""].join(' ')});
    this.profileIcon = $('<div />', {'class': ['profile-icon', 'invisible'].join(' ')}).appendTo(this.message);
    $('<i />',{'class':['fab', this.Mood ? 'fa-cloud' : 'fa-user'].join(' ')}).appendTo(this.profileIcon);

    this.MessageBox = $('<div />', {'class':['content', 'invisible'].join(' ')});
    this.textContainer = $('<h1 />', {'class':['text', 'invisible'].join(' ')});
    this.messageText.split('').forEach(function (char) {
        $('<span/>',{html:char, 'data-letter':char}).appendTo(self.textContainer);
    });
    this.Mood ? this.message.append(this.profileIcon, this.MessageBox) : this.message.append(this.MessageBox, this.profileIcon);
    return this;
};

MessageViewer.prototype.addChatMessage = function(){
    let self = this;
    $('#chat-message-column').append(this.message);
    //toggleInput();
    setTimeout(function(){
        self.profileIcon.removeClass('invisible') && setTimeout(function () {
            self.MessageBox.removeClass('invisible') && setTimeout(function () {
                self.animateMessageLetters(letterPool);
                setTimeout(function () {
                    letterPool.replenishLetterPool();
                }, 2500);
            }, 1000);
        }, 250);
    }, 250);
    return this;
};

MessageViewer.prototype.animateMessageLetters = function () {
    let self = this;
    this.textContainer.children('span').each(function (index, span) {
        let targetLetter = letterPool.findLetterInPool($(span).data("letter"));
        targetLetter ? targetLetter.gotoMessageBox(self.MessageBox) : (function () {
            let temp = new LetterController('temp-letter', $(span).data("letter"));
            temp.setRandPostion().gotoMessageBox(self.MessageBox);
        })();
    })
};
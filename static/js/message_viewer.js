
function MessageViewer(text, robotMood){
    this.QAState = robotMood ? 'answer' : 'question';
    this.messageText = text;
    this.Mood = robotMood;
}

MessageViewer.prototype.createChatMessage = function(){
    this.message= $('<div />', {'class':['message',this.QAState, this.Mood || ""].join(' ')});
    this.profileIcon = $('<div />', {'class': ['profile-icon', 'invisible']}).appendTo(this.message);
    $('<i />',{'class':['fab', this.Mood ? 'fa-cloud' : 'fa-user'].join(' ')}).appendTo(this.profileIcon);

    this.MessageBox = $('<div />', {'class':['content', 'invisible'].join(' ')});
    this.textContainer = $('<h1 />', {'class':['text', 'invisible'].join(' ')});
    this.messageText.split('').forEach(function (char) {
        $('<span/>',{html:char, 'data-letter':char}).appendTo(this.textContainer);
    });
    this.Mood ? this.message.append(this.profileIcon, this.MessageBox) : this.message.append(this.MessageBox, profileIcon);
    return this;
};

MessageViewer.prototype.addChatMessage = function(Animation1, Animation2){
    $('#chat-message-column').append(this.message);
    toggleInput();
    setTimeout(function(){
        this.profileIcon.removeClass('invisible') && setTimeout(function () {
            this.MessageBox.removeClass('invisible') && setTimeout(function () {
                Animation1(this.message, this.Mood ? True : False);
                setTimeout(function () {
                    Animation2(STATE.nLetterSets);
                }, 2500);
            }, 1000);
        }, 250);
    }, 250);
};

MessageViewer.prototype.animateMessageLetters = function (letterPool) {
    let self = this;
    this.textContainer.forEach(function (span) {
        let targetLetter = letterPool.findLetterInPool(span.data("letter"));
        targetLetter ? targetLetter.gotoMessageBox(this.MessageBox) : (function () {
            let temp = new LetterController('temp-letter', span.data("letter"));
            temp.setRandPostion().gotoMessageBox(self.MessageBox);
        })();
    })
};
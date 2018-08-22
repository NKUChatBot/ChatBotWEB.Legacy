
function ChatbotManager(minInterval=20000, maxInterval=40000){
    this.ProbMoodSet = ['friendly', 'confused', 'boastful'];
    this.CurrentMood = 'friendly';
    this.startRandMood();

    this.minInterval = minInterval;
    this.maxInterval = maxInterval;
    this.intervalHandler = null;
}

ChatbotManager.prototype.getRandMood = function(){
    this.CurrentMood = this.ProbMoodSet[getRand(0, this.ProbMoodSet.length-1)];
    this.applyToDOM();
    return this.CurrentMood;
};

ChatbotManager.prototype.setChatbotMood = function(mood){
    this.CurrentMood = this.ProbMoodSet.includes(mood) ? mood : this.ProbMoodSet[getRand(0, this.ProbMoodSet.length-1)];
    this.applyToDOM();
    return this.CurrentMood;
};

ChatbotManager.prototype.applyToDOM = function(){
    this.ProbMoodSet.forEach(function (item) {$("#chat-bot-mood-box").removeClass(item);});
    $("#chat-bot-mood-box").addClass(this.CurrentMood);
    $("#chat-bot-mood-value").html(this.CurrentMood);
};

ChatbotManager.prototype.startRandMood = function(){
    let self = this;
    this.intervalHandler = setTimeout(function () {
        self.getRandMood() && self.startRandMood();
    }, getRand(this.minInterval, this.maxInterval));
};

ChatbotManager.prototype.stopRandMood = function(){clearInterval(this.intervalHandler);}

let chatbot = new ChatbotManager();
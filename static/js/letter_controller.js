
function LetterController(cName, value) {
    this.viewer = $('<div />', {'class':[cName, 'invisible'].join(' '), 'data-letter': value, 'html': value});
    this.currentQuadrant = null;
    this.pathHandler = null;

    this.transitionPeriod = 300000;
    this.transitionDelay = 0;
    this.getIntoBackground();
}

LetterController.prototype.setPosition = function(point){
    this.viewer.css('left', point.x + 'px');
    this.viewer.css('top', point.y + 'px');
    return this;
};

LetterController.prototype.setRandPostion = function(excludedSelf=false){
    let self = this;
    this.setPosition((function () {
        self.currentQuadrant = excludedSelf ? (function(N){
            return N + (N > self.currentQuadrant);
        })(getRand(1,3)): getRand(1,4);
        return getRandPosOffScreen(self.currentQuadrant);
    })());
    return this;
};

LetterController.prototype.setRandTransition = function(){
    let self = this;
    (function(period, delay){
        self.viewer.css('transition', `left ${period}ms linear ${delay}ms,`
            + `top ${period}ms linear ${delay}ms,` + "opacity 0.5s");
    })(self.transitionPeriod, self.transitionDelay = getRand(0, this.transitionPeriod)*-1);
    return this;
};

LetterController.prototype.startNewPath = function(){
    let self = this;
    clearInterval(self.pathHandler);
    self.setRandPostion(true).setRandTransition();

    self.pathHandler = setInterval(function () {
        self.startNewPath();
    }, self.transitionPeriod + self.transitionDelay);
    return this;
};

LetterController.prototype.gotoMessageBox = function(box){
    let self = this;
    this.quitFromBackground();
    this.viewer = (function(origin) {
        return $("<span />", {"class": ["overlay-letter", "in-flight"].join(" "),
            "html":origin.html()}).appendTo("#letter-overlay");
    })(this.viewer);

    setTimeout(function () {
        self.setPosition(box.get(0).getBoundingClientRect());
        setTimeout(function () {
            box.removeClass("invisible");
            self.viewer.addClass("invisible");
            setTimeout(function () {
                self.viewer.remove();
            }, 1000);
        }, 1500);
    }, 100);
    return this;
};

LetterController.prototype.getIntoBackground = function(){
    $("#letter-pool").append(this.viewer);
    return this;
};

LetterController.prototype.quitFromBackground = function(){
    let self = this;
    this.viewer.addClass('invisible');
    setTimeout(function () {
        self.viewer.remove();
    }, 500);
    clearInterval(this.pathHandler);
    return this;
};

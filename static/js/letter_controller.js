
function LetterController(value) {
    this.viewer = $('<div />', {'class':['pool-letter', 'invisible'].join(' '), 'data-letter': value, 'html': value});
    this.currentLetter = value;
    this.currentQuadrant = null;
    this.currentPosition = {x:null, y:null};
    this.pathHandler = null;

    this.transitionPeriod = 30000;
    this.transitionDelay = 0;
    this.setRandTransition().setRandPosition(false).getIntoBackground();
}

LetterController.prototype.setPosition = function(point=this.currentPosition){
    this.currentPosition = point;
    this.viewer.css('left', point.x + 'px');
    this.viewer.css('top', point.y + 'px');
    return this;
};

LetterController.prototype.setRandPosition = function(excludedSelf=false){
    let self = this;
    this.currentQuadrant = excludedSelf ? (function(N){
        return N + (N > self.currentQuadrant);
    })(getRand(1,3)): getRand(1,4);
    this.setPosition(this.currentPosition = getRandPosOffScreen(self.currentQuadrant) );
    return this;
};

LetterController.prototype.setRandTransition = function(){
    this.transitionDelay  = getRand(0, this.transitionPeriod)*(-1);
    let delay = this.transitionDelay;
    let period = this.transitionPeriod;
    this.viewer.css('transition', `left ${period}ms linear ${delay}ms,`
        + `top ${period}ms linear ${delay}ms,` + "opacity 0.5s");
    return this;
};

LetterController.prototype.startNewPath = function(){
    let self = this;
    this.setRandTransition().setRandPosition(true);

    this.pathHandler = setTimeout(function () {
        self.startNewPath();
    }, self.transitionPeriod + self.transitionDelay);
    return this;
};

LetterController.prototype.getIntoBackground = function(){
    $("#letter-pool").append(this.viewer);
    letterPool.jumpIntoPool(this);
    return this;
};

LetterController.prototype.quitFromBackground = function(){
    letterPool.jumpOutPool(this);
    this.viewer.remove();
    clearInterval(this.pathHandler);
    return this;
};

LetterController.prototype.transferToFlightMood = function () {
    this.viewer = $("<span />", {"class": ["overlay-letter", "in-flight"].join(" "),
        "html":this.currentLetter}).appendTo("#letter-overlay");
    this.setPosition();
    clearInterval(this.pathHandler);
    return this;
};
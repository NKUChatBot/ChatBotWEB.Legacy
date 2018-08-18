
function LetterController(cName, value) {
    this.viewer = $('<div />', {'class':[cName, 'invisible'].join(' '), 'data-letter': value, 'html': value});
    this.currentQuadrant = null;
    this.currrntPoint = {x:null, y:null};
    this.pathHandler = null;

    this.transitionPeriod = 300000;
    this.transitionDelay = 0;
    alert(1);
    this.getIntoBackground();
}

LetterController.prototype.setPosition = function(point){
    this.viewer.style['left'] = point.x + 'px';
    this.viewer.style['top'] = point.y + 'px';
    return this;
};

LetterController.prototype.setRandPostion = function(excludedSelf=false){
    let self = this;
    this.setPosition(self.currrntPoint = (function () {
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
        self.viewer.style['transition'] = `left ${period}ms linear ${delay}ms,`
            + `top ${period}ms linear ${delay}ms,` + "opacity 0.5s";
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
    this.quitFromBackground();
    this.viewer = (function(origin) {
        return $("<span />", {"class": ["overlay-letter", "in-flight"].join(" "),
            "html":origin.html}).appendTo("#letter-overlay");
    })(this.viewer);

    setTimeout(function () {
        this.viewer.setPosition(box.getBoundingClientRect());
        setTimeout(function () {
            box.removeClass("invisible");
            this.viewer.addClass("invisible");
            setTimeout(function () {
                $("#letter-overlay").removeChild(this.viewer)
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
    this.viewer.addClass('invisible');
    setTimeout(function () {
        $("#letter-pool").removeChild(this.viewer);
    }, 500);
    clearInterval(this.pathHandler);
    return this;
};

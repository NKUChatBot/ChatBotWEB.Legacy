
function BGAnimation() {
    this.transitionPeriod = 30000;
}

BGAnimation.prototype.LAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
BGAnimation.prototype.UAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


BGAnimation.prototype.startNewLetterPath = function() {
    
};

BGAnimation.prototype.setRandLetterPaths = function(thisLetterTable){
    let self = this;
    thisLetterTable.forEach(function (thisLetter) {
        (function(point){
            thisLetter.setPosition(point.x, point.y);
        })(getRandPosOffScreen(thisLetter.getRandQuadrant()));

        (function(delay){
            thisLetter.viewer.style['transition'] = `left ${self.transitionPeriod}ms linear ${delay}ms,`
                + `top ${self.transitionPeriod}ms linear ${delay}ms,` + "opacity 0.5s";
        })(getRand(0, self.transitionPeriod)*-1);
        
        setTimeout(function () {
            (function(point){
                thisLetter.setPosition(point.x, point.y);
            })(getRandPosOffScreen(thisLetter.switchRandQuadrant()));
            thisLetter.removeClass('invisible');
        }, 1);
    })
};


BGAnimation.prototype.fillLetterPool = function (thisLetterNum) {
    for(var i = 0; i < thisLetterNum || 1; i++)
    {
        setRandLetterPaths()
    }
}
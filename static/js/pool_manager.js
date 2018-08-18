
function PoolManager(alphabetNum) {
    this.alphabetNum = alphabetNum || 1;
    this.alphabetSet = [].concat(this.LAlphabet, this.UAlphabet, this.ZHAlphabet);
    this.letterPool = [];

    let self = this;
    self.fillLetterPool();
}

PoolManager.prototype.LAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
PoolManager.prototype.UAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
PoolManager.prototype.ZHAlphabet = '南开你好很高兴见到我'.split('');


PoolManager.prototype.setPoolLetterPaths = function(addLetter=[]){
    this.letterPool = this.letterPool.concat(addLetter);
    (addLetter===[] ? this.letterPool : addLetter).forEach(function (controller) {
        controller.setRandPostion(false).setRandTransition();
        setTimeout(function () {
            controller.setRandPostion(true).viewer.removeClass('invisible');
            controller.pathHandler = setInterval(function () {
                controller.startNewPath();
            }, controller.transitionPeriod + controller.transitionDelay);
        }, 1);
    });
    return this;
};

PoolManager.prototype.fillLetterPool = function () {
    let self = this;
    for(let i = 0; i < this.alphabetNum || 1; i++)
        this.alphabetSet.forEach(function (letter) {
            self.letterPool.push(new LetterController('pool-letter', letter));
        });
    this.setPoolLetterPaths();
    return this;
};

PoolManager.prototype.replenishLetterPool = function () {
    let self = this;
    let missingLetters = [];
    this.alphabetSet.forEach(function (thisLetter) {
        missingLetters.concat((function (delta) {
            let missing = [];
            for(let i = 0; i < delta; i++)
                missing.push(new LetterController('pool-letter'), iLetter);
            return missing;
        })(self.alphabetNum - self.letterPool.filter(function (controller) {
            return thisLetter === controller.viewer.data("letter");
        }).length));
    });
    this.setPoolLetterPaths(missingLetters);
    return this;
};

PoolManager.prototype.clearPoolLetter = function () {
    this.letterPool.forEach(function (controller) {
        controller.quitFromBackground();
    });
    return this;
};

PoolManager.prototype.findLetterInPool = function (target) {
    let founded = this.letterPool.find(function (controller) {
        return controller.viewer.data("letter") === target;
    });
    return founded || founded.viewer.attr({'data-found':true});
};

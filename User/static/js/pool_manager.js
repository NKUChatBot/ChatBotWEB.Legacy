
function PoolManager(alphabetNum) {
    this.alphabetNum = alphabetNum || 1;
    this.alphabetSet = [].concat(this.LAlphabet, this.UAlphabet, this.ZHAlphabet);
    this.letterPool = [];
}

PoolManager.prototype.jumpIntoPool = function(item){
    this.letterPool.push(item);
    if(this.letterPool > 310){
        alert("bug warning!");
    }
    return this;
};

PoolManager.prototype.jumpOutPool = function(item){
    let pos = this.letterPool.indexOf(item);
    pos >= 0 && this.letterPool.splice(pos, 1);
    return this;
};

PoolManager.prototype.LAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
PoolManager.prototype.UAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
PoolManager.prototype.ZHAlphabet = '南开你好很高兴见到我'.split('');


PoolManager.prototype.setPoolLetterPaths = function(add){
    (add || this.letterPool).forEach(function (ctr) {
        ctr.viewer.removeClass('invisible') && ctr.startNewPath();
    });
    return this;
};

PoolManager.prototype.fillLetterPool = function () {
    while(this.letterPool.length !== 0) this.clearPoolLetter();

    for(let i = 0; i < this.alphabetNum; i++) {
        this.alphabetSet.forEach(function (letter) {
            new LetterController(letter);
        });
    }

    this.setPoolLetterPaths();
    return this;
};

PoolManager.prototype.replenishLetterPool = function () {
    let self = this;
    let missing = [];
    this.alphabetSet.forEach(function (thisLetter) {
        let delta = self.alphabetNum - self.letterPool.filter(function (controller) {
            return thisLetter === controller.currentLetter;
        }).length;

        for(let i = 0; i < delta; i++)
            missing.push(new LetterController(thisLetter));
    });
    this.setPoolLetterPaths(missing);
    return this;
};

PoolManager.prototype.clearPoolLetter = function () {
    let copyPool = this.letterPool.slice();
    copyPool.forEach(function (controller) {
        controller.quitFromBackground();
    });
    return this;
};

PoolManager.prototype.resetPoolLetter = function () {
    this.clearPoolLetter();
    this.fillLetterPool();
    return this;
};

PoolManager.prototype.findLetterInPool = function (target) {
    return this.letterPool.find(function (controller) {
        return controller.viewer.data("letter") === target;
    }) || new LetterController(target);
};

let letterPool = new PoolManager(4);
letterPool.fillLetterPool();
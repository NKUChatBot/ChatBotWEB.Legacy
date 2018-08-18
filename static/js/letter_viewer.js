
function letterViewer(cName, value) {
    this.viewer = $('<div />', {'class':[cName, 'invisible'].join(' '), 'data-thisLetter': value, 'html': value});
    this.getRandQuadrant();
    this.getIntoBackground();
}

letterViewer.prototype.setPosition = function(x,y){
    this.viewer.style['left'] = x;
    this.viewer.style['top'] = y;
};

letterViewer.prototype.getIntoBackground = function(){
    $("#temp-thisLetter").append(this.viewer);
    return this;
};

letterViewer.prototype.quitFromBackground = function(){
    $("#temp-thisLetter").removeChild(this.viewer);
    return this;
};

letterViewer.prototype.getRandQuadrant = function(){
    this.currentQuadrant = getRand(1, 4);
    return this.currentQuadrant;
};

letterViewer.prototype.switchRandQuadrant = function(){
    let self = this;
    return this.currentQuadrant = (function(N){
        return N + (N>self.currentQuadrant);
    })(getRand(1,3))
};

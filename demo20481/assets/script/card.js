const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        _handleMoveUp: null,
        _handleMoveDown: null,
        _handleMoveLeft: null,
        _handleMoveRight: null,
        _handleDoneRandom: null,
        _action: null,
    },

    onLoad () {
        this._handleMoveUp = this.handleMoveUp.bind(this);
        this._handleMoveDown = this.handleMoveDown.bind(this);
        this._handleMoveLeft = this.handleMoveLeft.bind(this);
        this._handleMoveRight = this.handleMoveRight.bind(this);
        this._handleDoneRandom = this.handleDoneRandom.bind(this);

        Emitter.instance.registerEvent("moveUp",this._handleMoveUp);
        Emitter.instance.registerEvent("moveDown",this._handleMoveDown);
        Emitter.instance.registerEvent("moveLeft",this._handleMoveLeft);
        Emitter.instance.registerEvent("moveRight",this._handleMoveRight);
        Emitter.instance.registerEvent("doneRandom",this._handleDoneRandom);

    },

    handleDoneRandom(objCard){
       // cc.log(objCard)
        if(objCard.x == this.node.x && objCard.y == this.node.y){
            this.node.opacity = 255;
            this.node.children[0].getComponent('cc.Label').string =2
            cc.log(objCard)
        }
    },

    move(x,y){
        // this._action =cc.moveBy(0,cc.v2(x,y));
        // this.node.runAction(this._action);  
    },

    handleMoveUp(){
        this.move(0,150);
    },

    handleMoveDown(){
        this.move(0,-150);
    },

    handleMoveLeft(){
        this.move(-150,0);
    },

    handleMoveRight(){
        this.move(150,0)
    },

    compareCards(selfCard, ortherCard){
        if(selfCard.value == ortherCard.value){
            return true;
        }
        else{
            return false;
        }
    },

    animMerge(){

    },

    start () {
        cc.log(this.node.x)
    },

    // update (dt) {},
});

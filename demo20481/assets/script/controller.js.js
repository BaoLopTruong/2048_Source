// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {      
        
        menuStart: cc.Component,
        gameOver: cc.Component,
        menuPlaying: cc.Component,
        menuRank: cc.Component,  
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        emitter.instance = new emitter();
        this.menuStart.node.active = true;
        this.gameOver.node.active = true;
        this.menuPlaying.node.active = true;
        this.menuRank.node.active = true;

        // cc.log(this.menuRank)
    },

    start () {
        this.menuStart.node.active = true;
        this.gameOver.node.active = false;
        this.menuPlaying.node.active = false;
        this.menuRank.node.active = false;

    },

    // update (dt) {},
});

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const User = require("User");
const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        
        btnPlay: cc.Button,
        btnRank: cc.Button,

        openStart: null,
        clickPlay: null,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.openStart = this.doOpenStart.bind(this);
        // this.clickPlay = this.doClickPlay.bind(this);


        // emitter.instance.registerEvent("CLICK_PLAY", this.render);
    },

    start () {
        
        this.btnRank.node.on("click", this.onClickRank, this);
    },

    
    onClickRank() {
        emitter.instance.emit("OPEN_RANK");
        emitter.instance.emit("RENDER");
        this.node.active = false;
    },

    doOpenStart() {
        this.node.active = true;
    }


    // update (dt) {},
});

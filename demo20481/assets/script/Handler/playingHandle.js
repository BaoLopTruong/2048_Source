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
        lblScore: cc.Label,
        btnReplay: cc.Button,
        btnQuit: cc.Button,

        replay: null,
        quit: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.replay = this.onReplay.bind(this);
        this.quit = this.onQuit.bind(this);
    },

    start() {
        this.btnReplay.node.on("click", this.replay);
        this.btnQuit.node.on("click", this.quit);
    },

    onReplay() {
        emitter.instance.emit("CLICK_PLAY");
        emitter.instance.emit("PLAYING");
    },

    onQuit() {
        emitter.instance.emit("DEFAULT");
    }

    // update (dt) {},
});
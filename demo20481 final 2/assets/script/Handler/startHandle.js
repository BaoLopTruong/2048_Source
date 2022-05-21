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
        users: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.openStart = this.doOpenStart.bind(this);
        // this.clickPlay = this.doClickPlay.bind(this);


        emitter.instance.registerEvent("OPEN_START", this.openStart);
    },

    start() {

        this.btnRank.node.on("click", this.onClickRank, this);
        this.btnPlay.node.on("click", this.onClickPlay, this);
    },

    onClickPlay() {

        emitter.instance.emit("PLAYING", this.node);
    },


    onClickRank() {
        emitter.instance.emit("RANK", this.node);
        emitter.instance.emit("RENDER");
        // this.node.active = false;
    },

    doOpenStart() {
        // cc.log(data, "dada");
        // cc.log("users: ", this.users);
        // this.users = data;
        // this.node.active = true;
    }


    // update (dt) {},
});
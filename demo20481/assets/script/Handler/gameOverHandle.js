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
        edbUsername: cc.EditBox,
        btnSubmit: cc.Button,
        lblScore: cc.Label,

        openGameOver: null,
        clickSubmit: null,
        users: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.openGameOver = this.doOpenGameOver.bind(this);

        emitter.instance.registerEvent("OPEN_GAMEOVER", this.openGameOver);
    },

    start () {
        this.btnSubmit.node.on("click", this.doSubmit, this);
    },

    doOpenGameOver() {
        this.node.active = true;
    },

    getInfoUserAndPushToArray() {
        let user = new User();
        user.name = this.edbUsername.string;
        user.score = this.lblScore.string;

        if (this.edbUsername.string != "") {
            this.users.push(user);
        }
    },

    doSubmit() {
        this.getInfoUserAndPushToArray();
        if(this.users != null) {
            cc.sys.localStorage.setItem("users", JSON.stringify(this.users));
        }
        emitter.instance.emit("OPEN_START");
        this.node.active = false;
    },

    // update (dt) {},
});

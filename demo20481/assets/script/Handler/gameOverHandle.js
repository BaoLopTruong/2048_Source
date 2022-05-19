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
<<<<<<< HEAD
const db = JSON.parse(cc.sys.localStorage.getItem("users"));
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
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
<<<<<<< HEAD
        
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.openGameOver = this.doOpenGameOver.bind(this);

        emitter.instance.registerEvent("OPEN_GAMEOVER", this.openGameOver);
    },

    start () {
<<<<<<< HEAD
        this.checkData();
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.btnSubmit.node.on("click", this.doSubmit, this);
    },

    doOpenGameOver() {
        this.node.active = true;
    },

    getInfoUserAndPushToArray() {
        let user = new User();
        user.name = this.edbUsername.string;
        user.score = this.lblScore.string;

<<<<<<< HEAD
        this.users.push(user);
    },

    doSubmit() {
        if(this.edbUsername.string == "") return;
=======
        if (this.edbUsername.string != "") {
            this.users.push(user);
        }
    },

    doSubmit() {
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.getInfoUserAndPushToArray();
        if(this.users != null) {
            cc.sys.localStorage.setItem("users", JSON.stringify(this.users));
        }
<<<<<<< HEAD
        this.edbUsername.string = "";
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        emitter.instance.emit("OPEN_START");
        this.node.active = false;
    },

<<<<<<< HEAD
    checkData() {
        if(db != null) {
            this.users = db;
        }
    },
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
    // update (dt) {},
});

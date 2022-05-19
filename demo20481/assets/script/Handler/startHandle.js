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
<<<<<<< HEAD

=======
        
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        btnPlay: cc.Button,
        btnRank: cc.Button,

        openStart: null,
        clickPlay: null,
<<<<<<< HEAD
        users: [],
=======
        
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
    },

    // LIFE-CYCLE CALLBACKS:

<<<<<<< HEAD
    onLoad() {
=======
    onLoad () {
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.openStart = this.doOpenStart.bind(this);
        // this.clickPlay = this.doClickPlay.bind(this);


<<<<<<< HEAD
        emitter.instance.registerEvent("OPEN_START", this.openStart);
    },

    start() {

        this.btnRank.node.on("click", this.onClickRank, this);
        this.btnPlay.node.on("click", this.onClickPlay, this);
    },

    onClickPlay() {
        emitter.instance.emit("CLICK_PLAY");
        emitter.instance.emit("PLAYING");
    },


=======
        // emitter.instance.registerEvent("CLICK_PLAY", this.render);
    },

    start () {
        
        this.btnRank.node.on("click", this.onClickRank, this);
    },

    
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
    onClickRank() {
        emitter.instance.emit("OPEN_RANK");
        emitter.instance.emit("RENDER");
        this.node.active = false;
    },

    doOpenStart() {
<<<<<<< HEAD
        // cc.log(data, "dada");
        // cc.log("users: ", this.users);
        // this.users = data;
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.node.active = true;
    }


    // update (dt) {},
<<<<<<< HEAD
});
=======
});
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd

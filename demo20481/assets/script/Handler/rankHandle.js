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
<<<<<<< HEAD
const db = JSON.parse(cc.sys.localStorage.getItem("users"));
=======
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
cc.Class({
    extends: cc.Component,

    properties: {
<<<<<<< HEAD

=======
        
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        rank: cc.Layout,
        prefab_item: cc.Prefab,
        btnClose: cc.Button,

        openRank: null,
        render: null,
        clickClose: null,
    },

    // LIFE-CYCLE CALLBACKS:

<<<<<<< HEAD
    onLoad() {
        this.openRank = this.doOpenRank.bind(this);
        this.clickClose = this.doClickClose.bind(this);
        this.render = this.doRender.bind(this);
=======
    onLoad () {
        this.openRank = this.doOpenRank.bind(this);
        this.clickClose = this.doClickClose.bind(this);
        this.render = this.doRender.bind(this);
        
        

>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd

        emitter.instance.registerEvent("OPEN_RANK", this.openRank);
        // emitter.instance.registerEvent("SUBMIT", this.clickSubmit);
        emitter.instance.registerEvent("RENDER", this.render);

<<<<<<< HEAD

    },

    start() {
        this.btnClose.node.on("click", this.clickClose, this);
        // this.doRender();
    },

    doClickClose() {
        this.removeItem();

        // emitter.instance.emit("OPEN_START");
        emitter.instance.emit("DEFAULT");
        // emitter.instance.emit("OPEN_GAMEOVER");
=======
        
    },

    start () {
        this.btnClose.node.on("click", this.clickClose, this);
        
    },

    doClickClose() {
        emitter.instance.emit("OPEN_START");
        emitter.instance.emit("OPEN_GAMEOVER");
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.node.active = false;
    },

    doOpenRank() {
        this.node.active = true;
    },

    doRender() {
        let data = JSON.parse(cc.sys.localStorage.getItem("users"));
<<<<<<< HEAD
        if (data != null) {
            data = data.sort((a, b) => {
                parseInt(b.score) - parseInt(a.score);
            });
            this.renderAllUser(data);
        }

=======
        data = data.sort((a, b) => {
            b.score - a.score;
        });
        this.renderAllUser(data);
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
    },

    renderAllUser(data) {
        data.forEach((user, index) => { this.renderUser(user, index) });
    },

    renderUser(user, index) {
        let item = cc.instantiate(this.prefab_item);
        item.parent = this.rank.node;
        item.active = true;
        item.children[0].getComponent("cc.Label").string = index + 1;
        item.children[1].getComponent("cc.Label").string = user.name;
        item.children[2].getComponent("cc.Label").string = user.score;
<<<<<<< HEAD
        // cc.log(item.x);
        // cc.log(item.y);
        return item;
    },

    removeItem() {
        this.rank.node.removeAllChildren();
    },

    checkData() {
        if (db != null) {
            this.users = db;
        }
    },

    // update (dt) {},
});
=======
        cc.log(item.x);
        cc.log(item.y);
        return item;
    },

    // update (dt) {},
});
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd

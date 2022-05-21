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

        menuStart: cc.Node,
        gameOver: cc.Node,
        menuPlaying: cc.Node,
        menuRank: cc.Node,
        listBlock: cc.Node,
        title: cc.Node,

        _playingState: null,
        _gameOverState: null,
        _defaultState: null,
        _titleState: null,
        _rankState: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        emitter.instance = new emitter();

        this._playingState = this.onPlaying.bind(this);
        this._gameOverState = this.onGameOver.bind(this);
        this._defaultState = this.onDefaultne.bind(this);
        this._rankState = this.onRank.bind(this);

        emitter.instance.registerEvent("PLAYING", this._playingState);
        emitter.instance.registerEvent("GAMEOVER", this._gameOverState);
        emitter.instance.registerEvent("DEFAULT", this._defaultState);
        emitter.instance.registerEvent("RANK", this._rankState);
    },

    start() {
        this.offAll();
        this.onDefaultne();
    },

    offAll() {
        this.menuStart.active = false;
        this.title.active = false;
        this.gameOver.active = false;
        this.menuPlaying.active = false;
        this.menuRank.active = false;
        this.listBlock.active = false;

    },

    onRank(node) {

        if (node) {
            if (node == this.menuStart) {
                this.doCloseStart(node).start();
            } else {
                this.doCloseRankAndGameOver(node).start();
            }
        }
        // cc.delayTime(0.5);
        // this.menuRank.active = true;
        this.doShowRankAndGameOver(this.menuRank).start();
    },

    onDefaultne(node) {
        // cc.log("currentNode", node)
        // if (node) {
        //     if (node == this.menuStart) {
        //         this.doCloseStart(node).start();
        //     } else {
        //         this.doCloseRankAndGameOver(node).start();
        //     }
        // }
        this.doCloseRankAndGameOver(this.gameOver).start();
        this.doCloseRankAndGameOver(this.menuRank).start();
        this.doCloseMenuPlaying(this.menuPlaying).start();
        this.doCloseListBlock(this.listBlock).start();
        this.doCloseTitle(this.title).start();
        this.doShowStart(this.menuStart).start();
        cc.log("default")
    },

    onGameOver(node) {
        if (node) {
            if (node == this.menuStart) {
                this.doCloseStart(node).start();
            } else {
                this.doCloseRankAndGameOver(node).start();
            }
        }
        this.doShowRankAndGameOver(this.gameOver).start();
        cc.log("game over")
    },

    onPlaying(node) {
        // cc.log(node);
        if (node) {
            if (node == this.menuStart) {
                this.doCloseStart(node).start();
            } else {
                this.doClose(node).start();
            }
        }
        emitter.instance.emit("CLICK_PLAY");

        this.doShowMenuPlaying(this.menuPlaying).start();
        this.doShowTitle(this.title).start();
        this.doShowListBlock(this.listBlock).start();
        // cc.log(this.listBlock)
        cc.log("playing")
    },

    doShowRankAndGameOver(node) {
        let t = cc.tween(node)
            .to(0, { scale: 0 }, { easing: "sineIn" })
            .to(0.0001, { position: cc.v2(0, 0) }, { easing: "sineOut" })
            .delay(0.5)
            .call((node) => {
                node.active = true;
            })
            .to(1, { scale: 1 }, { easing: "sineIn" });

        return t;
    },

    doCloseRankAndGameOver(node) {
        let t = cc.tween(node)
            .by(0.07, { position: cc.v2(64, 0) }, { easing: "sineIn" }).repeat(10)
            .to(0.7, { scale: 1 }, { easing: "sineIn" })
            .delay(0.5);

        return t;
    },

    doShowListBlock(node) {
        let t = cc.tween(node)
            .call((node) => {
                node.active = true;
            })
            .to(1, { scale: 1 }, { easing: "sineIn" });

        return t;
    },

    doCloseListBlock(node) {
        let t = cc.tween(node)
            .to(1, { scale: 0 }, { easing: "sineIn" })
            .delay(0.5)
            // .call(() => { node.active = false });
        return t;
    },

    doShowMenuPlaying(node) {
        let t = cc.tween(node)
            // .to(0.0001, { position: cc.v2(0, -580) }, { easing: "sineOut" })
            .call((node) => {
                node.active = true;
            })
            .delay(0.5)
            .to(0.1, { scale: 1 }, { easing: "sineIn" })
            .to(1, { position: cc.v2(0, -390) }, { easing: "backOut" });

        return t;
    },

    doCloseMenuPlaying(node) {
        let t = cc.tween(node)
            .to(0.7, { position: cc.v2(0, -580) }, { easing: "backInOut" })
            .delay(0.5)

        return t;
    },

    doShowTitle(node) {
        let t = cc.tween(node)
            .call((node) => {
                node.active = true;
            })
            .delay(0.9)
            .to(1, { position: cc.v2(0, 0) }, { easing: "backOut" });

        return t;
    },

    doCloseTitle(node) {
        let t = cc.tween(node)
            .to(0.7, { position: cc.v2(0, 300) }, { easing: "backInOut" })
            .delay(1)
            // .call((node) => {
            //     node.active = false;
            // })

        return t;
    },

    doShowStart(node) {
        let t = cc.tween(node)
            .to(0.0001, { position: cc.v2(0, 590) }, { easing: "sineOut" })
            .call((node) => {
                node.active = true;
            })
            .delay(0.8)
            .to(0.8, { position: cc.v2(0, 0) }, { easing: "backOut" });

        return t;
    },

    doCloseStart(node) {
        let t = cc.tween(node)
            .to(1, { position: cc.v2(0, 590) }, { easing: "backInOut" })
            .delay(0.8)
            .call((node) => {
                node.active = false;
            })

        return t;
    },

});

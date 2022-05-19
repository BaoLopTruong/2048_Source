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

<<<<<<< HEAD
    properties: {

        menuStart: cc.Component,
        gameOver: cc.Component,
        menuPlaying: cc.Component,
        menuRank: cc.Component,
        listBlock: cc.Component,

        playingState: null,
        gameOverState: null,
        defaultState: null,
=======
    properties: {      
        
        menuStart: cc.Component,
        gameOver: cc.Component,
        menuPlaying: cc.Component,
        menuRank: cc.Component,  
        
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
    },

    // LIFE-CYCLE CALLBACKS:

<<<<<<< HEAD
    onLoad() {
=======
    onLoad () {
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        emitter.instance = new emitter();
        this.menuStart.node.active = true;
        this.gameOver.node.active = true;
        this.menuPlaying.node.active = true;
        this.menuRank.node.active = true;
<<<<<<< HEAD
        this.listBlock.node.active = true;

        this.playingState = this.onPlaying.bind(this);
        this.gameOverState = this.onGameOver.bind(this);
        this.defaultState = this.onDefault.bind(this);

        emitter.instance.registerEvent("PLAYING", this.playingState);
        emitter.instance.registerEvent("GAMEOVER", this.gameOverState);
        emitter.instance.registerEvent("DEFAULT", this.defaultState);
    },

    start() {
        this.onDefault();
    },

    onDefault() {
=======

        // cc.log(this.menuRank)
    },

    start () {
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd
        this.menuStart.node.active = true;
        this.gameOver.node.active = false;
        this.menuPlaying.node.active = false;
        this.menuRank.node.active = false;
<<<<<<< HEAD
        this.listBlock.node.active = false;
    },

    onGameOver() {
        this.menuStart.node.active = false;
        this.gameOver.node.active = true;
        this.menuPlaying.node.active = true;
        this.menuRank.node.active = false;
        this.listBlock.node.active = true;
    },

    onPlaying() {
        this.menuStart.node.active = false;
        this.gameOver.node.active = false;
        this.menuPlaying.node.active = true;
        this.menuRank.node.active = false;
        this.listBlock.node.active = true;
    }
    // update (dt) {},
});
=======

    },

    // update (dt) {},
});
>>>>>>> 59f99bb4ce8066d6a086b81a12ffb85da27163bd

const COLOR = require('color');
const emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        card: {
            default: null,
            type: cc.Prefab
        },
        updateScore: {
            default: null,
            type: cc.Label
        },
        compareAudio: {
            default: null,
            type: cc.AudioClip
        },
        newCardAudio: {
            default: null,
            type: cc.AudioClip
        },
        _arrBlocks: [],
        _canRandom: true,
        _updateScore:0,
        _totalScore: 0,
        _canPress: false,
        playGame: null,
    },

    // LIFE-CYCLE CALLBACKS:

    compareSound: function () {
        cc.audioEngine.playEffect(this.compareAudio, false);
    },
    newCardSound: function () {
        cc.audioEngine.playEffect(this.newCardAudio, false);
    },
    onLoad() {
        this.canPress = false;
        this.playGame = this.onPlayGame.bind(this);

        emitter.instance.registerEvent("CLICK_PLAY", this.playGame);
    },

    handleKeyUp(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.randomNumber();
                this._canPress = false;
                
                break;
            default:
                break;
        }
    },
    handleKeyDown(evt) {
        if (this._canPress) return;
        this._canPress = true;
        switch (evt.keyCode) {
            case cc.macro.KEY.up:

                this.moveUp();
                break;
            case cc.macro.KEY.down:
                this.moveDown();
                break;
            case cc.macro.KEY.left:
                this.moveLeft();
                break;
            case cc.macro.KEY.right:
                this.moveRight();
                break;
            default:
                break;
        }
    },

    moveUp() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard)
        }
    },
    moveDown() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }

            this.handle(flatArrCard.reverse())
            
        }
    },

    moveLeft() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            //cc.log(flatArrCard);
            this.handle(flatArrCard)
        }
    },


    moveRight() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }

            this.handle(flatArrCard.reverse())

        }
    },


    handle(arrCard) {
        for (let i = 1; i < arrCard.length; i++) {
            if (arrCard[i].active == false) {
                continue;
            }
            let checkCompare = false;
            for (let j = i - 1; j >= 0; j--) {
                if (checkCompare == true) {
                    j = -1;
                    break;
                }
                checkCompare = this.changeValueCards(arrCard , i, j);
            }
        }
    },

    changeValueCards(arrCard, i, j) {
        if (arrCard[j].active == false) {
            if (j == 0) {
                arrCard[j].getComponent("card").lblCard.string = arrCard[i].getComponent("card").lblCard.string;
                arrCard[i].getComponent("card").lblCard.string = "0";
                arrCard[i].active = false;
                arrCard[j].active = true;
                return true;
            }
        }
        else{
            if (arrCard[j].getComponent("card").lblCard.string == arrCard[i].getComponent("card").lblCard.string) {
                arrCard[j].getComponent("card").lblCard.string = parseInt(arrCard[j].getComponent("card").lblCard.string) * 2 + "";
                arrCard[i].getComponent("card").lblCard.string = "0";
                arrCard[j].active = true;
                arrCard[i].active = false;
                this.changeScore(parseInt(arrCard[j].getComponent("card").lblCard.string));
                //this._updateScore += parseInt(arrCard[j].getComponent("card").lblCard.string);
                return true;
            }
            else if (arrCard[j].getComponent("card").lblCard.string != arrCard[i].getComponent("card").lblCard.string) {
                let reValue = j + 1;
                if (reValue != i) {
                    arrCard[reValue].getComponent("card").lblCard.string = arrCard[i].getComponent("card").lblCard.string;
                    arrCard[i].getComponent("card").lblCard.string = "0";
                    arrCard[reValue].active = true;
                    arrCard[i].active = false;
                }
                return true;
            }
        }
    },

    reloadColor(arrCard) {
        for (let col = 0; col < arrCard.length; col++) {
            for (let row = 0; row < arrCard.length; row++) {
                let number = parseInt(arrCard[col][row].children[1].getComponent('cc.Label').string);
                arrCard[col][row].children[0].color = COLOR[number];

            }
        }

    },

    start() {

    },
    render() {
        for (let col = 0; col < 4; col++) {
            let arrRow = [];
            for (let row = 0; row < 4; row++) {
                let x = -225 + row * 150;
                let y = 225 - col * 150;
                let newCard = cc.instantiate(this.card);
                newCard.parent = this.node
                newCard.x = x;
                newCard.y = y;
                newCard.width = 140;
                newCard.height = 140;
                newCard.color = COLOR[0];
                newCard.active = false;
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow)
        }
    },

    randomNumber() {
        let flatArray = this._arrBlocks.flat(Infinity);
        let arrNone = flatArray.filter((value) => {
            return value.active == false;
        })
        if (arrNone.length) {
            let index = Math.floor(Math.random() * arrNone.length)
            arrNone[index].children[1].getComponent('cc.Label').string = 2;
            arrNone[index].color = COLOR[2];
            arrNone[index].active = true;
            arrNone[index].scale = 0;
            let action = cc.scaleTo(0.1, 1);
            arrNone[index].runAction(action);
            this.reloadColor(this._arrBlocks);
            return true;
          
        } else {
             cc.log('full card');
            cc.log(this._totalScore);
           
           // this.checkGameOver(this._arrBlocks);
            // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
            // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
             emitter.instance.emit("GAMEOVER");
              emitter.instance.emit("OPEN_GAMEOVER", this._totalScore);
            return false;
        }
      
    },
    changeScore(number) {
        let score = this.updateScore;
        let currentScore = Number(score.string);
       // score.string = currentScore + number;
        this._totalScore = currentScore + number;
        let actions = [cc.callFunc(() => { currentScore += 1 }),
            cc.delayTime(0.01),
            cc.callFunc(() => { score.string = currentScore})];
            let scale = cc.sequence(cc.scaleTo(0.15,1.2), cc.scaleTo(0.15,1))
            score.node.runAction(cc.spawn(cc.repeat(cc.sequence(actions),  number),scale))
           

    },
    checkGameOver(arrCard){
         for(let col=0; col<4; col++){
             for(let row=0; row<4;row++){
               cc.log( arrCard[col][row].children[1].getComponent('cc.Label').string)
             }
         }
    },

    onPlayGame() {
        this.node.removeAllChildren();
        this._arrBlocks = [];
        this.updateScore.string ="0";
        this.render();
        this.randomNumber();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);

        // emit tween score
    },

    // update (dt) {},
});
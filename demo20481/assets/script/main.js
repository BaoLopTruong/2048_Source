const COLOR = require('color');
let arrBlock = [];
const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        card: {
            default: null,
            type: cc.Prefab
        },
        _arrBlocks: [],
        _canRandom: true,

        _canPress: false,
        playGame: null,
    },

    // LIFE-CYCLE CALLBACKS:

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
            cc.log(flatArrCard);
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



    handle(arrCard) { //[0,2,2,0],[2,0,2,0],[4,0,0,0]
        // ở vị trí 0 nó bằng 0=> thì thay đổi giá trị(2 thằng) , active(2 thằng).
        // ở vị trí 0 nó khác 0 và nó bằng thằng card đó => valueCard * 2 , active(2 thằng), chuyền thằng i =0
        // ở vị trí 0 nó khác 0 và nó khác thằng card đó=> thì nos thay đổi vị trí của thằng trước nó.
        //////// ko ở vị trí 0
        // nếu j = 0  => continue
        // j =i => => nhân đôi j lên => active lại 2 thằng gán lại giá trị cho i =0,
        // j khác i => lấy thằng trước nó và thay đổi giá trị 
        cc.log(arrCard);
        let count = 0;
        for (let i = 1; i < arrCard.length; i++) {
            if (arrCard[i].active == false) {
                continue;
            }
            let checkCompare = false;
            for (let j = i - 1; j >= 0; j--) {
                if (checkCompare == true) {
                    j = -1;
                    continue;
                }
                if (j == 0) {
                    //cc.log("j = 0")
                    // j active = false => value j = i , value i = 0 , active j = true , active i = false
                    // if (arrCard[i].active == false) {
                    //     continue;
                    // }
                    if (arrCard[j].active == false) {
                        arrCard[j].children[1].getComponent('cc.Label').string = arrCard[i].children[1].getComponent('cc.Label').string;
                        arrCard[i].children[1].getComponent('cc.Label').string = "0";
                        arrCard[i].active = false;
                        arrCard[j].active = true;
                        checkCompare = true;
                        count++;
                        continue;
                    }
                    //else if value j == value i => value j * 2 , value i = 0 , active j = true , active i = fasle
                    else if (arrCard[j].children[1].getComponent('cc.Label').string == arrCard[i].children[1].getComponent('cc.Label').string) {
                        arrCard[j].children[1].getComponent('cc.Label').string = Number(arrCard[j].children[1].getComponent('cc.Label').string) * 2 + "";
                        arrCard[i].children[1].getComponent('cc.Label').string = "0";
                        let action = cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1))
                        arrCard[j].runAction(action);
                        arrCard[j].active = true;
                        arrCard[i].active = false;
                        checkCompare = true;
                        count++;
                        continue;
                    }
                    //else if value j != value i => value j+1 = value i , value i = 0 , active j-1 = true , active i = false; 
                    else if (arrCard[j].children[1].getComponent('cc.Label').string != arrCard[i].children[1].getComponent('cc.Label').string) {
                        let reValue = j + 1;
                        checkCompare = true;
                        if (reValue == i) {
                            continue;
                        } else {
                            arrCard[reValue].children[1].getComponent('cc.Label').string = arrCard[i].children[1].getComponent('cc.Label').string;
                            arrCard[i].children[1].getComponent('cc.Label').string = "0";
                            arrCard[reValue].active = true;
                            arrCard[i].active = false;
                            count++;
                            continue;
                        }
                    }
                }
                //value j active = false => continue
                if (arrCard[j].active == false) {
                    continue;
                }
                // value j == value i => value j*2 && active j = true , active i = false , gán i = 0
                if (arrCard[j].children[1].getComponent('cc.Label').string == arrCard[i].children[1].getComponent('cc.Label').string) {
                    arrCard[j].children[1].getComponent('cc.Label').string = Number(arrCard[j].children[1].getComponent('cc.Label').string) * 2 + "";
                    cc.log(arrCard[j].children[1].getComponent('cc.Label').string)
                    arrCard[j].active = true;
                    let action = cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1))
                    arrCard[j].runAction(action);
                    arrCard[i].children[1].getComponent('cc.Label').string = "0";
                    //this.reloadColor(this._arrBlocks);
                    arrCard[i].x
                    arrCard[i].active = false;
                    checkCompare = true;
                    count++;
                    cc.log(arrCard[i], arrCard[j])
                        // if(j == 1){
                        //     j = -1;
                        // }
                    continue;
                }
                // value j != value i => value j +1 = value i , value i =0 , active j +1 = true , active i = false
                if (arrCard[j].children[1].getComponent('cc.Label').string != arrCard[i].children[1].getComponent('cc.Label').string) {
                    checkCompare = true;
                    let reValue = j + 1;
                    // nếu value trước là chính nó thì continue
                    if (reValue == i) {
                        continue;
                    }
                    arrCard[reValue].children[1].getComponent('cc.Label').string = arrCard[i].children[1].getComponent('cc.Label').string;
                    arrCard[i].children[1].getComponent('cc.Label').string = "0";
                    arrCard[reValue].active = true;
                    arrCard[i].active = false;
                    count++;
                    continue;
                }
            }
        }
        this.reloadColor(this._arrBlocks);
        return count;
        // cc.log(arrCard)
    },
    changeColor(index, arrCard) {
        arrCard[index].getComponent('card').setColor(Number(arrCard[index].children[1].getComponent('cc.Label').string));
    },

    getString(row, col) {
        return this._arrBlocks[row][col].children[1].getComponent('cc.Label').string;
    },
    reloadColor(arrCard) {
        for (let col = 0; col < arrCard.length; col++) {
            for (let row = 0; row < arrCard.length; row++) {
                cc.log(arrCard[col][row].children[1].getComponent('cc.Label').string);
                arrCard[col][row].children[0].color = COLOR[arrCard[col][row].children[1].getComponent('cc.Label').string];
                cc.log(arrCard[col][row].color);
            }
        }

    },

    start() {

    },
    init() {

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

    randomNumber(check) {
        if (check == 0) {
            return;
        } else {
            let flatArray = this._arrBlocks.flat(Infinity);

            let arrNone = flatArray.filter((value) => {
                return value.active == false;
            })
            if (arrNone.length == 0) {
                cc.log('game over');
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
                emitter.instance.emit("GAMEOVER");
                // emitter.instance.emit("OPEN_GAMEOVER");
                return;
            } else {
                let index = Math.floor(Math.random() * arrNone.length)
                cc.log(arrNone.length);

                arrNone[index].children[1].getComponent('cc.Label').string = 2;
                arrNone[index].color = COLOR[2];
                arrNone[index].active = true;
                arrNone[index].scale = 0;
                let action = cc.scaleTo(0.1, 1);
                arrNone[index].runAction(action);
            }
        }




        //cc.log(this._arrBlocks);
    },

    createItem(x, y) {
        let card = cc.instantiate(this.card);
        card.parent = this.node
        card.x = x;
        card.y = y;
    },

    onPlayGame() {
        this.node.removeAllChildren();
        this._arrBlocks = [];

        this.render();
        this.randomNumber();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);

        // emit tween score
    },

    // update (dt) {},
});
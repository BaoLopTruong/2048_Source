// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let arrBlock =[];
cc.Class({
    extends: cc.Component,

    properties: {
        card: {
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start() {
        let arrRows = [];
        for(let row = 0 ; row < 4 ; row++){
            let arrRow = [];
            for(let col = 0; col < 4; col++){
                arrRow.push(0);
                
            }
            arrRows.push(arrRow);
            arrBlock.push(arrRow);
        }
        cc.log(arrBlock);
        this.createRandomNumber(arrBlock);
        this.render(arrBlock);
    },

    render(arrRow) {
        for(let row =0 ; row < arrRow.length ; row++){
            for(let col = 0 ; col < arrRow[row].length ; col ++){
                let x = -226.227 + row *150;
                let y = 225.631 - col * 150;
                this.createItem(x,y,arrRow[row][col]);
            }
        }
    },

    createRandomNumber(arrBlock){
        let randomX = Math.floor(Math.random() * arrBlock.length);
        let randomY = Math.floor(Math.random() * arrBlock.length);
         arrBlock[randomX][randomY] =2;
        cc.log(randomX, randomY);

    },

    createItem(x,y,value) {
        let card = cc.instantiate(this.card);
        card.parent = this.node;
        card.x = x;
        card.y = y;
        cc.log(card.children[0].getComponent('cc.Label').string);
        card.children[0].getComponent('cc.Label').string= value;
    }

    // update (dt) {},
});

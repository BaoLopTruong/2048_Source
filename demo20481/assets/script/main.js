const COLOR = require('color');
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
        cc.log(card.color);
        card.children[0].getComponent('cc.Label').string= value;
        this.createColor(card,value);
    },
    createColor(card,value){
        switch(value){
            case 0: 
            card.color = COLOR[0];
            break;
            case 2: 
            card.color = COLOR[2];
            break;
            case 4: 
            card.color = COLOR[4];
            break;
            case 8: 
            card.color = COLOR[8];
            break;
            case 16: 
            card.color = COLOR[16];
            break;
            case 32: 
            card.color = COLOR[32];
            break;
            case 64: 
            card.color = COLOR[64];
            break;
            case 128: 
            card.color = COLOR[128];
            break;
            case 256: 
            card.color = COLOR[156];
            break;
            case 512: 
            card.color = COLOR[512];
            break; 
            case 1024: 
            card.color = COLOR[1024];
            break;
            case 2048: 
            card.color = COLOR[2048];
            break;

        }
    },

    // update (dt) {},
});

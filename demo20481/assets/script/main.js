const COLOR = require('color');
const Emitter = require('mEmitter');
let arrBlock =[];
cc.Class({
    extends: cc.Component,

    properties: {
        card: {
            default: null,
            type: cc.Prefab
        },
        _arrBlocks:[],
        _arrValue: [],
        _canPress:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.canPress = false;
        Emitter.instance = new Emitter();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
    },

    handleKeyUp(evt){
            // this._canPress = false;
           
          
            this.randomCard();
           // this.randomNumber();
            switch(evt.keyCode){
                case cc.macro.KEY.up:
                    //Emitter.instance.emit("moveUp");
                  
                    break;
                case cc.macro.KEY.down:
                    Emitter.instance.emit("moveDown");
                    break;
                case cc.macro.KEY.left:
                   // this.randomCard();
                    for (let col = 0; col <4; col++) {
                        this.blockMoveLeft(col, 3);
                        Emitter.instance.emit("moveLeft", this._arrBlocks);
                    }
                    break;
                case cc.macro.KEY.right:
                    
                    for (let col = 0; col < 4; col++) {
                        this.blockMoveRight(col, 0);
                        Emitter.instance.emit("moveRight", this._arrBlocks[col][col+1]);
                    }
                    break;
                default:  
                break;
            }
            
    },
    handleKeyDown(evt){
        if(this._canPress) return;
        this._canPress = true;
        switch(evt.keyCode){
            case cc.macro.KEY.up:
                Emitter.instance.emit("moveUp");
                break;
            case cc.macro.KEY.down:
                Emitter.instance.emit("moveDown");
                break;
            case cc.macro.KEY.left:
                //Emitter.instance.emit("moveLeft");
                break;
            case cc.macro.KEY.right:
                // Emitter.instance.emit("moveRight");
                // for(let row=0; row < 4; row++){
                //     this.blockHandleMoveRight(row,0);
                // }
                break;
            default: break;
        }
    },

    start() {
       
        // this.render();
        // this.randomNumber()
  
     this._arrValue = this.createEmptyArray();
     cc.log(this._arrValue)
     this.render();
     this.randomCard();
       this.randomCard();
    },
    init(){
    },

    render() {
        for(let col = 0 ; col < 4 ; col ++){
            let arrRow = [];
            for(let row = 0 ; row < 4 ; row ++){
                let x = -226.227 + row *150;
                let y = 225.631 - col *150;
                let newCard = cc.instantiate(this.card);
                newCard.parent = this.node
                newCard.x = x;
                newCard.y = y;
                newCard.color = COLOR[0];
                newCard.children[0].getComponent('cc.Label').node.active =false; 
                newCard.active = true;
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow);
        }
        cc.log(this._arrBlocks);
    },

    randomNumber(){
        // let randomX = Math.floor(Math.random() * arrBlock.length);
        // let randomY = Math.floor(Math.random() * arrBlock.length);
        //  arrBlock[randomX][randomY] =2;
        // cc.log(randomX, randomY);
        let flatArray = this._arrBlocks.flat(Infinity)
        let arrNone = flatArray.filter((value)=>{
            return value.active == false;
        })
        let index = Math.floor(Math.random() * arrNone.length);
        arrNone[index].children[0].getComponent('cc.Label').string=2;
        arrNone[index].active = true;
    },

    updateBlockNum () {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                this.blockArr[row][col].getComponent("block").setNumber(this.data[row][col]);
            }
        }
    },
    blockHandleMoveRight(row, col){
        if(col == 3){
            return;
        }
        else{
            if(this._arrBlocks[rol][col+1] ==0){
                this._arrBlocks[row][col + 1] = this._arrBlocks[row][col];
                this._arrBlocks[row][col] = 0;
                this.blockHandleMoveRight(row, col + 1);
            }
            else{
                if(col < 3){
                    if(this._arrBlocks[rol][col]== this._arrBlocks[rol][col+1]){
                        this._arrBlocks[row][col + 1] *= 2;
                        this._arrBlocks[row][col] = 0;
                    }
                    this.blockMoveRight(row, col + 1);
                    if (this._arrBlocks[row][col + 1] == 0) {
                        this._arrBlocks[row][col + 1] = this._arrBlocks[row][col];
                        this._arrBlocks[row][col] = 0;
                        this.updateBlockNum();
                    }
                }
            }
        }
    },


    //code cuar bao

    createEmptyArray(){
        let emptyArr = []
        for (let col = 0; col < 4; col++) {
            emptyArr[col] = [];
            for (let row = 0; row < 4; row++) {
                emptyArr[col][row] = 0;
            }
        }
        return emptyArr;
    },

    randomCard(){
        let emptyArr = this.getEmptyArray();
        if(emptyArr.length ==0){
            cc.log("Full card");
            return false;
        }else{
            let index = Math.floor(Math.random() * emptyArr.length);
            this._arrValue[emptyArr[index].col][emptyArr[index].row] =2;
            let card = this._arrBlocks[emptyArr[index].col][emptyArr[index].row];
            card.children[0].getComponent('cc.Label').string = 2;
            card.children[0].getComponent('cc.Label').node.active = true;
            card.color = COLOR[2];
        }
    },

    getEmptyArray(){
        let arrEmpty = [];
        for(let col=0; col<4; col++){
            for(let row=0; row <4 ; row++){
                if(this._arrValue[col][row]==0){
                    arrEmpty.push({col:col, row:row})
                }
            }
        }
        cc.log(arrEmpty);
        return arrEmpty;
    },
    //xu event
    blockMoveRight(col, row){
        if(row == 3){
            return false;
        }else{
            if(this._arrValue[col][row+1]==0){
                cc.log(this._arrBlocks[col][row].x, this._arrBlocks[col][row].y)
               // cc.log(this._arrBlocks[col][row+1].x, this._arrBlocks[col][row+1].y)  
                this._arrValue[col][row+1] = this._arrValue[col][row];
                this._arrValue[col][row] = 0;          
                this.blockMoveRight(col, row + 1);
                this.updateNumber();

            }
            else{
                if(row < 3){
                    if(this._arrValue[col][row] == this._arrValue[col][row+1]){
                        this._arrValue[col][row+1] *=2;
                        this._arrValue[col][row] = 0;
                    }
                    this.blockMoveRight(col, row + 1);
                    if(this._arrValue[col][row + 1] == 0){
                        this._arrValue[col][row + 1] = this._arrValue[col][row];
                        this._arrValue[col][row] = 0;
                        this.updateNumber();
                    }
                }
            }
        }
    },
    blockMoveLeft(col, row){
        if (row == 0) {
            return;
        }
        else {
            if (this._arrValue[col][row - 1] == 0) {
                this._arrValue[col][row - 1] = this._arrValue[col][row];
                this._arrValue[col][row] = 0;
                this.blockMoveLeft(col, row - 1); 0
                this.updateNumber();
            }
            else {
                if (col >0) {
                    if (this._arrValue[col][row] == this._arrValue[col][row - 1]) {
                        this._arrValue[col][row - 1] *= 2;
                        this._arrValue[col][row] = 0;
                    }
                    this.blockMoveLeft(col, row - 1);
                    if (this._arrValue[col][row - 1] == 0) {
                        this._arrValue[col][row - 1] = this._arrValue[col][row];
                        this._arrValue[col][row] = 0;
                        this.updateNumber();
                    }
                }
            }
        }
    },
    updateNumber(){
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                this._arrBlocks[col][row].children[0].getComponent('cc.Label').string = this._arrValue[col][row];
                this._arrBlocks[col][row].color = COLOR[this._arrValue[col][row]];
                if(this._arrValue[col][row] !=0){
                    this._arrBlocks[col][row].children[0].getComponent('cc.Label').node.active = true;
                    
                }
                if(this._arrValue[col][row] ==0){
                    this._arrBlocks[col][row].children[0].getComponent('cc.Label').node.active = false;
                }
            }
        }
    },

    // update (dt) {},
});

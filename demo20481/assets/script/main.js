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

        _canPress:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log(this._arrBlocks)
        this.canPress = false;
        Emitter.instance = new Emitter();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
    },

    handleKeyUp(evt){
            // this._canPress = false;
            
            // this.randomNumber();
            // switch(evt.keyCode){
            //     case cc.macro.KEY.up:
            //         //Emitter.instance.emit("moveUp");
            //         break;
            //     case cc.macro.KEY.down:
            //         Emitter.instance.emit("moveDown");
            //         break;
            //     case cc.macro.KEY.left:
            //         Emitter.instance.emit("moveLeft");
            //         break;
            //     case cc.macro.KEY.right:
            //         Emitter.instance.emit("moveRight");
            //         break;
            //     default: break;
            // }
            
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
                Emitter.instance.emit("moveLeft");
                break;
            case cc.macro.KEY.right:
                // Emitter.instance.emit("moveRight");
                for(let row=0; row < 4; row++){
                    this.blockHandleMoveRight(row,0);
                }
                break;
            default: break;
        }
    },

    start() {
        //this.init();
        this.render();
        this.randomNumber()
    },
    init(){
    },

    render() {

        for(let row =0 ; row < 4 ; row++){
            let arrRow = [];
            for(let col = 0 ; col < 4 ; col ++){
                let x = -226.227 + row *150;
                let y = 225.631 - col *150;
                // this.createItem(x,y,arrRow[row][col]);
                let newCard = cc.instantiate(this.card);
                newCard.parent = this.node
                newCard.x = x;
                newCard.y = y;
                newCard.color = COLOR[0];
                
                newCard.active = false
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow)
        }
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

    createItem(x,y,value) {
        let card = cc.instantiate(this.card);
        card.parent = this.node
        card.x = x;
        card.y = y;
        //card.getComponent(cc.Label).string = value;
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

    // start() {
    //     this._arrBlocks = this.init();
    //     this.render();
    // },
    // init(){
    //     let arrRows = [];
    //     for(let row = 0 ; row < 4 ; row++){
    //          arrRows[row] = [];
    //         for(let col = 0; col < 4; col++){
    //             arrRows[row][col]=0;
    //         }  
    //     }
    //     this.randomNumber(arrRows);
    //     return arrRows;
    // },

    // render() {
    //     let arrayNode =this.init();
    //     for(let row =0 ; row < 4 ; row++){
    //         for(let col = 0 ; col < 4 ; col ++){
    //             let x = -226.227 + row *150;
    //             let y = 225.631 - col * 150;
    //             // this.createItem(x,y,arrRow[row][col]);
    //             let newCard = cc.instantiate(this.card);
    //             newCard.parent = this.node
    //             newCard.x = x;
    //             newCard.y = y;
    //             newCard.color = COLOR[0];
    //             newCard.children[0].getComponent('cc.Label').string = this._arrBlocks[row][col];
    //             newCard.active = false
    //             arrayNode.push(newCard);
    //         }
    //     }
    //     cc.log(this._arrBlocks);

    // },

    // randomNumber(){
    //     // let randomX = Math.floor(Math.random() * arrBlock.length);
    //     // let randomY = Math.floor(Math.random() * arrBlock.length);
    //     // if( arrBlock[randomX][randomY]==0){
    //     //     arrBlock[randomX][randomY] =2;
    //     //     return;
    //     // }
    //     let flatArray = this._arrBlocks.flat(Infinity)
    //     let arrNone = flatArray.filter((value)=>{
    //         return value.active == false;
    //     })
    //     let index = Math.floor(Math.random() * arrNone.length);
    //     arrNone[index].active = true;

    // },
    // createItem(x,y,value) {
    //     let newCard = cc.instantiate(this.card);
    //             newCard.parent = this.node;
    //             newCard.x = x;
    //             newCard.y = y;
    //             newCard.color = COLOR[0];
    //             newCard.children[0].getComponent('cc.Label').string = value;
    //             this._arrBlocks[row][col] = newCard;
    // },
    // createRandomNumber(){
    //     let arrNone = this._arrBlocks.filter((value)=>{
    //         return value.value == 0;
    //     })
    //     cc.log("arrNone: ", arrNone);
    //     let randomIndex = Math.floor(Math.random() * arrNone.length);
    //     arrNone[randomIndex].value = 2 ;
    //     Emitter.instance.emit("doneRandom",arrNone[randomIndex]);
    // },





    // update (dt) {},
});

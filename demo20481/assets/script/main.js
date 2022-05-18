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
        this.canPress = false;
        Emitter.instance = new Emitter();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
    },

    handleKeyUp(evt){
        //if(this._canPress == false){
            this._canPress = false;
            this.createRandomNumber();
        //}
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
                Emitter.instance.emit("moveRight");
                break;
            default: break;
        }
    },

    start() {
        //this.init();
        this.render();
    },
    init(){
        let arrRows = [];
        for(let row = 0 ; row < 4 ; row++){
             arrRows[row] = [];
            for(let col = 0; col < 4; col++){
                arrRows[row][col]=0;
            }  
        }
        this.randomNumber(arrRows);
    
        return arrRows;
    },

    render() {
        let arrayValue =this.init();
        this._arrBlocks = this.init();
        for(let row =0 ; row < 4 ; row++){
            for(let col = 0 ; col < 4 ; col ++){
                let x = -226.227 + row *150;
                let y = 225.631 - col * 150;
                // this.createItem(x,y,arrRow[row][col]);
                let newCard = cc.instantiate(this.card);
                newCard.parent = this.node
                newCard.x = x;
                newCard.y = y;
                newCard.color = COLOR[0];
                newCard.children[0].getComponent('cc.Label').string = arrayValue[row][col];
                this._arrBlocks[row][col] = newCard;
            }
        }
        cc.log(this._arrBlocks);

    },

    randomNumber(arrBlock){
        let randomX = Math.floor(Math.random() * arrBlock.length);
        let randomY = Math.floor(Math.random() * arrBlock.length);
        if( arrBlock[randomX][randomY]==0){
            arrBlock[randomX][randomY] =2;
        }else{
           
            return this.randomNumber(arrBlock);
        }

    },
    createItem(x,y,value) {
        let newCard = cc.instantiate(this.card);
                newCard.parent = this.node;
                newCard.x = x;
                newCard.y = y;
                newCard.color = COLOR[0];
                newCard.children[0].getComponent('cc.Label').string = value;
                this._arrBlocks[row][col] = newCard;
    },
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

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
        this.render();
        this.createRandomNumber();
    },

    render() {
        for(let row =0 ; row < 4 ; row++){
            for(let col = 0 ; col < 4 ; col ++){
                let x = -226.227 + row *150;
                let y = 225.631 - col * 150;
                let item = this.createItem(x,y);
                this._arrBlocks.push(item);
            }
        }
        cc.log(this._arrBlocks)
    },

    createRandomNumber(){
        let arrNone = this._arrBlocks.filter((value)=>{
            return value.value == 0;
        })
        cc.log("arrNone: ", arrNone);
        let randomIndex = Math.floor(Math.random() * arrNone.length);
        arrNone[randomIndex].value = 2 ;
        Emitter.instance.emit("doneRandom",arrNone[randomIndex]);
    },

    createItem(x,y) {
        let card = cc.instantiate(this.card);
        card.parent = this.node;
        card.x = x;
        card.y = y;
        card.opacity = 255;
        card.children[0].getComponent('cc.Label').string= 0;
        let objCard = {x,y,value:0};
        //this.createColor(card,0);
        return objCard;
    },

    // createColor(card,value){
    //     switch(value){
    //         case 0: 
    //         card.color = COLOR[0];
    //         break;
    //         case 2: 
    //         card.color = COLOR[2];
    //         break;
    //         case 4: 
    //         card.color = COLOR[4];
    //         break;
    //         case 8: 
    //         card.color = COLOR[8];
    //         break;
    //         case 16: 
    //         card.color = COLOR[16];
    //         break;
    //         case 32: 
    //         card.color = COLOR[32];
    //         break;
    //         case 64: 
    //         card.color = COLOR[64];
    //         break;
    //         case 128: 
    //         card.color = COLOR[128];
    //         break;
    //         case 256: 
    //         card.color = COLOR[156];
    //         break;
    //         case 512: 
    //         card.color = COLOR[512];
    //         break; 
    //         case 1024: 
    //         card.color = COLOR[1024];
    //         break;
    //         case 2048: 
    //         card.color = COLOR[2048];
    //         break;

    //     }
    // },

    // update (dt) {},
});

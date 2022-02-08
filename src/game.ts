import 'phaser';
import'./button';
import { buttons, getAmountText, initButton, resetText, setButtons, setColor, updateText } from './button';
import { Field, GameState } from './types';
import axios from "axios";
import { getCanVote, getCurrentCounter, getState, setCanVote, setCurrentCounter, setState} from './state';

export default class Demo extends Phaser.Scene
{
    private timer:number = 0;
    private fivetimer:number = 0;
    private upAmount
    private rightAmount
    private downAmount
    private leftAmount
    private upButton
    private rightButton
    private downButton
    private leftButton
    private sprite: Phaser.GameObjects.Sprite;
    constructor ()
    {
        super('demo');
    }

    async preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.image('libs', 'assets/libs.png');
        this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        this.load.glsl('stars', 'assets/starfields.glsl.js');
        this.load.image('field', 'assets/field.png');
        this.load.image('alice', 'assets/alice.png');
        this.load.image('bob', 'assets/bob.png');
    }

    async create ()
    {

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            this.add.sprite(300 + (j * 32), 200 + (i * 32) , 'field');
        }
    }

    this.sprite = this.add.sprite(300 + (7 * 32), 200 + (7 * 32), "alice");
    this.add.sprite(300, 200, "bob");

    this.upButton = initButton(this,0,400,100);
    this.rightButton = initButton(this,1,600,300);
    this.downButton = initButton(this,2,400,500);
    this.leftButton = initButton(this,3,200,300);
    this.upAmount = getAmountText(this,0,400,100);
    this.rightAmount = getAmountText(this,1,600,300);
    this.downAmount = getAmountText(this,2,400,500);
    this.leftAmount = getAmountText(this,3,200,300);
    setButtons([this.upAmount,this.rightAmount,this.downAmount,this.leftAmount, this.upButton,this.rightButton,this.downButton,this.leftButton]);
    }

    async update(time, delta) {
        this.timer += delta;
        this.fivetimer += delta;
        if (this.timer > 1000) {
            this.timer -= 1000;
            setState(await getGameState());
            if(getCurrentCounter() != getState().counter){
                setCurrentCounter();
                this.resetButtons();
                setCanVote(true);
                const position = getState().position;
                this.sprite.x = 300 + (32 * position.y);
                this.sprite.y = 200 + (32 * position.x);
                this.fivetimer = 0;
                this.reactOnField(getState().field);
            }
            if(this.fivetimer > 7000){
                console.log(this.fivetimer);
                await updateText(0,this.upAmount)
                await updateText(1,this.rightAmount)
                await updateText(2,this.downAmount)
                await updateText(3,this.leftAmount)
            }
        }
        if(this.fivetimer > 5000 && getCanVote()){
            setCanVote(false);
            buttons.forEach((button) => setColor(button,'RED'));     
        }
    
        // Rest of your update loop.
    }
    reactOnField(field: Field) {
        if(field == Field.BOMB){
            alert("BOOM");
        }
        else if(field == Field.ALICE){
            alert("Congratulations! we found Bob");
        }
    }
    resetButtons = () => {
        [this.upAmount,this.rightAmount,this.downAmount,this.leftAmount].forEach((amountText) => {
            resetText(amountText);
        });
        buttons.forEach((text) => {
           setColor(text,'GREEN');
        });
    }
    
}

const getGameState = async (): Promise<GameState> => {
    return await axios.get(`http://localhost:8080/state`).then(resp => {
        return resp.data.result; 
    }); 
}

const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);

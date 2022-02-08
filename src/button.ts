import 'phaser';
import axios from "axios";
import { getCanVote, getCurrentCounter, getState, setCanVote, setCurrentCounter } from './state';

export let buttons: Array<Phaser.GameObjects.Text>

export const setButtons = (inputButtons :Array<Phaser.GameObjects.Text>) => {
    buttons = inputButtons;
}

export const initButton = (scene: Phaser.Scene,buttonType: number, x: number, y: number) => {
    const directionButton = scene.add.text(x, y, getText(buttonType));
    directionButton.setBackgroundColor("GREEN");
    directionButton.setInteractive();
    directionButton.on('pointerdown', async () => {await handleClick(buttonType)});
    return directionButton; 
}

const getText = (buttonType: number) => {
    switch(buttonType){
        case 0:
            return 'UP';
        case 1:
            return 'RIGHT';
        case 2:
            return 'DOWN';
        case 3:
            return 'LEFT';               
    }
    return ''; 
}

export const getAmountText = (scene: Phaser.Scene,buttonType: number,x: number,y: number) => {
    let pos = {x,y};
    switch(buttonType){
        case 0:
            pos = {x: x, y: y-15}
        case 1:
            pos = {x: x + 30, y: y}
        case 2:
            pos = {x: x, y: y + 15}
        case 3:
            pos = {x: x - 30, y:y}              
    }
    const amountButton = scene.add.text(pos.x, pos.y, '0');
    amountButton.setBackgroundColor("GREEN");
    amountButton.setInteractive();
    return amountButton; 
}

export const updateText = async (buttonType, textobject: Phaser.GameObjects.Text) => {
    const text = await getAmount(buttonType);
    textobject.setText(text);
}
    


const handleClick = async (buttonType: number) => {
    if(getCanVote()){
    await axios.post(`http://localhost:8080/sendChoiceCoin/${buttonType}`).then(resp => {
        setCurrentCounter();
        });
    setCanVote(false);
    buttons.forEach((button) => setColor(button,'RED'));     
    }
};

const getAmount = async (buttonType: number): Promise<string> => {
    return await axios.get(`http://localhost:8080/getChoiceCoin/${buttonType}`).then(resp => {
        return resp.data.result; 
    }); 
    //console.log(buttonType + ' clicked!');
}

export const setColor = (text: Phaser.GameObjects.Text, color: string) => {
    text.setBackgroundColor(color);
}

export const resetText = (text: Phaser.GameObjects.Text) => {
    text.setText('0');
}

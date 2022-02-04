import 'phaser';
import axios from "axios";

export const initButton = (scene: Phaser.Scene,buttonType: number, x: number, y: number) => {
    const helloButton = scene.add.text(x, y, getText(buttonType));
    helloButton.setBackgroundColor("GREEN");
    helloButton.setInteractive();
    helloButton.on('pointerdown', async () => {handleClick(buttonType)});
    console.log(helloButton.eventNames());
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

const handleClick = async (buttonType: number) => {
    console.log("in here?")
    await axios.post(`http://localhost:8080/sendChoiceCoin/${buttonType}`).then(resp => {
        console.log("data receive: " + resp.data)
        console.log("in here!")
});
};
    //console.log(buttonType + ' clicked!');

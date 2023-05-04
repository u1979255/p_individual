class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
        this.timeMostrar = 1000;
        this.error = 5;
        this.mode = "normal";
        this.nivell = 1;
    }
    preload (){
        this.load.image('back', '../resources/back.png');
        this.load.image('cb', '../resources/cb.png');
        this.load.image('co', '../resources/co.png');
        this.load.image('sb', '../resources/sb.png');
        this.load.image('so', '../resources/so.png');
        this.load.image('tb', '../resources/tb.png');
        this.load.image('to', '../resources/to.png');
    }

    create (){
        let arraycards = ['co','sb','co','sb'];
        arraycards.sort(function() {return Math.random() - 0.5});
        this.cameras.main.setBackgroundColor(0xBFFCFF);

        this.add.image(250, 300, arraycards[0]);
        this.add.image(350, 300, arraycards[1]);
        this.add.image(450, 300, arraycards[2]);
        this.add.image(550, 300, arraycards[3]);

        this.cards = this.physics.add.staticGroup();

        this.cards.create(250, 300, 'back');
        this.cards.create(350, 300, 'back');
        this.cards.create(450, 300, 'back');
        this.cards.create(550, 300, 'back');

        let json = localStorage.getItem("config") || '{"cards":2,"mode:"normal"}';
		let game_data =JSON.parse(json);
        this.mode = game_data.mode;
        this.nivell = game_data.nivell;

        if (this.mode == "infinit"){
            this.error = 5+5*(this.nivell/20)
            this.time = 1000 - (this.nivell*5)
        }

        let i = 0;
        

        this.cards.children.iterate((card)=>{
            card.card_id = arraycards[i];
            i++;
            card.setInteractive();
            card.on('pointerup', () =>{
                card.disableBody(true, true);
                if (this.firstClick){
                    if (this.firstClick.card_id !== card.card_id){
                        this.score -= this.error;
                        this.firstClick.enableBody(false, 0, 0, true, true);
                        card.enableBody(false, 0, 0, true, true);
                        if (this.score <= 0){
                            alert("Game Over");
                            loadpage("../");
                        }
                    }
                    else{
                        this.correct++;
                        if (this.correct >= 2){
                            alert("Has guanyat amb " + this.score + " punts.");
                            if (this.mode = "infinit"){
                                /*Aqui va la parte que tiene que volver a empezar la partida con un nivel mas*/ 
                            }
                            else{
                            loadpage("../");
                            }
                        }
                    }
                    this.firstClick = null;
                }
                else{
                    this.firstClick = card;
                }
            }, card);
        });
    }

    update (){}
}
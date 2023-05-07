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
        this.ncards = 2;
        this.totalscore = 0;
    }
    preload (){
        this.load.image('back', '../resources/back.png');
        this.load.image('cb', '../resources/cb.png');
        this.load.image('co', '../resources/co.png');
        this.load.image('sb', '../resources/sb.png');
        this.load.image('so', '../resources/so.png');
        this.load.image('tb', '../resources/tb.png');
        this.load.image('to', '../resources/to.png');
        let json = localStorage.getItem("config") || '{"cards":2,"mode:"normal"}';
		let game_data =JSON.parse(json);
        this.mode = game_data.mode;
        this.nivell = game_data.nivell;
        this.ncards = game_data.cards;
    }

    create (){
        
        if (this.mode == "infinit"){
            this.error = 5+5*(this.nivell/20)
            this.time = 1000 - (this.nivell*5)
            this.cards = 2 + (this.nivell*40)
        }

        let arraycards = [];
        if (this.ncards == 2){
            arraycards = ['co','sb','co','sb'];
        }
        else if (this.ncards == 3){
            arraycards = ['co','sb','to','co','sb','to'];
        }
        else if (this.ncards == 4){
            arraycards = ['cb','co','so','to','cb','co','so','to'];
        }
        else if (this.ncards == 5){
            arraycards = ['cb','co','sb','so','to','cb','co','sb','so','to'];
        }
        else if (this.ncards == 6){
            arraycards = ['cb','co','sb','so','tb','to','cb','co','sb','so','tb','to'];
        }

        arraycards.sort(function() {return Math.random() - 0.5});
        console.log(arraycards);
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        
        for (let i = 0; i < arraycards.length; i++){
            if (i < arraycards.length/2){
                this.add.image(250 + (100*i), 200, arraycards[i]);
            }
            else{
                this.add.image(250 + (100*(i-arraycards.length/2)), 400, arraycards[i]);
            }
        }
        
        this.cards = this.physics.add.staticGroup();

        for (let i = 0; i < arraycards.length; i++){
            if (i < arraycards.length/2){
                this.cards.create(250 + (100*i), 200, 'back');    
            }
            else {
                this.cards.create(250 + (100*(i-arraycards.length/2)), 400, 'back');
            }
            
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
                        if (this.correct >= this.ncards){
                            alert("Has guanyat amb " + this.score + " punts.");
                            if (this.mode == "infinit"){
                                this.create();
                                this.nivell++;
                                this.correct = 0;
                                this.totalscore += this.score;
                                this.score = 100;

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

    mostarCartes (){
        
    }
}
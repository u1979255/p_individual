const back = "../resources/back.png";
const items = ["../resources/cb.png","../resources/co.png","../resources/sb.png",
"../resources/so.png","../resources/tb.png","../resources/to.png"];

var game = new Vue({
	el: "#game_id",
	data: {
		username:'',
		current_card: [],
		items: [],
		num_cards: 2,
		bad_clicks: 0,
		start: false,
		mode: "normal",
		nivell: 1
	},
	created: function(){
		var json = localStorage.getItem("config") || '{"cards":2,"mode:"normal"}';
		var game_data =JSON.parse(json);
		this.mode = game_data.mode;
		this.nivell = game_data.nivell;
 		this.username = sessionStorage.getItem("username","unknown");
		this.items = items.slice(); // Copiem l'array
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		for (var i = 0; i < this.items.length; i++){
			this.current_card.push({done: false, texture: this.items[i]});
		}
		if (game_data.mode == "normal"){
			this.num_cards = game_data.cards;
		}
		else{
			if (game_data.nivell > 149)
				this.num_cards = 4;
			else if (game_data.nivell > 79)
				this.num_cards = 3;
			else 
				this.num_cards = 2;
		}
		var time= 0;
		if (game_data.mode == "normal"){
			time = 1000;
		}
		else{
			time = 1000-(game_data.nivell*5);
		}
		
		setTimeout(() => {
			for (var i = 0; i < this.items.length; i++){
				Vue.set(this.current_card, i, {done: false, texture: back});
			}
			this.start=true;
		}, time);
	},
	methods: {
		clickCard: function(i){
			if (!this.current_card[i].done && this.current_card[i].texture === back)
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
		}
	},
	watch: {
		current_card: function(value){
			if (this.start == true){
				if (value.texture === back ) return;
				var front = null;
				var i_front = -1;
				for (var i = 0; i < this.current_card.length; i++){
					if (!this.current_card[i].done && this.current_card[i].texture !== back){
						if (front){
							if (front.texture === this.current_card[i].texture){
								front.done = this.current_card[i].done = true;
								this.num_cards--;
							}
							else{
								Vue.set(this.current_card, i, {done: false, texture: back});
								Vue.set(this.current_card, i_front, {done: false, texture: back});
								this.bad_clicks++;
								break;
							}
						}
						else{
							front = this.current_card[i];
							i_front = i;
						}
					}
				}			
			}
		}
	},

	computed: {
		score_text: function(){
		var e = 1;
		if (this.dificultat == "hard"){
			e= 10;
		}
		else if (game_data.dificulty == "normal"){
			e= 5; 
		}
		
			return 100 - this.bad_clicks * e;
		}
	}
});






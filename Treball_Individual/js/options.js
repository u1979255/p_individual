var options = function(){
	// Aquí dins hi ha la part privada de l'objecte
	var options_data = {
		cards:2, mode:"normal", nivell:1
	};
	var load = function(){
		var json = localStorage.getItem("config") || '{"cards":2,"mode":"normal","nivell":1}';
		options_data = JSON.parse(json);
	};
	var save = function(){
		localStorage.setItem("config", JSON.stringify(options_data));
	};
	load();
	var vue_instance = new Vue({
		el: "#options_id",
		data: {
			num: 2,
			mode: "normal",
			nivell: 1
		},
		created: function(){
			this.num = options_data.cards;
			this.mode = options_data.mode;
			this.nivell = options_data.nivell;
		},
		watch: {
			num: function(value){
				if (value < 2)
					this.num = 2;
				else if (value > 4)
					this.num = 4;
			},
			nivell: function(value){
				if (value < 1)
					this.nivell = 1;
				else if (value > 200)
					this.nivell = 200;
			}
		},
		methods: { 
			discard: function(){
				this.num = options_data.cards;
				this.mode = options_data.mode;
				this.nivell = options_data.nivell;
			},
			save: function(){
				options_data.cards = this.num;
				options_data.mode = this.mode;
				options_data.nivell = this.nivell;
				save();
				loadpage("../");
			}
		}
	});
	return {
		// Aquí dins hi ha la part pública de l'objecte
		getOptionsString: function (){
			return JSON.stringify(options_data);
		},
		getNumOfCards: function (){
			return options_data.cards;
		},
		getMode: function (){
			return options_data.mode;
		},
		getNivell: function (){
			return options_data.nivell;
		}
	}; 
}();

console.log(options.getOptionsString());
console.log(options.getNumOfCards());
console.log(options.getMode());
console.log(options.getNivell());
console.log(options.options_data);





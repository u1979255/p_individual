function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html")
}

function options(){
	loadpage("./html/options.html");
}

function index_pi2(){
	loadpage("./pi_2/index.html");
}

function index_pi3(){
	loadpage("./pi_3/index.html");
}

function index_TreballIndividual(){
	loadpage("./Treball_Individual/index.html");
}

function phaser_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergame.html");
}

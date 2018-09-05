// Variável inimigo que recebe posição x e y, além de uma variável de
// velocidade para o seu movimento automático.
var Enemy = function(x, y, vel) {
    this.x = x;
    this.y = y;
    this.vel = vel;

    this.sprite = 'images/enemy-bug.png';
};

// Faz o update da posição do inimigo
Enemy.prototype.update = function(dt) {
	// Multiplica-se a velocidade atual por dt e atribua à coordenada x
	// para manter a velocidade estável em qualquer computador
	this.x += this.vel * dt;
	
	// Verifica se o inimigo ultrapassou o tamanho do canvas e o retorna
	// para o início do canvas. Também modifica a velocidade do inimigo,
	// afim de que seu movimento seja aleátorio e diferente do movimento
	// anterior.
	if (this.x > 505){
		this.x = -50;
		this.vel = 100 + Math.floor(Math.random() * 200);
	}

	// Função de Colisão - Verifica se a diferença entre posição do player 
	// e a posição do inimigo é menor ou maior que o tamanho de seus sprites,
	// retornando o player à posição inicial.
	if((this.x - player.x) <= 71 && (this.y - player.y) <= 80 & (this.x - player.x) > -71 && (this.y - player.y) > -80) {
    	setTimeout(() => {
        	player.x = 202;
       		player.y = 400;
		}, 50);
    }
};

// Renderização do sprite do inimigo
Enemy.prototype.render = function() {
	// Recebe imagem e posição x e y para renderizar
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Variável player recebe apenas a posição x e y, já que o controle de movimento
// fica nas mãos do jogador
var Player = function(x, y){
	this.x = x;
	this.y = y;
	
	this.sprite = 'images/char-cat-girl.png';
};

// Faz o update da posição do jogador
Player.prototype.update = function(){
	// Os 3 primeiros if a seguir verificam se a posição do jogador em x ou y 
	// pode ultrapassar o canvas. Se sim, impede o jogador de se movimentar além.
	if (this.x > 402){
		this.x = 402;
	}
	if (this.x < 2){
		this.x = 2;
	}
	if (this.y > 400){
		this.y = 400;
	}
	// Verifica se o jogador chegou à água. Se sim, retorna o jogador para a posição
	// inicial de forma mais devagar utilizando o setTimeout.
	if (this.y < 0){
		setTimeout(() => {
		this.x = 202;
		this.y = 400;
		}, 50);
	}
};

// Renderização do sprite do jogador
Player.prototype.render = function(){
	// Recebe imagem e posição x e y para renderizar
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Função de movimento do jogador - Recebe as teclas pressionadas e adiciona coordenadas
// diferentes à x e y.
Player.prototype.handleInput = function(key){
	// Movimentação para a esquerda
	if(key == 'left' && this.x > 0){
		this.x -= 100;
	}
	// Movimentação para a direita
	if(key == 'right' && this.x < 408){
		this.x += 100;
	}
	// Movimentação para cima
	if (key == 'up' && this.y > 0) {
		this.y -= 85;
	}
	// Movimentação para baixo
	if (key == 'down' && this.y < 408){
		this.y += 85;
	}

};

// Instanciação do jogador, passando as coordenadas x e y
var player = new Player(202, 400);

// Instanciação do inimigo
var allEnemies = [];
// Array de posições y dos 3 inimigos
var bugLocation = [228, 145, 62];
// Adiciona instâncias no array dos inimigos
bugLocation.forEach(function (y){
	var enemy = new Enemy(0, y, 300);
	allEnemies.push(enemy);
});

// Leitor de teclas pressionadas
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

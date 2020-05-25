class GameOver extends Phaser.Scene {
	constructor() {
		super("game over");
	}
    
    button(button, buttonName, pointer) {
        if (pointer.worldX > button.x - button.width/2 && 
            pointer.worldX < button.x + button.width/2 && 
            pointer.worldY > button.y - button.height/2 && 
            pointer.worldY < button.y + button.height/2) {
            button = this.add.sprite(button.x, button.y, 'atlas', buttonName + '_active');
            if (pointer.isDown && buttonName == "restart") {
                this.gameOver.stop();
                this.scene.start("main");
            }
            if (pointer.isDown && buttonName == "home") {
                this.gameOver.stop();
                this.scene.start("menu");
            }
        } else {
            button = this.add.sprite(button.x, button.y, 'atlas', buttonName + '_inactive');
        }
    }
    
	preload() {
		this.load.image(
			"background",
			"game_over.png"
		);
	}
    
	create() {
        score = 0;
        enemySpeed = 1;
        this.sound.stopAll();
        
		this.bg = this.add.image(0, 0, "background");
		this.bg.x = config.width / 2;
        this.bg.y = config.height / 2;
        
        this.restart = this.add.sprite(0, 0, 'atlas', 'restart_inactive');
        this.restart.x = this.bg.x - this.restart.width*2;
        this.restart.y = this.bg.y + 150;
        
        this.home = this.add.sprite(0, 0, 'atlas', 'home_inactive');
        this.home.x = this.bg.x + this.home.width*2;
        this.home.y = this.bg.y + 150;
        
        this.gameOver = this.sound.add("game_over");
        this.gameOver.play();
        this.death = this.sound.add("death");
        this.death.play();
	}
    
    update() {
        this.pointer = this.input.activePointer;
        
        this.button(this.restart, "restart", this.pointer);
        this.button(this.home, "home", this.pointer);
    }
}

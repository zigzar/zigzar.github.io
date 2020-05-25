class Menu extends Phaser.Scene {
	constructor() {
		super("menu");
	}
    
    button(button, buttonName, pointer) {
        if (pointer.worldX > button.x - button.width/2 && 
            pointer.worldX < button.x + button.width/2 && 
            pointer.worldY > button.y - button.height/2 && 
            pointer.worldY < button.y + button.height/2) {
            button = this.add.sprite(button.x, button.y, 'atlas', "btn" + '_active');
            if (pointer.isDown && buttonName == "level1") {
                this.menu.stop();
                this.scene.start("main");
            }
            if (pointer.isDown && buttonName == "level2") {
                this.menu.stop();
                this.scene.start("main2");
            }
        } else {
            button = this.add.sprite(button.x, button.y, 'atlas', "btn" + '_inactive');
        }
        if (buttonName == "level1") this.level1Text = this.add.text(button.x - this.level1Text.width/2, button.y - this.level1Text.height/2 - 4, "1 уровень");
        if (buttonName == "level2") this.level2Text = this.add.text(button.x - this.level2Text.width/2, button.y - this.level2Text.height/2 - 4, "2 уровень");
    }
    
    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    
	create() {
        var add = this.add;
        this.title = this.add.text(0, 0, "Рыцарь");
        var title = this.title;
        WebFont.load({
            google: {
                families: [ 'Prosto One' ]
            },
            active: function ()
            {
                title = add.text(0, 0, "Рыцарь", {fontSize: 48, fontFamily: 'Prosto One'});
                title.x = config.width / 2 - title.width / 2;
                title.y = config.height / 2 - 150;
            }
        })
        
		this.bg = this.add.image(0, 0, 'atlas', 'bg_menu');
		this.bg.x = config.width / 2;
        this.bg.y = config.height / 2;    
        
        this.level1 = this.add.sprite(0, 0, 'atlas', 'btn_inactive');
        this.level1.x = this.bg.x;
        this.level1.y = this.bg.y - this.level1.height + 100;
        this.level1Text = this.add.text(this.level1.x - this.level1.width/2, this.level1.y - this.level1.height/2, "1 уровень");
        
        this.level2 = this.add.sprite(0, 0, 'atlas', 'btn_inactive');
        this.level2.x = this.bg.x;
        this.level2.y = this.bg.y + this.level2.height + 100;
        this.level2Text = this.add.text(this.level2.x - this.level2.width/2, this.level2.y - this.level2.height/2, "2 уровень");
        
        score = 0;
        
        this.menu = this.sound.add("menu");
        this.menu.play(musicCfg);
	}
    
    update() {
        this.pointer = this.input.activePointer;
        
        this.button(this.level1, "level1", this.pointer);
        this.button(this.level2, "level2", this.pointer);
    }
}

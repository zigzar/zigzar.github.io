var musicCfg = {
    volume: 0.7,
    loop: true
}
var fxCfg = {
    loop: true
}
var batCfg = {
    rate: 2,
    loop: true
}
class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }
    preload(){
        this.load.atlas(
            'atlas',
            'atlas.png',
            'atlas.json'
        );
        this.load.audio("menu", "sounds/menu.mp3");
        this.load.audio("main", "sounds/main.mp3");
        this.load.audio("game_over", "sounds/game_over.mp3");
        this.load.audio("hit", "sounds/hit.mp3");
        this.load.audio("death", "sounds/death.mp3");
        this.load.audio("poof", "sounds/poof.mp3");
        this.load.audio("slime_idle", "sounds/slime_idle.mp3");
        this.load.audio("slime_attack", "sounds/slime_attack.mp3");
        this.load.audio("bat_idle", "sounds/bat_idle.mp3");
        this.load.audio("bat_attack", "sounds/bat_attack.mp3");
    }
    create() {
        this.title = this.add.text(0, 0, "Загрузка...");;
        this.scene.start("menu");
    }
}
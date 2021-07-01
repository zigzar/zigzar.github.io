var cursors;
var bg;
var hero;
var heroShadow;
var heroAttacking = false;
var slime;
var bat;
var enemySpeed = 1;
var poof;
var score = 0;
var scoreText;
var isGameOver = false;
var isSlime = true;
var killEnemy = false;
var enemyAttack = false;
class Main2 extends Phaser.Scene {
    constructor() {
        super("main2");
    }
    
                
            heroIdle(){
                hero.play('hero_idle');
                heroAttacking = false;
            }
            heroAttack(tap){
                if (heroAttacking) {
                    return;
                }
                
                heroAttacking = true;
                if (tap) hero.flipX = tap.downX > bg.x;
                this.hit.play();
                hero.play('hero_attack', true); 
                setTimeout(this.heroIdle, 350);
            } 
    
    create(){
                this.sound.stopAll();
                this.anims.create({ 
                    key: 'hero_idle',    
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'hero/hero_idle_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'hero_attack',  
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'hero/hero_attack_',
                        end: 5
                    }), 
                    repeat: -1
                });
                this.anims.create({ 
                    key: 'slime_attack', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'slime/slime_attack_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'bat_attack', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'bat/bat_attack_', 
                        end: 7
                    }), 
                    repeat: -1 
                });
                 this.anims.create({ 
                    key: 'slime_idle', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'slime/slime_idle_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'bat_idle', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'bat/bat_idle_', 
                        end: 6
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'poof', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'vfx/poof_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                
                isGameOver = false;
                isSlime = true;
                killEnemy = false;
                enemyAttack = false;
                
                bg = this.add.sprite(0, 0, 'atlas', 'bg_level_1');
                bg.x = bg.width / 2;
                bg.y = bg.height / 2;
                
                hero = this.add.sprite(0, 0, 'hero');
                hero.x = bg.width / 2;
                hero.y = bg.height / 2 + hero.height;
                
                heroShadow = this.add.sprite(0, 0, 'atlas', 'hero_shadow');
                heroShadow.x = bg.width / 2;
                heroShadow.y = hero.y + hero.height + heroShadow.height / 2;
                
                slime = this.add.sprite(0, hero.y + 10, 'slime');
                slime.play('slime_idle');
                
                scoreText = this.add.text(20, 15, 'Очки: ' + score, {fontFamily: "Prosto One"});
                
                this.heroIdle();
                this.input.on("pointerdown", this.heroAttack, this);
                cursors = this.input.keyboard.createCursorKeys();
        
                this.main = this.sound.add("main");
                this.main.play(musicCfg);
        
                this.poof = this.sound.add("poof");
                this.hit = this.sound.add("hit");
                this.slime_idle = this.sound.add("slime_idle");
                this.slime_attack = this.sound.add("slime_attack");
                this.bat_idle = this.sound.add("bat_idle");
                this.bat_attack = this.sound.add("bat_attack");
                this.death = this.sound.add("death");
            }
            update(){
                if (isSlime) {
                    if (slime.flipX) {
                      slime.x -= enemySpeed;
                    } else {
                        slime.x += enemySpeed;
                    }
                    if (Math.abs(hero.x - slime.x) < 100) {
                        if (!enemyAttack) {
                            enemyAttack = true;
                            this.slime_attack.play(fxCfg);
                            slime.play('slime_attack');
                        }
                    }
                } else {    
                    if (bat.flipX) {
                      bat.x -= enemySpeed;
                    } else {
                        bat.x += enemySpeed;
                    }
                    if (Math.abs(hero.x - bat.x) < 100) {
                        bat.y += enemySpeed;
                        if (!enemyAttack) {
                            enemyAttack = true;
                            this.bat_attack.play(fxCfg);
                            bat.play('bat_attack');
                        }
                    }
                }
                
                if (!heroAttacking) {
                if (cursors.right.isDown) {
                    hero.flipX = true;
                    this.heroAttack();
                } else if (cursors.left.isDown) {
                    hero.flipX = false;
                    this.heroAttack();
                }
                }
                
                if (killEnemy) {
                        if (isSlime) slime.destroy();
                        else bat.destroy();
                        
                        if (Math.random() > 0.5) {
                            isSlime = true;
                            slime = this.add.sprite(0, hero.y + 10, 'slime');
                            slime.flipX = Math.random() > 0.5;
                            if (slime.flipX) {
                                slime.x = bg.x * 2;
                            } else {
                                slime.x = 0;
                            }
                            this.slime_idle.play(fxCfg);
                            slime.play('slime_idle');
                        } else {
                            isSlime = false;
                            bat = this.add.sprite(0, hero.y - 100, 'bat');
                            bat.flipX = Math.random() > 0.5;
                            if (bat.flipX) {
                                bat.x = bg.x * 2;
                            } else {
                                bat.x = 0;
                            }
                            this.bat_idle.play(batCfg);
                            bat.play('bat_idle');
                        }
                    killEnemy = false;
                    enemyAttack = false;
                }
                
                if (isSlime) {
                    if (heroAttacking && Math.abs(hero.x - slime.x) < 100 && hero.flipX == slime.flipX) {
                        score += 1;
                        scoreText.setText('Очки: ' + score);
                        enemySpeed = score  / 7 + 0.1;
                        poof = this.add.sprite(slime.x, slime.y, 'poof');
                        poof.play('poof', true);
                        setTimeout(function () {poof.destroy();}, 150);
                        this.slime_attack.stop();
                        this.slime_idle.stop();
                        this.poof.play();
                        killEnemy = true;
                    }
                } else if (heroAttacking && Math.abs(hero.x - bat.x) < 100 && hero.flipX == bat.flipX) {
                        score += 1;
                        scoreText.setText('Очки: ' + score);
                        enemySpeed = score  / 7 + 0.1;
                        poof = this.add.sprite(bat.x, bat.y, 'poof');
                        poof.play('poof', true);
                        setTimeout(function () {poof.destroy();}, 150);
                        this.bat_attack.stop();
                        this.bat_idle.stop();
                        this.poof.play();
                        killEnemy = true;
                }
                
                if (isSlime) {
                    if (Math.abs(hero.x - slime.x) < 20) {
                        isGameOver = true;
                        hero.play('poof', true); 
                        this.slime_idle.stop();
                        this.slime_attack.stop();
                        this.bat_idle.stop();
                        this.bat_attack.stop();
                        this.main.stop();
                        var game = this;
                        setTimeout(function() {game.scene.start("game over");}, 5); 
                    }
                } else {
                    if (Math.abs(hero.x - bat.x) < 20) {
                        isGameOver = true;
                        hero.play('poof', true); 
                        this.slime_idle.stop();
                        this.slime_attack.stop();
                        this.bat_idle.stop();
                        this.bat_attack.stop();
                        this.main.stop();
                        var game = this;
                        setTimeout(function() {game.scene.start("game over");}, 5); 
                    }
                }
                
            }

}
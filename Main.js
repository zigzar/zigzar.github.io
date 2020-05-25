var bg;
var hero;
var heroShadow;
var heroAttacking = false;
var slime;
var enemySpeed = 1;
var poof;
var score = 0;
var scoreText;
var isGameOver = false;
var killEnemy = false;
var enemyAttack = false;
class Main extends Phaser.Scene {
    constructor() {
        super("main");
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
                hero.flipX = tap.downX > bg.x;
                this.hit.play();
                hero.play('hero_attack', true); 
                setTimeout(this.heroIdle, 350);
            } 
    
    create(){
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
                
                score = 0;
                enemySpeed = 1;
                isGameOver = false;
                killEnemy = false;
                enemyAttack = false;
                heroAttacking = false;
        
                bg = this.add.sprite(0, 0, 'atlas', 'bg_level_0');
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
        
                this.main = this.sound.add("main");
                this.main.play(musicCfg);
        
                this.poof = this.sound.add("poof");
                this.hit = this.sound.add("hit");
                this.slime_idle = this.sound.add("slime_idle");
                this.slime_attack = this.sound.add("slime_attack");
                this.death = this.sound.add("death");
            }
            update(){
                if (score == 10) {
                    this.slime_idle.stop();
                    this.slime_attack.stop();
                    this.main.stop();
                    this.scene.start('main2');
                }
                
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
                
                if (killEnemy) {
                    enemyAttack = false;
                    slime.destroy();
                    slime = this.add.sprite(0, hero.y + 10, 'slime');
                    slime.flipX = Math.random() > 0.5;
                    if (slime.flipX) {
                        slime.x = bg.x * 2;
                    } else {
                        slime.x = 0;
                    }
                    this.slime_idle.play(fxCfg);
                    slime.play('slime_idle');
                    killEnemy = false;
                }
                
                if (heroAttacking && Math.abs(hero.x - slime.x) < 100 && hero.flipX == slime.flipX) {
                    score += 1;
                    scoreText.setText('Очки: ' + score);
                    enemySpeed = score  / 5 + 0.3;
                    poof = this.add.sprite(slime.x, slime.y, 'poof');
                    this.slime_idle.stop();
                    this.slime_attack.stop();
                    this.poof.play();
                    poof.play('poof', true);
                    setTimeout(function() {poof.destroy()}, 150);
                    killEnemy = true;
                }
                
                
                if (Math.abs(hero.x - slime.x) < 20 && !isGameOver) {
                    isGameOver = true;
                    this.death.play();
                    hero.play('poof', true);
                    this.slime_idle.stop();
                    this.slime_attack.stop();
                    this.main.stop();
                    this.scene.start("game over"); 
                }
                
            }

}
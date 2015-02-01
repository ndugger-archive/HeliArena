import {Helicopter} from './helicopter.js';
import {Player} from './player.js';
import {Bullet} from './bullet.js';
import {Explosion} from './explosion.js';

let g = { // fix for browserify being buggy :(
	Helicopter: Helicopter,
	Player: Player,
	Bullet: Bullet
}
console.log(g);

class HeliRampage {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.player = null;
		this.helicopters = [];
		this.e = 1;
		this.max = 4;
		this.explosions = [];
	}
	
	main() {
		this.setup();
		this.add(new g.Player(this.canvas.width / 2, this.canvas.height / 2));
		this.addMore();
		this.update(0);
		this.draw();
	}
	
	add(...components) {
		for (let component of components) {
			component.addTo(this);
		}
	}
	
	addMore() {
		if (this.helicopters.length <= this.max) {
			let a = Math.floor(Math.random() * 2);
			for (let i = 0, count = Math.round(this.e); i < count; i++) {
				if (a) {
					this.add(new g.Helicopter(0, Math.random() * this.canvas.height));
				} else {
					this.add(new g.Helicopter(Math.random() * this.canvas.width, 0));
				}
			}
		}
	}
	
	setup() {
		this.canvas.width = 800;
		this.canvas.height = 600;
		this.canvas.style.background = 'black';
		this.canvas.style.cursor = 'crosshair';
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;
		document.body.appendChild(this.canvas);
		document.body.style.margin = 0;
		document.body.style.overflow = 'hidden';
	}
	
	update(f) {
		for (let i = 0, count = this.helicopters.length; i < count; i++) {
			if (!this.helicopters[i]) break;
			this.helicopters[i].update(f);
			for (let ii = 0, count = this.helicopters[i].bullets.length; ii < count; ii++) {
				if (!this.helicopters[i]) break;
				let bullet = this.helicopters[i].bullets[ii];
				if (!bullet) break;
				bullet.update(this);
				if (bullet.x < 0 || bullet.y < 0 || bullet.x > this.canvas.width || bullet.y > this.canvas.height) {
					this.helicopters[i].bullets.splice(ii, 1);
					break;
				}
			}
		}
		this.player.update();
		for (let i = 0, count = this.player.bullets.length; i < count; i++) {
			let bullet = this.player.bullets[i];
			if (!bullet) break;
			bullet.update(this);
			if (bullet.x < 0 || bullet.y < 0 || bullet.x > this.canvas.width || bullet.y > this.canvas.height) {
				this.player.bullets.splice(i, 1);
				break;
			}
		}
		let self = this;
		setTimeout(() => {
			self.update(++f % 60);
		}, 1000 / 60);
	}
	
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0, count = this.explosions.length; i < count; i++) {
			this.explosions[i].draw(this.ctx);
		}
		for (let i = 0, count = this.helicopters.length; i < count; i++) {
			this.helicopters[i].draw(this.ctx);
			for (let ii = 0, count = this.helicopters[i].bullets.length; ii < count; ii++) {
				this.helicopters[i].bullets[ii].draw(this.ctx);
			}
		}
		this.player.draw(this.ctx);
		for (let i = 0, count = this.player.bullets.length; i < count; i++) {
			this.player.bullets[i].draw(this.ctx);
		}
		this.ctx.fillStyle = 'blue';
		this.ctx.font = '20px Verdana';
		this.ctx.fillText('Health: ' + this.player.health + '/10', 24, 40);
		this.ctx.fillText('Score: ' + this.player.score, 350, 40);
		let self = this;
		requestAnimationFrame(() => {
			self.draw();
		});
	}
}

let game = new HeliRampage;
game.main();

window.game = game;
import {Explosion} from './explosion.js';

export class Bullet {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = 10;
		this.width = 3;
		this.height = 6;
		this.color = 'yellow';
	}
	
	fire(helicopter, i) {
		this.heli = helicopter;
		this.i = i;
		helicopter.bullets.push(this);
		this.cache();
	}
	
	cache() {
		this.cached = document.createElement('canvas');
		this.cached.width = this.width;
		this.cached.height = this.height;
		let ctx = this.cached.getContext('2d');
		ctx.strokeStyle = this.color;
		ctx.strokeRect(0, 0, this.width, this.height);
	}
	
	update(game) {
		let helicopters = game.helicopters;
		this.x += Math.cos(this.angle - (Math.PI / 2)) * this.speed;
		this.y += Math.sin(this.angle - (Math.PI / 2)) * this.speed;
		for (let i = 0, count = helicopters.length; i < count; i++) {
			if (helicopters[i] === this.heli) continue;
			if (helicopters[i]) {
				let hb = helicopters[i].hitbox;
				if (this.x >= hb.x && this.x <= hb.x + hb.width && this.y >= hb.y && this.y <= hb.y + hb.height) {
					let explosion = new Explosion(this.x - 20, this.y - 20);
					explosion.init(game.explosions);
					game.e += game.e >= 3 ? 0 : .025;
					game.addMore.call(game);
					helicopters.splice(i, 1);
					this.heli.bullets.splice(this.i, 1);
					if (this.heli === game.player) ++game.player.score;
				}
			}
		}
		if (game.player !== this.heli) {
			let hb = game.player.hitbox;
			if (this.x >= hb.x && this.x <= hb.x + hb.width && this.y >= hb.y && this.y <= hb.y + hb.height) {
				let explosion = new Explosion(this.x - 20, this.y - 20);
				explosion.init(game.explosions);
				this.heli.bullets.splice(this.i, 1);
				--game.player.health;
			}
		}
	}
	
	draw(ctx) {
		ctx.save()
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.cached, -(this.width / 2), -(this.height / 2), this.width, this.height);
		ctx.restore();
	}
}
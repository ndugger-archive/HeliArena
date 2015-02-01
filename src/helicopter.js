import {Bullet} from './bullet.js';

export class Helicopter {
	constructor(x, y) {
		this.angle = Math.PI;
		this.rot = 0;
		this.x = x || 0;
		this.y = y || 0;
		this.width = 32;
		this.height = 80;
		this.hitbox = {
			x: 0,
			y: 0,
			width: this.width * 1.5,
			height: this.width * 1.5,
			rect: document.createElement('canvas')
		};
		this.color = 'red';
		this.speed = 1.5;
		this.moving = {
			up: false,
			right: false,
			down: false,
			left: false
		};
		this.target = { 
			x: 400 - 16, y: 0 
		};
		this.bullets = [];
	}

	addTo(game) {
		game.helicopters.push(this);
		this.target = game.player;
		this.cache();
	}
	
	// TODO: this is a mess...
	cache() {
		// Helicopter Body
		this.cached = document.createElement('canvas');
		this.cached.width = this.width;
		this.cached.height = this.height;
		let ctx = this.cached.getContext('2d');
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 1;
		ctx.beginPath();
		// Front section
		ctx.moveTo(4, 28);
		ctx.lineTo(4, 22);
		ctx.lineTo(4, 12);
		ctx.lineTo(8, 4);
		ctx.lineTo(16, 0);
		ctx.lineTo(24, 4);
		ctx.lineTo(28, 12);
		ctx.lineTo(28, 22);
		ctx.lineTo(28, 28);
		// Tail section
		ctx.lineTo(24, 42);
		ctx.lineTo(20, 56);
		ctx.lineTo(20, 70);
		ctx.lineTo(28, 74);
		ctx.lineTo(28, 78);
		ctx.lineTo(4, 78);
		ctx.lineTo(4, 74);
		ctx.lineTo(12, 70);
		ctx.lineTo(12, 56);
		ctx.lineTo(8, 42);
		ctx.closePath();
		// Guns
		ctx.rect(3, 4, 6, 16);
		ctx.rect(23, 4, 6, 16);
		ctx.stroke();
		// Helicopter Rotars
		this.cached2 = document.createElement('canvas');
		this.cached2.width = this.height;
		this.cached2.height = this.height;
		ctx = this.cached2.getContext('2d');
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo((this.height / 2) - 2, 1);
		ctx.lineTo((this.height / 2) - 2, this.height - 1);
		ctx.lineTo((this.height / 2) + 2, this.height - 1);
		ctx.lineTo((this.height / 2) + 2, 1);
		ctx.lineTo((this.height / 2) - 2, 1);
		ctx.moveTo(1, (this.height / 2) - 2);
		ctx.lineTo(this.height - 1, (this.height / 2) - 2);
		ctx.lineTo(this.height - 1, (this.height / 2) + 2);
		ctx.lineTo(1, (this.height / 2) + 2);
		ctx.lineTo(1, (this.height / 2) - 2);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		/*this.cached3 = document.createElement('canvas');
		this.cached3.width = this.height;
		this.cached3.height = this.height;
		ctx = this.cached3.getContext('2d');
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.height / 2, this.height / 2, this.height / 2, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
		ctx = this.hitbox.rect.getContext('2d');
		ctx.strokeStyle = 'lime';
		ctx.strokeRect(0, 0, this.hitbox.width, this.hitbox.height);*/
	}

	update(f) {
		let dx = this.target.x - (this.x - (this.width / 2)) - (this.target.width / 2);
		let dy = this.target.y - (this.y - (this.height / 2)) - (this.target.height / 2);
		this.angle = Math.atan2(dx, dy * -1);
		this.rot = (this.rot + 0.15) % (Math.PI * 2);
		this.hitbox.x = this.x - (this.hitbox.width / 2) + 
			(Math.cos(this.angle - (Math.PI / 2)) * (this.hitbox.width / 2 - 16));
		this.hitbox.y = this.y - (this.hitbox.width / 2) + 
			(Math.sin(this.angle - (Math.PI / 2)) * (this.hitbox.height / 2 - 16));
		this.x += Math.cos(this.angle - (Math.PI / 2)) * this.speed;
		this.y += Math.sin(this.angle - (Math.PI / 2)) * this.speed;
		if (!(f % 30) && Math.floor(Math.random() * 2)) {
			let bullet = new Bullet(this.x, this.y, this.angle);
			bullet.fire(this, this.bullets.length);
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.cached, -(this.width / 2), -(this.height / 2), this.width, this.height);
		ctx.translate(0, -16);
		ctx.rotate(-this.angle);
		ctx.rotate(this.rot);
		ctx.drawImage(this.cached2, -(this.height / 2), -(this.height / 2), this.height, this.height);
		//ctx.drawImage(this.cached3, -(this.height / 2), -(this.height / 2), this.height, this.height);
		ctx.restore();
		/*ctx.save();
		ctx.strokeStyle = 'lime';
		ctx.translate(this.hitbox.x, this.hitbox.y);
		ctx.strokeRect(0, 0, this.hitbox.width, this.hitbox.height);
		ctx.restore();*/
	}
}
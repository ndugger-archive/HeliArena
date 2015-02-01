import {Helicopter} from './helicopter.js';
import {Bullet} from './bullet.js';

export class Player extends Helicopter {
	constructor(x, y) {
		super(x, y);
		this.health = 10;
		this.score = 0;
		this.speed = 4.5;
		this.color = 'white';
	}
	
	addTo(game) {
		game.player = this;
		this.listen(game.canvas);
		this.cache();
	}
	
	listen(canvas) {
		let self = this;
		window.addEventListener('keydown', (e) => {
			switch(e.keyCode) {
				case 87: // w
					self.moving.up = true;
					break;
				case 68: // d
					self.moving.right = true;
					break;
				case 83: // s
					self.moving.down = true;
					break;
				case 65: // a
					self.moving.left = true;
					break;
			}
		});
		window.addEventListener('keyup', (e) => {
			switch(e.keyCode) {
				case 87: // w
					self.moving.up = false;
					break;
				case 68: // d
					self.moving.right = false;
					break;
				case 83: // s
					self.moving.down = false;
					break;
				case 65: // a
					self.moving.left = false;
					break;
			}
		});
		window.addEventListener('mousemove', (e) => {
			self.target.x = e.pageX - (this.width / 2);
			self.target.y = e.pageY - (this.height / 2);
		});
		window.addEventListener('mousedown', () => {
			let bullet = new Bullet(self.x, self.y, self.angle);
			bullet.fire(self, self.bullets.length);
		});
	}

	update() {
		if (this.moving.up && this.y >= 0) this.y -= 1 * this.speed;
		if (this.moving.right && this.x <= 800) this.x += 1 * this.speed;
		if (this.moving.down && this.y <= 600) this.y += 1 * this.speed;
		if (this.moving.left && this.x >= 0) this.x -= 1 * this.speed;
		let dx = this.target.x - (this.x - (this.width / 2));
		let dy = this.target.y - (this.y - (this.height / 2));
		this.angle = Math.atan2(dx, dy * -1);
		this.rot = (this.rot + 0.15) % (Math.PI * 2);
		this.hitbox.x = this.x - (this.hitbox.width / 2) + 
			(Math.cos(this.angle - (Math.PI / 2)) * (this.hitbox.width / 2 - 16));
		this.hitbox.y = this.y - (this.hitbox.width / 2) + 
			(Math.sin(this.angle - (Math.PI / 2)) * (this.hitbox.height / 2 - 16));
		if (this.health <= 0) {
			alert('Game Over\nFinal Score: ' + this.score);
			window.location.reload();
		}
	}
}
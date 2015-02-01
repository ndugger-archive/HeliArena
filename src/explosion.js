export class Explosion {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	init(explosions) {
		this.cache();
		explosions.push(this);
	}
	
	cache() {
		this.cached = document.createElement('canvas');
		this.cached.width = 40;
		this.cached.height = 40;
		let ctx = this.cached.getContext('2d');
		ctx.fillStyle = '#222';
		ctx.beginPath();
		ctx.arc(20, 20, 20, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	}
	
	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.cached, 0, 0, 40, 40);
		ctx.restore();
	}
}
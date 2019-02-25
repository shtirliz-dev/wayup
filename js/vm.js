window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var Ball = function(ball) {
	this.Init(ball);
};

Ball.prototype = {
	Init : function(ball) {
		this.root = ball;
		this.angle = 0.0;
		this.prevAngle = 0.0;
		this.timeout = 0.0;
		this.root.style.transformOrigin = "50% 0%";		
		var thiz = this;		
		this.root.onmouseover = function(event) {
			if(thiz.timeout > 0.0) {
				return;
			}			
			var rect = thiz.root.getBoundingClientRect();
			if(event.clientX < rect.x + rect.width / 2)	{
				thiz.angle -= 4.5;
			} else {
				thiz.angle += 4.5;
			}			
			thiz.timeout += 0.5;
		};
	},
	Update : function(delta) {
		var temp = this.angle;
		this.angle += this.angle - this.prevAngle;
		this.prevAngle = temp;
		this.root.style.webkitTransform = "rotateZ(" + this.angle + "deg)";		
		this.angle *= 0.92;		
		this.timeout = Math.max(0.0, this.timeout - 0.05);
	}
};

var Snowflake = function(x, y, angle, lifetime, img) {
	this.Init(x, y, angle, lifetime, img);
};

Snowflake.prototype = {
	Init : function(x, y, angle, lifetime, img) {
		if(this.container == null) {		
			this.container = document.getElementsByClassName("snow")[0];
			this.root = htmlToElement("<img src='" + img + "'>");
		}		
		this.root.style.position = "fixed";
		var rect = this.container.getBoundingClientRect();
		this.root.style.left = (this.x + rect.x) + 'px';
		this.root.style.top = (this.y + rect.y) + 'px';
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.angularVelocity = getRandom(-0.5, 0.5);
		this.linearVelocityX = 0.0;
		this.linearVelocityY = getRandom(1.0, 1.5);
		this.lifetime = lifetime;
		this.maxLifetime = lifetime;
		this.active = true;
		this.container.appendChild(this.root);
	},
	Update : function(delta) {
		this.lifetime -= delta;
		if(this.lifetime < 0.0) {
			this.active = false;
			this.lifetime = 0.0;
			this.container.removeChild(this.root);
			return;
		}
		var style = this.root.style;		
		style.opacity = this.lifetime / this.maxLifetime;
		if(style.opacity == 0.0) {
			return;
		}
		this.angle += this.angularVelocity;
		if(this.angle >= 360.0) {
			this.angle = 0.0;
		}		
		var rect = this.container.getBoundingClientRect();
		this.x += this.linearVelocityX + Math.sin(this.lifetime) * 0.75;
		this.y += this.linearVelocityY;
		style.webkitTransform = "rotateZ(" + this.angle + "deg)";
		style.left = (this.x + rect.x) + 'px';
		style.top = (this.y + rect.y) + 'px';
		style.opacity = this.lifetime / this.maxLifetime;
	}
};

var ExperimentalApplication = function() {
    this.Init();
};

ExperimentalApplication.prototype = {
	Init : function() {
		this.balls = [
			new Ball(document.getElementsByClassName("screen2-ball1")[0]),
			new Ball(document.getElementsByClassName("screen2-ball2")[0]),
			new Ball(document.getElementsByClassName("screen2-ball3")[0]),
			new Ball(document.getElementsByClassName("screen2-boot")[0]),
			new Ball(document.getElementsByClassName("screen2-surprise")[0]),
			new Ball(document.getElementsByClassName("screen2-rightpendent")[0]),
			new Ball(document.getElementsByClassName("screen2-leftpendent")[0])
		];
		this.snowflakes = [];
		this.snowflakesPool = [];
		this.timer = 0.0;
	},
	GenerateSnowflake : function() {
		var padding = document.body.clientWidth * 0.1;
		var textures = [
			"img/snow1.png",
			"img/snow2.png"
		];
		if(this.snowflakesPool.length == 0) {
			this.snowflakes.push(new Snowflake(
				getRandom(padding, document.body.clientWidth - padding), 
				-75.0, 
				getRandom(0.0, 360.0), 
				getRandom(5.0, 9.0), 
				textures[Math.floor(getRandom(0.0, 2.0))]
			));
		} else {
			var snowflake = this.snowflakesPool[0];
			this.snowflakesPool.splice(0, 1);
			snowflake.Init(getRandom(padding, document.body.clientWidth - padding), 
				-50.0, 
				getRandom(0.0, 360.0), 
				getRandom(4.0, 8.0), 
				textures[Math.floor(getRandom(0.0, 2.0))]
			);
			this.snowflakes.push(snowflake);
		}
	},
	Tick : function() {
		var delta = 1.0 / 60.0;
		for (var i = 0; i < this.balls.length; i++) {
			this.balls[i].Update(delta);
		}
		for (var i = 0; i < this.snowflakes.length; i++) {
			var snowflake = this.snowflakes[i];
			snowflake.Update(delta);
			if(snowflake.active == false) {
				this.snowflakesPool.push(snowflake);
				this.snowflakes.splice(i, 1);
				i--;
			}			
		}
		this.timer -= delta;
		if(this.timer <= 0.0) {
			this.GenerateSnowflake();
			this.timer = getRandom(0.35, 0.75);
		}
	}
};

var app = new ExperimentalApplication();

function run() {
    app.Tick();
    window.requestAnimFrame(run);
}

run();
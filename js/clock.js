var Clock = function() {
	this.init();
	
};

Clock.prototype.init = function () {
	this.resetClock();
};

Clock.prototype.startClock = function(updateCallback) {
	this.updateCallback = updateCallback;
	this.start = new Date().getTime();
	this.interval = window.setInterval(this.setup.bind(this));
};

Clock.prototype.pauseClock = function() {
	window.clearTimeout(this.interval);
};

Clock.prototype.resumeClock = function() {
	this.start = new Date().getTime();
	this.interval = window.setInterval(this.setup.bind(this));
};

Clock.prototype.resetClock = function() {
	this.elapsed = '0.0';
}

Clock.prototype.setup = function() {
	var time = new Date().getTime() - this.start;
	this.elapsed = Math.floor(time / 100) / 10;
	if(Math.round(this.elapsed) == this.elapsed) { this.elapsed += '.0'; }
	this.updateCallback();
};
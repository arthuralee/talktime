var app = {
	topics : [],
	total : 0,
	nextTopic : 0,
	timeRemain : 0,
	appClock : new Clock
};

app.init = function() {
	app.initEvents();
	$('#present').hide();
};

app.initEvents = function() {
	$('#add-form').submit(function(e) {
		e.preventDefault();
		app.addEntry($(this).serializeObject());
		return false;
	});
	$('#start').click(app.startPresentation);
	$('#advance').click(app.advance);
};

app.addEntry = function(entry) {
	var ss = app.stringToSs(entry.time);

	// update programmatic stuff
	app.topics.push({'name':entry.name, 'time':ss});
	app.total += ss;

	// add to UI table
	var newRow = $('<tr>');
	newRow.append($('<td>').html(entry.name));
	newRow.append($('<td>').html(entry.time));
	$('#topic-table').append(newRow);

	// update UI total
	$('#total').html(app.ssToString(app.total));

	// update UI form
	$('#add-form')[0].reset();
	$('#add-form input[name=name]').focus();
};

app.stringToSs = function(timeString) {
	// Parse seconds from mm:ss
	var ss = timeString.substr(-2,2);
	var mm = timeString.substr(-5,2);

	return mm*60 + Number(ss);
};

app.ssToString = function(ss) {
	// convert ss to mm:ss
	var mm = String(Math.floor(ss / 60));
	var ss = String(ss % 60);

	// append leading zeros
	if (mm.length == 1) mm = '0' + mm;
	if (ss.length == 1) ss = '0' + ss;

	// return string
	return mm + ':' + ss;
}

app.startPresentation = function() {
	$('#add-section').hide();
	$('#present').show();

	app.nextTopic = 0;
	app.timeRemain = app.total;

	$('#time-total').html(app.ssToString(app.total));
	$('#topic-next').html(app.topics[app.nextTopic].name);
	$('#time-topic').html(app.ssToString(app.topics[app.nextTopic].time));
	$('#time-total').html(app.ssToString(app.timeRemain));
}

app.advance = function () {
	if (app.nextTopic == 0) {
		app.appClock.startClock(app.onClockUpdate.bind(app));
	} else {

	}
};

app.onClockUpdate = function() {
	$('#time-total').html(app.appClock.elapsed);
};


$(document).ready(function() {
	app.init();
});


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
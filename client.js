$('document').ready(function () {
    function Timer(min, sec) {
        this.min = min;
        this.sec = sec;
        this.secondsRemaining = this.sec;
        this.minutesRemaining = this.min;
        this.pause = true;

        this.start = function () {
            var that = this;
            setInterval(function () {
                if (!that.pause) {
                    if (that.secondsRemaining > 0) {
                        that.secondsRemaining -= 1;
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining,'roundTimer');
                    } else if (that.minutesRemaining > 0) {
                        that.minutesRemaining -= 1;
                        that.secondsRemaining = 59;
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining,'roundTimer');
                    } else {
                        clearInterval();
                    }
                }
            }, 1000);
        };

        this.displayTimer = function (min,sec,timer) {
            var minutes = min.toString();
            var seconds = sec.toString();
            if (sec < 10) {
                seconds = '0' + seconds;
            }
            if (min < 10) {
                minutes = '0' + minutes;
            }
            $('#'+timer).find('.seconds').html(seconds);
            $('#'+timer).find('.minutes').html(minutes);
        };

        this.togglePause = function () {
            if (this.pause) {
                this.pause = false;
            } else {
                this.pause = true;
            }
        };

        this.displayTimer(min,sec,'roundTimer');
    }

    var roundTimer = new Timer(1, 10);

    roundTimer.start();

    $('#round-control').click(function () {
        roundTimer.togglePause();
    });



});
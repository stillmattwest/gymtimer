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
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining);
                    } else if (that.minutesRemaining > 0) {
                        that.minutesRemaining -= 1;
                        that.secondsRemaining = 59;
                        that.displayTimer(that.minutesRemaining,that.secondsRemaining);
                    }else{
                        clearInterval();
                    }
                }
            }, 1000);
        };

        this.displayTimer = function (min, sec) {
            var minutes = min.toString();
            var seconds = sec.toString();
            if (sec < 10) {
                seconds = '0' + seconds;
            }
            if (min < 10) {
                minutes = '0' + minutes;
            }
            $('#roundTimer').find('.seconds').html(seconds);
            $('#roundTimer').find('.minutes').html(minutes);
        };

        this.togglePause = function () {
            if (this.pause) {
                this.pause = false;
            } else {
                this.pause = true;
            }
        };

        this.displayTimer(min,sec);
    }

    var testTimer = new Timer(1, 10);

    testTimer.start();

    $('#round-control').click(function () {
        testTimer.togglePause();
    });



});
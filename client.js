$('document').ready(function () {
    function Timer(roundmin, roundsec, breakmin, breaksec, rounds) {
        this.min = roundmin;
        this.sec = roundsec;
        this.breakmin = breakmin;
        this.breaksec = breaksec;
        this.secondsRemaining = this.sec;
        this.minutesRemaining = this.min;
        this.breakMinRemaining = this.breakmin;
        this.breakSecRemaining = this.breaksec;
        this.rounds = rounds;
        this.roundsRemaining = rounds;
        this.pause = true;

        this.start = function () {
            var that = this;
            var timer = setInterval(function () {
                if (!that.pause) {
                    if (that.secondsRemaining > 0) {
                        that.secondsRemaining -= 1;
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining, 'roundTimer');
                    } else if (that.minutesRemaining > 0) {
                        that.minutesRemaining -= 1;
                        that.secondsRemaining = 59;
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining, 'roundTimer');
                    } else if (that.breakSecRemaining > 0) {
                        that.breakSecRemaining -= 1;
                        that.displayTimer(that.breakMinRemaining, that.breakSecRemaining, 'breakTimer');
                    } else if (that.breakMinRemaining > 0) {
                        that.breakMinRemaining -= 1;
                        that.breakSecRemaining = 59;
                        that.displayTimer(that.breakMinRemaining, that.breakSecRemaining, 'breakTimer');
                    } else if (that.roundsRemaining > 1) {
                        that.roundsRemaining -= 1;
                        that.minutesRemaining = that.min;
                        if (that.roundsRemaining > 2) {
                            that.breakMinRemaining = that.breakmin;
                            that.breakSecRemaining = that.breaksec;
                        }
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining, 'roundTimer');
                        that.displayTimer(that.breakMinRemaining, that.breakSecRemaining, 'breakTimer');
                        that.displayRounds(that.roundsRemaining);
                    } else {
                        that.roundsRemaining -= 1;
                        that.displayRounds(that.roundsRemaining);
                        clearInterval(timer);
                    }
                }
            }, 100);
        };

        this.displayTimer = function (min, sec, timer) {
            var minutes = min.toString();
            var seconds = sec.toString();
            if (sec < 10) {
                seconds = '0' + seconds;
            }
            $('#' + timer).find('.seconds').html(seconds);
            $('#' + timer).find('.minutes').html(minutes);
        };

        this.displayRounds = function (rounds) {
            var round = rounds.toString();
            if (round < 10) {
                round = '0' + round;
            }
            $('#roundDisplay').html(round)
        }

        this.togglePause = function () {
            if (this.pause) {
                this.pause = false;
            } else {
                this.pause = true;
            }
        };

        this.displayTimer(roundmin, roundsec, 'roundTimer');
        this.displayTimer(breakmin, breaksec, 'breakTimer');
        this.displayRounds(rounds);
    }

    // round length(min,sec)break length(min,sec)number of rounds
    var roundTimer = new Timer(1, 0, 1, 0, 2);

    roundTimer.start();

    // button handling

    $('#round-control').click(function () {
        roundTimer.togglePause();
    });

    $('.add30').click(function () {
        var timer = $(this).closest('div').attr('data');
        if (roundTimer.sec < 30) {
            roundTimer.sec = 30;
        } else {
            roundTimer.sec = 0;
            roundTimer.min++;
        }
        roundTimer.displayTimer(roundTimer.min, roundTimer.sec, timer);

    });

    $('.sub30').click(function () {
        var timer = $(this).closest('div').attr('data');
        if (roundTimer.sec === 30) {
            roundTimer.sec = 0;
        } else if (roundTimer.min > 0) {
            roundTimer.sec = 30;
            roundTimer.min--;
        }
        roundTimer.displayTimer(roundTimer.min, roundTimer.sec, timer);
    });





});
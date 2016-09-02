$('document').ready(function () {
    function Timer(roundmin, roundsec, breakmin, breaksec, rounds) {
        var min = roundmin;
        var sec = roundsec;
        var breakmin = breakmin;
        var breaksec = breaksec;
        var secondsRemaining = sec;
        var minutesRemaining = min;
        var breakMinRemaining = breakmin;
        var breakSecRemaining = breaksec;
        var rounds = rounds;
        var roundsRemaining = rounds;
        var pause = true;

        this.start = function () {
            var that = this;
            var timer = setInterval(function () {
                if (!pause) {
                    if (secondsRemaining > 0) {
                        secondsRemaining--;
                        that.displayTimer(minutesRemaining, secondsRemaining, 'roundTimer');
                    } else if (minutesRemaining > 0) {
                        minutesRemaining--;
                        secondsRemaining = 59;
                        that.displayTimer(minutesRemaining, secondsRemaining, 'roundTimer');
                    } else if (breakSecRemaining > 0) {
                        breakSecRemaining--;
                        that.displayTimer(breakMinRemaining, breakSecRemaining, 'breakTimer');
                    } else if (breakMinRemaining > 0) {
                        breakMinRemaining--;
                        breakSecRemaining = 59;
                        that.displayTimer(breakMinRemaining, breakSecRemaining, 'breakTimer');
                    } else if (roundsRemaining > 1) {
                        roundsRemaining--;
                        minutesRemaining = min;
                        secondsRemaining = sec;
                        if (roundsRemaining > 1) {
                            breakMinRemaining = breakmin;
                            breakSecRemaining = breaksec;
                        }
                        that.displayTimer(minutesRemaining, secondsRemaining, 'roundTimer');
                        that.displayTimer(breakMinRemaining, breakSecRemaining, 'breakTimer');
                        that.displayRounds(roundsRemaining);
                    } else {
                        roundsRemaining--;
                        that.displayRounds(roundsRemaining);
                        clearInterval(timer);
                    }
                }
            }, 100);
        };

        this.displayTimer = function (mins, secs, timer) {
            var minutes = mins.toString();
            var seconds = secs.toString();
            if (secs < 10) {
                seconds = '0' + seconds;
            }
            $('#' + timer).find('.seconds').html(seconds);
            $('#' + timer).find('.minutes').html(minutes);
        };

        this.displayRounds = function (round) {
            $('#roundDisplay').html(round)
        }

        this.go = function () {
            pause = false;
        };

        this.stop = function () {
            pause = true;
        }

        this.setRoundLength = function (mins, secs) {
            minutesRemaining = min;
            secondsRemaining = sec;
            min = mins;
            sec = secs;
        }

        this.setBreakLength = function (min, sec) {
            breakMinRemaining = min;
            breakSecRemaining = sec;
            breakmin = min;
            breaksec = sec;
        }

        this.setRounds = function (rounds) {
            roundsRemaining = rounds;
        }

        this.clearTimer = function () {
            clearInterval(this.timer);
        }

        this.resetDisplays = function () {
            this.displayTimer(0, 0, 'roundTimer');
            this.displayTimer(0, 0, 'breakTimer');
            this.displayRounds(0);
            this.displayTimer(0,0,'setRoundLength');
            this.displayTimer(0,0,'setBreakLength');
            $('#setRounds').html(0);
        }

        this.resetDisplays();
    } 

    // end Timer constructor

    // activate new Timer

    // parameters are: round length(min,sec)break length(min,sec)number of rounds
    var roundTimer = new Timer(0, 0, 0, 0, 0);

    roundTimer.start();

    // button handling

    $('#go-btn').click(function () {
        roundTimer.go();
    });

    $('#pause-btn').click(function () {
        roundTimer.stop();
    });


    $('.add30').click(function () {
        var timer = $(this).closest('div').attr('data');
        var link = $(this).closest('div').attr('data-link');
        var min = parseInt($('#' + timer).closest('div').find('.minutes').html());
        var sec = parseInt($('#' + timer).closest('div').find('.seconds').html());
        if (sec === 30) {
            sec = 0;
            min++;
        } else {
            sec = 30;
        }
        roundTimer.displayTimer(min, sec, timer);
        roundTimer.displayTimer(min, sec, link);
        roundTimer[timer](min, sec);

    });

    $('.sub30').click(function () {
        var timer = $(this).closest('div').attr('data');
        var link = $(this).closest('div').attr('data-link');
        var min = parseInt($('#' + timer).closest('div').find('.minutes').html());
        var sec = parseInt($('#' + timer).closest('div').find('.seconds').html());
        if (sec === 30) {
            sec = 0;
        } else {
            sec = 30;
            min--;
        }
        roundTimer.displayTimer(min, sec, timer);
        roundTimer.displayTimer(min, sec, link);
        roundTimer[timer](min, sec);
    });

    $('.changeRounds').click(function () {
        var op = $(this).attr('data');
        var rounds = parseInt($('#setRounds').html());
        if (op === 'add') {
            rounds++;
        } else {
            if (rounds > 0) {
                rounds--;
            }
        }
        $('#setRounds').html(rounds);
        roundTimer.setRounds(rounds);
        roundTimer.displayRounds(rounds);
    });

    $('#reset-btn').click(function () {
        roundTimer.setRoundLength(0);
        roundTimer.setBreakLength(0);
        roundTimer.setRounds(0);
        roundTimer.stop();
        roundTimer.clearTimer();
        roundTimer.resetDisplays();
    });





});
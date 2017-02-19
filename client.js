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
        var currentRound = 1;
        var pause = true;
        var finished = false;

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
                    } else if (currentRound < rounds) {
                        currentRound++;
                        minutesRemaining = min;
                        secondsRemaining = sec;
                        breakMinRemaining = breakmin;
                        breakSecRemaining = breaksec;
                        if (currentRound === rounds) {
                            breakMinRemaining = 0;
                            breakSecRemaining = 0;
                        }
                        that.displayTimer(minutesRemaining, secondsRemaining, 'roundTimer');
                        that.displayTimer(breakMinRemaining, breakSecRemaining, 'breakTimer');
                        that.displayRounds(currentRound);
                    } else {
                        lightswitch('redlight');
                        lightswitch('greenlight');
                        finished = true;
                        clearInterval(timer);
                    }
                }
            }, 1000);
        };

        this.isPaused = function () {
            return pause;
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
            if (finished === false) {
                lightswitch('greenlight');
            }
            if (secondsRemaining !== sec) {
                lightswitch('orangelight');
            }
            pause = false;
        };

        this.stop = function () {
            if (finished === false) {
                lightswitch('orangelight');
            }
            if (secondsRemaining !== sec && finished === false) {
                lightswitch('greenlight');
            }
            pause = true;
        }

        this.setRoundLength = function (mins, secs) {
            minutesRemaining = mins;
            secondsRemaining = secs;
            min = mins;
            sec = secs;
        }

        this.setBreakLength = function (min, sec) {
            breakMinRemaining = min;
            breakSecRemaining = sec;
            breakmin = min;
            breaksec = sec;
        }

        this.setRounds = function (_rounds) {
            rounds = _rounds;
        }

        this.clearTimer = function () {
            clearInterval(this.timer);
        }

        this.reset = function () {
            this.displayTimer(0, 0, 'roundTimer');
            this.displayTimer(0, 0, 'breakTimer');
            this.displayRounds(1);
            this.displayTimer(0, 0, 'setRoundLength');
            this.displayTimer(0, 0, 'setBreakLength');
            $('#setRounds').html(1);
            finished = false;
        }

        this.reset();
    }

    // end Timer constructor

    // activate new Timer

    // parameters are: round length(min,sec)break length(min,sec)number of rounds
    var roundTimer = new Timer(0, 0, 0, 0, 1);

    roundTimer.start();

    // light functions

    function lightswitch(id) {
        var lightoff = id + '-off';
        var lighton = id + '-on';
        $('#' + id).toggleClass(lightoff);
        $('#' + id).toggleClass(lighton);
    }

    function allOff() {
        $('#greenlight').removeClass('greenlight-on');
        $('#greenlight').addClass('greenlight-off');
        $('#orangelight').removeClass('orangelight-on');
        $('#orangelight').addClass('orangelight-off');
        $('#redlight').removeClass('redlight-on');
        $('#redlight').addClass('redlight-off');
    }

    // button handling

    $('#go-btn').click(function () {
        if (roundTimer.isPaused()) {
            roundTimer.go();
        }
    });

    $('#pause-btn').click(function () {
        if (!roundTimer.isPaused()) {
            roundTimer.stop();
        }
    });


    $('.add30').click(function () {
        var timer = $(this).closest('div').attr('data');
        var link = $(this).closest('div').attr('data-link');
        var mins = parseInt($('#' + timer).closest('div').find('.minutes').html());
        var secs = parseInt($('#' + timer).closest('div').find('.seconds').html());
        if (secs === 30) {
            secs = 0;
            mins++;
        } else {
            secs = 30;
        }
        roundTimer.displayTimer(mins, secs, timer);
        roundTimer.displayTimer(mins, secs, link);
        roundTimer[timer](mins, secs);
    });

    $('.sub30').click(function () {
        var timer = $(this).closest('div').attr('data');
        var link = $(this).closest('div').attr('data-link');
        var mins = parseInt($('#' + timer).closest('div').find('.minutes').html());
        var secs = parseInt($('#' + timer).closest('div').find('.seconds').html());
        if (mins === 0 && secs === 0) {
            return;
        }
        if (secs === 30) {
            secs = 0;
        } else {
            secs = 30;
            mins--;
        }
        roundTimer.displayTimer(mins, secs, timer);
        roundTimer.displayTimer(mins, secs, link);
        roundTimer[timer](mins, secs);
    });

    $('.changeRounds').click(function () {
        var op = $(this).attr('data');
        var rounds = parseInt($('#setRounds').html());
        if (op === 'add') {
            rounds++;
        } else {
            if (rounds > 1) {
                rounds--;
            }
        }
        $('#setRounds').html(rounds);
        roundTimer.setRounds(rounds);

    });

    $('#reset-btn').click(function () {
        roundTimer.setRoundLength(0);
        roundTimer.setBreakLength(0);
        roundTimer.setRounds(1);
        roundTimer.stop();
        roundTimer.clearTimer();
        roundTimer.reset();
        roundTimer.start();
        allOff();
    });

});
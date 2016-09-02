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
                        that.secondsRemaining--;
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining, 'roundTimer');
                    } else if (that.minutesRemaining > 0) {
                        that.minutesRemaining--;
                        that.secondsRemaining = 59;
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining, 'roundTimer');
                    } else if (that.breakSecRemaining > 0) {
                        that.breakSecRemaining--;
                        that.displayTimer(that.breakMinRemaining, that.breakSecRemaining, 'breakTimer');
                    } else if (that.breakMinRemaining > 0) {
                        that.breakMinRemaining--;
                        that.breakSecRemaining = 59;
                        that.displayTimer(that.breakMinRemaining, that.breakSecRemaining, 'breakTimer');
                    } else if (that.roundsRemaining > 1) {
                        that.roundsRemaining--;
                        that.minutesRemaining = that.min;
                        that.secondsRemaining = that.sec;
                        if (that.roundsRemaining > 2) {
                            that.breakMinRemaining = that.breakmin;
                            that.breakSecRemaining = that.breaksec;
                        }
                        that.displayTimer(that.minutesRemaining, that.secondsRemaining, 'roundTimer');
                        that.displayTimer(that.breakMinRemaining, that.breakSecRemaining, 'breakTimer');
                        that.displayRounds(that.roundsRemaining);
                    } else {
                        that.roundsRemaining--;
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

        this.displayRounds = function (round) {
            $('#roundDisplay').html(round)
        }

        this.togglePause = function () {
            if (this.pause) {
                this.pause = false;
            } else {
                this.pause = true;
            }
        };

        this.setRoundLength = function (min, sec) {
            this.minutesRemaining = min;
            this.secondsRemaining = sec;
            this.min = min;
            this.sec = sec;
        }

        this.setBreakLength = function (min, sec) {
            this.breakMinRemaining = min;
            this.breakSecRemaining = sec;
            this.breakmin = min;
            this.breaksec = sec;
        }

        this.setRounds = function (rounds) {
            this.roundsRemaining = rounds;
        }

        this.displayTimer(roundmin, roundsec, 'roundTimer');
        this.displayTimer(breakmin, breaksec, 'breakTimer');
        this.displayRounds(rounds);
    }

    // round length(min,sec)break length(min,sec)number of rounds
    var roundTimer = new Timer(0, 0, 0, 0, 0);

    roundTimer.start();

    // button handling

    $('#round-control').click(function () {
        roundTimer.togglePause();
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
        roundTimer[timer](min, sec)

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





});
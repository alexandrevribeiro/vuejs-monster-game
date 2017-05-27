new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.reset();
            this.gameIsRunning = true;            
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;;
            this.logTurn(true, 'Player hits Monster for ' + damage);

            if (this.checkWin())
                return;

            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(20, 20);
            this.monsterHealth -=  damage;
            this.logTurn(true, 'Player hits Monster hard for ' + damage);

            if (this.checkWin())
                return;
            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 10) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.logTurn(true, 'Player heals for 10');
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.reset();
        },
        reset: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -=  damage;
            this.logTurn(false, 'Monster hits Player for ' + damage);
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);         
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.giveUp();
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.giveUp();
                }
                return true;
            }
            return false;
        },
        logTurn: function(isPlayer, text) {            
            this.turns.unshift({
                isPlayer: isPlayer,
                text: text
            });
        }
    }
});
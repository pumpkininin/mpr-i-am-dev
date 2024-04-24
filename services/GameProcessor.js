class GameProcessor {
    constructor() {
        if (GameProcessor.instance) {
            return GameProcessor.instance;
        }

        // Initialize any necessary properties
        this.players = [];
        this.events = [];

        GameProcessor.instance = this;
    }

    // Method to add a player to the game
    addPlayer(player) {
        this.players.push(player);
    }

    // Method to remove a player from the game
    removePlayer(player) {
        this.players = this.players.filter(p => p !== player);
    }

    // Method to add an event to the game
    addEvent(event) {
        this.events.push(event);
    }

    // Method to remove an event from the game
    removeEvent(event) {
        this.events = this.events.filter(e => e !== event);
    }

    // Other game processing methods can be added here

    // Example method to process events
    processEvents() {
        this.events.forEach(event => {
            // Process each event
            console.log(`Processing event: ${event.name}`);
        });
    }
}

// Singleton instance
const gameProcessor = new GameProcessor();
Object.freeze(gameProcessor);

// Usage
gameProcessor.addPlayer(player1);
gameProcessor.addPlayer(player2);

gameProcessor.addEvent(event1);
gameProcessor.addEvent(event2);

gameProcessor.processEvents();

import 'react-native-get-random-values';

class Character {
    constructor(id, name, gender, age = 0, health = 100, skill = [], inventory = [], relationship = [], lastAccessed = new Date()) {
        this._id = id;
        this._name = name;
        this._gender = gender;
        this._age = age;
        this._health = health;
        this._skill = skill;
        this._inventory = inventory;
        this._relationship = relationship;
        this._lastAccessed = lastAccessed;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get health() {
        return this._health;
    }

    set health(value) {
        this._health = value;
    }

    get skill() {
        return this._skill;
    }

    set skill(value) {
        this._skill = value;
    }

    get inventory() {
        return this._inventory;
    }

    set inventory(value) {
        this._inventory = value;
    }

    get relationship() {
        return this._relationship;
    }

    set relationship(value) {
        this._relationship = value;
    }

    get lastAccessed() {
        return this._lastAccessed;
    }

    set lastAccessed(value) {
        this._lastAccessed = value;
    }
}

const characterConverter = {
    toFirestore: (character) => {
        return {
            id: character.id,
            name: character.name,
            gender: character.gender,
            age: character.age,
            health: character.health,
            skill: character.skill,
            inventory: character.inventory,
            relationship: character.relationship,
            lastAccessed: character.lastAccessed,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Character(data.id, data.name, data.gender, data.age, data.health, data.skill, data.inventory, data.relationship, data.lastAccessed);
    }
}
export {characterConverter};
export default Character;
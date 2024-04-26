import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class Character {
    constructor(id, name, gender, age = 0, health = 100, skill = [], inventory = [], relationship = []) {
        const uuid = uuidv4();
        this._id = uuid;
        this._name = name;
        this._gender = gender;
        this._age = age;
        this._health = health;
        this._skill = skill;
        this._inventory = inventory;
        this._relationship = relationship;
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
}

export default Character;
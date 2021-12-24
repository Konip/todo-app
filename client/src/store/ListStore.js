import {makeAutoObservable} from "mobx";

export default class ListStore {
    constructor() {
        this._lists =[]

        makeAutoObservable(this)
    }

    setLists(lists) {
        this._lists = lists
    }

    get lists() {
        return this._lists
    }
}
import {makeAutoObservable} from "mobx";

export default class ListStore {
    constructor() {
        this._lists =[]
        this._activeList = {}
        makeAutoObservable(this)
    }

    setLists(lists) {
        this._lists = lists
    }

    setActiveList(list) {
        this._activeList = list
    }

    setActiveItem(listId) {
        let [id, name, color, tasks]= this._lists.filter(el => el.id === listId)
        this.setActiveList(id, name, color, tasks)
    }

    get lists() {
        return this._lists
    }

    get activeList() {
        return this._activeList
    }
}
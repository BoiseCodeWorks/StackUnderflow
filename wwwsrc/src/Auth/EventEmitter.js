export class EventEmitter {
  /**
   *
   * @param {string} event
   * @param {function} fn
   */
  subscribe(event, fn) {
    try {
      this.events[event] = this.events[event] || {};
      let id = this._generateId();
      let subscriber = { id, fn };
      this.events[event][id] = subscriber;
      return id;
    }
    catch (e) {
      console.error(e);
    }
  }
  notify(event) {
    Object.keys(this.events[event] || {}).forEach(id => {
      try {
        this.events[event][id].fn(...arguments);
      }
      catch (e) {
        console.error(e, "removing subscriber");
        this.remove(event, id);
      }
    });
  }
  remove(event, id) {
    try {
      delete this.events[event][id];
    }
    catch (e) { }
  }
  _generateId() {
    return `${(Math.floor(Math.random()) * 8)}-${(Math.floor(Math.random()) * 8)}`;
  }

  constructor() {
    this.events = {}
  }
}

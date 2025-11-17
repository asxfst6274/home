export default class Button {
  _inputs;
  _btn;
  count = 0;

  constructor(propertyObj) {
    this._btn = document.getElementById(propertyObj.elementId);
    this._inputs = propertyObj.stores;
    this._onEntry = propertyObj.onEntry ? propertyObj.onEntry : () => {};
    this._onClick = propertyObj.onClick ? propertyObj.onClick : () => {};
    this.checkTime = propertyObj.checkTime;
    this.stores = this._inputs.length;

    this._updateEvent = new CustomEvent("custom:update");
  }

  update() {
    this._btn.dispatchEvent(this._updateEvent);
  }

  check(e) {
    this._onEntry(this.valid(), e, this);
  }

  valid() {
    return this._inputs.every((inputObject) => {
      if (Array.isArray(inputObject)) return inputObject[1];
      return inputObject.valid === true;
    });
  }

  isValid(key) {
    const valid = this._inputs.filter(
      (input) => Array.isArray(input) && input[0] === key
    )[0][1].valid;

    return valid;
  }

  addHandlerUpdate(handler) {
    this._btn.addEventListener("custom:update", (e) => {
      handler(e);
    });
  }

  addHandlerClick(handler) {
    this._btn.addEventListener("click", (e) => {
      handler(e);
    });
  }
}

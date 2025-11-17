import ParentForm from "./parentForm.js";

export default class Input extends ParentForm {
  _timer = true;

  constructor(propertyObj) {
    super(propertyObj);

    this._inputElement = this._parentElement.querySelector("input")
      ? this._parentElement.querySelector("input")
      : this._parentElement.querySelector("textarea");
    this.onKeyupHandler();
  }

  onKeyupHandler() {
    this._inputElement.addEventListener("keyup", (e) => {
      this._delay(e);
      if (this._timer)
        setTimeout(() => {
          this._update(this._inputElement.value, e, () => {
            this._nextInputs(e);
          });
          this._timer = true;
        }, this.checkTime);
      this._timer = false;
    });
  }

  _delay(e) {
    this.loading(e, this._parentElement);
  }
}

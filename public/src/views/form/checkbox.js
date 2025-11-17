import ParentForm from "./parentForm.js";

export default class Checkbox extends ParentForm {
  constructor(propertyObj) {
    super(propertyObj);
    this._inputElement = this._parentElement.querySelector("input");
    this.onChangeHandler();
  }

  onChangeHandler() {
    this._inputElement.addEventListener("change", (e) => {
      this._update(this._inputElement.checked, e, () => {
        this._nextInputs(e);
      });
    });
  }
}

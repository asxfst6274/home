import ParentForm from "./parentForm.js";

export default class DateInput extends ParentForm {
  constructor(propertyObj) {
    super(propertyObj);
    this._inputElement = this._parentElement.querySelector("input");
    this.onChangeHandler();
  }

  onChangeHandler() {
    this._inputElement.addEventListener("change", (e) => {
      this._update(this._inputElement.value, e, () => {
        this._nextInputs(e);
      });
    });
  }
}

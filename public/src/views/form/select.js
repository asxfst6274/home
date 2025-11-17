import ParentForm from "./parentForm.js";

export default class Select extends ParentForm {
  constructor(propertyObj) {
    super(propertyObj);
    this._inputElement = this._parentElement.querySelector("select")
      ? this._parentElement.querySelector("select")
      : this._parentElement;
    this.onChangeHandler();
  }

  onChangeHandler() {
    if (this.niceSelect) {
      const input = $(`#${this.parentId}`).find("select")
        ? $(`#${this.parentId}`).find("select")
        : $(`#${this.parentId}`);
      input.on("change", (e) => {
        this._update(this._inputElement.value, e, () => {
          this._nextInputs(e);
        });
      });
      return;
    }

    this._inputElement.addEventListener("change", (e) => {
      this._update(this._inputElement.value, e, () => {
        this._nextInputs(e);
      });
    });
  }
}

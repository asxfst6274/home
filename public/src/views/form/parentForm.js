export default class ParentForm {
  instantUpdate = false;

  constructor(propertyObj) {
    this.parentId = propertyObj.parentId;
    this._varName = propertyObj.store;
    this._parentElement = document.getElementById(propertyObj.parentId);
    this._reset = propertyObj.reset ? propertyObj.reset : () => {};
    this.btn = propertyObj.button;
    this.nextInputsArr = propertyObj.dependance;
    this.custom = propertyObj.rules ? propertyObj.rules : () => {};
    this.showMessage = propertyObj.format ? propertyObj.format : () => {};
    this.niceSelect = propertyObj.niceSelect;
    this.loading = propertyObj.loading ? propertyObj.loading : () => {};
    this.checkTime = propertyObj.checkTime
      ? propertyObj.checkTime
      : this.btn?.checkTime
      ? this.btn?.checkTime
      : 500;

    if (Array.isArray(this.btn)) {
      this.btn?.forEach((btn) => {
        btn?.addHandlerClick(this.controlBtnClick.bind(this));
        btn?.addHandlerUpdate(this.controlBtnUpdate.bind(this));
      });
    } else {
      this.btn?.addHandlerClick(this.controlBtnClick.bind(this));
      this.btn?.addHandlerUpdate(this.controlBtnUpdate.bind(this));
    }
  }

  reset() {
    this.instantUpdate = false;
    this._reset(this._parentElement);
  }

  _nextInputs(e) {
    this.instantUpdate = true;
    if (this.nextInputsArr && this.nextInputsArr.length) {
      this.nextInputsArr.forEach((nextInput, i, arr) => {
        if (typeof nextInput !== "object") return;
        const nextParam = arr[i + 1];
        if (nextParam && typeof nextParam !== "object")
          nextInput.instantUpdate = true;
        if (!nextInput.instantUpdate) return;
        switch (nextInput._inputElement.type) {
          case "checkbox":
            nextInput._update(nextInput._inputElement.checked, e, () => {});
            break;
          default:
            nextInput._update(nextInput._inputElement.value, e, () => {});
            break;
        }
      });
    }
    if (Array.isArray(this.btn)) {
      this.btn.forEach((btn) => {
        btn?.check(e);
      });
    } else {
      this.btn?.check(e);
    }
  }

  controlBtnClick(e) {
    switch (this._inputElement.type) {
      case "checkbox":
        this._update(
          this._inputElement.checked,
          e,
          this.allowOneClick.bind(this, e)
        );
        break;
      default:
        this._update(
          this._inputElement.value,
          e,
          this.allowOneClick.bind(this, e)
        );
        break;
    }
  }

  controlBtnUpdate(e) {
    switch (this._inputElement.type) {
      case "checkbox":
        this._update(this._inputElement.checked, e, () => {});
        break;
      default:
        this._update(this._inputElement.value, e, () => {});
        break;
    }
  }

  allowOneClick(e) {
    if (Array.isArray(this.btn)) {
      this.btn.map((btn) => {
        if (e.target !== btn._btn) return;
        if (btn.count < btn.stores) btn.count++;
        if (btn.count === btn.stores) btn._onClick(btn.valid(), e, btn);
        if (btn.count >= btn.stores) btn.count = 0;
      });
      return;
    }
    if (this.btn.count < this.btn.stores) this.btn.count++;
    if (this.btn.count === this.btn.stores)
      this.btn._onClick(this.btn.valid(), e, this.btn);
    if (this.btn.count >= this.btn.stores) this.btn.count = 0;
  }

  _update(value, e, done) {
    this._varName ? (this._varName.value = value) : null;
    this.custom.length
      ? this.custom(
          value,
          (valid, message) => {
            this._varName.valid = valid;
            this.showMessage(valid, message, e, this._parentElement);
            done();
          },
          this._inputElement
        )
      : done();
  }
}

const SELECT_PLAN_FORM = `
<div class="calculator-inner">
    <div class="single-cal">
        <div class="inner-form">
            <form action="#">
                <div class="tw-flex tw-gap-10 justify-content-center mb-3">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="invest_from" id="from_main" value="main" checked>
                      <label class="form-check-label" for="from_main">
                        <p class="tw-font-semibold">Main Bal: <span class="user_balance"></span></p>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="invest_from" id="from_bonus" value="bonus">
                      <label class="form-check-label" for="from_bonus">
                        <p class="tw-font-semibold">Bonus Bal: <span class="user_bonus"></span></p>
                      </label>
                    </div>
                </div>
                <input type="number" class="form-input w-100" placeholder="0" id="amount_to_invest" />
                <div class="tw-flex tw-gap-10">
                    <p class="tw-font-semibold">Min: <span id="selected_plan_min"></span></p>
                    <p class="tw-font-semibold">Max: <span id="selected_plan_max"></span></p>
                </div>
            </form>
        </div>
        <button class="cale-btn disabled:tw-opacity-30" id="procced-select-plan-btn" disabled>Invest</button>
    </div>
</div>`;

const CONFIRM_PASS_FORM = `
<div class="calculator-inner">
    <div class="single-cal">
        <div class="inner-form">
            <form action="#">
                <p class="text-danger text-center" id="pass_pin_msg"></p>
                <div class="d-flex tw-gap-5">
                    <input type="password" class="form-input pin-inputs w-100" placeholder="Your Password" id="pass_pin" />
                </div>
            </form>
        </div>
        <button class="cale-btn disabled:tw-opacity-30" id="pass-pin-btn">Continue</button>
    </div>
</div>`;

const CHANGE_PIN_FORM = `
<div class="calculator-inner">
    <div class="single-cal">
        <div class="inner-form">
            <form action="#">
                <p class="text-success text-center" id="pin_success_msg"></p>
                <p class="text-danger text-center" id="pin_error_msg"></p>
                <div class="d-flex tw-gap-5">
                    <input type="tel" maxlength="1" class="form-input pin-inputs" placeholder="*" id="pin1" />
                    <input type="tel" maxlength="1" class="form-input pin-inputs" placeholder="*" id="pin2" />
                    <input type="tel" maxlength="1" class="form-input pin-inputs" placeholder="*" id="pin3" />
                    <input type="tel" maxlength="1" class="form-input pin-inputs" placeholder="*" id="pin4" />
                </div>
            </form>
        </div>
        <button class="cale-btn disabled:tw-opacity-30" id="save-pin-btn" disabled>Save</button>
    </div>
</div>`;

const CONFIRM_WITHDRAWAL = `
<div class="calculator-inner">
    <div class="single-cal">
        <div class="inner-form">
            <form action="#">
                <p class="tw-font-semibold">Coin</p>
                <input type="text" class="form-input w-100 input_coin" disabled/>
                <p class="tw-font-semibold">Wallet Address</p>
                <input type="text" class="form-input w-100 input_wallet" disabled/>
                <p class="tw-font-semibold">Amount</p>
                <input type="text" class="form-input w-100 input_amount" disabled/>
            </form>
        </div>
        <button class="cale-btn disabled:tw-opacity-30" id="confirm_withdraw_btn">Confirm</button>
    </div>
</div>`;

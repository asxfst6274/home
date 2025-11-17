"use strick";

function modalEle(
  id,
  title = "Modal Tittle",
  content = "...",
  footer = true,
  confirmBtn = "Ok",
  type = null
) {
  return `
  <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${id}Title"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="toggle-modal" data-toggle="modal" data-target="#${id}"></div>
        <div class="hide-modal" data-dismiss="modal"></div>
        <div class="modal-content tw-bg-blueDark">
            <div class="modal-header tw-border-dark tw-border-b-2">
                <h5 class="modal-title" id="exampleModalLongTitle">${title}</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer tw-border-dark tw-border-t-2 ${
              footer ? "" : "d-none"
            }">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn text-white tw-bg-pink tw-border-pink modal-confirm">${confirmBtn}</button>
            </div>
        </div>
    </div>
</div>`;
}

function successModalEle(
  id,
  button = "View Status",
  href = "javascript:void(0)"
) {
  return `
    <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${id}Title"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="toggle-modal" data-toggle="modal" data-target="#${id}"></div>
          <div class="hide-modal" data-dismiss="modal"></div>
          <div class="modal-content text-center tw-bg-blueDark p-5 rounded">
        
          <span class="material-icons tw-text-[5rem] tw-text-purple">
          check_circle
          </span>
          <p class="tw-font-semibold mb-2">successful</p>
          <div class="userboard-btn">
          <a class="user-btn tw-font-normal color-btn mr-0" href="javascript:void(0)" data-dismiss="modal">Close</a>
          <a class="user-btn tw-font-normal coin-btn ml-1" href="${href}">${button}</a> 
           </div>
          </div>
      </div>
  </div>`;
}

function loadingModalEle(
  id,
  button = "View Status",
  href = "javascript:void(0)"
) {
  return `
    <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${id}Title"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="toggle-modal" data-toggle="modal" data-target="#${id}"></div>
          <div class="hide-modal" data-dismiss="modal"></div>
          <div class="modal-content text-center tw-bg-blueDark p-5 rounded">
        
          <span class="material-icons tw-text-[5rem] tw-text-purple">
          check_circle
          </span>
          <p class="tw-font-semibold mb-2">successful</p>
          <div class="userboard-btn">
          <a class="user-btn tw-font-normal color-btn mr-0" href="javascript:void(0)" data-dismiss="modal">Close</a>
          <a class="user-btn tw-font-normal coin-btn ml-1" href="${href}">${button}</a> 
           </div>
          </div>
      </div>
  </div>`;
}

function addMoney() {
  return `
  <div class="calculator-inner">
    <div class="single-cal">
        <div class="inner-form">
            <form action="#">
                <input type="number" id="add_money_amount" class="form-input w-100" placeholder="0" />
            </form>
        </div>
        <button class="cale-btn procced-select-plan-btn action_add_btn disabled:tw-opacity-30" id="add_to_main" disabled>Add to Main Balance</button>
        <button class="cale-btn procced-select-plan-btn action_add_btn disabled:tw-opacity-30" id="add_to_bonus" disabled>Add to Bonus Balance</button>
    </div>
</div>`;
}

function removeMoney() {
  return `
  <div class="calculator-inner">
    <div class="single-cal">
        <div class="inner-form">
            <form action="#">
                <input type="number" id="remove_money_amount" class="form-input w-100" placeholder="0" />
            </form>
        </div>
        <button class="cale-btn procced-select-plan-btn action_remove_btn disabled:tw-opacity-30" id="remove_from_main" disabled>Remove from Main Balance</button>
        <button class="cale-btn procced-select-plan-btn action_remove_btn disabled:tw-opacity-30" id="remove_from_bonus" disabled>Remove from Bonus Balance</button>
    </div>
</div>`;
}

function userDepositTable(date, amount, coin, status) {
  const statusColor =
    status === "pending"
      ? "primary"
      : status === "approved"
      ? "success"
      : "danger";
  return `
    <tr>
        <td>${date}</td>
        <td>${DOLLAR.format(amount)}</td>
        <td>${coin}</td>
        <td><span class="badge badge-${statusColor}">${status}</span></td>
    </tr>
    `;
}

function allUserDepositTable(id, date, username, amount, coin, wallet, status) {
  const statusColor =
    status === "pending"
      ? "primary"
      : status === "approved"
      ? "success"
      : "danger";
  return `
    <tr>
        <td>${FORMAT_DATE(date)}</td>
        <td>${username}</td>
        <td>${coin}</td>
        <td>${wallet}</td>
        <td>${DOLLAR.format(amount)}</td>
        <td><span class="badge badge-${statusColor}">${status}</span></td>
        <td>
        <div class="d-flex tw-gap-2">
            <button id="${id}" class="btn btn-primary approve-deposit disabled:tw-opacity-30" ${
    status === "pending" ? "" : "disabled"
  }>Confirm</button>
            <button id="${id}" class="btn btn-warning cancel-deposit disabled:tw-opacity-30" ${
    status === "pending" ? "" : "disabled"
  }>Cancel</button>
        </div>
      </td>
    </tr>
    `;
}

function allUserWithdrawalTable(
  id,
  date,
  username,
  amount,
  coin,
  wallet,
  status
) {
  const statusColor =
    status === "pending"
      ? "primary"
      : status === "approved"
      ? "success"
      : "danger";
  return `
    <tr>
        <td>${FORMAT_DATE(date)}</td>
        <td>${username}</td>
        <td>${coin}</td>
        <td>${wallet}</td>
        <td>${DOLLAR.format(amount)}</td>
        <td><span class="badge badge-${statusColor}">${status}</span></td>
        <td>
        <div class="d-flex tw-gap-2">
        <button id="${id}" class="btn btn-primary approve-withdrawal disabled:tw-opacity-30" ${
    status === "pending" ? "" : "disabled"
  }>Confirm</button>
                  <button id="${id}" class="btn btn-warning cancel-withdrawal disabled:tw-opacity-30" ${
    status === "pending" ? "" : "disabled"
  }>Cancel</button>
        </div>
      </td>
    </tr>
    `;
}

function userWithdrawalTable(date, amount, coin, walletId, status) {
  const statusColor =
    status === "pending"
      ? "primary"
      : status === "approved"
      ? "success"
      : "danger";
  return `
    <tr>
        <td>${date}</td>
        <td>${DOLLAR.format(amount)}</td>
        <td>${coin}</td>
        <td>${walletId}</td>
        <td><span class="badge badge-${statusColor}">${status}</span></td>
    </tr>
    `;
}

function investmentPackages(
  package,
  id,
  title,
  min,
  max,
  retrn,
  fee,
  period,
  length,
  description
) {
  const color1 =
    package === "premium"
      ? "gold"
      : package === "standard"
      ? "silver"
      : "bronze";
  const color2 =
    package === "premium"
      ? "gold2"
      : package === "standard"
      ? "silver2"
      : "bronze1";
  return `
  <div class="tw-flex tw-flex-col tw-items-center">
      <div
          class="price-box-inner mb-0 bg-svg rounded tw-bg-blueDark tw-cursor-pointer w-100">
          <div class="invest-tumb">
              <img src="../img/icon/d1.png" alt="">
          </div>
          <h5 class="tw-text-lg ${color1} text-capitalize">${title}</h5>
          <div class="table-responsive">
              <table class="table table-borderless text-white tableInfo">
                  <tr>
                      <td>Investment range</td>
                      <td>:</td>
                      <td>${DOLLAR.format(min)} - ${DOLLAR.format(max)}</td>
                  </tr>
                  <tr>
                      <td>Returns</td>
                      <td>:</td>
                      <td>${retrn}% Profit daily</td>
                  </tr>
                  <tr>
                      <td>Entry Fee</td>
                      <td>:</td>
                      <td>${DOLLAR.format(fee)}</td>
                  </tr>
                  <tr>
                      <td>Package description</td>
                      <td>:</td>
                      <td>${description}</td>
                  </tr>
                  <tr>
                      <td>Duration</td>
                      <td>:</td>
                      <td>${length} ${period}</td>
                  </tr>
              </table>
          </div>
          <div class="p-2 pb-4">
              <a href="javascript:void(0)" id="${id}"
                  class="select-plan-btn top-btn coin-btn coin-btn-${color1} tw-font-normal w-100 long-btn hover:tw-text-${color2}">Select
                  plan</a>
          </div>
      </div>
  </div>
  `;
}

function managePackages(
  package,
  id,
  title,
  min,
  max,
  retrn,
  fee,
  period,
  length,
  description
) {
  const color1 =
    package === "premium"
      ? "gold"
      : package === "standard"
      ? "silver"
      : "bronze";
  const color2 =
    package === "premium"
      ? "gold2"
      : package === "standard"
      ? "silver2"
      : "bronze1";
  return `
  <div class="tw-flex tw-flex-col tw-items-center">
      <div
          class="price-box-inner mb-0 bg-svg rounded tw-bg-blueDark tw-cursor-pointer w-100">
          <div class="invest-tumb">
              <img src="../img/icon/d1.png" alt="">
          </div>
          <h5 class="tw-text-lg ${color1} text-capitalize">${title}</h5>
          <div class="table-responsive">
              <table class="table table-borderless text-white tableInfo">
                  <tr>
                      <td>Investment range</td>
                      <td>:</td>
                      <td>${DOLLAR.format(min)} - ${DOLLAR.format(max)}</td>
                  </tr>
                  <tr>
                      <td>Returns</td>
                      <td>:</td>
                      <td>${retrn}% Profit daily</td>
                  </tr>
                  <tr>
                      <td>Entry Fee</td>
                      <td>:</td>
                      <td>${DOLLAR.format(fee)}</td>
                  </tr>
                  <tr>
                      <td>Package description</td>
                      <td>:</td>
                      <td>${description}</td>
                  </tr>
                  <tr>
                      <td>Duration</td>
                      <td>:</td>
                      <td>${length} ${period}</td>
                  </tr>
              </table>
          </div>
          <div class="p-2 pb-4">
              <a href="javascript:void(0)" id="${id}"
                  class="edit-plan-btn top-btn coin-btn coin-btn-${color1} tw-font-normal w-100 long-btn hover:tw-text-${color2}">Edit plan</a>
          </div>
      </div>
  </div>
  `;
}

function plansInvestmentTable(
  package,
  id,
  amount,
  title,
  returns,
  period,
  created,
  profitEarned,
  username,
  fee
) {
  return `
  <tr>
      <td>${FORMAT_DATE(created)}</td>
      <td>${username}</td>
      <td>${package}</td>
      <td>${title}</td>
      <td>${returns}% daily</td>
      <td>${DOLLAR.format(amount)}</td>
      <td>${DOLLAR.format(fee)}</td>
      <td>${DOLLAR.format(profitEarned)}</td>
      <td>${FORMAT_DATE(addDays(created, period))}</td>
  </tr>
  `;
}

function myPackage(
  package,
  id,
  amount,
  title,
  retrn,
  period,
  created,
  profitEarned
) {
  const closeTime = period * 24 * 60 * 60 * 1000;
  const presentTime = new Date().getTime();
  const startTime = new Date(created).getTime();
  const remainingTime = closeTime + startTime - presentTime;

  const daysCount = remainingTime / TIMES_DAY;
  const hours = remainingTime % TIMES_DAY;
  const hoursCount = hours / TIMES_HOUR;
  const minutes = hours % TIMES_HOUR;
  const minutesCount = minutes / TIMES_MINUTE;

  const color =
    package === "premium"
      ? "gold"
      : package === "standard"
      ? "silver"
      : "bronze";
  const color1 =
    package === "premium"
      ? "gold1"
      : package === "standard"
      ? "silver1"
      : "bronze1";
  const color2 =
    package === "premium"
      ? "gold2"
      : package === "standard"
      ? "silver2"
      : "bronze2";

  return `
  <div class="tw-flex tw-flex-col tw-items-center" id="${id}">
  <div
      class="price-box-inner mb-0 bg-svg rounded tw-bg-blueDark tw-cursor-pointer w-100">
      <div class="invest-tumb">
          <img src="../img/icon/d1.png" alt="">
      </div>

      <h5 class="tw-text-lg ${color}">${title}</h5>
      <div class="table-responsive">
          <table class="table table-borderless text-white tableInfo">
              <tr>
                  <td>Invested</td>
                  <td>:</td>
                  <td>${DOLLAR.format(amount)}</td>
              </tr>
              <tr>
                  <td>Returns</td>
                  <td>:</td>
                  <td>${retrn}% Profit daily</td>
              </tr>
              <tr>
                  <td>Profit Earned</td>
                  <td>:</td>
                  <td>${DOLLAR.format(profitEarned)}</td>
              </tr>
          </table>
      </div>
      <div class="p-2 pb-4">
          <div class="tw-grid tw-grid-cols-3 tw-gap-5 text-center">
              <div>
                  <div
                      class="tw-border tw-border-${color1} tw-font-semibold tw-bg-${color2} py-3 rounded tw-text-2xl mb-2">
                      ${daysCount <= 0 ? 0 : Math.trunc(daysCount)}</div>
                  <p>DAYS</p>
              </div>
              <div>
                  <div
                      class="tw-border tw-border-${color1} tw-font-semibold tw-bg-${color2} py-3 rounded tw-text-2xl mb-2">
                      ${hoursCount <= 0 ? 0 : Math.trunc(hoursCount)}</div>
                  <p>HOURS</p>
              </div>
              <div>
                  <div
                      class="tw-border tw-border-${color1} tw-font-semibold tw-bg-${color2} py-3 rounded tw-text-2xl mb-2">
                      ${hoursCount <= 0 ? 0 : Math.trunc(minutesCount)}</div>
                  <p>MINUTES</p>
              </div>
          </div>
      </div>
  </div>
</div>
    `;
}

function userNotificationsTable(message, date) {
  return `
  <tr>
  <td>${message}</td>
  <td>${date}</td>
</tr>
    `;
}

function allNotificationsTable(message, username, date) {
  return `
  <tr>
  <td>${message}</td>
  <td>${username}</td>
  <td>${date}</td>
</tr>
    `;
}

function depositMethods(id, coin, name, address, status) {
  let color;
  let textC;
  let classN;
  if (status === "visible") {
    color = "warning";
    textC = "Hide";
    classN = "hide";
  } else {
    color = "success";
    textC = "Unhide";
    classN = "unhide";
  }

  return `
  <tr>
    <td>${coin.toUpperCase()}</td>
    <td>${name.toUpperCase()}</td>
    <td>${address}</td>
    <td>
        <div class="d-flex tw-gap-2">
            <button id="${id}" class="btn btn-primary edit-deposit-method">Edit</button>
            <button id="${id}" class="btn btn-${color} ${classN}-deposit-method">${textC}</button>
        </div>
    </td>
</tr>
  `;
}

function withdrawalMethods(id, coin, name, status) {
  let color;
  let textC;
  let classN;
  if (status === "visible") {
    color = "warning";
    textC = "Hide";
    classN = "hide";
  } else {
    color = "success";
    textC = "Unhide";
    classN = "unhide";
  }

  return `
  <tr>
    <td>${coin.toUpperCase()}</td>
    <td>${name.toUpperCase()}</td>
    <td>
        <div class="d-flex tw-gap-2">
            <button id="${id}" class="btn btn-${color} ${classN}-withdrawal-method">${textC}</button>
        </div>
    </td>
</tr>
  `;
}

function usersTable(id, name, username, email, phone, block) {
  const status = block
    ? `<span class="badge badge-danger">Blocked</span>`
    : `<span class="badge badge-success">Active</span>`;

  state = block ? "unblock" : "block";

  return `
  <tr>
  <td><button class="btn btn-success view disabled:tw-opacity-30" id="${id}" disabled>View</button></td>
  <td>${name}</td>
  <td>${username}</td>
  <td>${email}</td>
  <td>${phone}</td>
  <td>${status}</td>
  <td>
      <div class="d-flex tw-gap-2">
          <button class="btn btn-primary edit disabled:tw-opacity-30" id="${id}" disabled>Edit</button>
          <button class="btn btn-warning ${state}" id="${id}">${state}</button>
          <button class="btn btn-danger delete" id="${id}">Delete</button>
      </div>
  </td>
</tr>
  `;
}

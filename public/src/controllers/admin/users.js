import { formatDateDay, dollar, formatDate, toTitle } from "../../helpers.js";

$(".addFundsBtn").on("click", (e) => {
  const ele = e.target.closest(".addFundsBtn").dataset;
  const id = ele.id;
  const name = ele.name;
  const acctNumb = ele.acctnumb;

  $("#addFundsUser").val(`${name} (${acctNumb})`);
  $("#addFundsUserId").val(id);

  showModal("#addFundsModal");
});

$(".cotBtn").on("click", (e) => {
  const ele = e.target.closest(".cotBtn").dataset;
  const id = ele.id;
  const name = ele.name;
  const code = ele.code;
  const acctNumb = ele.acctnumb;

  $("#cotUser").val(`${name} (${acctNumb})`);
  $("#cotUserId").val(id);
  $("#cotUserCode").val(code);

  showModal("#cotModal");
});

$(".approveBtn").on("click", (e) => {
  const ele = e.target.closest(".approveBtn").dataset;
  const id = ele.id;

  $("#approveModalForm").attr("action", "/user/approve");
  $("#approveModalId").attr("name", "userId");
  $("#approveModalId").attr("value", id);

  showModal("#approveModal");
});

$(".deleteBtn").on("click", (e) => {
  const ele = e.target.closest(".deleteBtn").dataset;
  const id = ele.id;

  $("#deleteModalForm").attr("action", "/user/delete");
  $("#deleteModalId").attr("name", "userId");
  $("#deleteModalId").attr("value", id);

  showModal("#deleteModal");
});

$(".viewBtn").on("click", (e) => {
  const ele = e.target.closest(".viewBtn").dataset;
  const user = JSON.parse(ele.user);

  $("#viewModalTitle").text("User Details");

  const template = `
  <tbody>
    <tr>
      <td>Registered</td>
      <td>${formatDate(user.createdAt)}</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>${toTitle(user.name)}</td>
    </tr>
    <tr>
      <td>Account Type</td>
      <td>${toTitle(user.accountType)}</td>
    </tr>
    <tr>
      <td>Account Number</td>
      <td>${user.accountNumber}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>${user.email}</td>
    </tr>
    <tr>
      <td>Phone Number</td>
      <td>+${user.phoneCountryCode + user.phone}</td>
    </tr>
    <tr>
      <td>Gender</td>
      <td>${toTitle(user.gender)}</td>
    </tr>
    <tr>
      <td>Occupation</td>
      <td>${toTitle(user.occupation)}</td>
    </tr>
    <tr>
      <td>Monthly Income</td>
      <td>${dollar(user.income)}</td>
    </tr>
    <tr>
      <td>Marital Status</td>
      <td>${toTitle(user.maritalStatus)}</td>
    </tr>
    <tr>
      <td>Country</td>
      <td>${toTitle(user.country)}</td>
    </tr>
    <tr>
      <td>State / Province</td>
      <td>${toTitle(user.state)}</td>
    </tr>
    <tr>
      <td>City</td>
      <td>${toTitle(user.city)}</td>
    </tr>
    <tr>
      <td>Street</td>
      <td>${toTitle(user.street)}</td>
    </tr>
    <tr>
      <td>Zip Code</td>
      <td>${toTitle(user.zipCode)}</td>
    </tr>
    <tr>
      <td>Date Of Birth</td>
      <td>${formatDateDay(user.dob)}</td>
    </tr>
  </tbody>
  `;

  $("#viewModalTable").html(template);

  showModal("#viewModal");
});

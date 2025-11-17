import dataFile from "../../dataFile.js";
import { dollar, formatDate, toTitle } from "../../helpers.js";

$(".viewBtn").on("click", (e) => {
  const ele = e.target.closest(".viewBtn").dataset;
  const transfer = JSON.parse(ele.transfer);

  let template;

  switch (transfer.accountMode) {
    case "same":
      template = `
      <tbody>
        <tr>
          <td>Date</td>
          <td>${formatDate(transfer.createdAt)}</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>Same Bank</td>
        </tr>
        <tr>
          <td>Sender's Name</td>
          <td>${toTitle(transfer.user.name)}</td>
        </tr>
        <tr>
          <td>Sender's Account Number</td>
          <td>${transfer.user.accountNumber}</td>
        </tr>
        <tr>
          <td>receiver's Bank</td>
          <td>${toTitle(dataFile.name)}</td>
        </tr>
        <tr>
          <td>receiver's Name</td>
          <td>${toTitle(transfer.name)}</td>
        </tr>
        <tr>
          <td>receiver's Account Number</td>
          <td>${transfer.accountNumber}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>${dollar(transfer.amount)}</td>
        </tr>
      </tbody>
      `;
      break;

    case "others":
      template = `
      <tbody>
        <tr>
          <td>Date</td>
          <td>${formatDate(transfer.createdAt)}</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>Other Bank</td>
        </tr>
        <tr>
          <td>Sender's Name</td>
          <td>${toTitle(transfer.user.name)}</td>
        </tr>
        <tr>
          <td>Sender's Account Number</td>
          <td>${transfer.user.accountNumber}</td>
        </tr>
        <tr>
          <td>receiver's Bank</td>
          <td>${toTitle(transfer.bank)}</td>
        </tr>
        <tr>
          <td>Routing Number</td>
          <td>${transfer.routing}</td>
        </tr>
        <tr>
          <td>receiver's Name</td>
          <td>${toTitle(transfer.name)}</td>
        </tr>
        <tr>
          <td>receiver's Account Number</td>
          <td>${transfer.accountNumber}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>${dollar(transfer.amount)}</td>
        </tr>
      </tbody>
      `;
      break;

    case "crypto":
      template = `
      <tbody>
        <tr>
          <td>Date</td>
          <td>${formatDate(transfer.createdAt)}</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>${toTitle(transfer.accountMode)}</td>
        </tr>
        <tr>
          <td>Sender's Name</td>
          <td>${toTitle(transfer.user.name)}</td>
        </tr>
        <tr>
          <td>Sender's Account Number</td>
          <td>${transfer.user.accountNumber}</td>
        </tr>
        <tr>
          <td>receiver's Name</td>
          <td>${toTitle(transfer.name)}</td>
        </tr>
        <tr>
          <td>receiver's Coin</td>
          <td>${transfer.coin}</td>
        </tr>
        <tr>
          <td>receiver's Wallet</td>
          <td>${transfer.wallet}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>${dollar(transfer.amount)}</td>
        </tr>
      </tbody>
      `;
      break;

    case "paypal":
      template = `
      <tbody>
        <tr>
          <td>Date</td>
          <td>${formatDate(transfer.createdAt)}</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>${toTitle(transfer.accountMode)}</td>
        </tr>
        <tr>
          <td>Sender's Name</td>
          <td>${toTitle(transfer.user.name)}</td>
        </tr>
        <tr>
          <td>Sender's Account Number</td>
          <td>${transfer.user.accountNumber}</td>
        </tr>
        <tr>
          <td>receiver's Name</td>
          <td>${toTitle(transfer.name)}</td>
        </tr>
        <tr>
          <td>receiver's Paypal Email</td>
          <td>${transfer.paypalEmail}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>${dollar(transfer.amount)}</td>
        </tr>
      </tbody>
      `;
      break;

    case "cashApp":
      template = `
      <tbody>
        <tr>
          <td>Date</td>
          <td>${formatDate(transfer.createdAt)}</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>${toTitle(transfer.accountMode)}</td>
        </tr>
        <tr>
          <td>Sender's Name</td>
          <td>${toTitle(transfer.user.name)}</td>
        </tr>
        <tr>
          <td>Sender's Account Number</td>
          <td>${transfer.user.accountNumber}</td>
        </tr>
        <tr>
          <td>receiver's Name</td>
          <td>${toTitle(transfer.name)}</td>
        </tr>
        <tr>
          <td>receiver's CashApp Username</td>
          <td>${transfer.cashAppUsername}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>${dollar(transfer.amount)}</td>
        </tr>
      </tbody>
      `;
      break;
  }

  $("#viewModalTable").html(template);

  showModal("#viewModal");
});

$(".approveBtn").on("click", (e) => {
  const ele = e.target.closest(".approveBtn").dataset;
  const id = ele.id;

  $("#approveModalForm").attr("action", "/transfer/approve");
  $("#approveModalId").attr("name", "transactionId");
  $("#approveModalId").attr("value", id);

  showModal("#approveModal");
});

$(".cancelBtn").on("click", (e) => {
  const ele = e.target.closest(".cancelBtn").dataset;
  const id = ele.id;

  $("#cancelModalForm").attr("action", "/transfer/cancel");
  $("#cancelModalId").attr("name", "transactionId");
  $("#cancelModalId").attr("value", id);

  showModal("#cancelModal");
});

$(".deleteBtn").on("click", (e) => {
  const ele = e.target.closest(".deleteBtn").dataset;
  const id = ele.id;

  $("#deleteModalForm").attr("action", "/transfer/delete");
  $("#deleteModalId").attr("name", "transactionId");
  $("#deleteModalId").attr("value", id);

  showModal("#deleteModal");
});

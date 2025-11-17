const nodemailer = require("nodemailer");
const dataFile = require("../dataFile");

module.exports = async (
  to,
  subject,
  messageSubject,
  messageContent,
  button,
  buttonUrl
) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_TLS,
    },
  });

  const body = `
  
  <table
  role="presentation"
  style="
    margin: 0px auto;
    padding: 0px;
    border: none;
    outline: none;
    max-width: 800px;
    font-family: Georgia, serif;
    font-size: 0px;
    text-align: center;
    table-layout: auto !important;
    border-spacing: 0px !important;
  "
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  align="center"
>
  <tbody
    style="
      margin-top: 0px;
      margin-bottom: 0px;
      padding: 0px;
      border: none;
      outline: none;
    "
  >
    <tr
      style="
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 0px;
        border: none;
        outline: none;
      "
    >
      <td
        style="
          margin-top: 0px;
          margin-bottom: 0px;
          padding: 32px 16px;
          border: 2px solid #8a0f3d;
          border-top: 4px solid #8a0f3d;
          border-radius: 8px;
        "
      >
        <div
          style="
            margin: 0px auto;
            padding: 0px;
            border: 0px;
            outline: 0px;
            max-width: 624px;
          "
        >
           <p
                      style="
                        margin-bottom: 0px;
                        padding: 0px;
                        border: 0px;
                        outline: 0px;
                      "
                    >
                      <img
                        src="${dataFile.url + "/" + dataFile.logo3}"
                        width="80px"
                        class="CToWUd a6T"
                        data-bit="iit"
                        tabindex="0"
                        width="200px"
                      />
                    </p>
          &nbsp;<br />
        </div>
        <div
          style="
            margin: 0px auto;
            padding: 0px;
            border: 0px;
            outline: 0px;
            font-weight: inherit;
            font-style: inherit;
            font-family: inherit;
            max-width: 624px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
          "
        >
          <div
            style="
              margin: 0px;
              padding: 0px;
              border: 0px;
              outline: 0px;
              font-weight: inherit;
              font-style: inherit;
              font-family: inherit;
              vertical-align: top;
              display: inline-block;
              width: 416px;
              max-width: 416px;
            "
          >
            <table
              role="presentation"
              style="
                margin-top: 0px;
                margin-bottom: 0px;
                padding: 0px;
                border: none;
                outline: none;
                vertical-align: top;
                table-layout: auto !important;
                border-spacing: 0px !important;
              "
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              align="center"
            >
              <tbody
                style="
                  margin-top: 0px;
                  margin-bottom: 0px;
                  padding: 0px;
                  border: none;
                  outline: none;
                "
              >
                <tr
                  style="
                    margin-top: 0px;
                    margin-bottom: 0px;
                    padding: 0px;
                    border: none;
                    outline: none;
                  "
                >
                  <td
                    style="
                      margin-top: 0px;
                      margin-bottom: 0px;
                      padding: 0px;
                      border-top: none;
                      border-right: none;
                      border-bottom-color: rgb(222, 224, 225);
                      border-left: none;
                      outline: none;
                      vertical-align: top;
                    "
                    height="32"
                  >
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          style="
            margin: 0px auto;
            padding: 0px;
            border: 0px;
            outline: 0px;
            font-weight: inherit;
            font-style: inherit;
            font-family: inherit;
            max-width: 624px;
          "
        >
          <table
            role="presentation"
            style="
              margin-top: 0px;
              margin-bottom: 0px;
              padding: 0px;
              border: none;
              outline: none;
              vertical-align: top;
              table-layout: auto !important;
              border-spacing: 0px !important;
            "
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            align="center"
          >
            <tbody
              style="
                margin-top: 0px;
                margin-bottom: 0px;
                padding: 0px;
                border: none;
                outline: none;
                text-align: center;
              "
            >
              <tr
                style="
                  margin-top: 0px;
                  margin-bottom: 0px;
                  padding: 0px;
                  border: none;
                  outline: none;
                "
              >
                <td
                  style="
                    margin-top: 0px;
                    margin-bottom: 0px;
                    padding: 32px 16px;
                    border-width: initial;
                    border-style: none;
                    border-color: initial;
                    outline: none;
                    vertical-align: top;
                    color: rgb(51, 51, 51);
                  "
                >
                  <h2
                    style="
                      margin: 32px 0px 8px;
                      padding: 0px;
                      border: 0px;
                      outline: 0px;
                      font-weight: bold;
                      font-style: inherit;
                      font-size: 28px;
                      font-family: Arial, Helvetica, sans-serif;
                      color: inherit;
                      word-break: break-word;
                      line-height: 38px;
                    "
                  >
                    ${messageSubject}
                  </h2>
                  <p
                    style="
                      margin-bottom: 32px;
                      padding: 0px;
                      border: 0px;
                      outline: 0px;
                      font-style: inherit;
                      font-size: 19px;
                      font-family: Arial, Helvetica, sans-serif;
                      color: rgb(80, 80, 80);
                      word-break: break-word;
                      line-height: 31px;
                    "
                  >
                    ${messageContent}
                  </p>
                  <table
                    role="presentation"
                    style="
                      margin: 0px auto;
                      padding: 0px;
                      border: none;
                      outline: none;
                      table-layout: auto !important;
                      border-spacing: 0px !important;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    align="center"
                  >
                    <tbody
                      style="
                        margin-top: 0px;
                        margin-bottom: 0px;
                        padding: 0px;
                        border: none;
                        outline: none;
                      "
                    >
                      <tr
                        style="
                          margin-top: 0px;
                          margin-bottom: 0px;
                          padding: 0px;
                          border: none;
                          outline: none;
                        "
                      >
                        <td
                          style="
                            margin-top: 0px;
                            margin-bottom: 0px;
                            padding: 13px 24px;
                            border-width: initial;
                            border-style: none;
                            border-color: initial;
                            outline: none;
                            background-color: #8a0f3d;
                            font-size: 16px;
                            border-radius: 4px;
                            line-height: normal;
                            font-weight: bold;
                          "
                        >
                          <a
                            href="${buttonUrl}"
                            style="
                              margin: 0px;
                              border: 0px;
                              outline: 0px;
                              font-weight: bold;
                              font-style: inherit;
                              font-family: Arial, Helvetica, sans-serif;
                              text-decoration: none;
                              color: rgb(255, 255, 255);
                              word-break: break-word;
                              padding: 13px 24px !important;
                              display: block !important;
                            "
                            >${button}</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>
  `;

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"${dataFile.name}" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: body,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};

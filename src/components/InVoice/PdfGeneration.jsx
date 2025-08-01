import { Platform } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";

const PdfGeneration = ({ getInvoiceData, printer, setPrinter }) => {
  const {
    invoiceId,
    name,
    address1,
    address2,
    city,
    state,
    landmark,
    pincode,
    gst_no,
    product_id,
    product_name,
    product_type,
    product_quantity,
    total_amount,
    unitprice,
  } = getInvoiceData;

  const formatIndianNumber = (num) => {
    const numStr = num.toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    if (otherNumbers !== "") {
      return `${otherNumbers.replace(
        /\B(?=(\d{2})+(?!\d))/g,
        ","
      )},${lastThree}`;
    } else {
      return lastThree;
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function numberToWords(amount) {
    let words = "";
    let fraction = Math.round((amount - Math.floor(amount)) * 100);
    let units = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    let teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    let tens = [
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    let thousands = ["", "Thousand", "Lakh", "Crore"];

    function convertChunk(num) {
      let str = "";
      let hundred = Math.floor(num / 100);
      num = num % 100;
      if (hundred > 0) {
        str += units[hundred] + " Hundred ";
      }
      if (num > 10 && num < 20) {
        str += teens[num - 11] + " ";
      } else {
        let ten = Math.floor(num / 10);
        num = num % 10;
        if (ten > 0) {
          str += tens[ten - 1] + " ";
        }
        if (num > 0) {
          str += units[num] + " ";
        }
      }
      return str.trim();
    }

    if (amount === 0) {
      words = "Zero";
    } else {
      let crore = Math.floor(amount / 10000000);
      let lakh = Math.floor((amount % 10000000) / 100000);
      let thousand = Math.floor((amount % 100000) / 1000);
      let hundred = Math.floor((amount % 1000) / 100);
      let remainder = amount % 100;

      if (crore > 0) {
        words += convertChunk(crore) + " Crore ";
      }
      if (lakh > 0) {
        words += convertChunk(lakh) + " Lakh ";
      }
      if (thousand > 0) {
        words += convertChunk(thousand) + " Thousand ";
      }
      if (hundred > 0) {
        words += convertChunk(hundred) + " Hundred ";
      }
      if (remainder > 0) {
        words += convertChunk(remainder);
      }
    }

    if (fraction > 0) {
      words += " and " + fraction + "/100";
    }

    return words.trim();
  }

  html = `
  <div id="printdf" style="background-color: #f5f5f5; width: fit-content; min-height: 320mm; margin-left: auto; margin-right: auto;">
   <div style="font-family: Arial, sans-serif; font-size: 4px; line-height:1; margin: 0; padding: 0;">

<div style="width: 100%; margin: 0 auto;border:1px solid #000;padding:6px;">
  <center>
    <h1>Invoice Note</h1>
  </center>
  <table border="1px" width="95%" style="border-width:1px;border-color:black,border-collapse: collapse;">
    <tr>
      <td rowspan="3" style="border-right: none;border-bottom:none;line-height: 1.5;padding: 2px 0px 2px 2px;"><strong>VTS ENTERPRISES INDIA PVT
          LTD</strong><br>
        No 3B, 3RD FLOOR,<br>
        25 PARK CENTER VENKATARAYANA ROAD<br>
        T.NAGAR CHENNAI<br>
        600017<br>
        GSTIN/UIN: 33AAHCV0173B12T<br>
        STATE NAME : TAMIL NADU, CODE : 33
      </td>
      <td style="border-right: none;border-bottom:none;padding: 2px;">Credit Note No. ${invoiceId.replace(
        "B2BINV",
        ""
      )}</td>
      <td style="border-right: none;border-bottom:none;padding: 2px;">Dated: ${getCurrentDate()}</td>
    </tr>
    <tr>
      <td style="border-right: none;border-bottom:none;font-weight: bold; padding: 2px;">Invoice No.: ${invoiceId.replace(
        "B2B",
        ""
      )} <br><br>Date:${getCurrentDate()}</td>
      <td style="border-right: none;border-bottom:none;padding: 2px;">Other Reference</td>
    </tr>
    <tr>
      <td style="border-right: none;border-bottom:none;padding: 2px">Mode/Terms of Payment</td>
      <td style="border-right: none;border-bottom:none;padding: 2px"></td>
    </tr>
    <tr>
      <td rowspan="3" style="border-right: none;border-bottom:none;line-height: 1.5; padding: 2px 0px 2px 2px;">
          Consignee (Ship To)<br>
          <strong>${name.toUpperCase()}</strong><br>
          ${address1.toUpperCase()},<br>
          ${address2.toUpperCase()}, ${landmark.toUpperCase()}<br>
          ${city.toUpperCase()} - ${pincode}, ${state.toUpperCase()}.<br>
          GSTIN/UIN: ${gst_no.toUpperCase()}<br>
          State Name: ${state.toUpperCase()}, Code: 33
      </td>
      <td style="border-right: none;border-bottom:none;padding: 2px"> Dispatched Doc No.</td>
      <td style="border-right: none;border-bottom:none;padding: 2px"></td>
    </tr>
    <tr>
      <td style="border-right: none;border-bottom:none;padding: 2px"> Buyer’s Order No.</td>
      <td style="border-right: none;border-bottom:none;padding: 2px">Dated</td>
    </tr>
    <tr>
      <td style="border-right: none;border-bottom:none;padding: 2px"> Dispatched through</td>
      <td style="border-right: none;border-bottom:none;font-weight: bold;padding: 2px;">CHENNAI</td>
    </tr>
    <tr>
    </tr>
    <tr>
      <td style="border-bottom:none;border-right: none; line-height: 1.5; padding: 2px 0px 2px 2px;">
          Bill (Bill To)<br>
          <strong>${name.toUpperCase()}</strong><br>
          ${address1.toUpperCase()},<br>
          ${address2.toUpperCase()}, ${landmark.toUpperCase()}<br>
          ${city.toUpperCase()} - ${pincode}, ${state.toUpperCase()}.<br>
          GSTIN/UIN: ${gst_no.toUpperCase()}<br>
          State Name: ${state.toUpperCase()}, Code: 33
      </td>
      <td colspan="2" style="border-right: none;border-bottom:none;padding: 2px;">Terms & Conditions</td>
    </tr>
  </table>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
  </div>

  <table border="1px" style="width: 95%; border-collapse: collapse; margin-bottom: 10px;">
    <thead>
      <tr>
        <th style="border-right: none;border-bottom:none;padding: 5px; text-align: left;">S.No.</th>
        <th style="border-right: none;border-bottom:none;padding: 5px; text-align: left;">Product Name</th>

        <th style="border-right: none;border-bottom:none;padding: 5px; text-align: left;">Quantity</th>
        <th style="border-right: none;border-bottom:none;padding: 5px; text-align: left;">Rate</th>
        <th style="border-right: none;border-bottom:none;padding: 5px; text-align: left;">Per</th>
        <th style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border-right: none;border-bottom:none;padding: 5px;">1</td>
        <td style="border-right: none;border-bottom:none;padding: 5px;">${product_type} </td>
        <td style="border-right: none;border-bottom:none;padding: 5px;">${product_quantity} TONNES</td>
        <td style="border-right: none;border-bottom:none;padding: 5px;">₹ ${formatIndianNumber(
          parseInt(unitprice)
        )}.00</td>
        <td style="border-right: none;border-bottom:none;padding: 5px;">TONNE</td>
        <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">${formatIndianNumber(
          parseInt(total_amount)
        )}</td>
      </tr>				
      <tr>
        <td style="border-right: none;border-bottom:none;padding: 5px;" colspan="5">Total (GST Exempted)</td>
        <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">${formatIndianNumber(
          parseInt(total_amount)
        )}</td>
      </tr>
    </tbody>
  </table>


  <div style="display: flex;flex-direction: column; justify-content: space-between;">
    <strong>GST Exempted</strong>
    <table border="1px" style="width: 95%; border-collapse: collapse; margin-bottom: 3px;margin-top:2px">
              <tr>
                  <th style="border-right: none;border-bottom:none;padding: 5px;">HSN/SAC</th>
                  <th style="border-right: none;border-bottom:none;padding: 5px;">CGST @ 0.0%</th>
                  <th style="border-right: none;border-bottom:none;padding: 5px;">SGST @ 0.0%</th>
                  <th style="border-right: none;border-bottom:none;padding: 5px;">IGST @ 0.0%</th>
                  <th style="border-right: none;border-bottom:none;padding: 5px;">Total Tax Amount</th>
                  <th style="border-right: none;border-bottom:none;padding: 5px;">Total Amount With Tax</th>
              </tr>
              <tr>
                  <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">07133100</td>
                  <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">0.00</td>
                  <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">0.00</td>
                  <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">0.00</td>
                  <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">0.00</td>
                  <td style="border-right: none;border-bottom:none;padding: 5px; text-align: right;">${formatIndianNumber(
                    total_amount
                  )}.00</td>
              </tr>
          </table>
          
    <div style="border:none;padding:6px  3px;">
      Total Amount (in words):<br><br>
      <strong style="margin-top:7px;">INR ${numberToWords(
        total_amount
      ).toUpperCase()} ONLY</strong><br><br>
      <strong>Company’s Bank Details :</strong><br>
      Bank Name: PUNJAB NATIONAL BANK<br>
      A/C No.: 3940002100057010<br>
      IFSC Code.: PUNB0394000<br>
      Branch : Tiruvanmiyur,CHENNAI<br>
    </div>
  </div>
  <div style="border:none; padding: 3px; margin-bottom: 3px;">
    <strong>Declaration :</strong><br><br>
    We declare that this invoice shows the actual price of the goods described and that all particulars are true
    and correct.<br>
  </div>
  <hr>
  <div  style="text-align: right;width:95%">
    <strong>For VTS ENTERPRISES INDIA PVT LTD</strong><br><br><br>
    Authorised Signatory
  </div>
</div>
</div>
  </div>
`;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: printer?.url,
    });
    printToFile();
    selectPrinter();
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        type: "application/pdf",
        name: `invoice_${invoiceId}.pdf`,
      });
      const uploadUrl =
        `${process.env.REACT_APP_BACKEND_URL}` + "/sales/addorder";

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      const fileUrl = response.data.fileUrl;
      // console.log(fileUrl);
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setPrinter(printer)
  };

  const test = () => {
    return "testing";
  };
  return print();
};

export default PdfGeneration;

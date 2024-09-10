import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const PdfGeneration = ({ invoicedata }) => {
  const [pdfContent, setPdfContent] = useState(null);

  const pid = 123123123;
  const email = "vts@vts.com";
  const mobile = "+91 6380254179";
  const invoiceId = invoicedata.invoiceId;
  const name = invoicedata.name;
  const address1 = invoicedata.address1;
  const address2 = invoicedata.address2;
  const city = invoicedata.city;
  const state = invoicedata.state;
  const landmark = invoicedata.landmark;
  const pincode = invoicedata.pincode;
  const gst_no = invoicedata.gst_no;
  const product_name = invoicedata.product_name;
  const product_type = invoicedata.product_type;
  const product_quantity = invoicedata.product_quantity;
  const amount = invoicedata.total_amount;
  const unitprice = invoicedata.unitPrice;

  useEffect(() => {
    setTimeout(() => generatePdf, 100);
  }, []);

  const logo = (
    <Image
      source={require("../../assets/B2BlogoRounded.png")}
      size={{ width: 50, height: 50 }}
    />
  );

  const pnb = (
    <Image
      source={require("../../assets/pnbLogo.png")}
      size={{ width: 50, height: 50 }}
    />
  );

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

  function convertToWords() {
    var amount = parseFloat(document.getElementById("amount").value);
    var words = numberToWords(amount);
    document.getElementById("amount_in_words").value = "INR " + words + " Only";
  }

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
    const month = monthNames[today.getMonth()]; // Get the month name
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function numberToWords(amount) {
    var words = "";
    var fraction = Math.round((amount - Math.floor(amount)) * 100);
    var units = [
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
    var teens = [
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
    var tens = [
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
    var thousands = ["", "Thousand", "Lakh", "Crore"];

    function convertChunk(num) {
      var str = "";
      var hundred = Math.floor(num / 100);
      num = num % 100;
      if (hundred > 0) {
        str += units[hundred] + " Hundred ";
      }
      if (num > 10 && num < 20) {
        str += teens[num - 11] + " ";
      } else {
        var ten = Math.floor(num / 10);
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
      var crore = Math.floor(amount / 10000000);
      var lakh = Math.floor((amount % 10000000) / 100000);
      var thousand = Math.floor((amount % 100000) / 1000);
      var hundred = Math.floor((amount % 1000) / 100);
      var remainder = amount % 100;

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
    <div id="printdf" style="background-color: #f5f5f5; width: fit-content; min-height: 297mm; margin-left: auto; margin-right: auto;">
     
   <div style="font-family: Arial, sans-serif; color: #000000; margin: 0; padding: 20px; line-height: 1;">

    <div style="border: 1px solid #ccc; padding: 20px; max-width: 800px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <img src=${logo} alt="B2BHub Logo" style="height: 60px;">
            <div style="text-align: center;">
                <p style="margin: 10px; font-size: 11px; color:#d9232d">B2Bhub</p>
                <p style="margin: 5px; font-size: 11px;">Email Id:<a href="mailto:support@b2bhubinida.com" style="color: #000; text-decoration: none;">  support@b2bhubindia.com</a></p>
                <p style="margin: 0 30px 0 0px; font-size: 11px;">Contact Number: 7824036322</p>
            </div>
            <img src=${pnb} alt="Axis Bank Logo" style="height: 50px;">
        </div>
        <hr>
        <h4 style="text-align: center; color: #d9232d; margin: 30px 0;">PAYMENT SLIP</h4>
        <div style="text-align: center; margin-bottom: 30px; font-size: 11px;">
          <p style="margin: 0;"><strong>Generation Date :</strong> ${getCurrentDate()}</p>
        </div>

          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; line-height: 24px;">
                <div style="font-size: 11px;margin-right:10px">
                    <p style="margin: 0;"><strong>Entity Name :</strong> ${name}</p>
                    <p style="margin: 0;"><strong>Entity GST NO. :</strong> ${gst_no}</p>
                    <p style="margin: 0;"><strong>Actual Amount :</strong>	₹ ${formatIndianNumber(
                      amount
                    )}</p>
                    <p style="margin: 0;"><strong>GST Amount :</strong> ₹ 0</p>
                    <p style="margin: 0;"><strong>Amount :</strong>	₹ ${formatIndianNumber(
                      amount
                    )}</p>
                    <p style="margin: 0;"><strong>Payment Approved Date :</strong> ${getCurrentDateWithoutTime()}</p>
                </div>
                <div style="font-size: 11px;">
                  <!-- <p style="margin: 0;"><strong>Generation Date :</strong> ${getCurrentDate()}</p> -->
                  <p style="margin: 0;"><strong>Mobile No :</strong> ${mobile}</p>
                  <p style="margin: 0;"><strong>Email Id :</strong> ${email}</p>
                  <div style="font-size: 11px;">
                    <p style="margin: 0;"><strong>GST @ 18% :</strong> NO</p>
                    <p style="margin: 0;"><strong>Remarks :</strong> Master agreement E signing fees</p>
                    <p style="margin: 0;"><strong>Amount (incl. service charges) :</strong> ₹ ${formatIndianNumber(
                      amount
                    )}</p>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 25px; padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9;">
            <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc; text-align: center; background-color: #f3f3f3;"><strong>URN</strong></td>
                    <td style="padding: 10px; border: 1px solid #ccc; text-align: center; background-color: #f3f3f3;"><strong>Status</strong></td>
                    <td style="padding: 10px; border: 1px solid #ccc; text-align: center; background-color: #f3f3f3;"><strong>Mode of Payment</strong></td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">${pid}</td>
                    <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">Success</td>
                    <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">NET BANKING</td>
                </tr>
            </table>
          </div>

          <div style="margin-top: 20px;">
            <p style="font-size: 11px; color: #d9232d; margin-bottom: 5px;"><strong>Please note :</strong></p>
            <ul style="font-size: 11px; padding-left: 20px; color: #d9232d; margin: 0;">
                <li>This is a system-generated receipt. Hence it does not require signatures.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  function getCurrentDateWithoutTime() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const generatePdf = async () => {
    try {
      const options = {
        html: html,
        fileName: `invoice${pid}`,
        base64: false,
      };

      const file = await printToFileAsync(options);

      await shareAsync(file.uri);
    } catch (err) {
      console.error("Error generating or sharing pdf", err);
    }
  };

  return <>{generatePdf()}</>;
};

export default PdfGeneration;

const styles = StyleSheet.create({});

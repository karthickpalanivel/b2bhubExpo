/*
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
  const total_amount = invoicedata.total_amount;
  const unitprice = invoicedata.unitPrice;
*/

import { View, Text, Button } from "react-native";
import { invoicedata } from "../../data/Invoice";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
import axios from "axios";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const GeneratePayslips = async (invoicedata) => {
  // Formatting functions from your original code

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
  const total_amount = invoicedata.total_amount;
  const unitprice = invoicedata.unitPrice;
  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    const options = { day: "numeric", month: "short", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

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

  const numberToWords = (amount) => {
    // The numberToWords logic from your original code
  };

  const getCurrentDate = () => {
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
  };

  // Create HTML content for the PDF
  const htmlContent = `
    <div>
      <p>Hello world</p>
      <!-- Add more HTML content to represent the invoice -->
    </div>
  `;

  // Generate PDF using react-native-html-to-pdf
  const options = {
    html: htmlContent,
    fileName: "invoice",
    directory: "Documents",
  };

  const pdfFile = await RNHTMLtoPDF.convert(options);

  // Create FormData to upload PDF to Cloudinary
  const formData = new FormData();
  formData.append("file", {
    uri: pdfFile.filePath,
    type: "application/pdf",
    name: "invoice.pdf",
  });
  formData.append("upload_preset", "payslips");

  // Upload to Cloudinary
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dtgnotkh7/auto/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    if (error.response) {
      console.error("Error uploading image:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }

  return (
    <View>
      <Button
        title="Generate Payslip"
        onPress={() => GeneratePayslips()}
      />
    </View>
  );
};

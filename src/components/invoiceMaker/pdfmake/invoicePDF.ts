import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { TDocumentDefinitions } from "pdfmake/interfaces";

interface IinvoiceField {
  itemDescription: string;
  price: string;
  qty: string;
  amount: string;
}

export default function InvoicePDF(
  data: any,
  dateString: string,
  total: number,
  colorPdf: string,
  featuredImg: string
) {
  const dd: TDocumentDefinitions = {
    content: [
      {
        alignment: "justify",
        columns: [
          {
            image: "lancekitlogo",
            width: 150,
          },
          {
            text: "INVOICE",
            style: "titleInvoice",
          },
        ],
      },
      { text: data.ownerName, style: "ownerName" },
      { text: data.ownerAddress + ", " + data.ownerCountry, style: "pBreak1" },
      { text: "Bill to:", style: "h3Italic" },

      {
        style: "tableData",
        table: {
          heights: [1, 1],
          widths: [200, 155, "*"],
          body: [
            [
              {
                text: `${data.clientName}`,
                style: "billToName",
                border: [false, false, false, false],
              },
              {
                text: "Invoice Date :",
                style: "pRight",
                border: [false, false, false, false],
              },
              {
                text: `${dateString}`,
                style: "pRight",
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: `${data.clientAddress}, ${data.clientCountry}`,
                style: "pBreakItalic",
                border: [false, false, false, false],
              },
              {
                text: "Invoice Number :",
                style: "pRight",
                border: [false, false, false, false],
              },
              {
                text: `${data.invoiceNumber}`,
                style: "pRight",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],
          body: [
            [
              {
                text: "Product",
                style: "tableHeader",
                border: [false, false, false, false],
              },
              {
                text: "Quantity",
                style: "tableHeader",
                border: [true, false, false, false],
              },
              {
                text: "Price per Unit",
                style: "tableHeader",
                border: [true, false, false, false],
              },
              {
                text: "Amount",
                style: "tableHeader",
                border: [true, false, false, false],
              },
            ],
            ...data.invoiceFields.map(
              ({ itemDescription, price, qty, amount }: IinvoiceField) => [
                { text: itemDescription, style: "tableCellLeft" },
                { text: qty, style: "tableCellCenter" },
                { text: `${price},-`, style: "tableCellCenter" },
                { text: `${amount},-`, style: "tableCellRight" },
              ]
            ),
            [
              { text: "Total", colSpan: 3 },
              {},
              {},
              {
                text: `${new Intl.NumberFormat("id-ID").format(
                  Number(total)
                )},-`,
                style: "tableCellRight",
              },
            ],
          ],
        },
        layout: {
          hLineWidth: function (i: number, node) {
            return i === 0 || i === node.table.body.length ? 1 : 1;
          },
          vLineWidth: function (i: number, node) {
            return i === 0 || i === node.table.widths?.length ? 1 : 1;
          },
          hLineColor: function (i: number, node) {
            return i === 0 || i === node.table.body.length
              ? "#bfdbfe"
              : "#bfdbfe";
          },
          vLineColor: function (i: number, node) {
            return i === 0 || i === node.table.widths?.length
              ? "#bfdbfe"
              : "#bfdbfe";
          },
          paddingTop: function (i: number, node) {
            return 20;
          },
          paddingLeft: function (i: number, node) {
            return 14;
          },
          paddingRight: function (i: number, node) {
            return 14;
          },
          // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (rowIndex, node, columnIndex) { return null; }
        },
      },
    ],
    defaultStyle: {
      columnGap: 100,
      lineHeight: 2.5,
    },
    styles: {
      titleInvoice: {
        fontSize: 28,
        bold: true,
        alignment: "right",
      },
      ownerName: {
        fontSize: 16,
        bold: true,
        lineHeight: 1.4,
      },
      pLeft: {
        alignment: "left",
        lineHeight: 1.4,
      },
      pBreak1: {
        alignment: "left",
        lineHeight: 4,
      },
      pBreakItalic: {
        alignment: "left",
        lineHeight: 4,
        italics: true,
      },
      pRight: {
        alignment: "right",
        lineHeight: 1.6,
      },
      h3: {
        fontSize: 13,
        bold: true,
        lineHeight: 2,
        color: colorPdf,
      },
      h3Italic: {
        fontSize: 13,
        bold: true,
        lineHeight: 2,
        italics: true,
        color: colorPdf,
      },
      billToName: {
        fontSize: 16,
        bold: true,
        lineHeight: 1.4,
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableData: {
        margin: [0, 5, 0, 15],
        lineHeight: 1,
      },
      tableHeader: {
        bold: true,
        color: "white",
        fontSize: 13,
        fillColor: colorPdf,
        alignment: "center",
      },
      tableCellLeft: {
        alignment: "left",
      },
      tableCellCenter: {
        alignment: "center",
      },
      tableCellRight: {
        alignment: "right",
      },
    },
    images: {
      //lancekitlogo: 'https://i.imgur.com/7fMUo7k.png',
      lancekitlogo: featuredImg
        ? featuredImg
        : "https://i.imgur.com/wfARkq0.png",
    },
    pageMargins: [40, 60, 40, 60],
  };
  return pdfMake.createPdf(dd);
}

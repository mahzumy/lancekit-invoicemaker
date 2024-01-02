"use client";
import React from "react";
import { z } from "zod";
import { useState } from "react";
import { InvoicePDF } from "../pdfmake/invoicePDF";
import { TData, IError, dataSchema } from "../interface";

export const useInvoice = () => {
  const [colorPdf, setColorPdf] = useState("#5468ff");
  const [url, setUrl] = useState("");
  const [total, setTotal] = useState(0);
  const [featuredImg, setFeatureImg] = useState("");
  const [err, setErr] = useState<IError>({
    ownerName: "",
    ownerAddress: "",
    ownerCountry: "",
    clientName: "",
    clientAddress: "",
    clientCountry: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    invoiceFields: [
      {
        itemDescription: "",
        price: "",
        qty: "",
        amount: "",
      },
    ],
  });

  const [data, setData] = useState<TData>({
    ownerName: "",
    ownerAddress: "",
    ownerCountry: "",
    clientName: "",
    clientAddress: "",
    clientCountry: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    invoiceFields: [
      {
        itemDescription: "",
        price: "",
        qty: "",
        amount: "",
      },
    ],
  });

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setErr({ ...err, [name]: "" });
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...data.invoiceFields];
    const tempErr: any = [...err.invoiceFields];
    if (event.target.name === "itemDescription") {
      values[index].itemDescription = event.target.value;
      tempErr[index].itemDescription = "";
    } else if (event.target.name === "qty") {
      const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
      const formattedValue = new Intl.NumberFormat("id-ID").format(
        Number(sanitizedValue)
      );
      values[index].qty = formattedValue;
      const amountTemp =
        Number(values[index].qty.replace(/\./g, "")) *
        Number(values[index].price.replace(/\./g, ""));
      values[index].amount = new Intl.NumberFormat("id-ID").format(
        Number(amountTemp)
      );
      tempErr[index].qty = "";
    } else if (event.target.name === "price") {
      const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
      const formattedValue = new Intl.NumberFormat("id-ID").format(
        Number(sanitizedValue)
      );
      values[index].price = formattedValue;
      const amountTemp =
        Number(values[index].qty.replace(/\./g, "")) *
        Number(values[index].price.replace(/\./g, ""));
      values[index].amount = new Intl.NumberFormat("id-ID").format(
        Number(amountTemp)
      );
      tempErr[index].price = "";
    }
    setData({ ...data, invoiceFields: values });
    setErr({ ...err, invoiceFields: tempErr });
    setTotal(
      data.invoiceFields.reduce(
        (sum: number, item) => sum + Number(item.amount.replace(/\./g, "")),
        0
      )
    );
  };

  const addItems = () => {
    const addField = [...data.invoiceFields];
    const addErrorFiled = [...err.invoiceFields];

    addField.push({
      itemDescription: "",
      price: "",
      qty: "",
      amount: "",
    });
    addErrorFiled.push({
      itemDescription: "",
      price: "",
      qty: "",
      amount: "",
    });
    setData({ ...data, invoiceFields: addField });
    setErr({ ...err, invoiceFields: addErrorFiled });
  };

  const handleRemoveInvoice = (index: number) => {
    const values = [...data.invoiceFields];
    const errors = [...err.invoiceFields];
    if (values.length === 1 || errors.length === 1) {
      return false;
    }
    values.splice(index, 1);
    errors.splice(index, 1);
    setData({ ...data, invoiceFields: values });
    setErr({ ...err, invoiceFields: errors });
  };

  const handleFeturedImgChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files: any = event.target.files;
    const file: string = files[0];

    const fileReader: any = new FileReader();
    fileReader.onload = () => {
      setFeatureImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setFeatureImg("");
  };

  const createPdf = () => {
    try {
      const isValidData = dataSchema.parse(data);
      const pdfGenerator = InvoicePDF({
        data,
        total,
        colorPdf,
        featuredImg,
      });
      pdfGenerator.getBlob((blob: any) => {
        const url: string = URL.createObjectURL(blob);
        setUrl(url);
      });
      //pdfGenerator.download()
      //console.log(invoiceFields)
    } catch (error) {
      const newError = error as z.ZodError;
      const newErr: any = { ...err };
      const temp: any = [...err.invoiceFields];

      newError.issues.map((e) => {
        const fieldName = e.path[0];

        if (fieldName !== "invoiceFields") {
          newErr[fieldName] = e.message;
        } else {
          const index: any = e.path[1];
          const field: any = e.path[2];
          temp[index][field] = e.message;
        }
        setErr({ ...newErr, invoiceFields: temp });
      });
    }
  };

  return {
    handleChangeData,
    handleChange,
    addItems,
    handleRemoveInvoice,
    handleFeturedImgChange,
    removeLogo,
    createPdf,
    data,
    total,
    featuredImg,
    err,
    url,
    colorPdf,
    setData,
    setErr,
    setTotal,
    setColorPdf,
  };
};

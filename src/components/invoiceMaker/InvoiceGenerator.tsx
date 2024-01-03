"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/invoiceMaker/ui/input";
import { Button } from "@/components/invoiceMaker/ui/button";
import { InvoiceTable } from "./invoiceTable/invoiceTable";

import Image from "next/image";
import { useInvoice } from "./hooks/useInvoice";

export const InvoiceGenerator = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    handleChangeData,
    handleChange,
    addItems,
    handleRemoveInvoice,
    handleFeturedImgChange,
    removeLogo,
    createPdf,
    data,
    featuredImg,
    err,
    total,
    url,
    colorPdf,
    setTotal,
    setColorPdf,
  } = useInvoice();

  useEffect(() => {
    setIsClient(true);
    setTotal(
      data.invoiceFields.reduce(
        (sum: number, item: any) =>
          sum + Number(item.amount.replace(/\./g, "")),
        0
      )
    );
  }, [data.invoiceFields]);
  if (!isClient) return null;

  return (
    <main className=" bg-slate-100 py-16">
      <div className=" flex justify-center space-x-4 mx-auto">
        <div className=" bg-white justify-center w-7/12 border shadow mb-10 px-10 py-20 space-y-10 rounded-xl">
          <div className="flex justify-between">
            <div className=" px-5">
              {/* <img src="/asset/LanceKit Logo.svg" width={180} alt="" /> */}

              {featuredImg ? (
                <div className="grid grid-cols-1">
                  <div className="relative w-[250px] h-[100px] mb-2">
                    <Image
                      src={featuredImg}
                      alt="Featured Image"
                      fill
                      className="object-scale-down rounded-xl"
                    />
                  </div>
                  <Button
                    className="flex items-center justify-center"
                    onClick={removeLogo}
                  >
                    Remove Logo
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    id="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-24 px-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center py-6 space-y-2">
                      <img src="/asset/upload-icon.svg" width={20} alt="" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <Input
                      type="file"
                      id="dropzone-file"
                      className="hidden"
                      onChange={handleFeturedImgChange}
                    />
                  </label>
                </div>
              )}
            </div>
            <h2 className="px-10 text-4xl font-bold align-middle">INVOICE</h2>
          </div>
          <div className="">
            <div className=" w-1/3 space-y-2">
              <Input
                name="ownerName"
                type="text"
                value={data.ownerName}
                placeholder="Your Name / Your Company"
                className=" border-0 cursor-pointer placeholder:italic"
                onChange={(event) => handleChangeData(event)}
              />
              {err.ownerName ? (
                <p className="text-xs text-red-500">{err.ownerName}</p>
              ) : null}
              <Input
                name="ownerAddress"
                type="text"
                value={data.ownerAddress}
                placeholder="Address, City"
                className=" border-0 cursor-pointer placeholder:italic"
                onChange={(event) => handleChangeData(event)}
              />
              {err.ownerAddress ? (
                <p className="text-xs text-red-500">{err.ownerAddress}</p>
              ) : null}
              <Input
                name="ownerCountry"
                type="text"
                value={data.ownerCountry}
                placeholder="Country"
                className=" border-0 cursor-pointer placeholder:italic"
                onChange={(event) => handleChangeData(event)}
              />
              {err.ownerCountry ? (
                <p className="text-xs text-red-500">{err.ownerCountry}</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between">
            <div className=" w-1/3 space-y-2">
              <div>Bill to :</div>
              <Input
                name="clientName"
                value={data.clientName}
                type="text"
                placeholder="Your Client Name / Company"
                className=" border-0 cursor-pointer placeholder:italic"
                onChange={(event) => handleChangeData(event)}
              />
              {err.clientName ? (
                <p className="text-xs text-red-500">{err.clientName}</p>
              ) : null}
              <Input
                name="clientAddress"
                value={data.clientAddress}
                type="text"
                placeholder="Address, City"
                className=" border-0 cursor-pointer placeholder:italic"
                onChange={(event) => handleChangeData(event)}
              />
              {err.clientAddress ? (
                <p className="text-xs text-red-500">{err.clientAddress}</p>
              ) : null}
              <Input
                name="clientCountry"
                value={data.clientCountry}
                type="text"
                placeholder="Country"
                className=" border-0 cursor-pointer placeholder:italic"
                onChange={(event) => handleChangeData(event)}
              />
              {err.clientCountry ? (
                <p className="text-xs text-red-500">{err.clientCountry}</p>
              ) : null}
            </div>
            <div className=" inline-block align-middle w-2/5 space-y-4 mr-10">
              <div></div>
              <div className="flex space-x-4 w-full align-middle">
                <span className=" inline-block w-2/3 align-middle">
                  Inv. Number&nbsp;:
                </span>
                <div className="w-full align-middle">
                  <Input
                    name="invoiceNumber"
                    value={data.invoiceNumber}
                    type="text"
                    placeholder="Invoice Number"
                    className="w-full border-0 cursor-pointer size placeholder:italic justify-end"
                    onChange={(event) => handleChangeData(event)}
                  />
                  {err.invoiceNumber ? (
                    <p className="text-xs text-red-500">{err.invoiceNumber}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex space-x-4 w-full">
                <p className="w-2/3">Inv. Date&nbsp;:</p>
                <div className="w-full align-middle">
                  <Input
                    name="invoiceDate"
                    value={data.invoiceDate}
                    type="date"
                    placeholder="13/11/2023"
                    className="w-full  cursor-pointer py-0 justify-end"
                    onChange={(event) => handleChangeData(event)}
                  />
                  {err.invoiceDate ? (
                    <p className="text-xs text-red-500">{err.invoiceDate}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex space-x-4 w-full">
                <p className="w-2/3">Due Date&nbsp;:</p>
                <div className="w-full align-middle">
                  <Input
                    name="dueDate"
                    value={data.dueDate}
                    type="date"
                    placeholder="20/11/2023"
                    className="w-full  cursor-pointer py-0 justify-end"
                    onChange={(event) => handleChangeData(event)}
                  />
                  {err.dueDate ? (
                    <p className="text-xs text-red-500">{err.dueDate}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className=" space-y-4">
            <InvoiceTable
              handleChange={handleChange}
              handleRemoveInvoice={handleRemoveInvoice}
              data={data}
              err={err}
              total={total}
            />
            <div className="space-x-2">
              <Button onClick={addItems} className=" text-md">Add Item</Button>
              {url && <div>{url}</div>}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="m-4 p-2 rounded-md border-2 border-black w-fit">
              <div className="text-center">PDF Themes</div>
              <div className="flex gap-1">
                <Button
                  variant={"roundedFull"}
                  className="bg-rose-600 hover:bg-red-600/90"
                  onClick={() => {
                    setColorPdf("#e11d48");
                  }}
                >
                  {colorPdf === "#e11d48" ? "✔" : ""}
                </Button>
                <Button
                  variant={"roundedFull"}
                  className="bg-blue-800 hover:bg-blue-800/90"
                  onClick={() => {
                    setColorPdf("#5468ff");
                  }}
                >
                  {colorPdf === "#5468ff" ? "✔" : ""}
                </Button>
                <Button
                  variant={"roundedFull"}
                  className="bg-slate-800 hover:bg-slate-800/90"
                  onClick={() => {
                    setColorPdf("#0f172a");
                  }}
                >
                  {colorPdf === "#0f172a" ? "✔" : ""}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/12 py-5">
            <div className="space-x-2 px-10">
              <Button onClick={createPdf} className=" py-10 text-xl w-full">Generate PDF</Button>
              {url && <div>{url}</div>}
            </div>
        </div>
      </div>
    </main>
  );
};

import { Button } from "@/components/invoiceMaker/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/invoiceMaker/ui/table";

import React from "react";

interface IinvoiceField {
  itemDescription: string;
  price: string;
  qty: string;
  amount: string;
}

export const InvoiceTable = ({
  handleChange,
  handleRemoveInvoice,
  data,
  total,
  err,
}: any) => {
  return (
    <div>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item Description</TableHead>
            <TableHead>Price per Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.invoiceFields.map(
            (
              { itemDescription, price, qty, amount }: IinvoiceField,
              i: number
            ) => {
              return (
                <TableRow className="" key={i}>
                  <TableCell>
                    {" "}
                    <input
                      onChange={(event) => handleChange(i, event)}
                      name="itemDescription"
                      type="text"
                      value={itemDescription}
                      placeholder=" Your item here "
                      className="w-full text-md h-fit py-2 placeholder-slate-600 px-2"
                    />
                    {err.invoiceFields[i].itemDescription ? (
                      <p className="text-xs text-red-500">
                        {err.invoiceFields[i].itemDescription}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <input
                      onChange={(event) => handleChange(i, event)}
                      name="price"
                      type="text"
                      value={price}
                      placeholder=" 25 "
                      className="w-full text-md h-fit py-2 placeholder-slate-600 px-2"
                    />
                    {err.invoiceFields[i].price ? (
                      <p className="text-xs text-red-500">
                        {err.invoiceFields[i].price}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <input
                      onChange={(event) => handleChange(i, event)}
                      name="qty"
                      type="text"
                      value={qty}
                      placeholder=" 4 "
                      className="w-full text-md h-fit py-2 placeholder-slate-600"
                    />
                    {err.invoiceFields[i].qty ? (
                      <p className="text-xs text-red-500">
                        {err.invoiceFields[i].qty}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    {" "}
                    <input
                      name="amount"
                      type="text"
                      value={amount}
                      placeholder="0"
                      className=" read-only:bg-slate-400 text-right placeholder-slate-600"
                    />
                  </TableCell>
                  <Button onClick={() => handleRemoveInvoice(i)}>X</Button>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      <div className="grid grid-cols-4 gap-4 justify-end w-full">
        <div className=" col-span-2"></div>
        <div className="text-end text-xl font-semibold">TOTAL :</div>
        <div className="text-center text-xl font-semibold">
          {new Intl.NumberFormat("id-ID").format(Number(total))}
        </div>
      </div>
    </div>
  );
};

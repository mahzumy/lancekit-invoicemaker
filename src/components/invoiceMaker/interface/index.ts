import { z } from "zod";

export const dataSchema = z.object({
  ownerName: z.string().min(1, "Owner Name"),
  ownerAddress: z.string().min(1, "Owner Address"),
  ownerCountry: z.string().min(1, "Owner Country"),
  clientName: z.string().min(1),
  clientAddress: z.string().min(1),
  clientCountry: z.string().min(1),
  invoiceNumber: z.string().min(1),
  invoiceDate: z.string().min(1),
  dueDate: z.string().min(1),
  invoiceFields: z.array(
    z.object({
      itemDescription: z.string().min(1, "Descrtiptions"),
      price: z.string().min(1, "Price"),
      qty: z.string().min(1, "Qty"),
      amount: z.string().min(1),
    })
  ),
});

export type TData = z.infer<typeof dataSchema>;

interface IinvoiceField {
  itemDescription: string;
  price: string;
  qty: string;
  amount: string;
}

export interface IError {
  ownerName: string;
  ownerAddress: string;
  ownerCountry: string;
  clientName: string;
  clientAddress: string;
  clientCountry: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  invoiceFields: IinvoiceField[];
}

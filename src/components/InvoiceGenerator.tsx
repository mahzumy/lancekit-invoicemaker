'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  

export const InvoiceGenerator = () => {
  const [isClient, setIsClient] = useState(false)

  const [data, setData] = useState({
    ownerName:'',
    ownerAddress:'',
    ownerCountry:'',
    clientName:'',
    clientAddress:'',
    clientCountry:'',
    invoiceNumber:'',
    invoiceDate:'',
    dueDate:'',
  })

  const [invoiceFields, setInvoiceFields] = useState([
    {
      itemDescription: '',
      price: '',
      qty: '',
      amount: 0,
    }
  ]);

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    //console.log(data)
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...invoiceFields];
    if (event.target.name === 'itemDescription') {
      values[index].itemDescription = event.target.value;
    } else if (event.target.name === 'qty') {
      values[index].qty = event.target.value;
      values[index].amount = Number(values[index].qty) * Number(values[index].price)
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
      values[index].amount = Number(values[index].qty) * Number(values[index].price)
    }
    setInvoiceFields(values);
    //console.log(invoiceFields);
  };

  const addItems = () => {
    setInvoiceFields([...invoiceFields,{
      itemDescription: '',
      price: '',
      qty: '',
      amount: 0,
    }])
  }

  const handleRemoveInvoice = (index: number) => {
    const values = [...invoiceFields];
    if (values.length === 1) {
      return false;
    }
    values.splice(index, 1);
    setInvoiceFields(values);
  };

  const docDefinition = {

    content: [  
      // Previous configuration  
      {  
        columns: [  
            [  
                {  
                    text: 'Name: '+ data.clientName,  
                    bold: true  
                },  
                { text: 'Address: ' + data.clientAddress },  
                { text: 'Country: ' + data.clientCountry },  
                //{ text: data.}  
            ],  
            [  
                {  
                    text: 'Invoice Date: ' + data.invoiceDate,  
                    alignment: 'right'  
                },  
                {  
                    text: 'Invoice Number:' + data.invoiceNumber,  
                    alignment: 'right'  
                }  
            ]  
        ]  
    }, 
      {  
          text: 'Order Details',  
          //style: 'sectionHeader'  
      },  
      {  
          table: {  
              headerRows: 1,  
              widths: ['*', 'auto', 'auto', 'auto'],  
              body: [  
                  ['Product', 'Price', 'Quantity', 'Amount'],  
                  ...invoiceFields.map(({itemDescription, qty, price, amount}) => ([itemDescription, qty, price, amount])),  
                  //[{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.products.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]  
              ]  
          }  
      }  
  ],


    // styles: {
    //   header: {
    //     fontSize: 22,
    //     bold: true,
    //   },
    //   anotherStyle: {
    //     italics: true,
    //     alignment: 'right',
    //   },
    // },
    
  };


  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition)
    // pdfGenerator.getBlob((blob) => {
    //   const url = URL.createObjectURL(blob);
    //   setUrl(url)
    // })
    pdfGenerator.download()
    //console.log(invoiceFields)
  }

  useEffect(()=>{
    setIsClient(true)
  },[])
  if(!isClient) return null

  return (
    <div className=' justify-center mx-auto w-8/12 border shadow my-10 p-10 space-y-10'>
      <div>
        <input type="image" placeholder='LOGO' />
      </div>
      <div className='flex justify-between'>
        <div className=' w-1/3 space-y-2'>
          <Input name='ownerName' type='text' value={data.ownerName} placeholder='Your Name / Your Company' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          <Input name='ownerAddress' type='text' value={data.ownerAddress} placeholder='Address, City' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          <Input name='ownerCountry' type='text' value={data.ownerCountry} placeholder='Country' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
        </div>
        <div className=' px-10 text-4xl font-bold'>
          <h2>INVOICE</h2>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className=' w-1/3 space-y-2'>
          <div>Bill to :</div>
          <Input name='clientName' value={data.clientName} type='text' placeholder='Your Client Name / Company' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          <Input name='clientAddress' value={data.clientAddress} type='text' placeholder='Address, City' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          <Input name='clientCountry' value={data.clientCountry} type='text' placeholder='Country' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
        </div>
        <div className=' inline-block align-middle w-2/5 space-y-4 mr-10'>
          <div></div>
          <div className='flex space-x-4 w-full align-middle'>
            <span className=' inline-block w-2/3 align-middle'>Invoice&nbsp;:</span>
            <Input name='invoiceNumber' value={data.invoiceNumber} type='text' placeholder='Invoice Number' className='w-full border-0 cursor-pointer size placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          </div>
          <div className='flex space-x-4 w-full'>
            <p className='w-2/3'>Invoice Date&nbsp;:</p>
            <Input name='invoiceDate' value={data.invoiceDate} type='date' placeholder='13/11/2023' className='w-full  cursor-pointer py-0' onChange={(event) => handleChangeData(event)}/>
          </div>
          <div className='flex space-x-4 w-full'>
            <p className='w-2/3'>Due Date&nbsp;:</p>
            <Input name='dueDate' value={data.dueDate} type='date' placeholder='20/11/2023' className='w-full  cursor-pointer py-0' onChange={(event) => handleChangeData(event)}/>
          </div>
          
        </div>
      </div>
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
              {invoiceFields.map(({itemDescription, price, qty, amount}, i)=>{
                return(
                <TableRow className='' key={i}>
                  <TableCell> <input onChange={(event)=>handleChange(i, event)} name='itemDescription' type="text" value={itemDescription} placeholder=' Your item here ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                  <TableCell> <input onChange={(event)=>handleChange(i, event)} name='qty'  type="number" value={qty}  placeholder=' 25 ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                  <TableCell> <input onChange={(event)=>handleChange(i, event)} name='price' type="number" value={price} placeholder=' 4 ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                  <TableCell className="text-right"> <input name='amount' type="number" value={amount} placeholder='0' className=' read-only:bg-slate-400 text-right placeholder-slate-600' /></TableCell>
                  <Button onClick={() => handleRemoveInvoice(i)}>X</Button>
                </TableRow>
              )})}
          </TableBody>
        </Table>
        <Button onClick={addItems}>Add Item</Button>
        <Button onClick={createPdf} >Generate PDF</Button>
      </div>
    </div>
  )
}

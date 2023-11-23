'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Input } from "@/components/invoiceMaker/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/invoiceMaker/ui/table"
import { Button } from '@/components/invoiceMaker/ui/button'

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  
import { TDocumentDefinitions } from "pdfmake/interfaces";

export const InvoiceGenerator = () => {
  const [url, setUrl] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [total, setTotal] = useState(0)
  const [featuredImg, setFeatureImg] = useState("")

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
    setTotal(invoiceFields.reduce((sum: number, item)=>sum + item.amount,0))
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

  const  docDefinition: TDocumentDefinitions = {
    content:  [  
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
    
  };

  const dd: TDocumentDefinitions = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: 'lancekitlogo',
                      width: 150    
          },
          {
            text: 'INVOICE', style: 'titleInvoice'
          }
        ]
      },
      {text: data.ownerName, style: 'ownerName'},
      {text: data.ownerAddress + ', ' + data.ownerCountry, style: 'pBreak1'},
      {text: 'Bill to:', style: 'h3Italic'},
      {
        columns: [
          {
            width: '*',
            text: data.clientName, style: 'billToName',
          },
          {
            width: 90,
            text: 'Invoice Date : ', style: 'pRight',
          },
          {
            width: 70,
            text: data.invoiceDate, style: 'pRight',
          },
        ]
      },
      {
          alignment: 'justify',
        columns: [
          {
            width: '*',
            text: data.clientAddress + ', '+ data.clientCountry, style: 'pBreakItalic'
          },
          {
            width: 90,
            text: 'Invoice Number :', style: 'pRight',
          },
          {
            width: 70,
            text: data.invoiceNumber, style: 'pRight',
          },
        ]
      },
      {
        style: 'tableExample',
        table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
          body: [
              [{text: 'Product', style: 'tableHeader', border: [false, false, false, false],}, {text: 'Quantity', style: 'tableHeader', border: [true, false, false, false]}, {text: 'Price per Unit', style: 'tableHeader', border: [true, false, false, false]}, {text: 'Amount', style: 'tableHeader',  border: [true, false, false, false]}],
              ...invoiceFields.map(({itemDescription, qty, price, amount}) => ([itemDescription, qty, price, amount])),
              //[{text: 'Logo Design', style: 'tableCellLeft',}, {text: 1, style: 'tableCellCenter'}, {text: '3.000.000,-', style: 'tableCellCenter'}, {text:'3.000.000,-', style: 'tableCellRight'} ],
            //[{text: 'Mockup Branding', style: 'tableCellLeft',}, {text: 10, style: 'tableCellCenter'}, {text: '5.00.000,-', style: 'tableCellCenter'}, {text:'5.000.000,-', style: 'tableCellRight'} ],
            [{ text: 'Total', colSpan: 3 }, {}, {}, total]
          ],
        },
        layout: {
          hLineWidth: function (i: number, node) {
            return (i === 0 || i === node.table.body.length) ? 1 : 1;
          },
          vLineWidth: function (i: number, node) {
            return (i === 0 || i === node.table.widths?.length) ? 1 : 1;
          },
          hLineColor: function (i: number, node) {
            return (i === 0 || i === node.table.body.length) ? '#bfdbfe' : '#bfdbfe';
          },
          vLineColor: function (i: number, node) {
            return (i === 0 || i === node.table.widths?.length) ? '#bfdbfe' : '#bfdbfe';
          },
          paddingTop: function(i: number, node) { return 20; },
          paddingLeft: function(i: number, node) { return 14; },
          paddingRight: function(i: number, node) { return 14; },
          // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (rowIndex, node, columnIndex) { return null; }
        }
          
      }
      
    ],
    defaultStyle: {
      columnGap: 100,
      lineHeight: 2.5
    },
    styles: {
          titleInvoice: {
            fontSize: 28,
            bold: true,
            alignment: 'right',
          },
          ownerName: {
            fontSize: 16,
            bold: true,
            lineHeight: 1.4,
          },
          pLeft: {
            alignment: 'left',
            lineHeight: 1.4,
          },
          pBreak1: {
            alignment: 'left',
            lineHeight: 4,
          },
          pBreakItalic: {
            alignment: 'left',
            lineHeight: 4,
            italics: true,
          },
          pRight: {
            alignment: 'right',
            lineHeight: 1.6
          },
          h3: {
            fontSize: 13,
            bold: true,
            lineHeight: 2,
            color: '#2563eb'
          },
          h3Italic: {
            fontSize: 13,
            bold: true,
            lineHeight: 2,
            italics: true,
            color: '#2563eb',
          },
          billToName: {
            fontSize: 16,
            bold: true,
            lineHeight: 1.4,
          },
          tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
          bold: true,
          color: 'white',
          fontSize: 13,
          fillColor: '#2563eb',
          alignment: 'center',
      },
      tableCellLeft: {
          alignment: 'left',
      },
      tableCellCenter: {
          alignment: 'center',
      },
      tableCellRight: {
          alignment: 'right',
      },
          
    },
    images: {
        //lancekitlogo: 'https://i.imgur.com/7fMUo7k.png',
        lancekitlogo: featuredImg,
        
    },
    pageMargins: [ 40, 60, 40, 60 ]
      
    
  }

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(dd)
    pdfGenerator.getBlob((blob) => {
      const url: string = URL.createObjectURL(blob);
      setUrl(url)
    })
    //pdfGenerator.download()
    //console.log(invoiceFields)
  }

  const handleFeturedImgChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const files: any = event.target.files
    const file: string = files[0]

    const fileReader: any = new FileReader();
    fileReader.onload = () => {
      setFeatureImg(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  useEffect(()=>{
    setIsClient(true)
  },[])
  if(!isClient) return null

  return (
    <div className=' justify-center mx-auto w-8/12 border shadow my-10 px-10 py-20 space-y-10'>
      <div className='flex justify-between'>
        <div className=' px-5'>
          {/* <img src="/asset/LanceKit Logo.svg" width={180} alt="" /> */}
          <div className='flex items-center justify-center w-full'>
            <label id='dropzone-file' className='flex flex-col items-center justify-center w-full h-24 px-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
              <div className='flex flex-col items-center justify-center py-6 space-y-2'>
                <img src="/asset/upload-icon.svg" width={20} alt="" />
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <Input type='file' id='dropzone-file' className='hidden' onChange={handleFeturedImgChange}/>
            </label>
          </div>
        </div>
        <h2 className='px-10 text-4xl font-bold align-middle'>INVOICE</h2>
      </div>
      <div className=''>
        <div className=' w-1/3 space-y-2'>
          <Input name='ownerName' type='text' value={data.ownerName} placeholder='Your Name / Your Company' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          <Input name='ownerAddress' type='text' value={data.ownerAddress} placeholder='Address, City' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
          <Input name='ownerCountry' type='text' value={data.ownerCountry} placeholder='Country' className=' border-0 cursor-pointer placeholder:italic' onChange={(event) => handleChangeData(event)}/>
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
            <span className=' inline-block w-2/3 align-middle'>Inv. Number&nbsp;:</span>
            <Input name='invoiceNumber' value={data.invoiceNumber} type='text' placeholder='Invoice Number' className='w-full border-0 cursor-pointer size placeholder:italic justify-end' onChange={(event) => handleChangeData(event)}/>
          </div>
          <div className='flex space-x-4 w-full'>
            <p className='w-2/3'>Inv. Date&nbsp;:</p>
            <Input name='invoiceDate' value={data.invoiceDate} type='date' placeholder='13/11/2023' className='w-full  cursor-pointer py-0 justify-end' onChange={(event) => handleChangeData(event)}/>
          </div>
          <div className='flex space-x-4 w-full'>
            <p className='w-2/3'>Due Date&nbsp;:</p>
            <Input name='dueDate' value={data.dueDate} type='date' placeholder='20/11/2023' className='w-full  cursor-pointer py-0 justify-end' onChange={(event) => handleChangeData(event)}/>
          </div>
          
        </div>
      </div>
      <div className=' space-y-4'>
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
                  <TableCell> <input onChange={(event)=>handleChange(i, event)} name='itemDescription' type="text" value={itemDescription} placeholder=' Your item here ' className='w-full text-md h-fit py-2 placeholder-slate-600 px-2'/></TableCell>
                  <TableCell> <input onChange={(event)=>handleChange(i, event)} name='qty'  type="number" value={qty}  placeholder=' 25 ' className='w-full text-md h-fit py-2 placeholder-slate-600 px-2'/></TableCell>
                  <TableCell> <input onChange={(event)=>handleChange(i, event)} name='price' type="number" value={price} placeholder=' 4 ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                  <TableCell className="text-right"> <input name='amount' type="number" value={amount} placeholder='0' className=' read-only:bg-slate-400 text-right placeholder-slate-600' /></TableCell>
                  <Button onClick={() => handleRemoveInvoice(i)}>X</Button>
                </TableRow>
              )})}
          </TableBody>
        </Table>  
        <div className='grid grid-cols-4 gap-4 justify-end w-full'>
          <div className=' col-span-2'></div>
          <div className='text-end text-xl font-semibold'>TOTAL :</div>
          <div className='text-center text-xl font-semibold'>{total}</div>
        </div>
        <div className='space-x-2'>
          <Button onClick={addItems}>Add Item</Button>
          <Button onClick={createPdf} >Generate PDF</Button>
            {url && (
              <div>
                {url}
              </div>
            )}
        </div>
        
      </div>
    </div>
  )
}

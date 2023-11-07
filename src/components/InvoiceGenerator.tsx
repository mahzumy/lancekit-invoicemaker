import React from 'react'
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


export const InvoiceGenerator = () => {
  return (
    <div className=' justify-center mx-auto w-8/12 border shadow my-10 p-10 space-y-10'>
      <div>
        <input type="image" placeholder='LOGO' />
      </div>
      <div className='flex justify-between'>
        <div className=' w-1/3 space-y-2'>
          <Input type='text' placeholder='Your Name / Your Company' className=' border-0 cursor-pointer placeholder:italic' />
          <Input type='text' placeholder='Address, City' className=' border-0 cursor-pointer placeholder:italic' />
          <Input type='text' placeholder='Country' className=' border-0 cursor-pointer placeholder:italic'/>
        </div>
        <div className=' px-10 text-4xl font-bold'>
          <h2>INVOICE</h2>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className=' w-1/3 space-y-2'>
          <div>Bill to :</div>
          <Input type='text' placeholder='Your Client Name / Company' className=' border-0 cursor-pointer placeholder:italic' />
          <Input type='text' placeholder='Address, City' className=' border-0 cursor-pointer placeholder:italic' />
          <Input type='text' placeholder='Country' className=' border-0 cursor-pointer placeholder:italic' />
        </div>
        <div className=' inline-block align-middle w-2/5 space-y-4 mr-10'>
          <div></div>
          <div className='flex space-x-4 w-full align-middle'>
            <span className=' inline-block w-2/3 align-middle'>Invoice&nbsp;:</span>
            <Input type='text' placeholder='Invoice Number' className='w-full border-0 cursor-pointer size placeholder:italic' />
          </div>
          <div className='flex space-x-4 w-full'>
            <p className='w-2/3'>Invoice Date&nbsp;:</p>
            <Input type='date' placeholder='13/11/2023' className='w-full  cursor-pointer py-0' />
          </div>
          <div className='flex space-x-4 w-full'>
            <p className='w-2/3'>Due Date&nbsp;:</p>
            <Input type='date' placeholder='20/11/2023' className='w-full  cursor-pointer py-0' />
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
              <TableRow className=''>
                <TableCell> <input type="text" placeholder=' Your item here ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                <TableCell> <input type="number" placeholder=' 25 ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                <TableCell> <input type="number" placeholder=' 4 ' className='w-full text-md h-fit py-2 placeholder-slate-600'/></TableCell>
                <TableCell className="text-right"> <input type="number" placeholder='0' className=' read-only:bg-slate-400 text-right placeholder-slate-600' /></TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <Button>Add Item</Button>
      </div>
    </div>
  )
}

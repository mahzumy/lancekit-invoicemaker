import { InvoiceGenerator } from "@/components/invoiceMaker/InvoiceGenerator";
import Image from "next/image";
import { HeaderAuth } from "@/components/header/header";
import { getServerSession } from "next-auth";
getServerSession;
import { options } from "@/utils/nextauth/option";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <div>
      <HeaderAuth session={session} />
      <InvoiceGenerator />
    </div>
  );
}

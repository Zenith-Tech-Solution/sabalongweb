import Image from "next/image";
import maintenanceIcon from "../public/maintenace.png"

export default function App() {
  return (
    <main className="min-h-screen bg-[#6367FF] flex justify-center items-center w-full flex-col gap-3">
      <Image src={maintenanceIcon} width={340} height={120} alt="maintenance"/>
      <p className=" text-white text-3xl max-md:text-2xl font-semibold">Kami Sedang Melakukan Perbaikan.</p>
      <p className=" text-white text-md">Maaf atas ketidaknyamanan nya</p>
    </main>
  )
}
import Image from "next/image";
import maintenanceIcon from "../../public/maintenace.png"

export default function Maintenance() {
  return (
    <main className="min-h-screen bg-[#6367FF] flex justify-center items-center w-full flex-col gap-3 px-6 text-center">
      <Image src={maintenanceIcon} width={340} height={120} alt="maintenance" priority />
      <p className="text-white text-3xl max-md:text-2xl font-semibold">Kami Sedang Melakukan Perbaikan.</p>
      <p className="text-white/80 text-md">Maaf atas ketidaknyamanannya. Silakan kembali lagi nanti.</p>
    </main>
  )
}

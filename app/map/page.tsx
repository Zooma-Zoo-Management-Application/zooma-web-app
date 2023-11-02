// import Header from '@/components/shared/Header'
"use client"

import { withPublic } from "@/hooks/useAuth";
import MapChart from "./components/MapChart";

function Page() {
  return (
    <div className='max-w-full mx-auto mt-16 mb-0 bg-white-500 rounded-sm p-4 sm:p-1'>
      <h2 className="mx-auto w-full text-center font-amsi font-bold py-2 pt-10">ZOOMA MAP</h2>
      <div className="max-w-6xl mx-auto">
        <MapChart />
      </div>
    </div>
  )
}

export default withPublic(Page)
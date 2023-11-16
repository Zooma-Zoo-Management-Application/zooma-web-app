"use client"

import { withPublic } from "@/hooks/useAuth"
import { getAnimals } from "@/lib/api/animalAPI"
import { getSpecies, getSpeciesByAreaId } from "@/lib/api/speciesAPI"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function AnimalsPage() {
  const [species, setSpecies] = useState([])
  const router = useRouter()

  const { areaId } = useParams()

  useEffect(() => {
    const initialize = async () => {
      try {
        const { data } = await getSpeciesByAreaId(+areaId || 1);
        if(data) setSpecies(data.species);
      } catch (err:any) {
        console.log(err);
      }
    }
    initialize();
  }, [])

  return (
    <div className="max-w-full mx-auto mt-16 mb-0 min-h-screen bg-white-500 rounded-sm py-3 px-4 sm:p-10">
      <h2 className="mx-auto w-full text-center font-amsi font-bold py-2 mb-10">OUR ANIMALS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-12">
        {
          species.length == 0 ? <>No Animals In This Area</> : species.map((specie:any) => (
            <div 
              key={specie.id} className="col-span-1 flex flex-col items-center cursor-pointer"
              onClick={() => router.push(`/animals/${specie.id}`)}
            >
              <div className={"w-full h-[200px]"}>
                <Image 
                  src={specie.imageUrl}
                  width={300}
                  height={300}
                  alt="species"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#07642C] w-full p-4 flex items-center flex-col h-[100px]">
                <p className="text-base lg:text-lg text-[#FCFF7E] font-bold">
                  {specie.name.toUpperCase()}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default withPublic(AnimalsPage)
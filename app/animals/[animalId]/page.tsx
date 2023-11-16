"use client"

import { withPublic } from '@/hooks/useAuth';
import { getAreasBasedOnSpecies } from '@/lib/api/areaAPI';
import { getSpeciesById } from '@/lib/api/speciesAPI';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge';

function Page() {
  const { animalId } = useParams();
  const [species, setSpecies] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter()
  const [areaOnSpecies, setAreaOnSpecies] = React.useState<any>([]);

  const paths = [
    "M 435.4 44.91 438.14 34.62 466.95 22.27 520.46 11.98 588.38 10.6 630.23 14.03 644.64 25.7 629.55 30.5 604.16 42.16 562.31 45.59 536.24 64.8 526.64 94.99 438.83 92.24 435.4 44.91 Z",
    "M 582.9 56.57 600.05 77.15 632.29 117.62 645.33 149.87 635.72 158.79 587.01 156.04 556.14 153.3 546.53 128.6 543.1 88.81 552.71 66.17 582.9 56.57 Z",
    "M 773.49 246.6 790.64 268.55 789.95 289.13 778.29 300.11 743.3 292.56 693.91 285.7 638.34 300.79 610.9 315.2 582.77 316.57 567.67 300.79 584.14 265.81 613.64 250.71 689.79 242.48 730.27 241.11 773.49 246.6 Z",
    "M 750.16 317.26 766.63 330.29 783.09 352.93 788.58 385.86 781.72 416.73 755.65 417.42 650.69 418.11 605.41 416.73 588.26 405.07 577.28 377.63 577.97 357.05 600.61 349.5 626.68 320 678.13 309.71 714.49 306.97 750.16 317.26 Z",
    "M 601.42 52.45 630.92 42.85 655.62 31.87 696.78 16.78 733.83 2.37 764.7 6.49 768.81 38.05 776.36 68.92 793.51 115.57 799 140.26 767.44 145.75 720.79 150.55 685.8 152.61 655.62 147.81 650.81 138.21 635.72 104.59 619.94 80.58 601.42 52.45 Z",
    "M 726.28 160.84 761.83 160.16 768 172.51 764.57 195.15 769.37 208.18 773.49 230.82 738.5 228.08 684.99 230.82 647.26 238.37 614.33 239.74 605.41 223.27 608.15 209.55 630.11 195.15 647.26 184.17 682.24 176.62 709.69 161.53 726.28 160.84 Z",
    "M 449.67 117.62 505.93 115.57 534.06 162.9 557.38 165.65 577.28 184.86 571.79 214.35 545.04 247.28 503.19 259.63 472.31 291.88 451.05 287.07 415.37 265.81 438.01 222.59 450.36 195.83 453.79 154.67 449.67 117.62 Z",
    "M 96.49 103.22 117.07 112.82 152.06 140.95 195.28 168.39 222.72 179.37 254.96 188.97 285.84 204.06 286.52 213.67 255.65 214.35 198.02 211.61 163.72 214.35 135.59 232.88 108.15 235.62 61.5 224.65 28.57 224.65 26.51 208.18 34.74 178.68 67.67 127.23 96.49 103.22 Z",
    "M 112.27 95.67 121.19 71.66 141.77 60 180.87 53.82 220.66 73.72 232.33 92.24 254.28 100.47 254.28 112.82 236.44 122.43 216.55 133.4 192.53 138.21 175.38 134.78 160.98 132.72 148.63 117.62 112.27 95.67 Z",
    "M 286.4 239.74 313.15 261.69 315.21 275.41 280.91 278.16 215.73 285.7 167.02 280.9 137.52 265.12 149.19 249.34 189.66 241.8 238.37 238.37 286.4 239.74 Z",
    "M 198.71 38.05 239.87 12.66 301.62 1 341.41 5.8 396.29 14.03 423.73 31.19 423.73 59.31 425.1 83.32 388.06 84.7 347.58 84.7 307.1 82.64 265.26 75.09 243.99 70.97 228.21 54.51 210.37 48.34 198.71 38.05 Z",
    "M 68.92 253.46 80.58 269.24 79.9 293.25 68.23 320.69 53.83 352.25 33.24 351.56 1 344.01 3.74 315.89 11.98 271.98 37.36 248.66 68.92 253.46 Z",
    "M 9.92 380.37 39.42 372.83 70.98 363.22 84.01 339.21 108.71 303.54 133.41 299.42 179.37 301.48 219.16 302.85 276.79 294.62 316.58 291.88 324.81 309.71 319.33 337.15 341.28 361.16 344.71 395.47 338.54 427.02 261.7 430.45 197.21 428.4 135.47 419.48 114.88 433.2 70.98 438 27.76 435.26 14.72 409.87 9.92 380.37 Z",
    "M 275.42 119.68 338.54 113.51 415.37 109.39 435.95 119 437.33 158.1 424.29 189.66 389.99 241.8 379.01 267.18 353.63 263.06 325.5 231.51 317.95 204.75 296.69 181.43 261.01 169.08 234.94 148.5 256.9 134.09 275.42 119.68 Z",
]

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getSpeciesById(+animalId);
        const { data } = res;
        setSpecies(data);

      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [animalId])

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getAreasBasedOnSpecies(+animalId);
        const { data } = res;
        setAreaOnSpecies(data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [animalId])


  return (
    <div className="max-w-full mx-auto mt-16 mb-0 min-h-screen bg-white-500 rounded-sm py-3 px-4 sm:p-10">
      {
        isLoading ? <div>Loading...</div> : (
          <div>
            {
              species == null ? <div>Not found</div> : (
                <div className=''>
                  <div className='w-full h-96'>
                    <Image
                      src={species?.imageUrl}
                      alt={species?.name}
                      width={500}
                      height={500}
                      className=" w-full h-full bg-center rounded-sm object-cover"
                    />
                  </div>
                  <h2 className='mt-8'>Animal Information:</h2>
                  <div className="mt-4 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">{species?.name}</h1>
                    <p className="text-base">{species?.description}</p>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
      <h2 className='mt-8'>Check this species on our map</h2>
      <div className='w-full zoo-map flex justify-center p-10 relative'>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="800" height="439" viewBox="0 0 800 439" strokeLinecap="round" strokeLinejoin="round">
          <g id="zoo-map" className="aspect-video">
            {
              paths.map((path:any, index:number) => {
                let isHave = false;
                if(species != null){
                  isHave = areaOnSpecies.includes(index+1)
                }
                
                return (
                  <>
                    <path className={twMerge("area-path", isHave && " area-path-animal animate-pulse")} d={paths[index]} 
                    key={index}
                    onClick={() => router.push(`/map/${index+1}`)}
                    />
                  </>
                )
              })
            }
          </g>
          </svg>
      </div>
    </div>
  )
}

export default withPublic(Page)
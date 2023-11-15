"use client"

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { UpdateAreaForm } from '../components/UpdateAreaForm'
import { CreateCageForm } from '../components/CageCreateForm'
import DataTableSkeleton from '../../components/DataTableSkeleton'
import { DataTable } from '../components/data-table'
import { columns } from '../components/columns'
import { getAreaById, getCagesByAreaId } from '@/lib/api/areaAPI'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { getSpeciesByAreaId } from '@/lib/api/speciesAPI'

function AreaDetailPage() {
  const { areaId } = useParams()

  const [cages, setCages] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState<boolean>(false)
  const [currentArea, setCurrentArea] = useState<any>(null)
  const [dialogUpdateAreaOpen, setDialogUpdateAreaOpen] = useState<boolean>(false)

  const [species, setSpecies] = useState<any>([])

  
  useEffect(() => {
    const initialize = async () => {
      try {
        const resArea = await getAreaById(+areaId);
        setCurrentArea(resArea.data)

        const resSpecies = await getSpeciesByAreaId(+areaId);
        if(resSpecies.data != null){
          setSpecies(resSpecies.data.species)
        }

        const res = await getCagesByAreaId(+areaId);
        const { data } = res;
        if(data == null){
          setCages([])
          return;
        }
        setCages(data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [])

  const router = useRouter()

  return (
    <div className='space-y-4 p-4'>
        <h5 className="underline cursor-pointer p-4 flex items-center gap-2" onClick={() => router.push("/dashboard/areas/list")}>
          <ArrowLeft className="inline-flex" size={24}/> Back to list </h5>

        <div>
          {
            isLoading ? (
              <Card>
                <CardHeader>
                  <Skeleton className="w-24 h-24 rounded-full" />
                </CardHeader>
                <CardTitle>
                  <Skeleton className="w-1/2 h-8" />
                </CardTitle>
              </Card>
            ) : (
              <Card className="flex items-center w-full justify-between pr-4">
                <CardHeader>
                  <CardTitle>{currentArea.name}</CardTitle>
                  <CardDescription>{currentArea.description}</CardDescription>
                  <div className="flex -space-x-4 rtl:space-x-reverse">
                    {
                      species.length == 0 ? (
                        <h5>No Animal in this area</h5>
                      ) : (
                        species.map((specie:any) => (
                          <Image
                            key={specie.id}
                            className="w-20 h-20 border-2 border-white rounded-full dark:border-gray-800" 
                            src={specie.imageUrl}
                            width={80}
                            height={80}
                            alt="animal" 
                          />
                        ))
                      )
                    }
                  </div>
                </CardHeader>
                <Button type="button" variant="default"
                  onClick={() => setDialogUpdateAreaOpen(true)}
                >Update</Button>
                <Dialog open={dialogUpdateAreaOpen} onOpenChange={setDialogUpdateAreaOpen}>
                  <DialogContent>
                    <DialogHeader>Update Area Information</DialogHeader>
                    <UpdateAreaForm id={currentArea.id} values={currentArea} setOpen={setDialogUpdateAreaOpen}/>
                  </DialogContent>
                </Dialog>
              </Card>
            )
          }
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading && cages.length == 0 ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={cages} />
            )
          }
        </div>
    </div>
  )
}

export default AreaDetailPage

const CreateFormDialog = ({ open, setOpen, areaId = 1, currentArea }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  areaId: number,
  currentArea: any
}) => {

  const handleClose = () => {
    setOpen(false)
  }

  const values = {
    userName: "",
    email: "",
    fullName: "",
    gender: "",
    dateOfBirth: new Date(),
    avatarUrl: "",
    phoneNumber: "",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Create Cage</DialogHeader>
        <CreateCageForm setOpen={setOpen} areaId={areaId} currentArea={currentArea}/>
      </DialogContent>
    </Dialog>
  )
}
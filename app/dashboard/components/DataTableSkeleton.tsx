import React from 'react'

export default function DataTableSkeleton() {
  return (
    <div className="p-10 border rounded-sm border-gray-400">
      <div className="animate-pulse">
        <div className="h-4 mt-3 mb-6 rounded grid grid-cols-5 gap-6">
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
        </div>
        <div className="h-4 mt-3 mb-6 rounded grid grid-cols-5 gap-6">
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
        </div>
        <div className="h-4 mt-3 mb-6 rounded grid grid-cols-5 gap-6">
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
          <div className="col-span-1 mr-2 bg-gray-300" />
        </div>
      </div>
    </div>
  )
}

import { columns } from "@/app/dashboard/staff/news/components/columns";
import { DataTable } from "@/app/dashboard/staff/news/components/data-table";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants/appInfos";
import axios from "axios";
import { Metadata } from "next";
import { z } from "zod";
import { newSchema } from "./data/schema";
import { useRouter } from "next/navigation";
export const metadata: Metadata = {
  title: "News",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getNews() {
  const data = await axios.get(`${BASE_URL}/api/News`)
  const news = JSON.parse(JSON.stringify(data.data))
  return z.array(newSchema).parse(news)

  // return data;
}

async function UserManagementPage() {
  const data = await getNews()

  // console.log('data', data.data)
  // const data = [
  //   {
  //     "id": 1,
  //     "title": "New Lion Arrival",
  //     "content": "We have a new lion named Simba!",
  //     "date": "2023-09-21T22:43:28.927",
  //     "status": false,
  //     "userId": 1,
  //     "description": "description 1",
  //     "image": null,
  //   },
  //   {
  //     "id": 2,
  //     "title": "New Lion Arrival 2",
  //     "content": "We have a new lion named Simba! 2",
  //     "date": "2023-09-21T22:43:28.927 2",
  //     "status": false,
  //     "userId": 1,
  //     "description": "description 2",
  //     "image": null,
  //   },
  // ]

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">News Management</h2>
            <a href="/dashboard/staff/news/create">
              <Button variant="default">
                Create
              </Button>
            </a>
        </div>
        {/* <div className="grid gap-4 grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total User
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2350</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Now
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
            </CardContent>
          </Card>
        </div> */}
        <div className="flex-1 space-y-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
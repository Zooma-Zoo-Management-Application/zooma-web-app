import { getRandomValues, randomInt, randomUUID } from "crypto"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getUserMockData(): Promise<any[]> {
  const randomFromOneToFour = () => randomInt(4) + 1;
  let status = 'online';

  switch (randomFromOneToFour()) {
    case 1:
      status = 'online';
      break;
    case 2:
      status = 'offline';
      break;
    case 3:
      status = 'away';
      break;
    case 4:
      status = 'busy';
      break;
  }

  return new Array(50).fill(null).map(() => (
    {
      id: randomUUID(),
      username: 'John Doe' + randomInt(1000),
      email: 'John Doe' + randomInt(1000) + "@gmail.com",
      status,
    }
  ))
}

async function UserManagementPage() {
  const data = await getUserMockData()

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        </div>
        <div className="grid gap-4 grid-cols-2">
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
              </div>
        <div className="flex-1 space-y-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
import { getRandomValues, randomInt, randomUUID } from "crypto"

async function getUserMockData(): Promise<any[]> {
  return new Array(50).fill(null).map(() => (
    {
      id: randomUUID(),
      username: 'John Doe' + randomInt(1000),
      email: 'John Doe' + randomInt(1000) + "@gmail.com",
    }
  ))
}

function UserManagementPage() {

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-8">
        
      </div>
    </div>
  )
}

export default UserManagementPage
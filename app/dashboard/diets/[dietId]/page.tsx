"use client"

import { useParams, useRouter } from 'next/navigation';

function UserManagementPage() {
    const router = useRouter()
    const { dietId } = useParams();
    router.push(`/dashboard/diets/${dietId}/view`);
}

export default UserManagementPage
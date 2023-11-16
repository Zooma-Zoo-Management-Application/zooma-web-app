"use client"

import { withProtected } from '@/hooks/useAuth';
import { useParams, useRouter } from 'next/navigation';

function UserManagementPage() {
    const router = useRouter()
    const { dietId } = useParams();
    router.push(`/dashboard/diets/${dietId}/view`);
}

export default withProtected(UserManagementPage)
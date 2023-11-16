"use client"
import { withProtected } from "@/hooks/useAuth";
import { SkillDetailForm } from "../components/expForm";

function CreateExperiencePage() {
    return (
        <div className="hidden flex-col md:flex w-full">
            <div className="flex-1 space-y-4 px-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight pt-5">Create Experience</h2>
                </div>
                <SkillDetailForm />
            </div>
        </div>
    )
}
export default withProtected(CreateExperiencePage)
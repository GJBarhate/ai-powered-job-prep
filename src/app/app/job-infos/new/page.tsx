import { BackLink } from "@/components/BackLink"
import { Card, CardContent } from "@/components/ui/card"
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm"

export default function JobInfoNewPage() {
  return (
    <div className="container my-4 max-w-5xl space-y-4">
      <BackLink href="/app">Dashboard</BackLink>

      <h1 className="text-3xl md:text-4xl">Create New Job Description</h1>

      <Card>
        <CardContent>
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  )
}

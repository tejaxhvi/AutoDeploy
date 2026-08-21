import { LogOut, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UploadDeploymentForm } from "@/components/UploadDeploymentForm"
import { DeploymentGrid } from "@/components/DeploymentGrid"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

const mockDeployments = [
  {
    deploymentId: "a1b2c3d4",
    status: "ready",
    fileName: "my-portfolio.html",
    subdomain: "a1b2c3d4.localhost",
    publicUrl: "http://localhost:3001/sites/a1b2c3d4",
    createdAt: "2026-08-21T10:00:00Z",
    timeAgo: "2 hours ago",
  },
  {
    deploymentId: "e5f6g7h8",
    status: "pending",
    fileName: "blog.html",
    subdomain: "e5f6g7h8.localhost",
    publicUrl: "http://localhost:3001/sites/e5f6g7h8",
    createdAt: "2026-08-21T11:30:00Z",
    timeAgo: "Pending deployment",
  },
  {
    deploymentId: "i9j0k1l2",
    status: "failed",
    fileName: "landing.html",
    subdomain: "i9j0k1l2.localhost",
    publicUrl: "http://localhost:3001/sites/i9j0k1l2",
    createdAt: "2026-08-21T09:00:00Z",
    timeAgo: "1 day ago",
  },
]

export default function Dashboard() {

  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault()
    console.log("Upload submitted")
  }


  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 items-center justify-between gap-4 px-4 lg:px-6">
          <h1 className="text-lg font-semibold">Auto Deploy</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={16} />
              user@example.com
            </div>

            <Button variant="ghost" size="sm" className="h-8 gap-1.5">
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 lg:px-6">

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <UploadDeploymentForm onUpload={handleUpload} />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-large text-muted-foreground">
              Your Deployments
            </h2>
            <Button size="sm" className="gap-1.5"
              onClick={() => setIsOpen(true)}
            >
              <Plus size={16} />
              <h2> New Deployment </h2>
            </Button>
          </div>
          <DeploymentGrid deployments={mockDeployments} isLoading={false} />
        </div>
      </main>
    </div>
  )
}

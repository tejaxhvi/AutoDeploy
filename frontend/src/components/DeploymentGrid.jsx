import { DeploymentCard } from "@/components/DeploymentCard"
import { Skeleton } from "@/components/ui/skeleton"

export function DeploymentGrid({ deployments, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }

  if (!deployments || deployments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground">
          No deployments yet. Upload your first site above.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {deployments.map((deployment) => (
        <DeploymentCard key={deployment.deploymentId} deployment={deployment} />
      ))}
    </div>
  )
}

import { Globe, ExternalLink, Copy, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusConfig = {
  pending: {
    icon: Loader2,
    label: "Pending",
    badgeVariant: "warning",
    spin: true,
  },
  ready: {
    icon: CheckCircle2,
    label: "Ready",
    badgeVariant: "success",
    spin: false,
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    badgeVariant: "destructive",
    spin: false,
  },
}

export function DeploymentCard({ deployment }) {
  const config = statusConfig[deployment.status] || statusConfig.pending
  const StatusIcon = config.icon

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant={config.badgeVariant} className="gap-1">
            <StatusIcon
              className={config.spin ? "animate-spin" : ""}
              size={12}
            />
            {config.label}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-lg">
          {deployment.fileName}
        </CardTitle>
        <CardDescription>
          {deployment.subdomain}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe size={14} />
            {deployment.publicUrl}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span>
              Deployed {deployment.timeAgo}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={deployment.status !== "ready"}
            className="h-9 gap-1.5"
            onClick={() => window.open(deployment.publicUrl, "_blank", "noopener noreferrer")}
          >
            <ExternalLink size={14} />
            Open Site
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9"
            aria-label="Copy URL"
            onClick={() => navigator.clipboard.writeText(deployment.publicUrl)}
          >
            <Copy size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

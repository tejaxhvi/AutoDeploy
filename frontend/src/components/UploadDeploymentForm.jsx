import { useState } from "react"
import { Upload, FileText, FileCode, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

export function UploadDeploymentForm({ onUpload }) {
  const [htmlFile, setHtmlFile] = useState(null)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!htmlFile) {
      setError("An HTML file is required")
      return
    }
    setError("")
    onUpload(e)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Deployment</CardTitle>
        <CardDescription>
          Upload your HTML file (and optional CSS) to deploy a new site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="html-file" className="flex items-center gap-2">
                <FileText size={16} />
                HTML File
              </FieldLabel>
              <Input
                id="html-file"
                type="file"
                accept=".html"
                required
                onChange={(e) => setHtmlFile(e.target.files?.[0] ?? null)}
              />
              <FieldDescription>
                The main HTML file for your site.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="css-file" className="flex items-center gap-2">
                <FileCode size={16} />
                CSS File (optional)
              </FieldLabel>
              <Input
                id="css-file"
                type="file"
                accept=".css"
                onChange={(e) => e.target.files?.[0]}
              />
              <FieldDescription>
                Optional stylesheet for your site.
              </FieldDescription>
            </Field>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <Field>
              <Button type="submit" className="w-full">
                <Upload size={16} />
                Upload Deployment
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

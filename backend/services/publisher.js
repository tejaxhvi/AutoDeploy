import { mkdir, writeFile, rename, rm } from "fs/promises";
import path from "path";

const SITES_ROOT = `/home/tejashvi/projects/AutoDeploy/sites`;
const ID_PATTERN = /^[a-f0-9-]{8}$/;

/*
 * Materializes a deployment onto local disk so Caddy can serve it.
 *
 * Write-to-temp-then-rename is the important part. rename() within one
 * filesystem is atomic, so Caddy sees either no directory or a complete one,
 * never a half-written site. Without this, a visitor hitting the URL
 * mid-write could get a truncated HTML file.
 */
export async function publishToDisk({ deploymentId, files }) {
  if (!ID_PATTERN.test(deploymentId)) {
    throw new Error("Invalid deployment id");
  }

  const tmpDir = path.join(SITES_ROOT, `.tmp-${deploymentId}`);
  const finalDir = path.join(SITES_ROOT, deploymentId);

  try {
    await mkdir(tmpDir, { recursive: true });

    // The HTML entry point is always saved as index.html so file_server's
    // default index lookup works regardless of what the user named it.
    // Other files keep their basename (path.basename strips any directory
    // components a malicious originalname might carry, e.g. "../../x").
    let htmlWritten = false;
    await Promise.all(
      files.map((file) => {
        let name;
        if (file.mimetype === "text/html" && !htmlWritten) {
          htmlWritten = true;
          name = "index.html";
        } else {
          name = path.basename(file.originalname);
        }
        return writeFile(path.join(tmpDir, name), file.buffer);
      }),
    );

    await rename(tmpDir, finalDir);
  } catch (err) {
    await rm(tmpDir, { recursive: true, force: true });
    throw err;
  }

  return `http://${deploymentId}.localhost`;
}
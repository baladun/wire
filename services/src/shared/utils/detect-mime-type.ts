
export function detectMimeType(buffer: Buffer): Promise<string> {
  return (eval(`import('file-type')`) as Promise<typeof import('file-type')>)
    .then(res => res.fileTypeFromBuffer(buffer))
    .then(val => val.mime);
}

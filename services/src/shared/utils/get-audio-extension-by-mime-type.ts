const MAP = {
  'audio/mp4': 'mb4',
  'audio/aac': 'aac',
  'audio/mpeg': 'mp3',
  'audio/ogg': 'ogg',
};

export function getAudioExtensionByMimeType(mime: string): string {
  return MAP[mime];
}


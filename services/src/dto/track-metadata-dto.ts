import { TrackMetadataCoverDto } from './track-metadata-cover-dto';

export class TrackMetadataDto {
  title: string;
  artist: string;
  genre: string;
  year: number;
  mimeType: string;
  durationInSec: number;
  imageCover?: TrackMetadataCoverDto;
}

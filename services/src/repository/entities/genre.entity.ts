import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  genreId: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  id3: number;

  @ManyToMany(() => Artist, artist => artist.genres)
  artists: Artist[];

  @ManyToMany(() => Track, track => track.genres)
  tracks: Track[];
}

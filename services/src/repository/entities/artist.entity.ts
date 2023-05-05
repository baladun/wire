import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';
import { Genre } from './genre.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artistId: number;

  @Column()
  name: string;

  @OneToMany(() => Track, track => track.artist)
  tracks: Track[];

  @ManyToMany(() => Genre, genre => genre.artists, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({
    name: 'artist_genre',
    joinColumn: {
      name: 'artist_id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
    },
  })
  genres: Genre[];
}

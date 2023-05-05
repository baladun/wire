import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '@wire/repository';
import { Media } from './media.entity';
import { Genre } from './genre.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  trackId: number;

  @Column()
  title: string;

  @ManyToOne(() => Artist, artist => artist.tracks, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @Column()
  year: number;

  @Column()
  durationInSec: number;

  @OneToOne(() => Media, media => media.mediaId, {
    onDelete: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'audio_id' })
  audio: Media;

  @ManyToOne(() => Media, media => media.mediaId, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'cover_id' })
  cover?: Media;

  @ManyToMany(() => Genre, genre => genre.tracks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({
    name: 'track_genre',
    joinColumn: {
      name: 'track_id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
    },
  })
  genres: Genre[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

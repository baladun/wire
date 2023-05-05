import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  playlistId: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.playlists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Min, Max, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Min(1)
  @Max(250)
  name: string;

  @Column()
  @Max(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  //items Набор ссылок на подарки
  @OneToMany(() => Wish, (wish) => wish.id)
  items: Wish[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne, ManyToMany, JoinTable
} from "typeorm";
import { Min, Max, IsUrl, IsOptional, Length } from "class-validator";
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishlist)
  user: User;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(1, 1500)
  @IsOptional()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.wishlist)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
}

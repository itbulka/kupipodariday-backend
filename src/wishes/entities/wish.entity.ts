import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsUrl, Max, Min, IsNumber } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Min(2)
  @Max(250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  raised: number;

  @ManyToMany(() => User, (user) => user.wishes)
  owner: User[];

  @Column()
  @Min(1)
  @Max(1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column()
  @IsNumber()
  copied: number;
}

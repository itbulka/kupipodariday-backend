import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, ManyToMany
} from "typeorm";
import { Min, Max, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from "../../wishes/entities/wish.entity";
import { Wishlist } from "../../wishlists/entities/wishlist.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    unique: true,
  })
  @Min(2)
  @Max(30)
  @IsNotEmpty()
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Min(2)
  @Max(200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @ManyToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}

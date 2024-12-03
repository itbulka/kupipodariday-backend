import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish, User])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { WishesService } from './wishes/wishes.service';
import { WishesController } from './wishes/wishes.controller';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsService } from './wishlists/wishlists.service';
import { WishlistsController } from './wishlists/wishlists.controller';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersService } from './offers/offers.service';
import { OffersController } from './offers/offers.controller';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [
    AppController,
    UsersController,
    WishesController,
    WishlistsController,
    OffersController,
  ],
  providers: [UsersService, WishesService, WishlistsService, OffersService],
})
export class AppModule {}

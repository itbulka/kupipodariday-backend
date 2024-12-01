import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto) {
    return 'This action adds a new offer';
  }
  findAll() {
    return `This action returns all offers`;
  }
  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }
  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }
  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number) {
    const { amount, itemId } = createOfferDto;

    const owner = await this.userRepository.findOneBy({ id: userId });
    const wish = await this.wishRepository.findOne({
      where: { id: itemId },
      relations: ['owner', 'offers'],
    });

    if (userId === wish.owner.id) {
      throw new ForbiddenException('Вы не можете скидываться на свой подарок');
    }

    const raised = wish.raised + amount;
    if (raised > wish.price) {
      throw new BadRequestException('Сумма заявки больше');
    }
    wish.raised += amount;

    await this.wishRepository.update(itemId, { raised: raised });

    return this.offerRepository.save({
      ...createOfferDto,
      owner: owner,
      item: wish,
    });
  }

  findAll() {
    return this.offerRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
  }

  findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }
}

import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post
} from "@nestjs/common";
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from "./dto/update-offer.dto";

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  create(@Body() body: CreateOfferDto) {
    return this.offersService.create(body);
  }

  @Get()
  getAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.offersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.offersService.remove(+id);
  }
}

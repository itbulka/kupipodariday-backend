import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
      const user = await this.userRepository.save({
        ...createUserDto,
        password: passwordHash,
      });
      return user;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError;
        if (err.code === '23505') {
          throw new ConflictException('username already exist');
        }
      }
    }
  }
  findAll() {
    return `This action returns all users`;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  updateOne(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  removeOne(id: number) {
    return `This action removes a #${id} user`;
  }
}

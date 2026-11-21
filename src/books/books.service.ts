import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository : Repository<Book>,
  ) {}


  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id: +id } });
    if (!book) {
      throw new NotFoundException(`Book #${id} is not found`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({ id: +id, ...updateBookDto });
    if (!book){
      throw new NotFoundException("Book with #${id} is not found")
    }
    return this.bookRepository.save(book);
  }


  async remove(id: number) {
    const book = await this.bookRepository.findOne({ where: { id: +id } });
    if (!book) {
      throw new NotFoundException(`Book #${id} is not found`);
    }
    return this.bookRepository.remove(book);
  }
}

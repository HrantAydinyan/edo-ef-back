import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogsSection } from './blogs.entity';
import { CreateBlogDto, UpdateBlogDto } from './dtos';
import { PageDto, PageMetaDto, PageOptionsSearchDto } from 'src/common';
import { BlogNotFoundException } from './exceptions';
import { unlinkFile } from 'src/utils';
import { IBlogFiles } from './interfaces';
import { BloggersService } from '../bloggers/bloggers.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogsSection)
    private readonly blogsRepository: Repository<BlogsSection>,
    private readonly bloggersService: BloggersService,
  ) {}

  async findAllPaginated(
    pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<BlogsSection>> {
    const { search, skip, take, order } = pageOptionsSearchDto;

    const queryBuilder = this.blogsRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.blogger', 'blogger');

    if (search) {
      queryBuilder.where('(blog.title ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('blog.createdAt', order);

    queryBuilder.skip(skip).take(take);

    const [data, totalCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      totalCount,
      pageOptionsDto: pageOptionsSearchDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findByIdOrFail(id: number): Promise<BlogsSection> {
    // const blog = await this.blogsRepository.findOneBy({ id });
    const blog = await this.blogsRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.blogger', 'blogger')
      .where('blog.id = :id', { id })
      .getOne();

    if (!blog) {
      throw new BlogNotFoundException();
    }
    return blog;
  }

  async create(
    createBlogDto: CreateBlogDto,
    files: IBlogFiles,
  ): Promise<BlogsSection> {
    const existingBlogger = await this.bloggersService.findByIdOrFail(
      createBlogDto.bloggerId,
    );

    const blog = this.blogsRepository.create({
      ...createBlogDto,
      blogger: existingBlogger,
    });

    blog.filePath = `/public/blogs/${files.filePath[0].filename}`;
    blog.filePathType = files.filePath[0].mimetype;

    return this.blogsRepository.save(blog);
  }

  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    files: IBlogFiles,
  ): Promise<BlogsSection> {
    const existingBlogger = await this.bloggersService.findByIdOrFail(
      updateBlogDto.bloggerId,
    );

    const existingBlog = await this.blogsRepository.findOneBy({ id });
    if (!existingBlog) {
      throw new BlogNotFoundException();
    }

    const updatedEntry = this.blogsRepository.merge(existingBlog, {
      ...updateBlogDto,
      blogger: existingBlogger,
    });

    if (files.filePath && files.filePath[0]) {
      if (existingBlog.filePath) await unlinkFile(existingBlog.filePath);
      updatedEntry.filePath = `/public/blogs/${files.filePath[0].filename}`;
      updatedEntry.filePathType = files.filePath[0].mimetype;
    }

    return this.blogsRepository.save(updatedEntry);
  }

  async findById(id: number): Promise<BlogsSection> {
    const existingBlog = await this.blogsRepository.findOneBy({
      id,
    });

    if (!existingBlog) {
      throw new BlogNotFoundException();
    }

    return existingBlog;
  }

  async remove(id: number): Promise<void> {
    const blog = await this.findById(id);

    await Promise.all([
      unlinkFile(blog.filePath),
      unlinkFile(blog.filePathType),
      this.blogsRepository.delete({ id: blog.id }),
    ]);
  }
}

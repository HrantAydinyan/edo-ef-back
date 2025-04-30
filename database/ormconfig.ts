// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import { databaseConfigSchema } from 'src/utils';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Admin } from 'src/modules/admin/admin.entity';
import { PrivacyPolicy } from 'src/modules/privacy-policy/privacy-policy.entity';
import { HeroSection } from 'src/modules/hero-section/hero-section.entity';
import { ServicesSection } from 'src/modules/services/services.entity';
import { ToolsSection } from 'src/modules/tools/tools.entity';
import { TeamSection } from 'src/modules/team/team.entity';
import { BloggersSection } from 'src/modules/bloggers/bloggers.entity';
import { BlogsSection } from 'src/modules/blogs/blogs.entity';
import { EventsSection } from 'src/modules/events/events.entity';
import { Imprint } from 'src/modules/imprint/imprint.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  synchronize: true,
  entities: [
    Admin,
    PrivacyPolicy,
    HeroSection,
    ServicesSection,
    ToolsSection,
    TeamSection,
    BloggersSection,
    BlogsSection,
    EventsSection,
    Imprint,
  ],
  migrations: ['dist/database/migrations/*.js'],
  subscribers: [],
};

const { error } = databaseConfigSchema.validate(dataSourceOptions);

if (error) throw new Error(`Invalid database configuration: ${error.message}`);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

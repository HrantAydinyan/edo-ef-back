import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

export default ServeStaticModule.forRoot({
  rootPath: path.join(process.cwd(), 'public'),
  serveRoot: '/public/',
});

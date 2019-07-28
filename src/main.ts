import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';
import * as path from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, 'public'));
  app.useStaticAssets(path.join(__dirname, 'public/css'));
  app.useStaticAssets(path.join(__dirname, 'public/images'));
  app.useStaticAssets(path.join(__dirname, 'public/js'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(__dirname + '/views/partials');
  app.enableCors();
  hbs.registerPartial('head', 'head');
  app.use(
    require('node-sass-middleware')({
      src: __dirname + '/public/css',
      dest: __dirname + '/public/css',
      debug: true,
      outputStyle: 'compressed',
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

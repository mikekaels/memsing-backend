import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlgModule } from './alg/alg.module';
import { Md5 } from 'ts-md5';

@Module({
  imports: [
    AlgModule,
    Md5
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

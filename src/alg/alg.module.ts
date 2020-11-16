import { HttpModule, Module } from '@nestjs/common';
import { AlgService } from './alg.service';
import { AlgController } from './alg.controller';
import { Md5 } from 'ts-md5';

@Module({
  imports: [HttpModule],
  providers: [AlgService, Md5],
  controllers: [AlgController]
})
export class AlgModule { }

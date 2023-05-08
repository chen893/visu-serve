import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
// import { JsonList } from './users/json-list.entity';
import { JsonContent } from './json-list/entities/json-content.entity';
import { JsonListModule } from './json-list/json-list.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'csl139',
      database: 'visu_serve',
      entities: [User, JsonContent],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    JsonListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

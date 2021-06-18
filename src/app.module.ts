import path from 'path';

import { AdminModule } from '@admin-bro/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getAdminModuleOptions } from './admin/admin-module-options';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { DepartmentModule } from './brand/department/department.module';
import { ProductModule } from './brand/products/product.module';
import Environment, { isEnvironment } from './config/environment';
import { typeOrmConfig } from './config/typeorm.config';
import { MediaModule } from './media/media.module';
import { CategoryModule } from './tag/category/category.module';
import { HealthAndIngredientModule } from './tag/health-and-ingredient/health-and-ingredient.module';
import { LocationModule } from './tag/location/location.module';
import { SocialAndEnvironmentalModule } from './tag/social-and-environmental/social-and-environmental.module';
import { TagModule } from './tag/tag.module';
import { RecommendationModule } from './user/recommendation/recommendation.module';
import { UserModule } from './user/user.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    AdminModule.createAdminAsync(getAdminModuleOptions()),
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        isEnvironment(Environment.TEST) ? '.env.test' : '.env'
      ),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

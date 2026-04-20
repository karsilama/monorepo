import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@users/infrastructure";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.api",
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>("MONGODB_URI");
        console.log(uri);
        return {
          uri,
        };
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule {}

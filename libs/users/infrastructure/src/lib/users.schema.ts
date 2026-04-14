import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDomainModel } from './models';

@Schema({ collection: 'users' })
export class User extends Document implements UserDomainModel {
  @Prop({ required: true, unique: true })
  id?: number;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  maidenName?: string;

  @Prop()
  age?: number;

  @Prop({ enum: ['male', 'female'] })
  gender?: 'male' | 'female';

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  username?: string;

  @Prop()
  password?: string;

  @Prop()
  birthDate?: string;

  @Prop()
  image?: string;

  @Prop()
  bloodGroup?: string;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop()
  eyeColor?: string;

  @Prop({ type: Object })
  hair?: { color: string; type: string };

  @Prop()
  ip?: string;

  @Prop({ type: Object })
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: { lat: number; lng: number };
    country: string;
  };

  @Prop()
  macAddress?: string;

  @Prop()
  university?: string;

  @Prop({ type: Object })
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };

  @Prop({ type: Object })
  company?: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: { lat: number; lng: number };
      country: string;
    };
  };

  @Prop()
  ein?: string;

  @Prop()
  ssn?: string;

  @Prop()
  userAgent?: string;

  @Prop({ type: Object })
  crypto?: {
    coin: string;
    wallet: string;
    network: string;
  };

  @Prop({ enum: ['admin', 'moderator', 'user'] })
  role?: 'admin' | 'moderator' | 'user';
}

export const UserSchema = SchemaFactory.createForClass(User);

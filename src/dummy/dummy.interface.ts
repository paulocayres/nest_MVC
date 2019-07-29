import { Document } from 'mongoose';

export interface Dummy extends Document {
  readonly dummy: string;
}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Training {
  @Prop()
  serverId: string;
  @Prop()
  directoryId: string;
  @Prop()
  configurationId: string;
  @Prop()
  augmentationId: string;
}

export type TrainingDocument = Training & Document;
export const TrainingSchema = SchemaFactory.createForClass(Training);

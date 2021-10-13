import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectID } from 'bson';

@Schema({ timestamps: true })
export class Training {
  constructor() {
    this.id = (new ObjectID()).toString();
  }
  @Prop()
  id: string;
  @Prop()
  name: string;
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

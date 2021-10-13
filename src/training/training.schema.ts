import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Training {
  @Prop()
  _id: string;
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

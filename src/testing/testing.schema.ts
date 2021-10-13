import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Testing {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  directoryId: string;
  @Prop()
  trainId: string;
}

export type TestingDocument = Testing & Document;
export const TestingSchema = SchemaFactory.createForClass(Testing);

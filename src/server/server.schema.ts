import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Server {
  @Prop()
  _id: string;
  @Prop()
  index: number;
  @Prop()
  uri: string;
}

export type ServerDocument = Server & Document;
export const ServerSchema = SchemaFactory.createForClass(Server);
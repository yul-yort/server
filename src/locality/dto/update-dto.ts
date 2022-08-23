import { IsString } from "class-validator";
import { LocalityCreateDto } from "./create-dto";

export class LocalityUpdateDto extends  LocalityCreateDto {
  @IsString()
  id: string;
}
import { IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class AdminUpdateDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @Length(1)
  firstName?: string;

  /**
   * Lastname of admin
   */
  @IsOptional()
  @IsString()
  @Length(1)
  lastName?: string;

  /**
   * Email of admin
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * Admin password
   */
  @IsString()
  @Length(1)
  @IsOptional()
  password?: string;
}

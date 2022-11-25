import { IsEmail, IsString, Length } from 'class-validator';

export class AdminCreateDto {
  /**
   * Name of admin
   */
  @IsString()
  @Length(1)
  firstName: string;

  /**
   * Lastname of admin
   */
  @IsString()
  @Length(1)
  lastName: string;

  /**
   * Email of admin
   */
  @IsEmail()
  email: string;

  /**
   * Admin password
   */
  @IsString()
  @Length(1)
  password: string;
}

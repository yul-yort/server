import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  /**
   * Name of user
   */
  @IsString()
  @Length(1)
  firstName: string;

  /**
   * Lastname of user
   */
  @IsString()
  @Length(1)
  lastName: string;

  /**
   * Email of user
   */
  @IsEmail()
  email: string;

  /**
   * User password
   */
  @IsString()
  @Length(1)
  password: string;
}

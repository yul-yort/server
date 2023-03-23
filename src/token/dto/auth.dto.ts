import { IsString } from 'class-validator';
import { Admin } from '../../admins/admin.entity';

export class AdminTokenDto {
  user: Admin;

  @IsString()
  origin: 'yy-admin';
}

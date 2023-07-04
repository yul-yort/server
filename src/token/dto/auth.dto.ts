import { IsString } from 'class-validator';
import { Admin } from '../../admins/admin.entity';

export type TTokenOrigin = 'yy-admin';
export const ADMIN_ORIGIN: TTokenOrigin = 'yy-admin';

export class AdminTokenDto {
  user: Admin;

  @IsString()
  origin: TTokenOrigin;
}

// roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Role as RolesEnum } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);

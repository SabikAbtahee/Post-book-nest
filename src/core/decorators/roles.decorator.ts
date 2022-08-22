import { SetMetadata } from '@nestjs/common';
import { EntityNames, Role } from '@shared';

export const Roles = (...roles: Role[]) => SetMetadata(EntityNames.Roles, roles);
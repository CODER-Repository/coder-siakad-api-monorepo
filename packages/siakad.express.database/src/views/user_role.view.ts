import { ViewEntity, ViewColumn, DataSource, BaseEntity } from 'typeorm';
import { Role, RoleUser, User } from '../entities';

@ViewEntity({
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select('user.id', 'user_id')
            .addSelect('user.username')
            .addSelect('user.email')
            .addSelect('role_user.role_id')
            .addSelect('role.role_name')
            .from(User, 'user')
            .innerJoin(
                RoleUser,
                'role_user',
                'user.user_id = role_user.user_id'
            )
            .innerJoin(Role, 'role', 'role_user.role_id = role.role_id')
})
export class UserRoleView extends BaseEntity {
    @ViewColumn()
    user_id!: string;

    @ViewColumn()
    username!: string;

    @ViewColumn()
    email!: string;

    @ViewColumn()
    role_id!: string;

    @ViewColumn()
    role_name!: string;
}

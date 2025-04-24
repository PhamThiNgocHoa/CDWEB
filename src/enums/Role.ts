export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export const RoleValue: Record<Role, boolean> = {
    [Role.ADMIN]: true,
    [Role.USER]: false
};

export const getRoleFromValue = (value: boolean): Role => {
    return value ? Role.ADMIN : Role.USER;
};

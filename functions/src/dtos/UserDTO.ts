export interface UserDTO {
  id: string;
  email: string;
  name?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

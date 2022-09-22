import { pgClientConfig } from "../../clients/postgres";
import { UserDTO } from "../../dtos/UserDTO";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export interface IUserService {
  findByIdOrEmail(id?: string, email?: string): Promise<UserDTO | null>;
  save(user: UserDTO): Promise<UserDTO>;
}

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(pgClientConfig);
  }

  async getUserByIdOrEmail(id: string, email: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findByIdOrEmail(id, email);

    if (!user) {
      return null;
    }

    return UserDTO.fromEntity(user);
  }

  async createUser(user: User): Promise<UserDTO> {
    const createdUser = await this.userRepository.save(user);

    return UserDTO.fromEntity(createdUser);
  }
}

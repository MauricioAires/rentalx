import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  driver_license: string;
  @Column()
  is_admin: boolean;
  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

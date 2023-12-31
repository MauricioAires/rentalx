import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  driver_license: string;
  @Column()
  is_admin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: string;

  @Expose({
    name: "avatar_url",
  })
  avatar_url(): string {
    switch (process.env.DISK_STORAGE) {
      case "local":
        return `${process.env.BASE_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

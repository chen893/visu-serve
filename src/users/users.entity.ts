// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.password);
    return hash === this.password;
    // const saltRounds = 12;
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hashedPassword = bcrypt.hashSync(password, salt);

    // // console.log('password', password);
    // // const hash = await bcrypt.hash(password, 12);
    // console.log('hash', hashedPassword);
    // console.log('this', this.password);
    // return hashedPassword === this.password;
  }
}

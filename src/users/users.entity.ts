// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { JsonList } from '../json-list/entities/json-list.entity';
import { JsonContent } from 'src/json-list/entities/json-content.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToOne(() => JsonList, (jsonList) => jsonList.user, { cascade: true })
  // @JoinColumn()
  // jsonList: JsonList;
  @OneToMany(() => JsonContent, (jsonContent) => jsonContent.user, {
    cascade: true,
  })
  jsonContents: JsonContent[];
}

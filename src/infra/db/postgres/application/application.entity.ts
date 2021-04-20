import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '../user/user.entity'

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  token: string

  @Column('date')
  createdAt: Date

  @Column('date')
  updatedAt: Date

  @ManyToOne(() => User, user => user.application)
  users: User[]
}

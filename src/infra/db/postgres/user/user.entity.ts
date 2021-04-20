import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Application } from '../application/application.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  email: string

  @ManyToOne(() => Application, application => application.users)
  application: Application

  @Column('text')
  password: string
}

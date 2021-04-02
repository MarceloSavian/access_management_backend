import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}

import { Column, PrimaryGeneratedColumn } from "typeorm"
import { Field } from "type-graphql"
import { Entity } from "typeorm"
import { ObjectType } from "type-graphql"

@ObjectType()
@Entity()
export default class Location {
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  latitude?: string

  @Field()
  @Column({ nullable: true })
  longitude?: string
}

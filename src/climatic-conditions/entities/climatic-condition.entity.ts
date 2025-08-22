import { Planting } from "src/plantings/entities/planting.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"climatic_conditions"})
export class ClimaticCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  type: string; // rain, irrigation, humidity, temperature
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  value: number;
  @Column({ type: 'date' })
  date: Date;
  @ManyToOne(() => Planting, (planting) => planting.climaticConditions)
  planting: Planting;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

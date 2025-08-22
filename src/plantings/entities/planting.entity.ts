import { ClimaticCondition } from "src/climatic-conditions/entities/climatic-condition.entity";
import { Crop } from "src/crops/entities/crop.entity";
import { Harvest } from "src/harvests/entities/harvest.entity";
import { Input } from "src/inputs/entities/input.entity";
import { Intervention } from "src/interventions/entities/intervention.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Planting {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'date' })
  plantingDate: Date;
  @Column()
  seedOrigin: string;
  @Column()
  seedDocument: string;
  @ManyToOne(() => Crop, (crop) => crop.plantings)
  crop: Crop;
  @OneToMany(() => Input, (input) => input.planting)
  inputs: Input[];
  @OneToMany(() => Intervention, (intervention) => intervention.planting)
  interventions: Intervention[];
  @OneToMany(() => ClimaticCondition, (condition) => condition.planting)
  climaticConditions: ClimaticCondition[];
  @OneToMany(() => Harvest, (harvest) => harvest.planting)
  harvests: Harvest[];
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

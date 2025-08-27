import { ClimaticCondition } from 'src/climatic-conditions/entities/climatic-condition.entity';
import { Crop } from 'src/crops/entities/crop.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { Input } from 'src/inputs/entities/input.entity';
import { Intervention } from 'src/interventions/entities/intervention.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @BeforeInsert()
  @BeforeUpdate()
  validatePlanting() {
    this.validateSeedOrigin();
    this.validateDates();
  }

  private validateSeedOrigin(): void {
    const approvedOrigins = ['certified', 'registered', 'foundation'];

    // if (!approvedOrigins.includes(this.seedOrigin.toLowerCase())) {
    //   throw new Error('Seed origin not approved by international standards');
    // }

    if (!this.seedDocument || this.seedDocument.trim() === '') {
      throw new Error('Seed documentation is required for traceability');
    }

    // const documentPattern = /^SEED-[A-Z]{3}-\d{6}$/;
    // if (!documentPattern.test(this.seedDocument)) {
    //   throw new Error('Invalid seed document format');
    // }
  }

  private validateDates(): void {
    if (this.plantingDate > new Date()) {
      throw new Error('Planting date cannot be in the future');
    }
  }
}

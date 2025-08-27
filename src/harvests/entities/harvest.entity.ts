import { Lot } from 'src/lots/entities/lot.entity';
import { Planting } from 'src/plantings/entities/planting.entity';
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
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  harvestDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  quantityKg: number;

  @Column()
  quality: string;

  @Column()
  responsible: string;

  @Column()
  sanitaryConditions: string;

  @ManyToOne(() => Planting, (planting) => planting.harvests)
  planting: Planting;

  @OneToMany(() => Lot, (lot) => lot.harvest)
  lots: Lot[];

  @Column()
  hash: string;

  @Column({ nullable: true })
  prevHash: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateHarvest() {
    // this.validateSanitaryConditions();
    this.validateDates();
    this.validateQuantity();
  }

  // private validateSanitaryConditions(): void {
  //   const requiredConditions = ['gloves', 'clean boxes', 'hygienic processing'];
  //   const hasAllConditions = requiredConditions.every((condition) =>
  //     this.sanitaryConditions.toLowerCase().includes(condition.toLowerCase()),
  //   );

  //   if (!hasAllConditions) {
  //     throw new Error(
  //       'Insufficient sanitary conditions according to Codex Alimentarius',
  //     );
  //   }
  // }

  private validateDates(): void {
    if (this.harvestDate > new Date()) {
      throw new Error('Harvest date cannot be in the future');
    }
  }

  private validateQuantity(): void {
    if (this.quantityKg <= 0) {
      throw new Error('Harvest quantity must be positive');
    }
  }
}

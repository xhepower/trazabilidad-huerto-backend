import { Lot } from 'src/lots/entities/lot.entity';
import { Planting } from 'src/plantings/entities/planting.entity';
import {
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
  sanitaryConditions: string; // gloves, clean boxes
  @ManyToOne(() => Planting, (planting) => planting.harvests)
  planting: Planting;
  @OneToMany(() => Lot, (lot) => lot.harvest)
  lots: Lot[];
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

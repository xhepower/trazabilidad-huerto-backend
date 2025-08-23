import { Planting } from 'src/plantings/entities/planting.entity';
import { Plot } from 'src/plots/entities/plot.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  plantType: string; // e.g., okra
  @Column()
  variety: string;
  @ManyToOne(() => Plot, (plot) => plot.crops)
  plot: Plot;
  @OneToMany(() => Planting, (planting) => planting.crop)
  plantings: Planting[];
}

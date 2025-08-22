import { Crop } from 'src/crops/entities/crop.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plot {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  gpsLocation: string;
  @Column('decimal', { precision: 10, scale: 2 })
  areaHectares: number;
  @ManyToOne(() => Producer, (producer) => producer.plots)
  producer: Producer;
  @OneToMany(() => Crop, (crop) => crop.plot)
  crops: Crop[];
}

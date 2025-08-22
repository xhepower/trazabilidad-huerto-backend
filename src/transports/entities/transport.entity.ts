import { Lot } from "src/lots/entities/lot.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transport {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  transportType: string; // truck, container, etc.
  @Column()
  transportNumber: string;
  @Column({ type: 'date' })
  departureDate: Date;
  @Column({ type: 'date', nullable: true })
  arrivalDate: Date;
  @Column({ nullable: true })
  temperature: string;
  @Column()
  responsible: string;
  @ManyToOne(() => Lot, (lot) => lot.transports)
  lot: Lot;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

import { Lot } from "src/lots/entities/lot.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostHarvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  processType: string; // e.g., washing, disinfection
  @Column()
  description: string;
  @Column()
  responsible: string;
  @Column({ type: 'date' })
  date: Date;
  @ManyToOne(() => Lot, (lot) => lot.postHarvests)
  lot: Lot;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

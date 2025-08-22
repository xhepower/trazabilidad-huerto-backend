import { Lot } from "src/lots/entities/lot.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exportation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  country: string;
  @Column({ type: 'date' })
  exportDate: Date;
  @Column()
  documentNumber: string; // e.g., packing list, customs
  @ManyToOne(() => Lot, (lot) => lot.exportations)
  lot: Lot;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

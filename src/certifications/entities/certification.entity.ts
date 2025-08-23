import { Lot } from 'src/lots/entities/lot.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  certificationType: string; // e.g., SENASA, GlobalG.A.P.
  @Column()
  certificateNumber: string;
  @Column({ type: 'date' })
  issueDate: Date;
  @Column({ type: 'date', nullable: true })
  expiryDate: Date;
  @Column()
  authority: string; // issuing body
  @ManyToOne(() => Lot, (lot) => lot.certifications)
  lot: Lot;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

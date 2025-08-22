import { Classification } from "src/classifications/entities/classification.entity";
import { Lot } from "src/lots/entities/lot.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'date' })
  saleDate: Date;
  @Column()
  buyerName: string;
  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;
  @Column()
  unit: string; // kg, box, bag
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number;
  @Column({ nullable: true })
  document: string; // invoice, packing list
  @Column({ nullable: true })
  destination: string;
  @ManyToOne(() => Lot, (lot) => lot.sales)
  lot: Lot;
  @ManyToOne(() => Classification, (classification) => classification.sales, {
    nullable: true,
  })
  classification: Classification;
  @ManyToOne(() => User, (user) => user.id)
  recordedBy: User;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

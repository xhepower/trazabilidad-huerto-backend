import { Lot } from 'src/lots/entities/lot.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Classification {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  classificationType: string; // e.g., premium, standard, second
  @Column()
  packaging: string; // e.g., box 10 lbs, bag 1 kg
  @Column('decimal', { precision: 10, scale: 2 })
  quantityKg: number;
  @ManyToOne(() => Lot, (lot) => lot.classifications)
  lot: Lot;
  @OneToMany(() => Sale, (sale) => sale.classification)
  sales: Sale[];
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

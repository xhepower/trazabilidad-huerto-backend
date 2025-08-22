import { Certification } from "src/certifications/entities/certification.entity";
import { Classification } from "src/classifications/entities/classification.entity";
import { Exportation } from "src/exportations/entities/exportation.entity";
import { Harvest } from "src/harvests/entities/harvest.entity";
import { PostHarvest } from "src/post-harvests/entities/post-harvest.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Transport } from "src/transports/entities/transport.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  lotCode: string;
  @Column({ type: 'date' })
  createdAt: Date;
  @ManyToOne(() => Harvest, (harvest) => harvest.lots)
  harvest: Harvest;
  @OneToMany(() => PostHarvest, (post) => post.lot)
  postHarvests: PostHarvest[];
  @OneToMany(() => Transport, (transport) => transport.lot)
  transports: Transport[];
  @OneToMany(() => Certification, (cert) => cert.lot)
  certifications: Certification[];
  @OneToMany(() => Classification, (classification) => classification.lot)
  classifications: Classification[];
  @OneToMany(() => Exportation, (exp) => exp.lot)
  exportations: Exportation[];
  @OneToMany(() => Sale, (sale) => sale.lot)
  sales: Sale[];
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

import { Planting } from "src/plantings/entities/planting.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Input {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  inputType: string; // fertilizer or pesticide
  @Column()
  commercialName: string;
  @Column()
  dose: string;
  @Column({ type: 'date' })
  applicationDate: Date;
  @Column()
  responsible: string;
  @ManyToOne(() => Planting, (planting) => planting.inputs)
  planting: Planting;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;
}

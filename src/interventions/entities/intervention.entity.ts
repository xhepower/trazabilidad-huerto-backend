import { Planting } from "src/plantings/entities/planting.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @Column()
  responsible: string;
  @Column({ type: 'date' })
  date: Date;
  @ManyToOne(() => Planting, (planting) => planting.interventions)
  planting: Planting;
  @Column()
  hash: string;
  @Column({ nullable: true })
  prevHash: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateIntervention() {
    this.validateDates();
  }

  private validateDates(): void {
    if (this.date > new Date()) {
      throw new Error('Intervention date cannot be in the future');
    }
  }
}

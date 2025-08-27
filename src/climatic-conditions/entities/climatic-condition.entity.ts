import { Planting } from 'src/plantings/entities/planting.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'climatic_conditions' })
export class ClimaticCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  value: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Planting, (planting) => planting.climaticConditions)
  planting: Planting;

  @Column()
  hash: string;

  @Column({ nullable: true })
  prevHash: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateClimaticCondition() {
    this.validateType();
    this.validateDates();
  }

  private validateType(): void {
    const validTypes = ['rain', 'irrigation', 'humidity', 'temperature'];
    if (!validTypes.includes(this.type)) {
      throw new Error('Invalid climatic condition type');
    }
  }

  private validateDates(): void {
    if (this.date > new Date()) {
      throw new Error('Climatic condition date cannot be in the future');
    }
  }
}

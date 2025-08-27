import { Planting } from "src/plantings/entities/planting.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @BeforeInsert()
  @BeforeUpdate()
  validateInput() {
    this.validatePesticideUsage();
    this.validateDates();
  }

  private validatePesticideUsage(): void {
    const bannedPesticides = [
      'DDT',
      'Aldrin',
      'Dieldrin',
      'Endrin',
      'Chlordane',
      'Heptachlor',
      'Hexachlorobenzene',
      'Mirex',
      'Toxaphene',
    ];

    if (
      this.inputType === 'pesticide' &&
      bannedPesticides.includes(this.commercialName)
    ) {
      throw new Error(
        `Pesticide ${this.commercialName} banned by Codex Alimentarius`,
      );
    }
  }

  private validateDates(): void {
    if (this.applicationDate > new Date()) {
      throw new Error('Application date cannot be in the future');
    }
  }
}

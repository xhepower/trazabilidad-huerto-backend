import { Plot } from 'src/plots/entities/plot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: ['leaf', 'root'] })
  type: 'leaf' | 'root';
  @Column()
  documentId: string;
  @Column()
  contact: string;
  @OneToMany(() => Plot, (plot) => plot.producer)
  plots: Plot[];
}

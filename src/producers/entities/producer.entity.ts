import { Plot } from 'src/plots/entities/plot.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @OneToOne(() => User, (user)=> user.producer)
   @JoinColumn({ name: 'user_id' })
   user: User;
}

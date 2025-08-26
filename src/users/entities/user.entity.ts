import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Exclude } from 'class-transformer';
import { Producer } from 'src/producers/entities/producer.entity';

export enum UserRole {
  ADMIN = 'admin',
  PRODUCER = 'producer',
  INSPECTOR = 'inspector',
  TRANSPORTER = 'transporter',
  EXPORTER = 'retailer',
  VIEWER = 'viewer',
  
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VIEWER, // por ejemplo
  })
  role: UserRole;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    nullable: false,
    cascade: true,
  })
  profile: Profile;

  @OneToOne(() => Producer, (producer) => producer.user, {
    cascade: true,
  })
  producer: Producer;

  @BeforeInsert()
  async validateAndsHashPassword() {
    this.hashPassword(); // Método para hashear la contraseña
    this.validateRoleRelations(); // Método de validación
  }
  @BeforeUpdate()
  validateRoleRelations() {
    if (this.role === UserRole.PRODUCER && !this.producer) {
      throw new Error(
        'Un productor debe tener una entidad de productor asociada.',
      );
    }
    // Opcionalmente, puedes asegurar que no se creen relaciones incorrectas
    if (this.role !== UserRole.PRODUCER && this.producer) {
      throw new Error('El usuario no puede tener una entidad de productor.');
    }
    // ... y así sucesivamente para otros roles
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

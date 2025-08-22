import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'batches' })
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  cultivo: string;

  @Column({ type: 'date', name: 'fecha-siembra' })
  fechaSiembra: Date;

  @Column({ type: 'varchar', length: 255, name: 'proveedor-semilla' })
  proveedorSemilla: string;

  @Column({ type: 'varchar', length: 255 })
  ubicacion: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

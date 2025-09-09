import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CandidateStatus {
  APPLIED = 'Applied',
  INTERVIEWING = 'Interviewing',
  HIRED = 'Hired',
  REJECTED = 'Rejected',
}

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  position: string;

  @Column({
    type: 'text',
    enum: CandidateStatus,
    default: CandidateStatus.APPLIED,
  })
  status: CandidateStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
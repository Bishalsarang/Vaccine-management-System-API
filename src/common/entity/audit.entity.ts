import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

/**
 * Represents an audit entity with createdAt, updatedAt, and deletedAt fields.
 */
export class AuditEntity {
  /**
   * The date and time when the entity was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The date and time when the entity was last updated.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The date and time when the entity was deleted.
   */
  @DeleteDateColumn()
  deletedAt: Date;

  // TODO: Set createdBy, updatedBy
}

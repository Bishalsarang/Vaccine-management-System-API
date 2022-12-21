import {
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents an abstract audit entity with createdAt, updatedAt, and deletedAt fields.
 */
export abstract class AuditEntity {
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

  @BeforeInsert()
  showMessage() {
    console.log('test');
  }

  // TODO: Set createdBy, updatedBy
}
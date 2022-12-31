import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVaccinestableNameUnique1672466500394
  implements MigrationInterface
{
  name = 'UpdateVaccinestableNameUnique1672466500394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."vaccines" ADD CONSTRAINT "UQ_db01deab32ef5f6f38963e63ae6" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."vaccines" ALTER COLUMN "stage" SET DEFAULT 'R&D'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."vaccines" ALTER COLUMN "stage" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."vaccines" DROP CONSTRAINT "UQ_db01deab32ef5f6f38963e63ae6"`,
    );
  }
}

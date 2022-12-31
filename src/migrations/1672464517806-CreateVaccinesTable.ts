import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVaccinesTable1672464517806 implements MigrationInterface {
  name = 'CreateVaccinesTable1672464517806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "core"."vaccines" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "numberOfDoses" integer NOT NULL, "stage" character varying NOT NULL, "isMandatory" boolean NOT NULL DEFAULT false, "companyName" character varying, "imageUrl" character varying, "imageHash" character varying, "allergies" text array NOT NULL DEFAULT '{}', CONSTRAINT "PK_195bc56fe32c08445078655ec5a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."vaccines"`);
  }
}

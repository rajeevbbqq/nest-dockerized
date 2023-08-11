import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691767806634 implements MigrationInterface {
    name = 'Migration1691767806634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" BIGSERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")); COMMENT ON COLUMN "posts"."status" IS 'Checks post is published or not'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}

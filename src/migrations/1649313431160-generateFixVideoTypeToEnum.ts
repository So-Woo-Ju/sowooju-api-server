import {MigrationInterface, QueryRunner} from "typeorm";

export class generateFixVideoTypeToEnum1649313431160 implements MigrationInterface {
    name = 'generateFixVideoTypeToEnum1649313431160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`videoType\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`videoType\` enum ('LOCAL', 'YOUTUBE') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`videoType\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`videoType\` varchar(255) NOT NULL`);
    }

}

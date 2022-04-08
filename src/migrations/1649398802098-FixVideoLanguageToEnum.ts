import {MigrationInterface, QueryRunner} from "typeorm";

export class FixVideoLanguageToEnum1649398802098 implements MigrationInterface {
    name = 'FixVideoLanguageToEnum1649398802098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`videoLanguage\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`videoLanguage\` enum ('KOR', 'ENG') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`videoLanguage\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`videoLanguage\` varchar(255) NOT NULL`);
    }

}

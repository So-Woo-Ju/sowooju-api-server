import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTextUrlToMedia1645365909000 implements MigrationInterface {
    name = 'AddTextUrlToMedia1645365909000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`captionTextUrl\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`textUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`thumbnailUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`thumbnailUrl\``);
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`textUrl\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`captionTextUrl\` varchar(255) NULL`);
    }

}

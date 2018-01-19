import * as _ from 'lodash';


type spritesObj = { [name: string]: PIXI.Sprite };

export default async function generatesSpritesFromSpritesheet(spritesheetJson: any, texturePath: any): Promise<spritesObj> {

    let results: Promise<spritesObj>;
    results = new Promise((resolve, reject) => {

        console.log('JSON: ', spritesheetJson);
        texturePath = './' + texturePath; //spritesheetJson.meta.image;
        const spritesheetTex = PIXI.Texture.fromImage(texturePath, undefined, PIXI.SCALE_MODES.NEAREST);
        // TODO: Runaway from this callback hell
        // Texture not setup UVS, so here's workaround (
        spritesheetTex.baseTexture.once('loaded', () => {
            spritesheetTex._updateUvs();

            const spritesheet = new PIXI.Spritesheet(spritesheetTex.baseTexture, spritesheetJson).parse((textures: any) => {
                console.log('Loaded spritesheet textures: ', textures);
                let sprites: spritesObj = {};
                _.forEach(textures, (texture, texName) => {
                    sprites[texName] = new PIXI.Sprite(texture);
                });

                resolve(sprites);
            });
        });
    });
    return results;
}

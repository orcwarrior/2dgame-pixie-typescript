import {AnimsMap} from './utils';

export default async function generateAnimsMapFromSpritesheet(spritesheetJson: any, texturePath: any): Promise<AnimsMap> {
    // DK: Animations can be created from already spritesheets already
    // loaded into memory:
    // https://github.com/pixijs/pixi.js/pull/3676#issuecomment-276355860
    let results: Promise<AnimsMap>;
    results = new Promise((resolve, reject) => {

        texturePath = './' + texturePath; //spritesheetJson.meta.image;
        console.log('JSON: ', spritesheetJson);
        const texture = PIXI.Texture.from(texturePath);
        // TODO: Runaway from this callback hell
        // Texture not setup UVS, so here's workaround (
        texture.baseTexture.once('loaded', () => {
            texture._updateUvs();

            let tmpAnisStore: any = {};
            let resultingAnimations: AnimsMap = {};
            const spritesheet = new PIXI.Spritesheet(texture.baseTexture, spritesheetJson).parse((textures: any) => {
                console.log('Loaded spritesheet textures: ', textures);
                // TODO: Try to make this in more functional approach
                Object.keys(textures).map((texName) => {
                    let regex = /(\w+)_(\d+)./g;
                    let match = regex.exec(texName);
                    if (match && match[1] && match[2]) {
                        let aniName = match[1], frame = match[2];
                        if (!tmpAnisStore[aniName]) {
                            tmpAnisStore[aniName] = [];
                        }
                        tmpAnisStore[aniName][frame] = textures[texName];
                    } else {
                        reject(new Error(`Texture name (${texName})is not vaild for animations pattern!`));
                    }
                });
                Object.keys(tmpAnisStore).forEach((aniName: any) => {
                    let aniTexs = tmpAnisStore[aniName];
                    let aniSprite = new PIXI.extras.AnimatedSprite(aniTexs);
                    aniSprite.width = 64;
                    aniSprite.height = 128;
                    aniSprite.setTransform(0, 0);
                    aniSprite.anchor.set(0.5);
                    aniSprite.animationSpeed = 0.1;
                    aniSprite.onFrameChange = (curFrame) => console.log('Frame changed: ', curFrame);

                    resultingAnimations[aniName] = aniSprite;
                });
                resolve(resultingAnimations);
            });
        });
    });
    return results;
}

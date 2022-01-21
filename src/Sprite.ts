import GameItem from './GameItem.js';

export default class Sprite {
  private animations: { [key: string]: number[][] };

  private currentAnimation: string;

  private currentAnimationFrame: number;

  private animationFrameLimit: number;

  private animationFrameProgress: number;

  private image: HTMLImageElement;

  /**
   * The sprite sheet for each gameitem will me cut up
   * and a shadow will be added + taking care for the animations
   *
   * @param gameitem the gameitem that has its spritesheet
   */
  public constructor(gameitem: GameItem) {
    // Set up the Image
    this.image = gameitem.getImage();

    // Shadow
    // this.shadow = new Image();
    // this.useShadow = true; // config.useShadow || false
    // if (this.useShadow) {
    //   this.shadow.src = '/images/characters/shadow.png';
    // }
    // this.shadow.onload = () => {
    //   this.isShadowLoaded = true;
    // };

    // Configure animations and initial state
    this.animations = {
      'idle-down': [[0, 0]],
      'idle-right': [[0, 1]],
      'idle-up': [[0, 2]],
      'idle-left': [[0, 3]],
      'walk-down': [[1, 0], [0, 0], [3, 0], [0, 0]],
      'walk-right': [[1, 1], [0, 1], [3, 1], [0, 1]],
      'walk-up': [[1, 2], [0, 2], [3, 2], [0, 2]],
      'walk-left': [[1, 3], [0, 3], [3, 3], [0, 3]],
    }; // gameitem.animations ||
    this.currentAnimation = gameitem.getCurrentAnimation() || 'idle-down';
    this.currentAnimationFrame = 0;

    // how many gameloop frames we wanna show this spritesheet
    this.animationFrameLimit = 8; // gameitem.currentAnimationFrameLimit ||
    // how much time is left till the next image should be shown
    this.animationFrameProgress = this.animationFrameLimit;
  }

  /**
   * figures out which animation we are on and which frame we are on
   *
   * @returns the current animation frame
   */
  public getFrame(): number[] {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  /**
   * Changes the animation direction
   *
   * @param key The animation set we want to happen
   */
  public setAnimation(key: string) : void {
    // Checks if the current animation isn't already the same as the one being called in
    // changes the current animation to the one being passed trough
    // sets the animation frame back to 0
    // sets the progress to the startpoint again aka the limit
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  /**
   * Sets the animationframe to the right one after the animation frame limit is hit
   * So the changing of the animation to make it seems like he is walking
   * Changes between the images on the spritesheet to the right or left
   */
  public updateAnimationProgress(): void {
    // Down tick frame progress to the next animation frame
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // Reset the counter to the first of the animation frame
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.getFrame() === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  /**
   * This draws the gameitem that has a spritescheet for it
   *
   * @param ctx the canvas we want to draw on
   * @param gameitem the game item we are currently wanting to draw on
   */
  public drawSprite(ctx: CanvasRenderingContext2D, gameitem: GameItem): void {
    const xP = gameitem.getXPos();
    const yP = gameitem.getYPos();
    // console.log('sprite is drawn');
    // console.log(this.getFrame());

    // seperate the frame so the values can be used in drawimage
    const [frameX, frameY]: number[] = this.getFrame();

    // cuts the first image of the spritesheet
    ctx.drawImage(this.image,
      frameX * 32, frameY * 32, // start of cut left, right
      32, 32, // size of the cut witdh, height
      xP, yP, // position the object should be drawn to the canvas
      128, 128); // size it should be draw

    this.updateAnimationProgress();
  }
}

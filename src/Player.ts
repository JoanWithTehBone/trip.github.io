import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';
import Hunter from './Hunter.js';
import BlackSmith from './BlackSmith.js';
import Baker from './Baker.js';
import NPC from './NPC.js';
import Game from './Game.js';

export default class Player extends GameItem {
  private xVel: number;

  private yVel: number;

  private baker: Baker;

  private blackSmith: BlackSmith;

  private hunter: Hunter;

  // KeyboardListener so the player can move
  private keyboard: KeyListener;

  /**
   * Initialize Player
   *
   * @param game Game
   * @param xPos xPosition of the player
   * @param yPos yPostition of the player
   */
  public constructor(xPos: number, yPos: number, game: Game) {
    super('./assets/img/character_robot_walk0.png', xPos, yPos);
    this.xVel = 3;
    this.yVel = 3;
    this.keyboard = new KeyListener();
    this.baker = new Baker();
    this.blackSmith = new BlackSmith();
    this.hunter = new Hunter(game);
  }

  /**
   * Moves the player depending on which arrow key is pressed. Player is bound
   * to the canvas and cannot move outside of it
   *
   * @param canvas the canvas to move over, for max x and y positions
   */
  public move(canvas: HTMLCanvasElement): void {
    // Set the limit values
    const minX = 0;
    const maxX = canvas.width - this.img.width;
    const minY = 0;
    const maxY = canvas.height - this.img.height;

    // Moving right
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT) && this.xPos < maxX) {
      this.xPos += this.xVel;
      // Limit to the max value
      if (this.xPos > maxX) {
        this.xPos = maxX;
      }
    }

    // Moving left
    if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT) && this.xPos > minX) {
      this.xPos -= this.xVel;
      // Limit to the max value
      if (this.xPos < minX) {
        this.xPos = minX;
      }
    }

    // Moving up
    if (this.keyboard.isKeyDown(KeyListener.KEY_UP) && this.yPos > minY) {
      this.yPos -= this.yVel;
      if (this.yPos < minY) {
        this.yPos = minY;
      }
    }

    // Moving down
    if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN) && this.yPos < maxY) {
      this.yPos += this.yVel;
      if (this.yPos > maxY) {
        this.yPos = maxY;
      }
    }
  }

  // public onFrameStartListener() {
  //   this.keyboard.onFrameStart();
  // }

  public getKeys(): KeyListener {
    return this.keyboard;
  }

  /**
   *
   * @returns true if the player is pressing space
   */
  public isPressing(): boolean {
    return this.keyboard.isKeyTyped(KeyListener.KEY_SPACE);
  }

  /**
   *
   * @returns true if the player is continuing up
   */
  public isContinuing(): boolean {
    return this.keyboard.isKeyTyped(KeyListener.KEY_C);
  }

  /**
   *
   * @param other the other GameItem
   * @returns true if this object collides with the specified other object
   */
  public collidesWith(other: NPC): boolean {
    return this.xPos < other.getXPos() + other.getImageWidth()
      && this.xPos + this.img.width > other.getXPos()
      && this.yPos < other.getYPos() + other.getImageHeight()
      && this.yPos + this.img.height > other.getYPos();
  }

  public interactWithBaker(): boolean {
    // create a new array with garbage item that are still on the screen
    // (filter the clicked garbage item out of the array garbage items)
    if (this.collidesWith(this.baker)) {
      console.log('INTERACTION WITH THE BAKER:)');
      return false;
    }
    return true;
  }

  public interactWithBlackSmith(): boolean {
    // create a new array with garbage item that are still on the screen
    // (filter the clicked garbage item out of the array garbage items)
    if (this.collidesWith(this.blackSmith)) {
      console.log('INTERACTION WITH THE BLACKSMITH:)');
      return false;
    }
    return true;
  }

  public interactWithHunter(): boolean {
    // create a new array with garbage item that are still on the screen
    // (filter the clicked garbage item out of the array garbage items)
    if (this.collidesWith(this.hunter)) {
      console.log('INTERACTION WITH THE HUNTER:)');
      if (this.isContinuing()) {
        this.hunter.talkToPlayer();
      }
      return false;
    }
    return true;
  }

  /**
   * Increases the speed
   *
   * @param size the amount of speed to add
   */
  public increaseSpeed(size: number): void {
    this.xVel += size;
    this.yVel += size;
  }
}

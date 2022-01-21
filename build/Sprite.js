export default class Sprite {
    animations;
    currentAnimation;
    currentAnimationFrame;
    animationFrameLimit;
    animationFrameProgress;
    image;
    constructor(gameitem) {
        this.image = gameitem.getImage();
        this.animations = {
            'idle-down': [[0, 0]],
            'idle-right': [[0, 1]],
            'idle-up': [[0, 2]],
            'idle-left': [[0, 3]],
            'walk-down': [[1, 0], [0, 0], [3, 0], [0, 0]],
            'walk-right': [[1, 1], [0, 1], [3, 1], [0, 1]],
            'walk-up': [[1, 2], [0, 2], [3, 2], [0, 2]],
            'walk-left': [[1, 3], [0, 3], [3, 3], [0, 3]],
        };
        this.currentAnimation = gameitem.getCurrentAnimation() || 'idle-down';
        this.currentAnimationFrame = 0;
        this.animationFrameLimit = 8;
        this.animationFrameProgress = this.animationFrameLimit;
    }
    getFrame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }
    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }
    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        if (this.getFrame() === undefined) {
            this.currentAnimationFrame = 0;
        }
    }
    drawSprite(ctx, gameitem) {
        const xP = gameitem.getXPos();
        const yP = gameitem.getYPos();
        const [frameX, frameY] = this.getFrame();
        ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, xP, yP, 128, 128);
        this.updateAnimationProgress();
    }
}
//# sourceMappingURL=Sprite.js.map
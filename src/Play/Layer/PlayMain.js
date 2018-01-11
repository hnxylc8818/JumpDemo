var PMainLayer = cc.Layer.extend({
    currentIndex: 0,
    blocks:null,
    character: null,
    touchListener: null,
    beginTime: null,
    endTime: null,
    baseRange:10,
    spacing:70,
    scoreText:null,
    score:0,
    layout:null,
    direction:"y",
    ctor: function () {
        this._super();

        this.blocks = [];
        this.direction = "y";
    },
    onEnter: function () {
        this._super();

        this.loadLayout();
        this.loadMenu();
        this.loadBlock(cc.winSize.width / 2,cc.winSize.height / 2 - 150);
        this.loadCharacter();
        this.registerEvent();
        this.loadBlock(this.blocks[this.currentIndex].getPositionX(),this.blocks[this.currentIndex].getPositionY() + this.blocks[this.currentIndex].height + this.baseRange * 2);

    },
    onExit: function () {
        this._super();
        this.unRegisterEvent();
    },
    loadLayout:function () {
        this.layout = new ccui.Layout();
        this.addChild(this.layout);
    },
    // 加载菜单
    loadMenu: function () {
        // 返回键
        var backBtn = new ccui.Button(res.PMBack_png);
        this.addChild(backBtn,5);
        backBtn.setPosition(35, cc.winSize.height - 35);
        backBtn.setTouchEnabled(true);
        backBtn.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.director.runScene(new MainMenuScene());
                    break;
            }
        }, this);

        // 得分
        var scoreText = new ccui.Text("得分：0","",26);
        this.addChild(scoreText);
        this.scoreText = scoreText;
        scoreText.setColor(cc.color(200,200,200));
        scoreText.setPosition(cc.winSize.width - 90,cc.winSize.height - 35);
    },
    // 加载Block
    loadBlock: function (x,y) {
        var block = new cc.Sprite(res.PMBlock_png);
        this.layout.addChild(block,1);
        block.setPosition(x,y);
        this.blocks.push(block);
    },
    // 加载人物
    loadCharacter: function () {
        this.currentIndex = 0;
        this.character = new cc.Sprite(res.PMCharacter_png);
        this.layout.addChild(this.character,2);
        this.character.setPosition(cc.winSize.width / 2, this.blocks[this.currentIndex].getPositionY() + this.blocks[this.currentIndex].height - 50);
    },
    // 注册触摸事件
    registerEvent: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouched: true,
            onTouchBegan: this.onTouchBegan,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(this.touchListener, this);
    },
    onTouchBegan: function (touch, event) {
        cc.log("开始触摸屏幕");
        this.beginTime = new Date().getTime();
        return true;
    },
    onTouchEnded: function (touch, event) {
        var target = this.target;
        cc.log("结束触摸屏幕");
        this.endTime = new Date().getTime();
        var diffTime = this.endTime - this.beginTime;
        cc.log("按下了", diffTime, "毫秒");
        var range = diffTime / 5;
        cc.log("跳跃距离：",range);
        var jumpBy = null;
        if (target.direction === "y"){
            jumpBy = new cc.jumpBy(0.5,cc.p(0,range),range,1);
        }else {
            jumpBy = new cc.jumpBy(0.5,cc.p(range,0),range,1);
        }
        var rotateBy = new cc.RotateBy(0.4,360);
        target.currentIndex++;
        target.character.runAction(new cc.sequence(new cc.Spawn(jumpBy,rotateBy),cc.callFunc(function () {
            target.checkEffectiveArea();
        },this)));
    },
    unRegisterEvent: function () {
        cc.eventManager.removeListener(this.touchListener);
    },
    // 判断人物跳跃的坐标点是否在block区域内
    checkEffectiveArea:function () {
        var characterX = this.character.getPositionX();
        var characterY = this.character.getPositionY();
        var currentBlock = this.blocks[this.currentIndex];
        var blockX = currentBlock.getPositionX();
        var blockY = currentBlock.getPositionY()+ currentBlock.height;
        cc.log("character position：",this.character.getPosition(),"block position：",blockX,blockY);
        if (characterX > blockX - this.spacing && characterX <= blockX &&
            characterY > blockY - this.spacing && characterY <= blockY){
            this.score++;
            this.scoreText.setString("得分：" + this.score);
            var layoutMoveBy = null;
            if (this.direction === "y"){
                this.direction = "x";
            }else {
                this.direction = "y";
            }
            if (this.direction === "y"){
                layoutMoveBy = new cc.MoveBy(0.5,cc.p(0,-(currentBlock.height - this.baseRange * 2)));
                this.loadBlock(currentBlock.getPositionX(),currentBlock.getPositionY() + currentBlock.height + this.baseRange * 2);
            }else {
                layoutMoveBy = new cc.MoveBy(0.5,cc.p(-currentBlock.width - this.baseRange * 2,0));
                this.loadBlock((currentBlock.getPositionX() + currentBlock.width + this.baseRange * 4),currentBlock.getPositionY());
            }
            this.layout.runAction(layoutMoveBy);
        }else {
            cc.log("没有跳到block有效区域内，游戏结束");
            this.unRegisterEvent();
            if (characterY > blockY || characterX > blockX){
                this.character.setTexture(res.PMCharacter_fall_png);
            }else {
                var moveY = currentBlock.getPositionY();
                var moveBy = new cc.MoveTo(0.2,cc.p(this.character.getPositionX(),moveY - 20));
                this.character.runAction(cc.sequence(moveBy,cc.callFunc(function () {
                    this.character.setTexture(res.PMCharacter_fall_png);
                },this)));
            }
            this.scheduleOnce(function () {
                var gameOverLayer = new PMReplayLayer(this.score);
                this.addChild(gameOverLayer,3);
            },0.5);
        }
    }
});
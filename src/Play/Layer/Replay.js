var PMReplayLayer = cc.LayerColor.extend({
    score:0,
    layout:null,
    ctor: function (score) {
        this._super();
        this.score = score;
        this.setOpacity(200);
        this.loadLayout();
        this.loadMenu();
    },
    loadLayout:function () {
        this.layout = new ccui.Layout();
        this.addChild(this.layout);
        this.layout.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
        this.layout.setPosition((cc.winSize.width - this.layout.width) / 2,(cc.winSize.height - this.layout.height) /2);
    },
    loadMenu: function () {
        var lp = new ccui.LinearLayoutParameter();
        lp.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
        lp.setMargin(new ccui.Margin(0,10,0,10));
        // 分数Text
        var scoreText = new ccui.Text("得分：" + this.score,"",36);
        this.layout.addChild(scoreText);
        scoreText.setLayoutParameter(lp);

        // 重玩按钮
        var replayBtn = new ccui.Button(res.PMReplay_normal_png, res.PMReplay_press_png);
        this.layout.addChild(replayBtn);
        replayBtn.setTouchEnabled(true);
        replayBtn.addTouchEventListener(function (sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.ClickEffect_mp3);
                    cc.director.runScene(new PlayScene());
                    break;
            }
        },this);
        replayBtn.setLayoutParameter(lp);
    }
});
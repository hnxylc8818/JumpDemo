var MainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.loadMenu();
    },
    // 加载菜单
    loadMenu: function () {
        // 开始游戏
        var startGameNormal = new cc.Sprite(res.MMStartGameNormal_png);
        var startGamePress = new cc.Sprite(res.MMStartGamePress_png);

        var startGame = new cc.MenuItemSprite(
            startGameNormal,
            startGamePress,
            "",
            function () {
                cc.log("点击开始游戏按钮");
                cc.audioEngine.playEffect(res.ClickEffect_mp3);
                cc.director.runScene(new PlayScene());
            }.bind(this)
        );

        var menu = new cc.Menu(startGame);
        this.addChild(menu);
    }
});
var MainMenuScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        cc.audioEngine.playMusic(res.BgMusic_mp3,true);
    },

    onEnter: function () {
        this._super();

        this.loadBackground();

        var mainLayer = new MainLayer();
        this.addChild(mainLayer);
    },

    // 加载背景层
    loadBackground: function () {
        var start = cc.color.WHITE;
        var end = cc.color.ORANGE;
        var backgroundLayer = new cc.LayerGradient(start, end);
        this.addChild(backgroundLayer);
    },

});
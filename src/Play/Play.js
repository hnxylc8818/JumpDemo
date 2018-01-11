var PlayScene = cc.Scene.extend({
   ctor:function () {
       this._super();
   },
    onEnter:function () {
      this._super();

      this.loadBackground();

      var mainLayer = new PMainLayer();
      this.addChild(mainLayer);
    },
    // 加载背景层
    loadBackground:function () {
        var start = cc.color.WHITE;
        var end = cc.color.GRAY;

        var bgLayer = new cc.LayerGradient(start,end);
        this.addChild(bgLayer);
    }
});
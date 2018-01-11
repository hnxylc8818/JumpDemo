var res = {

    // image
    HelloWorld_png : "res/HelloWorld.png",
    MMStartGameNormal_png:"res/MainMenu/start_game_normal.png",
    MMStartGamePress_png:"res/MainMenu/start_game_press.png",
    PMBlock_png:"res/MainMenu/block.png",
    PMCharacter_png:"res/MainMenu/character.png",
    PMCharacter_fall_png:"res/MainMenu/charcher_fall.png",
    PMBack_png:"res/MainMenu/back.png",
    PMReplay_normal_png:"res/MainMenu/replay_normal.png",
    PMReplay_press_png:"res/MainMenu/replay_press.png",

    // audio
    ClickEffect_mp3:"res/Audio/Music/btn_click_effect.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

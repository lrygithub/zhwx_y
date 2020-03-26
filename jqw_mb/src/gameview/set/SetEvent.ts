class SetEvent extends egret.Event {
	public static SET_MODLE: string = 'SET_MODLE';
	public static SET_OR_CHANGE: string = 'SET_OR_CHANGE';
	public static SET_STATE_CHANGE: string = 'SET_STATE_CHANGE';
	public static SET_START: string = 'SET_START';
	public static SET_freeSTART: string = 'SET_freeSTART';
	public static SET_STOP: string = 'SET_STOP';
	public static SET_AUTO_CHANGED: string = 'SET_AUTO_CHANGED';
	/**
	 * 快速按键事件
	 */
	public static SET_SPEED_CHANGED: string = 'SET_SPEED_CHANGED';
	/**
	 * 点击加减注数事件
	 */
	public static SET_BET_CHANGE: string = 'SET_BET_CHANGE';
	public static SET_LINE_CHANGE: string = 'SET_LINE_CHANGE';
	public static SET_BALANCE_CHANGE: string = 'SET_BALANCE_CHANGE';
	public static SET_MUSIC_CHANGE: string = 'SET_MUSIC_CHANGE';
	public static SET_HIDE_REWARD: string = 'SET_HIDE_REWARD';
	/**
	 * 出3个牌子，把出牌子这一轮的奖励播放完之后，发送的事件
	 */
	public static SET_PAI_OVER_CHANGE: string = 'SET_PAIOVER_CHANGE';
	/**
	 * 中奖事件
	 */
	public static SET_Reward_CHANGE: string = 'SET_Reward_CHANGE';
	/**
	* 中奖事件
	 */
	public static freeSET_Reward_CHANGE: string = 'freeSET_Reward_CHANGE';
	/**
	 * 动画界面展示完毕，准备旋转免费游戏
	 */
	public static SET_AamOver: string = 'SET_AamOver';
	/**
	 * 免费游戏结束事件
	 */
	public static SET_FREE_Over: string = 'SET_FREE_Over';

	public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
		super(type, bubbles, cancelable, data);
	}
}
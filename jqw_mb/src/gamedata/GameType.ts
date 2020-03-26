/**
 * 游戏类型集合
 */
module GameType
{
	 export class ItemType
     {
        
     }

     export class GameModule
     {   
         /**
          * 真钱模式
          */
         public static trueModle:number=0;
         /**
          * 假钱模式
          */
         public static falseModle:number=1;
     }
      
     export class GameState
     {
         public static PLAYING:number=1;
         public static STOP:number=0;
     }
     export class LangType
     {
        public static CN:any='cn';
        public static TW:any='tw';
        public static EN:any='en';  
     }

     export class RewardType
     {
         public static NOMAL_REWARD:number=1;
         public static NO_REWARD:number=0;
         public static BIG_REWARD:number=2;
         public static FREE_REWARD:number=3;
         public static BIG_AND_FREE:number=4;
     }

     export class RellMode
     {
         public static UP:number=1;
         public static DOWN:number=0;
     }
}
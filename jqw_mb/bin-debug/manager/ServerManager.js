var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ServerManager = (function (_super) {
    __extends(ServerManager, _super);
    function ServerManager() {
        var _this = _super.call(this) || this;
        GameConfig.gameModle = GameType.GameModule.falseModle;
        return _this;
    }
    ServerManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new ServerManager();
        }
        return this._instance;
    };
    ServerManager.prototype.acpetCommond = function (data) {
        var dData;
        switch (data.Parameter.Action) {
            case 'Initial':
                dData = JSON.parse(JSON.stringify(serverData.initData));
                break;
            case 'Play':
                dData = this.resetPlay(data);
                break;
        }
        if (GameConfig.gameModle == GameType.GameModule.falseModle) {
            core.NotifyManager.getInstance().sendNotify(data.Parameter.Action, dData);
        }
        else {
            sockets.SocketMananger.getInstance().sendMessage(data);
        }
    };
    /**
     * 重置返回play
     */
    ServerManager.prototype.resetPlay = function (cmdData) {
        var parameter = cmdData.Parameter;
        this.parameter = parameter;
        var data = JSON.parse(JSON.stringify(serverData.playData));
        data.ActionType = parameter.Type;
        data.ActionParameter = parameter;
        // let sybl: Array<any> = [];
        // for (let i: number = 0; i < 50; i++) {
        // 	let arr: Array<any> = [];
        // 	for (let j: number = 0; j < 5; j++) {
        // 		let s: any = Math.floor(Math.random() * 3);
        // 		arr.push(s > 0 ? 'M' + s : 'C1');
        // 	}
        // 	sybl.push(arr);
        // }
        //let r: number = Math.floor(Math.random() * serverData.playDataArr.length);
        var r = 3;
        var reelData = serverData.playDataArr[r];
        //先得到盘面数据
        var totalWin = 0;
        var winResults = reelData.WinResults;
        for (var i = 0; i < winResults.length; i++) {
            var data_1 = winResults[i];
            data_1.Bet = parameter.Denom;
            if (data_1.SymbolCount > 7 && data_1.Symbol == 'C1') {
                var p = 0;
                if (parameter.Denom / GameConfig.bili == 4) {
                    p = 0.1;
                }
                else if (parameter.Denom / GameConfig.bili == 8) {
                    p = 0.2;
                }
                else if (parameter.Denom / GameConfig.bili == 20) {
                    p = 0.5;
                }
                else {
                    p = 1;
                }
                data_1.Win = serverData.initData.Value.TokenInfo.totalReward * GameConfig.bili * p;
            }
            else {
                data_1.Win = parameter.Denom * vo.GameData.payData[data_1.Symbol][data_1.SymbolCount + ''];
            }
            totalWin += data_1.Win;
        }
        data.Value.Main.WinResults = winResults;
        data.Value.Main.ReelSymbols = reelData.ReelSymbols;
        data.Value.Main.TotalWin = totalWin;
        data.Value.Main.TotalWinDollar = totalWin / GameConfig.bili;
        serverData.initData.Value.TokenInfo.Balance = serverData.initData.Value.TokenInfo.Balance + data.Value.Main.TotalWinDollar - parameter.Denom / GameConfig.bili;
        data.Value.Balance = serverData.initData.Value.TokenInfo.Balance;
        return data;
    };
    return ServerManager;
}(egret.EventDispatcher));
__reflect(ServerManager.prototype, "ServerManager");
/**
 * 后端数据
 */
var serverData = (function () {
    function serverData() {
    }
    /**
     * 初始化数据
     */
    serverData.initData = {
        "Action": "Initial",
        "ProcessTime": {
            "Spend": 0
        },
        "ScreenData": {
            "ScreenActions": [{
                    "Status": "Initial"
                }]
        },
        "IsSuccess": true,
        "Marquees": "",
        "Message": "",
        "kick_rightnow": false,
        "Value": {
            "MC_Reset_At": "2019-04-24 10:11:02",
            "SpinConstraint": {
                "Lines": [1, 2, 3, 4, 5],
                "MinLineBet": 1,
                "MaxLineBet": 1000,
                "MinDenom": 1,
                "MaxDenom": 2147483647
            },
            "FreeLine": [],
            "JackpotPaytables": {
                "1": 279,
                "2": 558,
                "3": 837,
                "4": 1116
            },
            "Symbolstripes": {
                "Main": {
                    "Stripes": [{
                            "Symbols": ["M2", "BN", "M2", "BN", "M0", "BN", "M1", "BN", "M2", "BN", "M1", "BN", "M2", "BN", "M2", "BN"]
                        }, {
                            "Symbols": ["M2", "BN", "M2", "BN", "M0", "BN", "M1", "BN", "M2", "BN", "M1", "BN", "M2", "BN", "M2", "BN"]
                        }, {
                            "Symbols": ["M2", "BN", "M2", "BN", "M0", "BN", "M1", "BN", "M2", "BN", "M1", "BN", "M2", "BN", "M2", "BN"]
                        }]
                }
            },
            "Geninit": {
                "Main": {
                    "ReelResults": [{
                            "Idx": 0,
                            "Pos": 0
                        }, {
                            "Idx": 1,
                            "Pos": 0
                        }, {
                            "Idx": 2,
                            "Pos": 0
                        }],
                    "ReelSymbols": [
                        ["M1", "M2", "M3", "M4", "M5"],
                        ["M5", "M4", "M3", "M2", "M1"],
                        ["M4", "M3", "M2", "M1", "M5"],
                        ["M2", "M1", "M5", "M4", "M3"],
                        ["M3", "M2", "M1", "M3", "M3"]
                    ],
                    "StripesCode": "E0qVFEFC97AqoF0riEJANg",
                    "TotalBet": 0,
                    "TotalWin": 0,
                    "WinResults": []
                }
            },
            "Denoms": [500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 250000, 500000, 1000000, 2000000],
            "Status": {
                "CurrentAction": "Initial",
                "CurrentActionType": "slot",
                "GameLevel": "1",
                "GameLevel_UpCount": "0"
            },
            "Actions": null,
            "LastRound": {
                "LastRoundId": "3e9e115565226945178",
                "LastRoundResult": {
                    "RoundId": "3e9e115565226945178",
                    "SubRoundId": 0,
                    "SessionData": {
                        "Bet": 10,
                        "Multiply": 1
                    },
                    "TotalBet": 1000,
                    "TotalWin": 0,
                    "TotalBetDollar": 0.1,
                    "TotalWinDollar": 0,
                    "Denom": 10,
                    "ScreenData": [],
                    "Main": {
                        "MathVersion": "triple_monkey",
                        "TotalBet": 1000,
                        "TotalWin": 0,
                        "TotalBetDollar": 0.1,
                        "TotalWinDollar": 0,
                        "Denom": 10,
                        "ReelSymbols": [
                            ["M1", "M2", "M3", "M4", "M5"],
                            ["M5", "M4", "M3", "M2", "M1"],
                            ["M4", "M3", "M2", "M1", "M5"],
                            ["M2", "M1", "M5", "M4", "M3"],
                            ["M3", "M2", "M1", "M3", "M3"]
                        ],
                        "WinResults": []
                    },
                    "Status": {
                        "CurrentAction": "Play",
                        "CurrentActionType": "slot",
                        "GameLevel": "1",
                        "GameLevel_UpCount": "0"
                    },
                    "Actions": null,
                }
            },
            "TokenInfo": {
                "Balance": 70.2,
                "Currency": "CNY",
                "FrontEndDebug": 1,
                "totalReward": 98999690
            }
        }
    };
    /**
     * 后端数据
     */
    serverData.playData = {
        "Action": "Play",
        "ProcessTime": {
            "Spend": 0
        },
        "ScreenData": {},
        "IsSuccess": true,
        "Marquees": [],
        "Message": "",
        "kick_rightnow": false,
        "ActionType": "freeslot",
        "ActionParameter": {
            "Action": "Play",
            "Type": "freeslot",
            "Line": 5,
            "Bet": 1,
            "Denom": 100,
            "SessionData": {
                "Bet": 0.05
            }
        },
        "Value": {
            "RoundId": "3e9e115565229947859",
            "SubRoundId": 0,
            "SessionData": {
                "Bet": 0.05
            },
            "TotalBet": 500,
            "TotalWin": 50000,
            "TotalBetDollar": 0.45,
            "TotalWinDollar": 0.15,
            "Denom": 10,
            "ScreenData": [],
            "FreeLine": [],
            "Main": {
                "MathVersion": "triple_monkey",
                "TotalBet": 500,
                "TotalWin": 50000,
                "TotalBetDollar": 0.05,
                "TotalWinDollar": 5,
                "Denom": 10,
                "ReelSymbols": [
                    ["M1", "M2", "M3", "M4", "M5"],
                    ["M5", "M4", "M3", "M2", "M1"],
                    ["M4", "M3", "M2", "M1", "M5"],
                    ["M2", "M1", "M5", "M4", "M3"],
                    ["M3", "M2", "M1", "M3", "M3"]
                ],
                "WinResults": [{
                        "Type": "Line",
                        "Symbol": "M2",
                        "SymbolCount": 3,
                        "Positions": [{
                                "X": 0,
                                "Y": 1
                            }, {
                                "X": 1,
                                "Y": 1
                            }, {
                                "X": 2,
                                "Y": 1
                            }],
                        "Data": {
                            "Line": 2,
                            "PayType": "RL"
                        },
                        "Bet": 500,
                        "Win": 50000,
                        "Multipliers": [100, 1]
                    }],
                "ReelResults": [{
                        "Idx": 0,
                        "Pos": 4
                    }, {
                        "Idx": 1,
                        "Pos": 16
                    }, {
                        "Idx": 2,
                        "Pos": 28
                    }]
            },
            "Status": {
                "CurrentAction": "Play",
                "CurrentActionType": "freeslot"
            },
            "Actions": [],
            "Balance": 180583851.93
        }
    };
    serverData.playDataArr = [
        {
            ReelSymbols: [
                ["M2", "M1", "C1", "M1", "M2"],
                ["C1", "M4", "M1", "M5", "M3"],
                ["M5", "M1", "M5", "C1", "M2"],
                ["M1", "M3", "M2", "M5", "C1"],
                ["M2", "M3", "C1", "M4", "M4"],
                ["C1", "C1", "M1", "M3", "M1"],
                ["M2", "C1", "M3", "C1", "M2"],
                ["M3", "M5", "M4", "M3", "M5"],
                ["M1", "C1", "M5", "C1", "M1"],
                ["M1", "M4", "M5", "M5", "M5"],
                ["M3", "M3", "M3", "M1", "M3"],
                ["M4", "M3", "C1", "M1", "M1"],
                ["M5", "M3", "M1", "M2", "M1"]
            ],
            WinResults: [
                {
                    "Type": "Match",
                    "Symbol": "M3",
                    "SymbolCount": 5,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M5",
                    "SymbolCount": 5,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                }
            ]
        },
        {
            ReelSymbols: [
                ["M5", "M4", "M5", "C1", "M2"],
                ["M5", "M5", "M5", "M4", "M5"],
                ["C1", "M3", "M3", "M1", "M5"],
                ["M4", "M1", "M2", "C1", "M1"],
                ["M4", "M3", "M4", "M5", "M1"],
                ["M2", "M5", "M2", "M3", "M4"],
                ["C1", "M3", "M1", "M2", "M5"],
                ["M4", "M5", "M1", "C1", "M2"],
                ["M5", "M2", "M4", "M4", "M4"],
                ["M2", "M4", "M4", "M1", "M1"]
            ],
            WinResults: [
                {
                    "Type": "Match",
                    "Symbol": "M4",
                    "SymbolCount": 5,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                }
            ]
        },
        {
            ReelSymbols: [
                ["M1", "M2", "M3", "C1", "C1"],
                ["M1", "M2", "M1", "C1", "C1"],
                ["M3", "C1", "M2", "C1", "M3"],
                ["C1", "C1", "C1", "M2", "M1"],
                ["M3", "C1", "C1", "M3", "M2"],
                ["M1", "M2", "M3", "M1", "M1"],
                ["M2", "M1", "M2", "M2", "C1"],
                ["M3", "M3", "M1", "C1", "M1"],
                ["M3", "M2", "M2", "M2", "M1"],
                ["M2", "M3", "M1", "C1", "C1"],
                ["C1", "C1", "M2", "M2", "M1"],
                ["C1", "C1", "M3", "M3", "M1"],
                ["C1", "M1", "M3", "M3", "M1"],
                ["M3", "M1", "C1", "C1", "M2"],
                ["M2", "M3", "M1", "M2", "M2"],
                ["M3", "M1", "M1", "M3", "M3"],
                ["M3", "M3", "C1", "M1", "C1"],
                ["M2", "M3", "M3", "M3", "M1"],
                ["M2", "C1", "C1", "M2", "M2"],
                ["M3", "M3", "C1", "M3", "M1"],
                ["M1", "M3", "M3", "M1", "M2"],
                ["M2", "M1", "M3", "M3", "C1"],
                ["M3", "C1", "M2", "M2", "M2"],
                ["M2", "M1", "M3", "M1", "M1"],
                ["M1", "M2", "C1", "M1", "C1"],
                ["M1", "C1", "M2", "M2", "C1"],
                ["M3", "C1", "M2", "M3", "M3"],
                ["C1", "C1", "M3", "M3", "M3"],
                ["M2", "C1", "M3", "M2", "C1"],
                ["C1", "M3", "C1", "M3", "C1"],
            ],
            WinResults: [
                {
                    "Type": "Match",
                    "Symbol": "C1",
                    "SymbolCount": 5,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M3",
                    "SymbolCount": 6,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M2",
                    "SymbolCount": 6,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                }
            ]
        },
        {
            ReelSymbols: [
                ["M2", "C1", "M2", "C1", "M3"],
                ["M1", "C1", "C1", "C1", "M3"],
                ["M2", "M1", "M2", "M2", "M2"],
                ["M2", "M1", "M3", "C1", "M1"],
                ["M1", "C1", "C1", "C1", "M2"],
                ["C1", "M3", "M2", "M3", "M1"],
                ["M3", "M3", "M1", "M2", "C1"],
                ["M3", "M3", "M1", "M2", "M2"],
                ["C1", "M2", "M2", "C1", "M1"],
                ["M3", "C1", "M1", "M1", "M2"],
                ["M1", "M1", "M2", "M3", "M2"],
                ["M3", "M1", "M2", "M3", "M1"],
                ["M3", "C1", "M3", "M2", "M1"],
                ["C1", "M1", "M2", "M1", "M3"],
                ["C1", "M2", "M1", "M1", "M2"],
                ["M2", "M3", "M3", "M2", "M1"],
                ["M3", "M3", "C1", "M3", "M1"],
                ["M1", "C1", "C1", "C1", "M1"],
                ["M3", "M2", "C1", "M1", "M2"],
                ["C1", "M2", "M3", "M1", "C1"],
                ["M2", "M1", "M2", "M2", "M2"],
                ["C1", "M2", "M2", "C1", "M2"],
                ["M2", "M1", "M2", "M1", "M3"],
                ["C1", "C1", "M3", "M2", "M2"],
                ["M1", "M1", "M2", "M2", "M3"],
                ["M3", "C1", "M3", "M1", "C1"],
                ["M3", "C1", "C1", "C1", "C1"],
                ["M1", "M1", "M3", "C1", "M2"],
                ["M1", "M3", "M2", "M1", "M3"],
                ["M2", "M2", "C1", "M1", "C1"],
                ["M3", "C1", "C1", "M2", "M1"],
                ["M2", "M2", "M3", "M3", "M1"],
                ["C1", "C1", "M3", "M2", "M3"],
                ["M3", "M3", "M2", "M1", "C1"],
                ["C1", "C1", "M2", "M2", "M2"],
                ["M2", "M3", "M1", "M2", "M1"],
                ["M1", "M2", "C1", "M3", "M2"],
                ["M3", "M3", "C1", "M3", "M1"],
                ["M3", "M3", "M1", "C1", "C1"],
                ["M3", "M2", "M3", "M3", "M1"],
                ["M1", "M2", "M2", "M1", "M2"],
                ["C1", "M1", "C1", "M1", "C1"],
                ["M3", "M2", "C1", "M2", "C1"],
                ["M1", "C1", "C1", "M2", "M3"],
                ["M3", "M1", "M3", "C1", "M3"],
                ["M3", "C1", "M1", "C1", "M1"],
                ["C1", "C1", "M1", "C1", "M1"],
                ["M1", "M1", "M2", "M1", "M3"],
                ["M3", "M3", "M3", "M2", "M2"],
                ["M3", "M1", "M3", "M3", "C1"]
            ],
            WinResults: [
                {
                    "Type": "Match",
                    "Symbol": "M3",
                    "SymbolCount": 5,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M1",
                    "SymbolCount": 6,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "C1",
                    "SymbolCount": 7,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M1",
                    "SymbolCount": 6,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M2",
                    "SymbolCount": 6,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                },
                {
                    "Type": "Match",
                    "Symbol": "M3",
                    "SymbolCount": 5,
                    "Positions": [],
                    "Data": {
                        "Line": 1,
                        "PayType": "RL"
                    },
                    "Bet": 0,
                    "Win": 0,
                    "Multipliers": [1, 1]
                }
            ]
        },
        {
            ReelSymbols: [
                ["M2", "M5", "M2", "M3", "M4"],
                ["C1", "M3", "M1", "M2", "M5"],
                ["M4", "M5", "M1", "C1", "M2"],
                ["M5", "M2", "M4", "M1", "M4"],
                ["M2", "M4", "M4", "M1", "M1"]
            ],
            WinResults: []
        },
        {
            ReelSymbols: [
                ["M2", "M2", "M2", "M3", "M4"],
                ["C1", "M3", "M1", "M2", "M5"],
                ["M4", "M5", "M1", "C1", "M3"],
                ["M3", "M5", "M4", "M1", "M4"],
                ["M2", "M4", "M4", "M1", "M1"]
            ],
            WinResults: []
        },
        {
            ReelSymbols: [
                ["M2", "M2", "M3", "M2", "M4"],
                ["C1", "M3", "M3", "M3", "M5"],
                ["M3", "M5", "M1", "C1", "M3"],
                ["M5", "M3", "M4", "M3", "M4"],
                ["M2", "M4", "M3", "M1", "M1"]
            ],
            WinResults: []
        }
    ];
    return serverData;
}());
__reflect(serverData.prototype, "serverData");
//# sourceMappingURL=ServerManager.js.map
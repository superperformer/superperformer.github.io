//return attribute
const EStockType = {
    DATE: 0,
    OPEN: 1,
    HIGH: 2,
    LOW: 3,
    CLOSE: 4,
    VOL: 5,
    MARGIN_PURCHASE: 6,
    SHORT_SALE: 7,
    FOREIGN_HOLDING: 8,
    SITES_HOLDING: 9,
    DEALER_HOLDING: 10,
    BIG_THREE_HOLDING: 14,
    MAJOR_NET_BUY_SELL: 15,
    DAY_TRADING: 16,
    MARGIN_PURCHASE_RATIO: 17,
    BALANCE_SALE_MARGIN_RATIO: 18,
    FOREIGN_NET_BUY_SELL: 19,
    SITES_NET_BUY_SELL: 20,
    DEALER_NET_BUY_SELL: 21,
    BIG_THREE_NET_BUY_SELL: 22,
  };
const contentData = [[2022/09/22, 2022/09/23, 2022/09/26, 2022/09/27, 2022/09/28], [462, 458.5, 443, 449, 447], [468, 460.5, 454, 451.5, 449], [459, 455, 443, 446, 438], [464.5, 455, 446.5, 448, 438], [31418, 32804, 34857, 29570, 37827], [27673, 28413, 27905, 28272, 28129], [161, 233, 359, 416, 474], [18537402, 18526097, 18520707, 18514384, 18509714], [402658, 402766, 403686, 404073, 404312], [205915, 207308, 207575, 209019, 209474], [18537402, 18526097, 18520707, 18514384, 18509714], [402658, 402766, 403686, 404073, 404312], [205915, 207308, 207575, 209019, 209474], [19145975, 19136170, 19131968, 19127476, 19123500], [-7632, -11241, -1680, -3739, -4958], [7, 3, 9, 0, 8], [0.43, 0.44, 0.43, 0.44, 0.43], [0.58, 0.82, 1.29, 1.47, 1.69], [-11193, -10978, -5056, -5432, -4670], [86, 108, 920, 387, 239], [-86, 1392, 267, 1444, 455], [-11193, -9477, -3869, -3601, -3976]]
//[[2022/09/26, 2022/09/27, 2022/09/28], [443, 449, 447], [454, 451.5, 449], [443, 446, 438], [446.5, 448, 438], [34857, 29570, 37827], [27905, 28272, 28129], [359, 416, 474], [18520707, 18514384, 18509714], [403686, 404073, 404312], [207575, 209019, 209474], [18520707, 18514384, 18509714], [403686, 404073, 404312], [207575, 209019, 209474], [19131968, 19127476, 19123500], [-1680, -3739, -4958], [9, 0, 8], [0.43, 0.44, 0.43], [1.29, 1.47, 1.69], [-5056, -5432, -4670], [920, 387, 239], [267, 1444, 455], [-3869, -3601, -3976]]
//console.log(contentData)
const mapped = contentData[EStockType.DATE].map(function(value, index){
    return {
        date: value,//String(contentData[EStockType.DATE][index]),
        // 開盤價
        open: parseFloat(contentData[EStockType.OPEN][index]),
        // 最高價
        high: parseFloat(contentData[EStockType.HIGH][index]),
        // 最低價
        low: parseFloat(contentData[EStockType.LOW][index]),
        // 收盤價
        close: parseFloat(contentData[EStockType.CLOSE][index]),
        // 成交量
        vol: parseInt(contentData[EStockType.VOL][index], 10) || 0,
        // 融資餘額
        marginPurchase: contentData[EStockType.MARGIN_PURCHASE]
          ? parseInt(contentData[EStockType.MARGIN_PURCHASE][index], 10) || 0
          : 0,
        // 融券餘額
        shortSale: contentData[EStockType.SHORT_SALE]
          ? parseInt(contentData[EStockType.SHORT_SALE][index], 10) || 0
          : 0,
        // 外資持股
        foreignHolding: contentData[EStockType.FOREIGN_HOLDING]
          ? parseInt(contentData[EStockType.FOREIGN_HOLDING][index]) || 0
          : 0,
        // 投信持股
        sitesHolding: contentData[EStockType.SITES_HOLDING]
          ? parseInt(contentData[EStockType.SITES_HOLDING][index], 10) || 0
          : 0,
        // 自營商持股
        dealerHolding: contentData[EStockType.DEALER_HOLDING]
          ? parseInt(contentData[EStockType.DEALER_HOLDING][index], 10) || 0
          : 0,
        // 三大法人持股
        bigThreeHolding: contentData[EStockType.BIG_THREE_HOLDING]
          ? parseInt(contentData[EStockType.BIG_THREE_HOLDING][index], 10) || 0
          : 0,
        // 主力買賣超
        majorNetBuySell: contentData[EStockType.MAJOR_NET_BUY_SELL]
          ? parseInt(contentData[EStockType.MAJOR_NET_BUY_SELL][index], 10) || 0
          : 0,
        // 當沖
        dayTrading: contentData[EStockType.DAY_TRADING]
          ? parseInt(contentData[EStockType.DAY_TRADING][index], 10) || 0
          : 0,
        // 融資使用率
        marginPurchaseRatio: contentData[EStockType.MARGIN_PURCHASE_RATIO]
          ? parseFloat(contentData[EStockType.MARGIN_PURCHASE_RATIO][index]) || 0
          : 0,
        // 券資比
        bsmRatio: contentData[EStockType.BALANCE_SALE_MARGIN_RATIO]
          ? parseFloat(contentData[EStockType.BALANCE_SALE_MARGIN_RATIO][index]) ||
            0
          : 0,
        // 外資買賣超
        foreignNetBuySell: contentData[EStockType.FOREIGN_NET_BUY_SELL]
          ? parseInt(contentData[EStockType.FOREIGN_NET_BUY_SELL][index], 10) || 0
          : 0,
        // 投信買賣超
        sitesNetBuySell: contentData[EStockType.SITES_NET_BUY_SELL]
          ? parseInt(contentData[EStockType.SITES_NET_BUY_SELL][index], 10) || 0
          : 0,
        // 自營商買賣超
        dealerNetBuySell: contentData[EStockType.DEALER_NET_BUY_SELL]
          ? parseInt(contentData[EStockType.DEALER_NET_BUY_SELL][index], 10) || 0
          : 0,
        // 三大法人買賣超
        bigThreeNetBuySell: contentData[EStockType.BIG_THREE_NET_BUY_SELL]
          ? parseInt(contentData[EStockType.BIG_THREE_NET_BUY_SELL][index], 10) || 0
          : 0,
    }
});
console.log(mapped);


function getAttribute(stockInfo) {
    const { startPrice, endPrice, maxPrice, minPrice } = stockInfo;//open, close, high, low
    const { endPrice: refPrice = 0 } = getNDayAgoStock(stockList, 2);
    const endPriceList = stockList.map((stock) => stock.endPrice);
    const maxPriceList = stockList.map((stock) => stock.maxPrice);
    const minPriceList = stockList.map((stock) => stock.minPrice);
    const priceRangeList = stockList.map((stock) => (stock.maxPrice/stock.minPrice-1)*100);
    //const priceAmplitude = numRound(((maxPrice - minPrice) / refPrice) * 100, 2);
    //3 day close change %: round((max/min - 1)*100,2)
    const priceAmplitude = numRound((Math.max(...endPriceList.slice(-3)) / Math.min(...endPriceList.slice(-3)) - 1 ) * 100, 2);
    const riskMA = DAYS.map((day) => numRound(((endPrice - movingAverage(endPriceList, day)) / endPrice) * 100, 2));
    const priceMA = DAYS.map((day) => movingAverage(endPriceList, day));
    const maxMA = DAYS.map((day) => Math.max(...maxPriceList.slice(-day)));
    const minMA = DAYS.map((day) => Math.min(...minPriceList.slice(-day)));
    // 當日漲跌
    const riseDropPrice = numRound(endPrice - refPrice, 2);
    // 當日漲跌幅%
    const riseDropMargin = numRound(((endPrice - refPrice) / refPrice) * 100, 2);
    // 判斷 5,10,20 日均線糾結
    const isTangledMA = riskMA
        .filter((price, index) => index === DAYS.indexOf(5) || index === DAYS.indexOf(10) || index === DAYS.indexOf(20))
        .every((risk) => risk >= -2 && risk <= 3);
    // 判斷前一天 5, 10, 20 日均線糾結
    const prePriceMA = DAYS.map((day) => movingAverage(endPriceList.slice(0, -1), day));
    const preRiskMA = DAYS.map((day) => numRound(((refPrice - movingAverage(endPriceList.slice(0, -1), day)) / refPrice) * 100, 2));
    const isPreTangledMA = preRiskMA
        .filter((price, index) => index === DAYS.indexOf(5) || index === DAYS.indexOf(10) || index === DAYS.indexOf(20))
        .every((risk) => risk >= -2 && risk <= 3);
    // 收盤價在 5, 10, 20 日均線之上
    const isOverPrePriceMA = prePriceMA
        .filter((price, index) => index === DAYS.indexOf(5) || index === DAYS.indexOf(10) || index === DAYS.indexOf(20))
        .every((price) => price < endPrice);
    // 收盤價在 5, 10, 20 日均線之下
    const isUnderPrePriceMA = prePriceMA
        .filter((price, index) => index === DAYS.indexOf(5) || index === DAYS.indexOf(10) || index === DAYS.indexOf(20))
        .every((price) => price > endPrice);
    // 突破均線糾結
    const isBreakTangled = riseDropMargin > 4 && isOverPrePriceMA && isPreTangledMA;
    // 跌破均線糾結
    const isDropTangled = riseDropMargin < -4 && isUnderPrePriceMA && isPreTangledMA;
    //3 days tight with in 1.5%; get last 3 close
    const is3DaysTight = Math.max(...endPriceList.slice(-3)) / Math.min(...endPriceList.slice(-3)) < 1.016;
    const is3DaysHighTight = Math.max(...maxPriceList.slice(-3)) / Math.min(...maxPriceList.slice(-3)) < 1.016;
    //todo: add extreme 1 day price tight/doji
    //const volList = stockList.map((stock) => stock.vol);
    //const lowestVol = Math.min(...volList.slice(-10)); //get lowest vol from last 10 days
    // const isVolDry = volList.slice(-1)[0] === Math.min(...volList.slice(-10))
    // 	|| volList.slice(-2,-1)[0] === Math.min(...volList.slice(-11,-1))
    // 	|| volList.slice(-3,-2)[0]=== Math.min(...volList.slice(-12,-2)); // lowest vol in last 3 days
    // console.log(Math.max(...maxPriceList));
    // console.log(maxPriceList.indexOf(Math.max(...maxPriceList)));
    // console.log(maxPriceList.length);
    const yearHigh = Math.max(...maxPriceList.slice(0, maxPriceList.length-1)); // exclude day0: the last one
    //base length
    const baseLength = maxPriceList.length - maxPriceList.indexOf(yearHigh) -1; //starts from 0
    const closes = endPriceList.reverse();
    const lows = minPriceList.reverse();
    const highs = maxPriceList.reverse();
    const vols = stockList.map((stock) => stock.vol).reverse();
    //get downVolume
    const downVols = vols.slice(1,11).map((vol, idx)=>{ //取前10天
        if ((closes[idx+1] > closes[idx]) && ((highs[idx] + lows[idx]) / 2 > closes[idx])) //down
            return vol;
        else return 0;
    });
    //get highestDownVolume in prior 10 days
    const highestDownVolume = Math.max(...downVols);
    //up && over highestdownvolume
    const isPocketPivot = baseLength > 2 && ((closes[0] >= closes[1]) && (closes[0] >= (highs[0] + lows[0]) / 2)) && vols[0]> highestDownVolume;
    const isVolDry = vols[0] === Math.min(...vols.slice(10))
        || vols[1] === Math.min(...vols.slice(1,11)) || vols[2]=== Math.min(...vols.slice(2,12)); // lowest vol in last 3 days
    //close inside prev 2 lows && prev 2 highs+ 0.5% tlr (*1.005)  //closes[0]>= lows[1] || close[0]>= lows[2]
    const isInside = (closes[0] >= Math.min(lows[1],lows[2])) && (closes[0] <= Math.max(highs[1],highs[2])*1.005);

    //RS
    const rs = numRound(closes[0] / closes[50] * 2 + closes[0]/closes[100] + closes[0]/closes[150]+ closes[0]/closes[200], 1);
    //tightest price in 10 days and range < 4% && bl>3 && bl < 21
    const isTightRange =  rs > 5.5 && baseLength > 2 && baseLength < 23 && Math.min(...priceRangeList.slice(-2)) == Math.min(...priceRangeList.slice(-10)) && maxPrice/minPrice < 1.04
    //close above upper third && range > 5%
    const isUpsideReversal = baseLength > 3 && endPrice > maxPrice * 2/3 + minPrice * 1/3 && maxPrice/minPrice > 1.05;
    //% off high
    const offHighPercent = numRound((1 - endPrice/yearHigh)*100,2);
    //todo: doji
    //look for higher rs shorter baselength, tighten
    //short base for tennis ball, mvp, high momentum pullback buy, htf
    const isQuickMover = rs > 5.4 && baseLength > 4 && baseLength < 20 && (is3DaysHighTight|| is3DaysTight || isVolDry) && isInside;
    //primary base, --mover  view via weekly chart
    const isSlowMover = rs > 5 && baseLength >= 20 && (is3DaysHighTight|| is3DaysTight || isVolDry) && isInside;
    //todo: 200ma uptrend
    //console.log('rs: ',rs);
    // 判斷多頭排列
    // const isLongOrder =
    // 	priceMA[DAYS.indexOf(5)] > priceMA[DAYS.indexOf(10)] &&
    // 	priceMA[DAYS.indexOf(10)] > priceMA[DAYS.indexOf(20)] &&
    // 	priceMA[DAYS.indexOf(20)] > priceMA[DAYS.indexOf(60)];
    //cp71考慮增加屬性: close 大於50ma*0.98  && 50ma > 200ma
    const isLongOrder =
        priceMA[DAYS.indexOf(50)] > priceMA[DAYS.indexOf(200)] &&
        endPrice > priceMA[DAYS.indexOf(50)] * 0.98 && //50ma with 2.5% tolerance
        endPrice > priceMA[DAYS.indexOf(21)] * 0.99 && //20ma with 1% tolerance
        endPrice > priceMA[DAYS.indexOf(10)] * 0.98 && //10ma with 1.5% tolerance; consider use inside day
        offHighPercent < 33 && // 33% or less off high
        endPrice > 9;

    // 判斷空頭排列
    const isShortOrder =
        priceMA[DAYS.indexOf(50)] < priceMA[DAYS.indexOf(200)] &&
        endPrice < priceMA[DAYS.indexOf(50)] * 1.02 &&
        endPrice < priceMA[DAYS.indexOf(21)] * 1.01 && //20ma with 1% tolerance
        endPrice < priceMA[DAYS.indexOf(10)] * 1.02; //10ma with 1.5% tolerance
    // 判斷六線全上或下
    const checkPriceMA = priceMA.filter((price, index) => index > 0);
    const isAllLongOrder = checkPriceMA.every((val, index) => (index === 0 ? true : val < checkPriceMA[index - 1]));
    const isAllShortOrder = checkPriceMA.every((val, index) => (index === 0 ? true : val > checkPriceMA[index - 1]));
    // 判斷漲停跌停
    const limitPrice = calculateLimitPrice(refPrice);
    const isLimitUp = endPrice === limitPrice.up;
    const isLimitDown = endPrice === limitPrice.down;
    const isLimitUpOnce = maxPrice === limitPrice.up && endPrice !== limitPrice.up;
    const isLimitDownOnce = minPrice === limitPrice.down && endPrice !== limitPrice.down;
    // 判斷均線均線上彎
    const maReverseUp = DAYS.map(
        (day) =>
            endPrice > getNDayAgoStock(endPriceList, day - 1) &&
            endPrice > getNDayAgoStock(endPriceList, day) &&
            refPrice < getNDayAgoStock(endPriceList, day + 1),
    );
    // 判斷均線均線下彎
    const maReverseDown = DAYS.map(
        (day) =>
            endPrice < getNDayAgoStock(endPriceList, day - 1) &&
            endPrice < getNDayAgoStock(endPriceList, day) &&
            refPrice > getNDayAgoStock(endPriceList, day + 1),
    );
    // 判斷回測均線
    const maBackTest = DAYS.map((day) => {
        const prePriceMA = movingAverage(endPriceList, day, true);
        return (
            (minPrice < prePriceMA && endPrice > prePriceMA) ||
            (minPrice > prePriceMA && numRound((minPrice - prePriceMA) / prePriceMA, 3) < 0.02)
        );
    });
    // 判斷跌破均線
    const maFallBelow = DAYS.map((day) => {
        const prePriceMA = movingAverage(endPriceList, day, true);
        return endPrice < prePriceMA;
    });

    return {
        refPrice,
        startPrice,
        endPrice,
        maxPrice,
        minPrice,
        riseDropPrice,
        riseDropMargin,
        priceAmplitude,
        riskMA,
        priceMA,
        maxMA,
        minMA,
        isTangledMA,
        isBreakTangled,
        isDropTangled,
        is3DaysTight,
        is3DaysHighTight,
        isVolDry,
        isPocketPivot,
        baseLength,
        isTightRange,
        isUpsideReversal,
        offHighPercent,
        rs,
        isQuickMover,
        isSlowMover,
        isLongOrder,
        isShortOrder,
        isAllLongOrder,
        isAllShortOrder,
        isLimitUp,
        isLimitDown,
        isLimitUpOnce,
        isLimitDownOnce,
        maReverse: {
            up: maReverseUp,
            down: maReverseDown,
        },
        maBackTest: {
            backTest: maBackTest,
            fallBelow: maFallBelow,
        },
        riseDropDays: {
            price: DAYS.map((day) => numRound(endPrice - getNDayAgoStock(endPriceList, day), 2)),
            margin: DAYS.map((day) => numRound(((endPrice - getNDayAgoStock(endPriceList, day)) / getNDayAgoStock(endPriceList, day)) * 100, 2)),
        },
    };
}
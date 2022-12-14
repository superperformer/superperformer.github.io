import * as ramda from 'ramda';
import { numRound } from '../math';
import { DAYS } from '../../constants';
import { mathMod } from 'ramda';
const movingAverage = (data, days, isPrevious) => {
	const movingList = !isPrevious ? data.slice(days * -1) : data.slice((days + 1) * -1, -1);
	return numRound(ramda.mean(movingList), 2);
};

const getNDayAgoStock = (list, days) => {
	const nDayAgo = days * -1;
	return days === 1 ? list.slice(nDayAgo)[0] : list.slice(nDayAgo, nDayAgo + 1)[0];
};

// 取得連買日數(負數為連賣)
const getStockContinuousBuySell = (list) => {
	let count = 0;
	for (let i = 1; i <= list.length; i++) {
		const calcBuySell = getNDayAgoStock(list, i);
		if (calcBuySell === 0) {
			return count;
		} else {
			if (calcBuySell > 0 && getNDayAgoStock(list, 1) > 0) {
				count += 1;
			} else if (calcBuySell < 0 && getNDayAgoStock(list, 1) < 0) {
				count -= 1;
			} else {
				return count;
			}
		}
	}
};

const getTurningPoint = (list) => {
	const buySell = getNDayAgoStock(list, 1);
	const preBuySell = getNDayAgoStock(list, 2);
	if ((buySell > 0 && preBuySell > 0) || (buySell === 0 && preBuySell === 0) || (buySell < 0 && preBuySell < 0)) {
		return null;
	}
	let count = 0;
	for (let i = 2; i <= list.length; i++) {
		if (preBuySell > 0) {
			if (getNDayAgoStock(list, i) > 0) {
				count += 1;
			} else {
				return { type: 'SELL', count };
			}
		} else if (preBuySell === 0) {
			if (getNDayAgoStock(list, i) === 0) {
				count += 1;
			} else {
				return { type: 'NOTHING', count };
			}
		} else {
			if (getNDayAgoStock(list, i) < 0) {
				count += 1;
			} else {
				return { type: 'BUY', count };
			}
		}
	}
};

const calculateEMA = (mArray, mRange) => {
	var k = 2 / (mRange + 1);
	// first item is just the same as the first item in the input
	const emaArray = [mArray[0]];
	// for the rest of the items, they are computed with the previous one
	for (var i = 1; i < mArray.length; i++) {
		emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
	}
	return emaArray;
};

const calculateLimitPrice = (price) => {
	const limitUpPrice = price * 1.1;
	const limitDownPrice = price * 0.9;
	if (limitUpPrice < 10 && limitDownPrice < 10) {
		return {
			up: Math.floor(Math.floor(limitUpPrice * 100) * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice * 100) * 100) / 100 / 100,
		};
	}
	if (limitUpPrice > 10 && limitDownPrice < 10) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 0.05) * 0.05 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice * 100) * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 10 && limitDownPrice >= 10 && limitUpPrice <= 50 && limitDownPrice < 50) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 0.05) * 0.05 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 0.05) * 0.05 * 100 * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 50 && limitDownPrice < 50) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 0.1) * 0.1 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 0.05) * 0.05 * 100 * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 50 && limitDownPrice >= 50 && limitUpPrice < 100 && limitDownPrice < 100) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 0.1) * 0.1 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 0.1) * 0.1 * 100 * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 100 && limitDownPrice < 100) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 0.5) * 0.5 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 0.1) * 0.1 * 100 * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 100 && limitDownPrice >= 100 && limitUpPrice < 1000 && limitDownPrice < 1000) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 0.5) * 0.5 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 0.5) * 0.5 * 100 * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 1000 && limitDownPrice < 1000) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 5) * 5 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 0.5) * 0.5 * 100 * 100) / 100 / 100,
		};
	}
	if (limitUpPrice >= 1000 && limitDownPrice >= 1000) {
		return {
			up: Math.floor(Math.floor(limitUpPrice / 5) * 5 * 100 * 100) / 100 / 100,
			down: Math.floor(Math.ceil(limitDownPrice / 5) * 5 * 100 * 100) / 100 / 100,
		};
	}
};
class StockUtil {
	// 取得 price 相關資訊
	static getPriceInfo(stockInfo, stockList) {
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
		const isVolDry = vols[0] === Math.min(...vols.slice(0, 10))
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

	// 取得量能相關資訊
	static getVolInfo(stockInfo, stockList) {
		const { vol } = stockInfo;
		const { vol: preVol } = getNDayAgoStock(stockList, 2);
		const volList = stockList.map((stock) => stock.vol);
		return {
			vol,
			preVol,
			volRatio: numRound(vol / preVol, 2),
			volDays: DAYS.map((day) => numRound(movingAverage(volList, day), 0)),
			maxVolDays: DAYS.map((day) => Math.max(...volList.slice(-day))),
			minVolDays: DAYS.map((day) => Math.min(...volList.slice(-day))),
			volDaysRatio: DAYS.map((day) => numRound(vol / movingAverage(volList, day), 2)),
		};
	}

	/*
    #抓取旗型型態(以抓取前三日~前十日內有一表態紅K漲幅大於5%且當日交易量大於5日均量為對象)
    #強勢=>近日收盤未跌破表態紅K收盤價
    #中等=>近日收盤未跌破表態紅K收盤價與開盤價二分之一
    #弱勢=>近日收盤未跌破表態紅K開盤價
  */
	static getStockFlagType(stockInfo, stockList) {
		const { endPrice: price, vol } = stockInfo;
		const endPriceList = stockList.map((stock) => stock.endPrice);
		const startPriceList = stockList.map((stock) => stock.startPrice);
		const volList = stockList.map((stock) => stock.vol);
		let isDrop5MA = false;
		let isFlagEnd = false;
		let flagLevel = 99;
		let flagVolRatio = 0;
		// 隔日開平盤的5MA(假定)
		const priceNext5MA = numRound((movingAverage(endPriceList, 5) * 5 - getNDayAgoStock(endPriceList, 5) + price) / 5, 2);
		for (let i = 3; i <= 10; i++) {
			// 前N日之收盤價
			const calcPrice = getNDayAgoStock(endPriceList, i);
			// 前N日之前日收盤價
			const calcPrePrice = getNDayAgoStock(endPriceList, i + 1);
			// 前N日之漲跌幅
			const calcRiseDropMargin = numRound((calcPrice - calcPrePrice) / calcPrePrice, 4);
			// 前N日之成交量
			const calcVol = getNDayAgoStock(volList, i);
			// 5日均量
			const calcVol5MA = numRound(movingAverage(volList.slice(-i), 5), 2);
			// 5MA
			const calcPrice5MA = numRound(movingAverage(endPriceList.slice(-i), 5), 2);
			// 跌破過五日線
			isDrop5MA = calcPrice < calcPrice5MA;
			/*
        表態紅K條件:
        #1.漲跌幅大於5%
        #2.成交量大於五日均量
        #3.收盤價大於5MA 4%以上
       */
			if (calcRiseDropMargin > 0.05 && calcVol > calcVol5MA && calcPrice >= calcPrice5MA * 1.04) {
				// 前N日之開盤價
				const calcStartPrice = getNDayAgoStock(startPriceList, i);
				const calcHalfPrice = (calcPrice + calcStartPrice) / 2;
				let compareFlagLevel = 0;
				for (let j = i - 1; j >= 1; j--) {
					// 表態紅K後收盤價
					const calcTempPrice = getNDayAgoStock(endPriceList, j);
					// 表態紅K後漲超過3%排除旗型
					if (calcTempPrice >= calcPrice * 1.05) {
						compareFlagLevel = 0;
					} else if (calcTempPrice >= calcPrice) {
						// 強勢
						compareFlagLevel = 3;
					} else if (calcTempPrice >= calcHalfPrice) {
						// 中等
						compareFlagLevel = 2;
					} else if (calcTempPrice >= calcStartPrice) {
						// 弱勢
						compareFlagLevel = 1;
					} else {
						compareFlagLevel = 0;
					}
					if (compareFlagLevel < flagLevel) {
						flagLevel = compareFlagLevel;
					}
				}
			}
			// 判斷是否為旗型末端
			if (flagLevel > 0 && flagLevel < 99 && !isDrop5MA) {
				// 當日收盤仍需在五日線上
				if (priceNext5MA * 1.015 > price && price >= numRound(movingAverage(endPriceList, 5), 2)) {
					isFlagEnd = true;
				}
				flagVolRatio = vol / calcVol;
			}
		}
		return {
			isFlagEnd,
			flagLevel,
			flagVolRatio,
		};
	}

	// 破切型態=>準備反轉(逆轉紅K隔日底部三分之一進場)
	static getStockReverseType(stockInfo, stockList) {
		const reverseInfo = {
			isReverse: false,
			reverseType: '',
		};
		const { maxPrice, startPrice, endPrice, vol } = stockInfo;
		const { maxPrice: preMaxPrice, endPrice: preEndPrice } = getNDayAgoStock(stockList, 2);
		const volList = stockList.map((stock) => stock.vol);
		const priceList = stockList.map((stock) => stock.endPrice);
		const maxPriceList = stockList.map((stock) => stock.maxPrice);
		const vol10MA = numRound(movingAverage(volList, 10), 2);
		const price5MA = numRound(movingAverage(priceList, 5), 2);
		const price10MA = numRound(movingAverage(priceList, 10), 2);
		const price20MA = numRound(movingAverage(priceList, 20), 2);
		// 最高價至前一日跌幅需超過5%才算
		if ((maxPrice - preMaxPrice) / maxPrice < 0.05) {
			return reverseInfo;
		}
		//當日漲幅需超過2.5%才算
		if (getNDayAgoStock(priceList, 2) * 1.025 > endPrice) {
			return reverseInfo;
		}
		// 至少要是紅K且高於前一日收盤才算
		if (endPrice < startPrice || endPrice < preEndPrice) {
			return reverseInfo;
		}
		// 成交量需大於十日均量才算
		if (vol < vol10MA) {
			return reverseInfo;
		}
		// 需站上5/10/20日均線才算
		if (endPrice < price5MA || (endPrice < price10MA) | (endPrice < price20MA)) {
			return reverseInfo;
		}
		// 抓取下降趨勢最高點
		let maxPriceBase = 0;
		let calcMaxPrice = 0;
		for (let i = 2; i <= maxPriceList.length; i++) {
			const compareMaxPrice = getNDayAgoStock(maxPriceList, i);
			// 先預設前一日為最高
			if (i === 2) {
				calcMaxPrice = compareMaxPrice;
				maxPriceBase = i;
			} else if (compareMaxPrice > calcMaxPrice) {
				// 遇到新的最高價時，需高於原有最高價的3%以上(五日內不限制此規則)，避免盤整線形
				if (maxPriceBase + i <= 5 || compareMaxPrice > maxPrice * 1.03) {
					calcMaxPrice = compareMaxPrice;
					maxPriceBase = i;
				}
			}
		}
		// 下降趨勢起始點須為20日前
		if (maxPriceBase < 20) {
			return reverseInfo;
		}
		// 抓取下降趨勢基準點，斜率越小代表線越平
		let dropTrendMaxBase = 0;
		let dropTrendMaxSlope = 0;
		for (let i = maxPriceBase - 1; i > 1; i--) {
			// 計算斜率:(y2-y1)/(x2-x1)
			const dropTrendSlope = (getNDayAgoStock(maxPriceList, i) - calcMaxPrice) / (maxPriceBase - i);
			if (i === maxPriceBase - 1) {
				dropTrendMaxSlope = dropTrendSlope;
				dropTrendMaxBase = i;
			} else if (dropTrendSlope > dropTrendMaxSlope) {
				dropTrendMaxSlope = dropTrendSlope;
				dropTrendMaxBase = i;
			}
		}
		// 斜率大於0表示不為下降趨勢
		if (dropTrendMaxSlope > 0) {
			return reverseInfo;
		}
		// 下降趨勢線畫出來後，不能有任一天的最高價超過下降趨勢線
		reverseInfo.isReverse = true;
		let dropTrendPrice = 0;
		for (let i = dropTrendMaxBase - 1; i > 0; i--) {
			dropTrendPrice = (maxPriceBase - i) * dropTrendMaxSlope + calcMaxPrice;
			// 當天要突破下降趨勢線
			if (i === 1) {
				reverseInfo.isReverse = endPrice > dropTrendPrice;
			} else if (getNDayAgoStock(maxPriceList, i) > dropTrendPrice) {
				reverseInfo.isReverse = false;
			}
		}
		if (reverseInfo.isReverse) {
			reverseInfo.reverseType = startPrice > preMaxPrice ? '跳空站上' : startPrice > dropTrendPrice ? '底部站上' : '';
		}
		return reverseInfo;
	}

	// 取得外資/投信/自營/主力 買賣資訊
	static getNetBuySellInfo(stockInfo, stockList) {
		const {
			majorNetBuySell,
			foreignNetBuySell,
			foreignHolding,
			sitesNetBuySell,
			sitesHolding,
			dealerNetBuySell,
			dealerHolding,
			bigThreeNetBuySell,
			bigThreeHolding,
			vol,
		} = stockInfo;
		const majorList = stockList.map((stock) => stock.majorNetBuySell);
		const foreignList = stockList.map((stock) => stock.foreignNetBuySell);
		const sitesList = stockList.map((stock) => stock.sitesNetBuySell);
		const dealerList = stockList.map((stock) => stock.dealerNetBuySell);
		const bigThreeList = stockList.map((stock) => stock.bigThreeNetBuySell);
		const stockInfo4DaysAgo = getNDayAgoStock(stockList, 4);
		// const foreignHoldingList = stockList.map((stock) => stock.foreignHolding);
		return {
			major: {
				today: majorNetBuySell,
				remain: null,
				volRatio: numRound((majorNetBuySell / vol) * 100, 2),
				days: getStockContinuousBuySell(majorList),
				total: DAYS.map((day) => ramda.sum(majorList.slice(-day))),
				turnPoint: getTurningPoint(majorList),
				placementStrategy: null,
			},
			foreign: {
				today: foreignNetBuySell,
				remain: foreignHolding,
				volRatio: numRound((foreignNetBuySell / vol) * 100, 2),
				days: getStockContinuousBuySell(foreignList),
				total: DAYS.map((day) => ramda.sum(foreignList.slice(-day))),
				turnPoint: getTurningPoint(foreignList),
				placementStrategy: {
					enter: stockInfo4DaysAgo.foreignHolding === 0 && foreignHolding !== 0,
					exit: stockInfo4DaysAgo.foreignHolding !== 0 && foreignHolding === 0,
				},
			},
			sites: {
				today: sitesNetBuySell,
				remain: sitesHolding,
				volRatio: numRound((sitesNetBuySell / vol) * 100, 2),
				days: getStockContinuousBuySell(sitesList),
				total: DAYS.map((day) => ramda.sum(sitesList.slice(-day))),
				turnPoint: getTurningPoint(sitesList),
				placementStrategy: {
					enter: stockInfo4DaysAgo.sitesHolding === 0 && sitesHolding !== 0,
					exit: stockInfo4DaysAgo.sitesHolding !== 0 && sitesHolding === 0,
				},
			},
			dealer: {
				today: dealerNetBuySell,
				remain: dealerHolding,
				volRatio: numRound((dealerNetBuySell / vol) * 100, 2),
				days: getStockContinuousBuySell(dealerList),
				total: DAYS.map((day) => ramda.sum(dealerList.slice(-day))),
				turnPoint: getTurningPoint(dealerList),
				placementStrategy: {
					enter: stockInfo4DaysAgo.dealerHolding === 0 && dealerHolding !== 0,
					exit: stockInfo4DaysAgo.dealerHolding !== 0 && dealerHolding === 0,
				},
			},
			bigThree: {
				today: bigThreeNetBuySell,
				remain: bigThreeHolding,
				volRatio: numRound((bigThreeNetBuySell / vol) * 100, 2),
				days: getStockContinuousBuySell(bigThreeList),
				total: DAYS.map((day) => ramda.sum(bigThreeList.slice(-day))),
				turnPoint: getTurningPoint(bigThreeList),
				placementStrategy: null,
			},
		};
	}

	// 融資融券資訊
	static getBSMInfo(stockInfo, stockList) {
		const { marginPurchase, shortSale, marginPurchaseRatio, bsmRatio } = stockInfo;
		const { marginPurchase: preMarginPurchase, shortSale: preShortSale } = getNDayAgoStock(stockList, 2);
		const marginPurchaseList = stockList.map((stock) => stock.marginPurchase);
		const shortSaleList = stockList.map((stock) => stock.shortSale);
		return {
			marginPurchase: {
				remain: marginPurchase,
				change: marginPurchase - preMarginPurchase,
				daysChange: DAYS.map((day) => marginPurchase - getNDayAgoStock(marginPurchaseList, day)),
			},
			shortSale: {
				remain: shortSale,
				change: shortSale - preShortSale,
				daysChange: DAYS.map((day) => shortSale - getNDayAgoStock(shortSaleList, day)),
			},
			marginPurchaseRatio,
			bsmRatio,
		};
	}

	// 取得布林通道資訊
	static getBooleanInfo(stockList) {
		const endPriceList = stockList.map((stock) => stock.endPrice);
		const price20MAList = stockList
			.slice(-20)
			.map((price, index) => numRound(movingAverage(endPriceList.slice(0, index === 19 ? undefined : -19 + index), 20), 2));

		let total = 0;
		let preTotal = 0;
		let sigma = 0;
		let preSigma = 0;
		const price20MA = getNDayAgoStock(price20MAList, 1);
		const prePrice20MA = getNDayAgoStock(price20MAList, 2);
		for (let i = 1; i < 21; i++) {
			total += Math.pow(price20MA - getNDayAgoStock(endPriceList, i), 2);
		}
		for (let i = 2; i < 22; i++) {
			preTotal += Math.pow(prePrice20MA - getNDayAgoStock(endPriceList, i), 2);
		}

		sigma = Math.sqrt(total / 20);
		preSigma = Math.sqrt(preTotal / 20);
		const booleanTop = numRound(price20MA + sigma * 2, 2);
		const preBooleanTop = numRound(prePrice20MA + preSigma * 2, 2);
		const booleanBottom = numRound(price20MA - sigma * 2, 2);
		const preBooleanBottom = numRound(prePrice20MA - preSigma * 2, 2);
		const price = getNDayAgoStock(endPriceList, 1);
		const prePrice = getNDayAgoStock(endPriceList, 2);
		// 回傳資料為 [今天,前一天]
		return {
			top: [booleanTop, preBooleanTop],
			bottom: [booleanBottom, preBooleanBottom],
			compressionRatio: [
				numRound(((booleanTop - booleanBottom) / price20MA) * 100, 2),
				numRound(((preBooleanTop - preBooleanBottom) / prePrice20MA) * 100, 2),
			],
			isStandOnTop: prePrice < preBooleanTop && price >= booleanTop,
			isBreakBelowBottom: prePrice > preBooleanBottom && price <= booleanBottom,
		};
	}
	// 取得 macd 資訊
	static getMACDInfo(stockList) {
		const endPriceList = stockList.map((stock) => stock.endPrice);
		const ema12 = calculateEMA(endPriceList, 12);
		const ema26 = calculateEMA(endPriceList, 26);
		// 快線
		const dif = ema12.map((num, index) => num - ema26[index]);
		// 慢線
		const macd = calculateEMA(dif, 9);
		// 柱
		const bar = dif.map((num, index) => num - macd[index]);
		const dif3days = dif.slice(-3);
		const isDeceaseTrend =
			dif3days.every((val, index) => (index === 0 ? true : val < dif3days[index - 1])) &&
			getNDayAgoStock(dif3days, 1) < 1 &&
			getNDayAgoStock(dif3days, 2) > 1;
		const isIncreaseTrend =
			dif3days.every((val, index) => (index === 0 ? true : val > dif3days[index - 1])) &&
			getNDayAgoStock(dif3days, 1) > -1 &&
			getNDayAgoStock(dif3days, 2) < -1;
		return {
			dif: numRound(getNDayAgoStock(dif, 1), 2),
			macd: numRound(getNDayAgoStock(macd, 1), 2),
			isDeceaseTrend,
			isIncreaseTrend,
			cross: {
				isRed: getNDayAgoStock(bar, 1) > 0 && getNDayAgoStock(bar, 2) < 0,
				isGreen: getNDayAgoStock(bar, 1) < 0 && getNDayAgoStock(bar, 2) > 0,
			},
		};
	}
	// 取得 kd 資訊
	static getKDInfo(stockList) {
		const endPriceList = stockList.map((stock) => stock.endPrice);
		const maxPriceList = stockList.map((stock) => stock.maxPrice);
		const minPriceList = stockList.map((stock) => stock.minPrice);
		const rsvList = [];
		const kList = [];
		const dList = [];
		for (let i = 0; i < stockList.length; i++) {
			if (i >= 8) {
				const endPrice = endPriceList[i];
				const minPrice = Math.min(...minPriceList.slice(i - 8, i + 1));
				const maxPrice = Math.max(...maxPriceList.slice(i - 8, i + 1));
				const rsv = ((endPrice - minPrice) / (maxPrice - minPrice)) * 100;
				rsvList.push(rsv);
			}
		}
		rsvList.forEach((rsv, index) => {
			if (index === 0) {
				kList.push(50);
			} else {
				kList.push((kList[index - 1] * 2) / 3 + rsv / 3);
			}
		});
		kList.forEach((k, index) => {
			if (index === 0) {
				dList.push(50);
			} else {
				dList.push((dList[index - 1] * 2) / 3 + k / 3);
			}
		});
		return {
			k: numRound(getNDayAgoStock(kList, 1), 2),
			d: numRound(getNDayAgoStock(dList, 1), 2),
			rsv: numRound(getNDayAgoStock(rsvList, 1), 2),
			cross: {
				up: getNDayAgoStock(kList, 1) > getNDayAgoStock(dList, 1) && getNDayAgoStock(kList, 2) < getNDayAgoStock(dList, 2),
				down: getNDayAgoStock(kList, 1) < getNDayAgoStock(dList, 1) && getNDayAgoStock(kList, 2) > getNDayAgoStock(dList, 2),
			},
			isOverbuy: getNDayAgoStock(kList, 1) > 80 && getNDayAgoStock(dList, 1) > 70,
			isOverSell: getNDayAgoStock(kList, 1) < 20 && getNDayAgoStock(dList, 1) < 30,
			isHighPassivation: kList.slice(-3).every((k) => k >= 80),
			isLowPassivation: kList.slice(-3).every((k) => k <= 20),
		};
	}
}

export default StockUtil;

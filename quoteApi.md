//======
# GET cnyes mbly
https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=USS:MBLY:STOCK&from=1682084435&to=1642772375
上市
https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=TWS:2330:STOCK&from=1682084730&to=1642772670
上櫃
https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=D&symbol=TWS:4503:STOCK&from=1682084858&to=1642772798
//MSN MONEY
//GET STOCKID
https://services.bingapis.com/contentservices-finance.csautosuggest/api/v1/Query?query=TSLA&market=en-us&count=3
# GET IT FROM SecId : \"a24kjc\"
# GET CHART
https://assets.msn.com/service/Finance/Charts?apikey=0QfOX3Vn51YCzitbLaRkTTBadtWpgTN8NZLW0C1SEM&activityId=3A3E5C2F-AB36-4E8B-9870-64A5C222A0C3&ocid=finance-financestockdetails-Peregrine&market=zh-tw&fdhead=prg-1sw-sal3glbvfa3,prg-1sw-c-headerch,prg-1sw-trfbdg,prg-1sw-tfi-cf1,prg-1sw-cpctrl,prg-1sw-sdb9,prg-1sw-spstk,prg-1sw-icongrtngs,prg-1sw-remvtac,1s-winauthservice,prg-1sw-clbctrl,prg-1sw-clrot,prg-1s-mtsn,prg-1sw-wxrus,1s-fcrypt,prg-1sw-nrt12d,prg-1sw-nrtdth,prg-1sw-bncontrolv2,prg-1sw-psfy21,prg-1sw-sbn-mm,1s-rpssecautht,prg-1sw-p1wtrclm,prg-1sw-sbnww,prg-1sw-bdg-dum,prg-1sw-spdyhdc,1s-xapsegment,1s-xapntpseg,prg-1sw-wxml28p,prg-1sw-timing,prg-1sw-2t1saufu,prg-1sw-t1saufu,prg-1sw-wxcfwfp2,prg-1sw-wfbadge,prg-1sw-p2video,1s-compicsync,prg-1sw-t-daccmngs,prg-1sw-cbm0&ids=a24kar&type=1Y&wrapodata=false
https://assets.msn.com/service/Finance/QuoteSummary?apikey=0QfOX3Vn51YCzitbLaRkTTBadtWpgTN8NZLW0C1SEM&activityId=4CDAFFDF-905C-4C5E-BE96-4203B0A12A3A&ocid=finance-utils-peregrine&cm=zh-tw&it=edgeid&scn=AL_APP_ANON&ids=a1yv52&intents=Charts&type=1Y&wrapodata=false

//get one year DIS
https://assets.msn.com/service/Finance/Charts?apikey=0QfOX3Vn51YCzitbLaRkTTBadtWpgTN8NZLW0C1SEM&activityId=54BB8428-2000-417C-B97F-2326AB9C2922&ocid=finance-utils-peregrine&cm=en-us&it=web&ids=a1r2z2&type=1Y&wrapodata=false

//tradingview light weight chart
//https://github.com/tradingview/lightweight-charts
//https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js

//ref https://hackmd.io/@aaronlife/python-ex-stock-by-api?utm_source=preview-mode&utm_medium=rec
https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=otc_5439.tw&json=1&delay=0&_=1684494462534
z:收盤價
n:short  name
{"msgArray":[{"tv":"146","ps":"114","pz":"75.1000","bp":"0","fv":"5","oa":"74.9000","ob":"74.7000","a":"75.1000_75.3000_75.4000_75.5000_75.6000_","b":"75.0000_74.9000_74.8000_74.7000_74.6000_","c":"5439","d":"20230519","ch":"5439.tw","ot":"14:30:00","tlong":"1684477800000","f":"3_13_54_5_7_","ip":"0","g":"41_16_27_46_49_","mt":"000000","ov":"179","h":"76.5000","i":"28","it":"12","oz":"74.9000","l":"74.5000","n":"高技","o":"75.1000","p":"0","ex":"otc","s":"146","t":"13:30:00","u":"83.3000","v":"4917","w":"68.3000","nf":"高技企業股份有限公司","y":"75.8000","z":"75.1000","ts":"0"}],"referer":"","userDelay":5000,"rtcode":"0000","queryTime":{"sysDate":"20230519","stockInfoItem":2240,"stockInfo":261287,"sessionStr":"UserSession","sysTime":"19:08:08","showChart":false,"sessionFromTime":-1,"sessionLatestTime":-1},"rtmessage":"OK","exKey":"if_otc_5439.tw_zh-tw.null","cachedAlive":5004}

# yahoo earnings date
{_ROOT_URL_}/calendar/earnings?symbol={self.ticker}&offset={page_offset}&size={page_size}
source https://finance.yahoo.com/calendar/earnings?symbol=PANW&offset=0&size=4

url:
https://query2.finance.yahoo.com/v1/finance/visualization?crumb=6bYNy36jpSA&lang=en-US&region=US&corsDomain=finance.yahoo.com
payload:
{"sortType":"DESC","entityIdType":"earnings","sortField":"startdatetime","includeFields":["ticker","companyshortname","eventname","startdatetime","startdatetimetype","epsestimate","epsactual","epssurprisepct","timeZoneShortName","gmtOffsetMilliSeconds"],"query":{"operator":"or","operands":[{"operator":"eq","operands":["ticker","PANW"]}]},"offset":"1","size":6}

//nstock tw history
https://www.nstock.tw/api/v2/weekly-stock-data/data?stock_id=2330
https://www.nstock.tw/api/v2/daily-stock-data/data?stock_id=2330

# cnbc
//chart
https://webql-redesign.cnbcfm.com/graphql?operationName=getQuoteChartData&variables=%7B%22symbol%22%3A%22${NVDA}%22%2C%22timeRange%22%3A%221Y%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2261b6376df0a948ce77f977c69531a4a8ed6788c5ebcdd5edd29dd878ce879c8d%22%7D%7D
//next earnings:  next_earnings_date
https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=NVDA&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1

# fast bull
https://api.fastbull.com/fastbull-quotes-service/api/postCt4Kline
payload: 
daily {"beginTimestamp":1729863301375,"marketType":"7200","peiod":2,"periodNum":1,"size":500,"symbol":"TSLA","exType":1,"type":0}
weekly {"beginTimestamp":1729863643618,"marketType":"7200","peiod":3,"periodNum":1,"size":500,"symbol":"TSLA","exType":1,"type":0}
hourly=>  peiod:1

# barchart.com to get above ma%，需要有token
https://www.barchart.com/proxies/timeseries/historical/queryeod.ashx?symbol=%24NCFD&data=daily&maxrecords=640&volume=contract&order=asc&dividends=false&backadjust=false&daystoexpiration=1&contractroll=combined
# get nvda not work
https://www.barchart.com/proxies/timeseries/historical/queryeod.ashx?symbol=NVDA&data=daily&maxrecords=640&volume=contract&order=asc&dividends=false&backadjust=false&daystoexpiration=1&contractroll=combined

x-xsrf-token:
eyJpdiI6ImdkMkIxTTNqc1V1V0VMc09pdXZkZFE9PSIsInZhbHVlIjoic2tIUDAwN08ycUVvd1ZvYXJNZjFEUGsvaWlFSkdveTlrQUQ2eWp0alM5WkNzVjZsSG0yS3BCTFNxSDFZT0ZaWHY4YjNwRXpGSWo4M1dJUXNwaERwTkV1YUZELzl6K2dWT2VwZW0rR0N5MUd4NGgvOEY0UlpkTVhISkxENFR1M3giLCJtYWMiOiI1OGIyNjRmYTQyMzU0MTg3YzhlMmFhMmI2OGI1NDRkYTA4ZDMwNzk2NDJmZTZiNjM0NGZkODIzNDJiOTJlODMyIiwidGFnIjoiIn0=


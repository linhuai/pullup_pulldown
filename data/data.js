let data = [
	{ title: '习近平主持中共中央政治局会议' },
	{ title: '习近平：建设好生态宜居的美丽乡村' },
	{ title: '习近平对中国游客在朝鲜发生重大交通事故作出指示' },
	{ title: '习近平的最大爱好  习近平会见俄罗斯外长拉夫罗夫' },
	{ title: '习近平会见上合组织外方代表	 成员国国防部长' },
	{ title: '人民日报：筑牢国家网络安全屏障  网信新气象' },
	{ title: '中央政治局会议传递当前经济工作四大信号' },
	{ title: '浙江：“千万工程”造就万千美丽乡村' },
	{ title: '人民海军诞生记' },
	{ title: '首届数字中国建设峰会在福州举行' },
	{ title: '今年养老金调整进入落地期 上海已出台调整方案' },
	{ title: '俄媒：中国数字经济规模居全球第二 占GDP超三成' },
	{ title: '魅族15是一款“出生即过时”的旗舰吗？' },
	{ title: '下月起这些进口药零关税 很多都是救命药(附目录)' },
	{ title: '国产航母没出海但是“动了” 这是在干啥？' },
	{ title: '辽宁舰航母编队政委顾正权首次亮相官方报道' },
	{ title: '去年来涉案超2000亿 处置非法集资条例有望加快发布' },
	{ title: '贸易战让美消费者躺枪 德媒：中国产品几乎无法替代' },
	{ title: '巴西米纳斯吉拉斯州多车相撞7死11伤' },
	{ title: '加拿大货车冲撞行人致9死16伤 被指为蓄意行动' },
	{ title: '美国田纳西州餐馆4死枪击案29岁枪手被逮捕' },
	{ title: '美在台协会再搞事 叫嚣力挺台湾参与世卫大会' },
	{ title: '也门胡塞武装"最高政治委员会"主席遭空袭身亡' },
	{ title: '白宫内部报告 揭露美国打压中国芯片行业内幕' },
	{ title: '运输公司巧立名目收费 个体运输户遭遇“挂靠陷阱”' },
	{ title: '阅读调查：成年人接触报刊图书时长不及手机一半' },
	{ title: '业内人士披露游乐设施安全维护内情 临时场地隐患大' },
	{ title: '甘肃一名辅警执勤遭暴力抗法 被车拖行200余米殉职' },
	{ title: '汶川地震十年 他帮助400多名伤者重新站立' },
	{ title: '广东KTV发生火灾致18人死5人伤 警方称系人为纵火' }
];
var list = document.querySelector('.list');
var loadFunc = (function () {
					let num = 1;
					return function () {
						for( let i = 0, len = data.length; i < len; i++ ) {
							let liNode = document.createElement('li');
							let textNode = document.createTextNode(num + '、' + data[i].title);
							liNode.appendChild(textNode);
							list.appendChild(liNode);
							num ++;
						}
					}
				})()
loadFunc();
const Dropload = function ( options ) {
	this.$scrollArea = typeof options.scrollArea == 'object' ? options.scrollArea : document.querySelector(options.scrollArea);
	this.pullDownAction = options.pullDownAction || function () {};
	this.pullUpAction = options.pullUpAction || function () {};
	this.init();
}
Dropload.prototype = {
	init: function () {
		let self = this;
		self.pullDown();
		self.pullUp();
		self.addEvent();
	},
	pullDown: function () {	// 插入下拉元素 
		let self = this;
		/* create pulldown node */
		let pulldown = document.createElement('div');
		pulldown.className = 'pulldown';
		pulldown.innerHTML = '下拉刷新';

		/* set pulldown stylesheet */
		self.utils.setStyle(pulldown, {
			width: '100%',
			height: 60,
			lineHeight: 60,
			textAlign: 'center',
			backgroundColor: '#ccc'
		});

		let $scrollArea = self.$scrollArea;
		if ( $scrollArea.children[0] ) {
			$scrollArea.insertBefore( pulldown, $scrollArea.children[0]);
		} else {
			$scrollArea.appendChild( pulldown );
		}

		/* use margin-top hide pulldown node */
		$scrollArea.style.marginTop = '-60px';
	},
	pullUp: function () {	// 插入上拉元素	
		let self = this;
		/* create pullup node */
		let pullup = document.createElement('div');
		pullup.className = 'pullup';
		pullup.innerHTML = '上拉加载更多';

		/* set pullup stylesheet */
		self.utils.setStyle(pullup, {
			width: '100%',
			height: 60,
			lineHeight: 60,
			textAlign: 'center',
			backgroundColor: '#ccc'
		});

		self.$scrollArea.appendChild(pullup);
	},
	refresh: function () {
		let self = this;
		self.utils.setStyle($scrollArea, {
			marginTop: -60
		})

	},
	addEvent: function () {
		let self = this;
		$scrollArea = self.$scrollArea;

		let startY = 0,
			endY = 0,
			buffDistance = 0,
			curStyleVal = 0;


		let availHeight = window.screen.availHeight,
			offsetHeight = document.body.offsetHeight;

		$scrollArea.addEventListener('touchstart', touches, false);
		$scrollArea.addEventListener('touchmove', touches, false);
		$scrollArea.addEventListener('touchend', touches, false);

		function touches( e ) {
			e = e || event;
			e.preventDefault();

			let type = e.type;
			switch ( type ) {
				case 'touchstart':
					document.querySelector('.pulldown').innerHTML = '下拉刷新';
					document.querySelector('.pullup').innerHTML = '上拉加载更多';
					startY = e.targetTouches[0].pageY;
					curStyleVal = parseFloat($scrollArea.style.marginTop);

					availHeight = window.screen.availHeight;
					offsetHeight = document.body.offsetHeight;

					break;
				case 'touchmove':

					endY = e.targetTouches[0].pageY;
					buffDistance = endY - startY;

					let newMarginTop = curStyleVal + buffDistance;

					self.utils.setStyle($scrollArea, {
						marginTop: newMarginTop
					})

					if( newMarginTop >=0 ) {
						document.querySelector('.pulldown').innerHTML = '释放刷新';
					}

					if ( availHeight - newMarginTop >= offsetHeight ) {
						document.querySelector('.pullup').innerHTML = '释放加载更多';
					}
					break;
				case 'touchend':
					let marginTop = parseFloat($scrollArea.style.marginTop);

					/* 下拉刷新 */
					if ( marginTop >= 0 ) {
						document.querySelector('.pulldown').innerHTML = '正在刷新'
						$scrollArea.style.marginTop = '0px';
						self.pullDownAction && self.pullDownAction();
					} else if ( marginTop > -60 ) {
						self.refresh();
					}

					/* 上拉加载更多 */
					if ( availHeight - marginTop >= offsetHeight ) {
						document.querySelector('.pullup').innerHTML = '加载中...';
						self.utils.setStyle($scrollArea, {
							marginTop: availHeight - offsetHeight
						})

						self.pullUpAction && self.pullUpAction();

					} else if ( availHeight - marginTop >= offsetHeight-60 ) {
						self.utils.setStyle($scrollArea, {
							marginTop: availHeight - offsetHeight + 60
						})
					}

					break;
			}
		}
	},
	utils: {
		setStyle: function ( elem, attr ) {
			elem = typeof elem == 'object' ? elem : document.querySelector(elem);
			for( let k in attr ) {
				let type = typeof attr[k];
				switch ( type ) {
					case 'number':
						elem.style[k] = attr[k] + 'px';
						break;
					case 'string':
						elem.style[k] = attr[k];
						break;
					case 'function':
						elem.style[k] = attr[k]();
						break;
				}
			}
		}
	}
}
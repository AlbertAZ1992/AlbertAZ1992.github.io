/*
* @Author: Albert
* @Date:   2017-06-10 17:19:05
* @Last Modified by:   Albert
* @Last Modified time: 2017-06-10 17:23:42
*/

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart'));

            var beginTime = null;
            var clicks = 0;
            var TOTAL_CLICKS = 100;

            var option = {
                title: {
                    textStyle: {
                        fontSize: 15,
                        color: '#999'
                    },
                    left: '50%',
                    top: '90%',
                    textAlign: 'center',
                    textBaseAlign: 'middle'
                },
                series: [{
                    color: ['#FFBFE5', '#EA88CE', '#DE52B4', '#C42795'],
                    type: 'liquidFill',
                    silent: true,
                    animationDurationUpdate: 200,
                    data: getData(clicks),
                    radius: '80%',
                    outline: {
                        show: false
                    },
                    backgroundStyle: {
                        borderColor: '#A31180',
                        borderWidth: 1,
                        shadowColor: 'rgba(234, 136, 206, 0.8)',
                        shadowBlur: 100,
                        color: '#FEF9FF'
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.6,
                            shadowColor: 'rgba(234, 136, 206, 0.2)'
                        }
                    },
                    shape: 'path://M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
                    label: {
                        normal: {
                            position: ['50%', '45%'],
                            formatter: function() {
                                if (clicks === 0) {
                                    return '开始游戏';
                                } else if (clicks >= TOTAL_CLICKS) {
                                    return '祝我最爱的 XXX\n情人节快乐！';
                                } else {
                                    var elapsed = new Date() - beginTime;
                                    return Math.floor(clicks / TOTAL_CLICKS * 100) + '%\n';
                                }
                            },
                            textStyle: {
                                fontSize: 28,
                                color: '#A31180'
                            }
                        }
                    }
                }]
            };

            document.onclick = getTouch;

            document.ontouchstart = getTouch;

            function getTouch() {
                if (clicks <= TOTAL_CLICKS) {
                    if (clicks === 0) {
                        beginTime = new Date();
                    }
                    myChart.setOption({
                        series: [{
                            data: getData(clicks),
                            backgroundStyle: {
                                shadowBlur: Math.random() * 200 + 50
                            }
                        }]
                    });
                } else if (clicks === TOTAL_CLICKS + 10) {
                    // game over
                    startDrop();
                }

                clicks += 10;
            };

            function getData(clicks) {
                var value = clicks / TOTAL_CLICKS;
                return [
                    value,
                    value - 0.02,
                    value - 0.04,
                    value - 0.06
                ];
            }


            function SnowDrop(t, e, n, i) { this._el = new echarts.graphic.Image({ style: { image: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU3Ljk0NyA1Ny45NDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU3Ljk0NyA1Ny45NDc7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFNjRDM0M7IiBkPSJNMjguOTQ3LDU2LjQ4NmMxNS42ODUtMTEuMjc3LDIzLjUzMi0yMS41OTIsMjcuMjIyLTI5LjQ2YzQuMzExLTkuMTkzLDAuNTYxLTIwLjU4OS04Ljg0NS0yNC40MTMgICBDMzYuMjY4LTEuODgsMjguOTQ3LDguNDg2LDI4Ljk0Nyw4LjQ4NlMyMS42NzgtMS45MDcsMTAuNjIzLDIuNTg4QzEuMjE3LDYuNDEyLTIuNTMzLDE3LjgwOCwxLjc3OCwyNy4wMDEgICBDNS40NjgsMzQuODY4LDEzLjI2Miw0NS4yMSwyOC45NDcsNTYuNDg2eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=", width: t, height: t }, zlevel: 2, position: n }), this._opacity = t / 8, this._speed = e, this.restLife = i
            }

            SnowDrop.prototype.getEl = function() {
                return this._el }, SnowDrop.prototype.update = function(t) {
                if (this._el.position[0] += this._speed[0] * t, this._el.position[1] += this._speed[1] * t, this._el.style.opacity = this._opacity, this._el.dirty(), this.restLife -= t, this.restLife < 0) return !0 }, document.getElementsByTagName("body")[0].addEventListener("touchmove", function(t) { t.preventDefault() });

            function spawnSnowDrop() {
                var t = 20 * Math.random() + 2,
                    e = 10 * t,
                    n = myChart.getZr(),
                    i = new SnowDrop(t, [Math.random(), e], [n.getWidth() * Math.random(), 10 * -Math.random()], 4 + Math.sqrt(10 - t));
                return snowDrops.push(i), i
            }

            function startDrop() {
                var t = myChart.getZr();
                t.animation.on("frame", function(e) {
                    if (e /= 1e3, Math.random() < .2)
                        for (var n = 0; n < 2; n++) {
                            var i = spawnSnowDrop();
                            t.add(i.getEl()) }
                    snowDrops.forEach(function(t) { t.update(e / 1e3) }), snowDrops = snowDrops.filter(function(n) {
                        var i = n.update(e);
                        return i && t.remove(n.getEl()), !i }) })
            }



            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            var snowDrops = [];



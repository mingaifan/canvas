/**
 * drawing board   nan.xue  (注明谁写的))
 **/
// 单对象编程 在这个对象里面对一些小功能的添写，这样很多变都是我们的属性和方法，也是不会污染到全局
var drawingBoard = {
    cavs:document.getElementById('cavs'),
    ctx:document.getElementById('cavs').getContext('2d'),
    btn_container:document.getElementsByTagName('ul')[0],
    bool:false,
    colorChange:document.getElementById('colorChange'),
    lineRuler:document.getElementById('lineRuler'),
    imgDataArr:[],
    init:function(){
        this.ctx.lineCap = 'round';//线条起始结尾样式
        this.ctx.lineJoin = 'round';//转弯样式
        this.drawing();
        this.btnsAllFn();
    },
    btnsAllFn:function(){
        var self = this;
        this.btn_container.onclick = function(e){
            // console.log(e.target.id);
            switch(e.target.id){
                case 'cleanBoard':
                    // 清屏
                    self.ctx.clearRect(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight)
                break
                case 'eraser':
                    // 像皮
                    self.ctx.strokeStyle = '#ffffff';
                break
                case 'rescind':
                    // 撤销
                    if (self.imgDataArr.length>0) {
                        self.ctx.putImageData(self.imgDataArr.pop(),0,0);
                    }
                    
                break
            }
        }
        this.colorChange.onchange = function(){
            self.ctx.strokeStyle = this.value;
        }
        this.lineRuler.onchange = function(){
            self.ctx.lineWidth = this.value;
        }
    },
    drawing:function(){
        var cavs = this.cavs,
            self = this,
            c_left = cavs.offsetLeft,
            c_top = cavs.offsetTop;

        cavs.onmousedown = function(e){
            self.bool = true;
            self.ctx.beginPath();
            self.ctx.moveTo(e.pageX - c_left,e.pageY - c_top)
            var imgData = self.ctx.getImageData(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight)
            self.imgDataArr.push(imgData);
            console.log(self.imgDataArr);
        }
        cavs.onmousemove = function(e){
            if (self.bool) {
                self.ctx.lineTo(e.pageX - c_left,e.pageY - c_top)
                self.ctx.stroke();
            }
            
        }
        cavs.onmouseup = function(e){
            self.bool = false;
            self.ctx.closePath();
        }
        cavs.onmouseleave = function(e){
            self.bool = false;
            self.ctx.closePath();
        }

    }
}
drawingBoard.init()
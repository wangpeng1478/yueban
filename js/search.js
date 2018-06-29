jQuery(document).ready(function() {
            $(".area_1>a").on('click',  function(event) {
               var index=$(this).index();  //获取顺序
                $(this).addClass('click_on').siblings().removeClass('click_on')
                $(".xiang_li").eq(index).addClass('show_li').siblings().removeClass("show_li")

           });
           $(".xiang_li>a").on('click', function(event) {

              $(this).addClass('click_on').siblings().removeClass('click_on') 
               
           });
           // ===========================================
            $(".area_2>a").on('click',  function(event) {
               var index=$(this).index();  //获取顺序
                $(this).addClass('click_on').siblings().removeClass('click_on')
                $(".xiang_li_1").eq(index).addClass('show_li').siblings().removeClass("show_li")

           });
           $(".xiang_li_1>a").on('click', function(event) {

              $(this).addClass('click_on').siblings().removeClass('click_on') 
               
           });
           // ====================================
           $(".area_3>a").click(function(event) {
               $(this).addClass('click_on').siblings().removeClass('click_on')
           });
           // ==================================
            $(".area_4>a").click(function(event) {
               $(this).addClass('click_on').siblings().removeClass('click_on')
           });
            // ===========================================
            $(".area_5>a").click(function(event) {
               $(this).addClass('click_on').siblings().removeClass('click_on')
           });
            // ===========================================
            $(".area_6>a").click(function(event) {
               $(this).addClass('click_on').siblings().removeClass('click_on')
           });
             $(".area_7>a").click(function(event) {
               $(this).addClass('click_on').siblings().removeClass('click_on')
           });
            // ===========================================
            // 
            
            // 
            // ==========================================

               $(".business-circle").hover(function() {
                   $(this).addClass("cutive_dd");
                   $(".business-circle-cont").show()
               }, function() {
                   $(this).removeClass("cutive_dd");
                   $(".business-circle-cont").hide()
               });
            
            $("#abc_def>a").hover(function() {
                var atxt = $(this).text();
                $(".hotarea-cont>a").hide();
                   $(".hotarea-cont>a[data-flag="+atxt+"]").show();
                   $(this).addClass("ctt_dd").siblings().removeClass('ctt_dd')
            }, function() {
                var atxt = $(this).text();
                $(".hotarea-cont>a").not(".hotarea-cont>a[data-flag="+atxt+"]").hide();
            });  
            
    // ================================================
    (function($, window, document, undefined) {
    'use strict';

    var jRange = function() {
        return this.init.apply(this, arguments);
    };
    jRange.prototype = {
        defaults: {
            onstatechange: function() {},
            isRange: false,
            showLabels: true,
            showScale: true,
            step: 1,
            format: '%s',
            theme: 'theme-green',
            width: 300,
            disable: false
        },
        template: '<div class="slider-container">\
            <div class="back-bar">\
                <div class="selected-bar"></div>\
                <div class="pointer low"></div><div class="pointer-label">123456</div>\
                <div class="pointer high"></div><div class="pointer-label">456789</div>\
                <div class="clickable-dummy"></div>\
            </div>\
            <div class="scale"></div>\
        </div>',
        init: function(node, options) {
            this.options       = $.extend({}, this.defaults, options);
            this.inputNode     = $(node);
            this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : this.options.from);
            this.domNode       = $(this.template);
            this.domNode.addClass(this.options.theme);
            this.inputNode.after(this.domNode);
            this.domNode.on('change', this.onChange);
            this.pointers      = $('.pointer', this.domNode);
            this.lowPointer    = this.pointers.first();
            this.highPointer   = this.pointers.last();
            this.labels        = $('.pointer-label', this.domNode);
            this.lowLabel      = this.labels.first();
            this.highLabel     = this.labels.last();
            this.scale         = $('.scale', this.domNode);
            this.bar           = $('.selected-bar', this.domNode);
            this.clickableBar  = this.domNode.find('.clickable-dummy');
            this.interval      = this.options.to - this.options.from;
            this.render();
        },
        render: function() {
            // Check if inputNode is visible, and have some width, so that we can set slider width accordingly.
            if (this.inputNode.width() === 0 && !this.options.width) {
                console.log('jRange : no width found, returning');
                return;
            } else {
                this.domNode.width(this.options.width || this.inputNode.width());
                this.inputNode.hide();
            }

            if (this.isSingle()) {
                this.lowPointer.hide();
                this.lowLabel.hide();
            }
            if (!this.options.showLabels) {
                this.labels.hide();
            }
            this.attachEvents();
            if (this.options.showScale) {
                this.renderScale();
            }
            this.setValue(this.options.value);
        },
        isSingle: function() {
            if (typeof(this.options.value) === 'number') {
                return true;
            }
            return (this.options.value.indexOf(',') !== -1 || this.options.isRange) ?
                false : true;
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this));
            this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
            this.pointers.bind('dragstart', function(event) {
                event.preventDefault();
            });
        },
        onDragStart: function(e) {
            if ( this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            var pointer = $(e.target);
            this.pointers.removeClass('last-active');
            pointer.addClass('focused last-active');
            this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
            $(document).on('mousemove.slider touchmove.slider', $.proxy(this.onDrag, this, pointer));
            $(document).on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(this.onDragEnd, this));
        },
        onDrag: function(pointer, e) {
            e.stopPropagation();
            e.preventDefault();

            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                e = e.originalEvent.touches[0];
            } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                e = e.originalEvent.changedTouches[0];
            }

            var position = e.clientX - this.domNode.offset().left;
            this.domNode.trigger('change', [this, pointer, position]);
        },
        onDragEnd: function(e) {
            this.pointers.removeClass('focused');
            this.labels.removeClass('focused');
            $(document).off('.slider');
        },
        barClicked: function(e) {
            if(this.options.disable) return;
            var x = e.pageX - this.clickableBar.offset().left;
            if (this.isSingle())
                this.setPosition(this.pointers.last(), x, true, true);
            else {
                var pointer = Math.abs(parseInt(this.pointers.first().css('left'), 10) - x + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css('left'), 10) - x + this.pointers.first().width() / 2) ?
                    this.pointers.first() : this.pointers.last();
                this.setPosition(pointer, x, true, true);
            }
        },
        onChange: function(e, self, pointer, position) {
            var min, max;
            if (self.isSingle()) {
                min = 0;
                max = self.domNode.width();
            } else {
                min = pointer.hasClass('high') ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
                max = pointer.hasClass('low') ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width();
            }
            var value = Math.min(Math.max(position, min), max);
            self.setPosition(pointer, value, true);
        },
        setPosition: function(pointer, position, isPx, animate) {
            var leftPos,
                lowPos = this.lowPointer.position().left,
                highPos = this.highPointer.position().left,
                circleWidth = this.highPointer.width() / 2;
            if (!isPx) {
                position = this.prcToPx(position);
            }
            if (pointer[0] === this.highPointer[0]) {
                highPos = Math.round(position - circleWidth);
            } else {
                lowPos = Math.round(position - circleWidth);
            }
            pointer[animate ? 'animate' : 'css']({
                'left': Math.round(position - circleWidth)
            });
            if (this.isSingle()) {
                leftPos = 0;
            } else {
                leftPos = lowPos + circleWidth;
            }
            this.bar[animate ? 'animate' : 'css']({
                'width': Math.round(highPos + circleWidth - leftPos),
                'left': leftPos
            });
            this.showPointerValue(pointer, position, animate);
            this.isReadonly();
        },
        // will be called from outside
        setValue: function(value) {
            var values = value.toString().split(',');
            this.options.value = value;
            var prc = this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
            if (this.isSingle()) {
                this.setPosition(this.highPointer, prc[1]);
            } else {
                this.setPosition(this.lowPointer, prc[0]);
                this.setPosition(this.highPointer, prc[1]);
            }
        },
        renderScale: function() {
            var s = this.options.scale || [this.options.from, this.options.to];
            var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
            var str = '';
            for (var i = 0; i < s.length; i++) {
                str += '<span style="left: ' + i * prc + '%">' + (s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '') + '</span>';
            }
            this.scale.html(str);

            $('ins', this.scale).each(function() {
                $(this).css({
                    marginLeft: -$(this).outerWidth() / 2
                });
            });
        },
        getBarWidth: function() {
            var values = this.options.value.split(',');
            if (values.length > 1) {
                return parseInt(values[1], 10) - parseInt(values[0], 10);
            } else {
                return parseInt(values[0], 10);
            }
        },
        showPointerValue: function(pointer, position, animate) {
            var label = $('.pointer-label', this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();
            var text;
            var value = this.positionToValue(position);
            if ($.isFunction(this.options.format)) {
                var type = this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
                text = this.options.format(value, type);
            } else {
                text = this.options.format.replace('%s', value);
            }

            var width = label.html(text).width(),
                left = position - width / 2;
            left = Math.min(Math.max(left, 0), this.options.width - width);
            label[animate ? 'animate' : 'css']({
                left: left
            });
            this.setInputValue(pointer, value);
        },
        valuesToPrc: function(values) {
            var lowPrc = ((values[0] - this.options.from) * 100 / this.interval),
                highPrc = ((values[1] - this.options.from) * 100 / this.interval);
            return [lowPrc, highPrc];
        },
        prcToPx: function(prc) {
            return (this.domNode.width() * prc) / 100;
        },
        positionToValue: function(pos) {
            var value = (pos / this.domNode.width()) * this.interval;
            value = value + this.options.from;
            return Math.round(value / this.options.step) * this.options.step;
        },
        setInputValue: function(pointer, v) {
            // if(!isChanged) return;
            if (this.isSingle()) {
                this.options.value = v.toString();
            } else {
                var values = this.options.value.split(',');
                if (pointer.hasClass('low')) {
                    this.options.value = v + ',' + values[1];
                } else {
                    this.options.value = values[0] + ',' + v;
                }
            }
            if (this.inputNode.val() !== this.options.value) {
                this.inputNode.val(this.options.value);
                this.options.onstatechange.call(this, this.options.value);
            }
        },
        getValue: function() {
            return this.options.value;
        },
        isReadonly: function(){
            this.domNode.toggleClass('slider-readonly', this.options.disable);
        },
        disable: function(){
            this.options.disable = true;
            this.isReadonly();
        },
        enable: function(){
            this.options.disable = false;
            this.isReadonly();
        },
        toggleDisable: function(){
            this.options.disable = !this.options.disable;
            this.isReadonly();
        }
    };

    /*$.jRange = function (node, options) {
        var jNode = $(node);
        if(!jNode.data('jrange')){
            jNode.data('jrange', new jRange(node, options));
        }
        return jNode.data('jrange');
    };

    $.fn.jRange = function (options) {
        return this.each(function(){
            $.jRange(this, options);
        });
    };*/

    var pluginName = 'jRange';
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this),
                data = $.data(this, 'plugin_' + pluginName),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('plugin_' + pluginName, (data = new jRange(this, options)));
                $(window).resize(function() {
                    data.setValue(data.getValue());
                }); // Update slider position when window is resized to keep it in sync with scale
            }
            // if first argument is a string, call silimarly named function
            // this gives flexibility to call functions of the plugin e.g.
            //   - $('.dial').plugin('destroy');
            //   - $('.dial').plugin('render', $('.new-child'));
            if (typeof option === 'string') {
                result = data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });

        // To enable plugin returns values
        return result || this;
    };

})(jQuery, window, document);
// ==================================
   $("#select_tt").change(function(){
         //console.log($(this).val());
         var an = ($(this).val());
    
     if (an=="0") {
      $("#danjia_1").show()
      $("#zongjia_1").hide()
      console.log("单价");
     };
      if (an=="1") {
       $("#danjia_1").hide()
      $("#zongjia_1").show()
      console.log("总价");
       
     };
   })     


})





    jQuery(document).ready(function($) {
         
      
       // =============
       // 删除
        $("#dy_111").click(function(event) {
         var txt1 = $("#dy_1").html()
         console.log(txt1)
        });
        $("#dy_1>li").click(function(event) {
            $(this).remove();
            var txt = $(this).html();
            console.log(txt)
       }); 
        // ======删除全部
        $("#hide_ss").click(function() {
            $("#dy_1").empty()
        });
  
        sjbd();//回调
      
    });



    
      $(document).ready(function() {
           $(".adding1").click(function() {
               var dt = $(this).text()
               var dyh = '<li><a class="close" href="javascript:void(0)">'+dt+'<em class="icon"></em></a>'
                 $("#dy_1").prepend(dyh);
                    
                 var cf = $("#dy_1 a").text()


                  console.log(cf)
                 


               //   sjbd();//回调
      });
           ///===============================
           $(".adding_m").click(function() {
                  var txt1 = $(this).text()
                  $("#mbx").text(txt1 + "写字楼")
           });
           // ===============================
           $('.adding').click(function () {
              var dt = $(this).text()
              var has = false;
              // var dy = $("#dy_1 li a").text()
              $('#dy_1 li a').each(function () {
                console.log($(this).text())
                 if(this.text == dt) {
                   has = true;
                 }
              });
               if (!has) {
                 var dyh = '<li><a class="close" href="javascript:void(0)">'+dt+'<em class="icon"></em></a>'
                  $("#dy_1").append(dyh);
               }
            sjbd();//回调
           //console.log(dy)
     });

          $(".label-box").click(function() {
                $(this).children("em").toggleClass('zjia');
                $(this).toggleClass('click_on');
                //var text_3 = $(this).text()
                //console.log(text_3)
                 var dt = $(this).text()
              var has = false;
              // var dy = $("#dy_1 li a").text()
              $('#dy_1 li a').each(function () {
                console.log($(this).text())
                 if(this.text == dt) {
                   has = true;
                   //alert("1")
                   //$(dyh).remove()
                 }
              });
               if (!has) {
                 var dyh = '<li><a class="close" href="javascript:void(0)">'+dt+'<em class="icon"></em></a>'
                  $("#dy_1").append(dyh);
               }
            sjbd();//回调
                
            });
// ===================================
      });

       function sjbd(){
            $("#dy_1>li").unbind().click(function() {
               $(this).remove()
            });       
       }













   // ============
    $(document).ready(function() {
        
         $(".tab-nav_top>a").click(function(){
            $(this).addClass('cur').siblings().removeClass('cur') 

         }) 
         // ==========
           $("#a_show").click(function() {
               $(".city-card").remove()
           });
           // ===========
        /*
           $(".a-collect").click(function(event) {
              $(this).children().toggleClass('a-collect-click')
                if ($(".a-collect em").hasClass('a-collect-click')) {
                   layer.msg('已收藏！');
                }else{
                    layer.msg('已取消收藏！');
                }
                
             
           });
           */
          // =======================
          $(".mainji_1>a").click(function(){
            $(this).addClass('cur').siblings().removeClass("cur")
          })
        


        });   
  


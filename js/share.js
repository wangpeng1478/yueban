/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-04 13:04:30
 * @version $Id$
 */

$(document).ready(function() {
    // -------------------------top
         $(window).scroll(function() {      
           if($(window).scrollTop() >= 200){
            $(".clicktop").show();
            $(".nav").addClass('nav1');
            $(".b").addClass('gu')
        }else{    
            $(".clicktop").hide(); 
            $(".nav").removeClass('nav1');
            $(".b").removeClass('gu');
            
        }
        // var top = $(window).scrollTop();
        // console.log(top)
       
        $(".clicktop").click(function() {
          $('html,body').animate({scrollTop:0}, 500);//top

       })
    // ==============
     $(".clearfix_ul>li").on('hover',  function(event) {
               var index=$(this).index();  //获取顺序
                $(this).addClass('active').siblings().removeClass('active')
                $(".box-ara-shou").eq(index).addClass('box-ara-hide').siblings().removeClass("box-ara-hide")

           });
      $(".clearfix_ul1>li").on('hover',  function() {
               var index=$(this).index();  //获取顺序
                $(this).addClass('active1').siblings().removeClass('active1')
                $(".box-ara-shou1").eq(index).addClass('box-ara-hide1').siblings().removeClass("box-ara-hide1")

           });
      // =============
       $('.gallery').rebox({ selector: 'a' });//放大

       // ==========================
});



// ================放大
 
(function($){
    $.rebox = function($this, options){
        this.settings = $.extend(true, {}, $.rebox.defaults, options);
        this.$el = $this;      // parent container holding items
        this.$box = null;      // the lightbox modal
        this.$items = null;    // recomputed each time its opened
        this.idx = 0;          // of the $items which index are we on
        this.enable();
    };

    $.rebox.defaults = { 
        theme: 'rebox',        // class name parent gets (for your css)
        selector: null,        // the selector to delegate to, should be to the <a> which contains an <img>
        prev: '&larr;',        // use an image, text, whatever for the previous button
        next: '&rarr;',        // use an image, text, whatever for the next button
        loading: '%',          // use an image, text, whatever for the loading notification
        close: '&times;',      // use an image, text, whatever for the close button
        speed: 400,            // speed to fade in or out
        zIndex: 1000,          // zIndex to apply to the outer container
        cycle: true,           // whether to cycle through galleries or stop at ends
        captionAttr: 'title',  // name of the attribute to grab the caption from
        template: 'image',     // the default template to be used (see templates below)
        templates: {           // define templates to create the elements you need function($item, settings)
            image: function($item, settings, callback){ 
                return $('<img src="'+ $item.attr('href') +'" class="'+ settings.theme +'-content" />').load(callback);
            }
        }
    };

    $.rebox.setDefaults = function(options){
        $.rebox.defaults = $.extend(true, {}, $.rebox.defaults, options);
    };
    
    $.rebox.lookup = { i: 0 };

    $.extend($.rebox.prototype, {
        enable: function(){
                var t = this;

                return t.$el.on('click.rebox', t.settings.selector, function(e){
                    e.preventDefault();
                    t.open(this);
                });
            },
        open: function(i){
                var t = this;

                // figure out where to start
                t.$items = t.settings.selector === null? t.$el : t.$el.find(t.settings.selector);
                if(isNaN(i)){
                    i = t.$items.index(i);
                }

                // build the rebox
                t.$box = $('<div class="'+ t.settings.theme +'" style="display:none;">'+
                            '<a href="#" class="'+ t.settings.theme +'-close '+ t.settings.theme +'-button">×</a>' +
                            '<a href="#" class="'+ t.settings.theme +'-prev '+ t.settings.theme +'-button"><span class="icocss"><i class="iconoo-caretleft"></i></span></a>' +
                            '<a href="#" class="'+ t.settings.theme +'-next '+ t.settings.theme +'-button"><span class="icocss"><i class="iconoo-caretRight"></i></span></a>' +
                            '<div class="'+ t.settings.theme +'-contents"></div>'+
                            '<div class="'+ t.settings.theme +'-caption"><p></p></div>' +
                        '</div>').appendTo('body').css('zIndex',t.settings.zIndex).fadeIn(t.settings.speed)                     
                        .on('click.rebox','.'+t.settings.theme +'-close', function(e){ e.preventDefault(); t.close(); })
                        .on('click.rebox','.'+t.settings.theme +'-next', function(e){ e.preventDefault(); t.next(); })
                        .on('click.rebox','.'+t.settings.theme +'-prev', function(e){ e.preventDefault(); t.prev(); });

                // add some key hooks
                $(document).on('swipeLeft.rebox', function(e){ t.next(); })
                    .on('swipeRight.rebox', function(e){ t.prev(); })
                    .on('keydown.rebox', function(e){
                            e.preventDefault();
                            var key = (window.event) ? event.keyCode : e.keyCode;
                            switch(key){
                                case 27: t.close(); break; // escape key closes
                                case 37: t.prev(); break;  // left arrow to prev
                                case 39: t.next(); break;  // right arrow to next
                            }
                        });

                t.$el.trigger('rebox:open',[t]);
                t.goto(i);
                return t.$el;           
            },
        close: function(){
                var t = this;

                if(t.$box && t.$box.length){
                    t.$box.fadeOut(t.settings.speed, function(e){
                        t.$box.remove();
                        t.$box = null;
                        t.$el.trigger('rebox:close',[t]);
                    });
                }
                $(document).off('.rebox');
                
                return t.$el;
            },
        goto: function(i){
                var t = this,
                    $item = $(t.$items[i]),
                    captionVal = $item.attr(t.settings.captionAttr),
                    $cap = t.$box.children('.'+ t.settings.theme +'-caption')[captionVal?'show':'hide']().children('p').text(captionVal),
                    $bi = t.$box.children('.'+ t.settings.theme +'-contents'),
                    $img = null;

                if($item.length){
                    t.idx = i;
                    $bi.html('<div class="'+ t.settings.theme +'-loading '+ t.settings.theme +'-button">'+ t.settings.loading +'</div>');
                    
                    $img = t.settings.templates[$item.data('rebox-template') || t.settings.template]($item, t.settings, function(content){ 
                        $bi.empty().append($(this));
                    });

                    if(t.$items.length == 1 || !t.settings.cycle){
                        t.$box.children('.'+ t.settings.theme +'-prev')[i<=0 ? 'hide' : 'show']();
                        t.$box.children('.'+ t.settings.theme +'-next')[i>=t.$items.length-1 ? 'hide' : 'show']();
                    }
                    t.$el.trigger('rebox:goto',[t, i, $item, $img]);
                }
                return t.$el;
            },
        prev: function(){
                var t = this;
                return t.goto(t.idx===0? t.$items.length-1 : t.idx-1);
            },
        next: function(){
                var t = this;
                return t.goto(t.idx===t.$items.length-1? 0 : t.idx+1);
            },
        disable: function(){
                var t = this;
                return t.close().off('.rebox').trigger('rebox:disable',[t]);
            },
        destroy: function(){
                var t = this;
                return t.disable().removeData('rebox').trigger('rebox:destroy');
            },
        option: function(key, val){
                var t = this;
                if(val !== undefined){
                    t.settings[key] = val;
                    return t.disable().enable();
                }
                return t.settings[key];
            }
    });

    $.fn.rebox = function(o) {
        o = o || {};
        var tmp_args = Array.prototype.slice.call(arguments);

        if (typeof(o) == 'string'){ 
            if(o == 'option' && typeof(tmp_args[1]) == 'string' && tmp_args.length === 2){
                var inst = $.rebox.lookup[$(this).data('rebox')];
                return inst[o].apply(inst, tmp_args.slice(1));
            }
            else return this.each(function() {
                var inst = $.rebox.lookup[$(this).data('rebox')];
                inst[o].apply(inst, tmp_args.slice(1));
            });
        } else return this.each(function() {
                var $t = $(this);
                $.rebox.lookup[++$.rebox.lookup.i] = new $.rebox($t, o);
                $t.data('rebox', $.rebox.lookup.i);
            });
    };

    
})(window.jQuery || window.Zepto || window.$);
// ==============

    
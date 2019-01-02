//ui-search 定义
$.fn.Uisearch = function(){
	var ui = $(this);
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	});

	$('.ui-search-select-list a',ui).on('click',function(){
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false;
	})
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
		return false;
	})
}
//ui-tab
$.fn.UiTab = function(header,content,focus_prefix){
	var ui = $(this);
	var tabs = $(header,ui);
	var cons = $(content,ui);
	var focus_prefix = focus_prefix || '';
	tabs.on('click',function(){
		var index = $(this).index();
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
		cons.hide().eq(index).show();
		return false;
	})
}

//ui-backTop
$.fn.UiBackTop = function(){
	var ui = $(this);
	var el = $('<a href="#1" class="ui-backTop"></a>');
	ui.append( el );
	var windowHeight = $(window).height();
	$(window).on('scroll', function(){
		var top = $('html,body').scrollTop()
		if(top > windowHeight){
			el.show();
		}
		else
		{
			el.hide();
		}

	});
	el.on('click',function(){
		$(window).scrollTop(0);
	});

}
//滑动
//1左右箭头控制翻页
//2 翻页时候 进度点要联动；
//3 翻到最后一页时候要能回去；
//4 进度点点击时候 切换界面
//5 没有点击时候 要自动滚动
//
$.fn.UiSlider = function(){
	var wrap =  $('.ui-slider-wrap');
	var ui = $(this);
	var items = $('.ui-slider-wrap .item',ui);
	var btn_prev = $('.ui-slider-arrow .left',ui);
	var btn_next = $('.ui-slider-arrow .right',ui);
	var tips = $('.ui-slider-process .item',ui);
	//预定义
	var current = 0;
	var size = items.size();
	var width = items.eq(0).width();
	var enableAuto = true;
	//设置自动滚动干相应
	//如果鼠标再wrap中
	ui
	.on('mouseover',function(){
		enableAuto = false;

	})
	.on('mouseout',function(){
		enableAuto = true;
	});
	//具体操作
	wrap
	.on('move_prev',function(){
		if(current <= 0){
			current = size;
		}
		current = current - 1;
		wrap.triggerHandler('move_to',current);

	})
	.on('move_next',function(){
		if(current == size - 1){
			current = -1;
		}
		current = current + 1;
		wrap.triggerHandler('move_to',current);

	})
	.on('move_to',function(evt,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');

	})

	.on('auto_move',function(){
		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next');
		},2000);
	})


	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');

	});

	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});

	tips.on('click',function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);

	});
	wrap.triggerHandler('auto_move');
	
}


//页面的脚本逻辑
$(function () {
	$(".ui-search").Uisearch();
	$('.content-tab').UiTab('.caption > .item','.block > .item')
	$('.content-tab .block .item').UiTab('.block-caption > a ' , '.block-content > .block-wrap','block-capiton-');
	$('html,body').UiBackTop();
	$('.ui-slider').UiSlider();
})


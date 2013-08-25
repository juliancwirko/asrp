/*!
* jQuery Another Select Replacement Plugin
* Original author: Julian Ćwirko
* Website: http://www.redsunmedia.pl
* Licensed under the MIT license
*/

;(function ( $, window, document, undefined ) {
	'use strict';
		var pluginName = 'asrp',
			defaults = {
				wrapperClass: 'asrp-wrapper',
				triggerClass: 'asrp-fire',
				listClass: 'asrp-list',
				listSlideClass: 'asrp-slide-down'
			};
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}
		Plugin.prototype = {
				init: function () {
					$(this.element).wrap('<div class="'+this.settings.wrapperClass+'" />');
					this.buildWrapper(this.element, this.settings);
					this.closeList(this.element, this.settings);
				},
				buildWrapper: function (el, settings) {
					var that = this, thisActiveVal, thisActiveText, thisItems = '', thisWidth;
					$(el).each(function(){
						thisActiveVal = $(this).val();
						thisActiveText = $(this).children('option').filter(':selected').text();
						$(this).after('<div class="'+settings.triggerClass+'">'+thisActiveText+'</div>');
						$(this).hide();
						$(el).children('option').each(function(){
							thisItems += '<div data-list-value="'+$(this).val()+'">' + $(this).text() + '</div>';
						});
						thisWidth = $(el).next('.'+settings.triggerClass).outerWidth();
						$(el).parent().append('<div class="'+settings.listClass+'" style="width:'+thisWidth+'px">'+thisItems+'</div>');
					 });
					$('.' + settings.triggerClass).on('click', function(){
						$('.'+settings.listClass).removeClass(settings.listSlideClass);
						that.optionEventListenerUnbind(el, settings);
						$(this).next('.'+settings.listClass).addClass(settings.listSlideClass);
						that.optionEventListener(el, settings);
					});
				},
				optionEventListener: function (el, settings) {
					var that = this, selvalue, select, triggerdiv;
					$('.'+settings.listClass+' > div').on('click', function(){
						selvalue = $(this).data('list-value');
						select = $(this).closest('.'+settings.wrapperClass).find('select');
						triggerdiv = $(this).closest('.'+settings.wrapperClass).find('.'+settings.triggerClass);
						select.find('option').prop('selected', false);
						select.find('option[value='+selvalue+']').prop('selected', true);
						triggerdiv.text($(this).text());
						$('.'+settings.listClass).removeClass(settings.listSlideClass);
						that.optionEventListenerUnbind(el, settings);
					});
				},
				optionEventListenerUnbind: function (el, settings) {
					$('.'+settings.listClass+' > div').off('click');
				},
				closeList: function (el, settings) {
					var that = this;
					$(document).mouseup(function (e) {
						if ($('.'+settings.listClass).has(e.target).length === 0) {
						 $('.'+settings.listClass).removeClass(settings.listSlideClass);
						 that.optionEventListenerUnbind(el, settings);
						}
					});
				}
		};
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, 'plugin_' + pluginName ) ) {
								$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
						}
				});
		};
})( jQuery, window, document );

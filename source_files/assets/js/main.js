// main.js
//

(function(w, $, undefined) {
  "use strict";

  var Cldr = {

    init: function() {

      Cldr.bindEvts();
    },

    bindEvts: function() {

      $('.js-tabs li').on('click', 'a', Cldr.handleTabClick);
    },

    handleTabClick: function(e) {
      e.preventDefault();

      var $tab = $(this).parent();

      var tabGroupName = $tab
        .parent()
        .data('tab-group');

      var tabIdx = $tab.index();

      // Select .cldr__tabs based on group
      var $tabs = $('.cldr__tabs[data-tab-group="' + tabGroupName + '"]');

      // Remove .cldr__tab--active from previously active tab
      $('.cldr__tab--active', $tabs).removeClass('cldr__tab--active');

      // Add .cldr__tab--active to clicked tab
      $tab.addClass('cldr__tab--active');

      Cldr.showTabPanel( tabGroupName, tabIdx );
    },

    showTabPanel: function(tabGroupName, panelNo) {

      // Select .cldr__tab-panels based on group
      var $panels = $('.cldr__tab-panels[data-tab-group="' + tabGroupName + '"] .cldr__tab-panel');

      // Remove .cldr__tab-panel--active from all panels in the tab group
      $panels.removeClass('cldr__tab-panel--active');

      // Add .cldr__tab-panel--active to the corresponding panel in the index
      $panels.eq( panelNo ).addClass('cldr__tab-panel--active');
    }
  };

  $(Cldr.init);
})(this, jQuery);




// hover link

$('.faux-block-link').hover(
       function(){ $(this).addClass('faux-block-link--hover') },
       function(){ $(this).removeClass('faux-block-link--hover') }
)


 $('.display-tool-tip').click(function () {
         $(this).hide();
       })

//tabs


  $('.tabs .tab__item').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.tabs .tab__item').removeClass('current');
    $('.tab__item--content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })



$(document).ready(function () {
    // Load the first 3 list items from another HTML file
    //$('#moreList').load('externalList.html li:lt(3)');
    $('#moreList .astatine__item:lt(4)').show();
    $('#showLess').hide();
    var items =  25;
    var shown =  3;
    $('#loadMore').click(function () {
        $('#showLess').show();
         $('#loadMore').hide();
        shown = $('#moreList .astatine__item:visible').size()+5;
        if(shown< items) {$('#moreList .astatine__item:lt('+shown+')').show();}
        else {$('#moreList .astatine__item:lt('+items+')').show();
             $('#loadMore').hide();
             }
    });
    $('#showLess').click(function () {
     $('#loadMore').show();
      $('#showLess').hide();
        $('#moreList .astatine__item').not(':lt(3)').hide();
    });
});

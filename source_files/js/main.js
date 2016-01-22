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

( function() {
  'use strict';

  // Register plugin
  CKEDITOR.plugins.add('bootstrap_accordion', {
    hidpi: true,
    //lang: 'en,en-au,en-ca,en-gb',
    icons: 'bootstrap_accordion',
    init: function (editor) {
      // Add single button
      editor.ui.addButton('BootstrapAccordion', {
        command: 'addAccordionCmd',
        icon: this.path + 'icons/bootstrap_accordion.png',
        label: Drupal.t('Insert Accordion')
      });

      // Add CSS for edition state
      var cssPath = this.path + 'bootstrap_accordion.css';
      editor.on('mode', function () {
        if (editor.mode == 'wysiwyg') {
          this.document.appendStyleSheet(cssPath);
        }
      });

      // Prevent nesting DLs by disabling button
      editor.on('selectionChange', function (evt) {
        if (editor.readOnly)
          return;
        var command = editor.getCommand('addAccordionCmd'),
          element = evt.data.path.lastElement && evt.data.path.lastElement.getAscendant('div', true);
        if (element)
          command.setState(CKEDITOR.TRISTATE_DISABLED);
        else
          command.setState(CKEDITOR.TRISTATE_OFF);
      });

      function makeID() {
	    	var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    		for( var i=0; i < 5; i++ ){
        		text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

    		return text;

      }
      function genTab(pairId) {
		var identifier = pairId;
              	var markup = '<li role="presentation"><a href="#' + identifier +'" aria-controls="' + identifier + '" role="tab" data-toggle="tab">New Item</a></li>'; 
		return markup;
	}
      function genPanel(pairId, parentId) {
		var identifier = pairId;
		var tabID = parentId;
              	//var markup = '<div role="tabpanel" class="tab-pane" id="' + identifier +'"><h2>New Item</h2><p>Some new item content</p><p></p><p></p></div>'; 
              	var markup = '<div class="panel panel-default ' + identifier + '"><div class="panel-heading" role="tab" id="heading' + identifier + '"><h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#' + tabID + '" href="#collapse' + identifier + '" aria-expanded="false" aria-controls="collapse' + identifier + '">New Item</a></h4></div><div id="collapse' + identifier + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + identifier + '"><div class="panel-body"><h3>New Tab Content!</h3><p>Lorem ipsum dolor sit amet, consecteur adipiscing elit. Sed accumsan egestas sapien.</p><p></p><p></p><p></p></div></div>'
		return markup;
	}
      var tabsList = [];
      var allowedContent = 'div ul li a';

      // Command to insert initial structure
      editor.addCommand('addAccordionCmd', {
        allowedContent: allowedContent,

        exec: function (editor) {
	  var tabID = makeID();
	  var firstId = makeID();
	  var secondId = makeID(); 
          var dl = new CKEDITOR.dom.element.createFromHtml(
	    '<div class="panel-group" id="' +  tabID + '" role="tablist" aria-multiselectable="true">' +
            '<div class="panel panel-default ' + firstId + '">' + 
              '<div class="panel-heading" role="tab" id="heading' + firstId + '">' + 
		'<h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#' + tabID + '" href="#collapse' + firstId + '" aria-expanded="false" aria-controls="collapse' + firstId + '">First Item</a></h4>' +
	      '</div>' +
	      '<div id="collapse' + firstId + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + firstId + '">' +
		'<div class="panel-body"><h3>Tab Content!</h3><p>This is the content for the first tab, not to be confused with the second tab!</p><p></p><p></p><p></p></div>' +
	      '</div>' +
	    '</div>' +
            '<div class="panel panel-default ' + secondId + '">' + 
              '<div class="panel-heading" role="tab" id="heading' + secondId + '">' + 
		'<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#' + tabID + '" href="#collapse' + secondId + '" aria-expanded="false" aria-controls="collapse' + secondId + '">Second Item</a></h4>' +
	      '</div>' +
	      '<div id="collapse' + secondId + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + secondId + '">' +
		'<div class="panel-body"><h3>Second Tab Content!</h3><p>Do not confuse this with the first tab, because this is the content for the second tab!</p><p></p><p></p><p></p></div>' +
	      '</div>' +
	    '</div>' +
	    '</div>');
          editor.insertElement(dl);
        }
      });

      // Other command to manipulate tabs
      editor.addCommand('addAccordionBefore', {
        allowedContent: allowedContent,

        exec: function (editor) {
          var element = editor.getSelection().getStartElement();
	  var targetElement = element.getAscendant('div', false).getAscendant('div', false).getChild(1);
	  var topElement = element.getAscendant('div', false).getAscendant('div', false).getAscendant('div', false).getChildren();
	  //console.log(element.getAscendant('div', false).getOuterHtml())
	  console.log(targetElement.getOuterHtml());
	  for (var i=0; i < topElement.count(); i++ ){
		var selection = topElement.getItem(i).getChild(1);
		var selectionId = topElement.getItem(i).getChild(0).getId();
		//console.log(targetElement.getOutger
		if ( selection.hasClass('in') && selection.$.id != selectionId) {
			selection.removeClass('in');
			targetElement.addClass('in');
		}
	  } 
        }
      });
      editor.addCommand('addAccordionAfter', {
        allowedContent: allowedContent,
        
        exec: function (editor) {
          var element = editor.getSelection().getStartElement();
	  var panelGroup = element.getAscendant('div', false).getAscendant('div', false).getAscendant('div', false);
	  var panelId = panelGroup.getId();
          var identifier = makeID(); 
	  //var currIndex = element.getAscendant('ul', true).getChildCount();
	  //var lastTab = element.getAscendant('ul', true).getLast();
	  var lastPanel = panelGroup.getLast();
	  //var newTab = genTab(identifier);
	  var newPanel = genPanel(identifier, panelId);
          //newTab = new CKEDITOR.dom.element.createFromHtml(newTab);
          newPanel = new CKEDITOR.dom.element.createFromHtml(newPanel);
	  //newTab.insertAfter(lastTab);
	  newPanel.insertAfter(lastPanel);
	  
        }
      });
      editor.addCommand('removeAccordion', {
        exec: function (editor) {
          var element = editor.getSelection().getStartElement().getAscendant('div', false);
	  /*var prevTargetElement = element.getAscendant('div', false).getPrevious(); 
	  var nextTargetElement = element.getAscendant('div', false).getNext();
	  if (prevTargetElement) {
	  	console.log(prevTargetElement.getOuterHtml());
	  }
	  if (nextTargetElement) {
		  console.log(nextTargetElement.getOuterHtml());
	  }*/
	  console.log(element.getOuterHtml());
	  if ( element.hasClass('panel-heading')) {
		var outerelement = element.getAscendant('div', false);
		var active = outerelement.getChild(1).hasClass('in');
		console.log(active);
		var targetElement;
		var count = outerelement.getAscendant('div', false).getChildCount();
		var curIndex = outerelement.getIndex();
		if (curIndex == 0 && count > 0 && active == true) {
			targetElement = outerelement.getAscendant('div', false).getChild(1);
			targetElement.getChild(1).addClass('in');
			outerelement.remove();
		} 
		else if (curIndex > 0 && active == true) {
			targetElement = outerelement.getAscendant('div', false).getChild(curIndex - 1);
			targetElement.getChild(1).addClass('in');
			outerelement.remove();
		}
		else {
			outerelement.remove();
		}
	  }
        }
      });

      // Context menu
      if (editor.contextMenu) {
        editor.addMenuGroup('bootstrapAccordionGroup');
        editor.addMenuItem('accordionBeforeItem', {
          label: Drupal.t('Edit Accordion Content'),
          icon: this.path + 'icons/accordion.png',
          command: 'addAccordionBefore',
          group: 'bootstrapAccordionGroup'
        });
        editor.addMenuItem('accordionAfterItem', {
          label: Drupal.t('Add Accordion'),
          icon: this.path + 'icons/accordion.png',
          command: 'addAccordionAfter',
          group: 'bootstrapAccordionGroup'
        });
        editor.addMenuItem('removeAccordion', {
          label: Drupal.t('Remove Accordion'),
          icon: this.path + 'icons/accordion.png',
          command: 'removeAccordion',
          group: 'bootstrapAccordionGroup'
        });

        editor.contextMenu.addListener(function (element) {
          var parentEl = element.getAscendant('div', false);
          if (parentEl && parentEl.hasClass('panel-heading')) {
            return {
              accordionBeforeItem: CKEDITOR.TRISTATE_OFF,
              accordionAfterItem: CKEDITOR.TRISTATE_OFF,
              removeAccordion: CKEDITOR.TRISTATE_OFF
            };
          }
        });
      }
    }
  });
} )();

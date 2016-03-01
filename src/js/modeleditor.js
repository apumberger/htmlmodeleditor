/*!
 * Modeleditor v0.4 (http://pumstinyc.dyndns.org)
 * Author: Andreas Pumberger
 */


// METAMODEL

var METAMODEL = METAMODEL || {};

// METAMODEL.elements = {Node, Message};

METAMODEL.methods = {
  newNode: function (nodeName) {
    var node = new joint.shapes.basic.Rect({
            position: { x: 100, y: maxTop },
            size: { width: 100, height: 30 },
            attrs: { rect: { fill: 'blue' }, text: { text: nodeName, fill: 'white' } }
    });
    return node;
  },

  newMessage: function(fromNode, toNode, label) {
    var message = new joint.dia.Link({
            source: { id: fromNode },
            target: { id: toNode },
            attrs: {
                '.marker-target': { fill: 'yellow', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            labels: [
                { position: 0.5, attrs: { text: { text: label } } }
             ]
        });
    return message;
  }
}

// S-BPM

var SBPM = SBPM || {};

var cSubject = 'blue';
var cFunction = 'yellow';
var cReceive = 'green';
var cSend = 'red';

// SBPM.elements = {Node, Message};


  joint.shapes.basic.DecoratedRect = joint.shapes.basic.Generic.extend({
      markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

      defaults: joint.util.deepSupplement({

      type: 'basic.DecoratedRect',
      size: { width: 100, height: 60 },
      attrs: {
          'rect': { fill: 'grey', stroke: 'black', width: 100, height: 60 },
          'text': { 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },
          'image': { 'ref-x': 2, 'ref-y': 2, ref: 'rect', width: 20, height: 20 }
          }

      }, joint.shapes.basic.Generic.prototype.defaults)
  });


SBPM.methods = {
  newSubject: function (subjectName) {
    var subject = new joint.shapes.basic.DecoratedRect({
        position: { x: 100, y: maxTop },
        size: { width: 125, height: 175 },
        attrs: { 
            rect: { fill: cSubject},
            text: { text: subjectName, fill: 'white' },
            image: { 'xlink:href': 'http://placehold.it/20x20' },
            type: { text: 'Subject'}
        }
    });

/*
    var subject = new joint.shapes.basic.Rect({
            position: { x: 100, y: maxTop },
            size: { width: 100, height: 200 },
            attrs: { rect: { fill: 'blue' }, text: { text: subjectName, fill: 'white' } }
    });
*/
    return subject;
  },

  newMessage: function(fromNode, toNode, label) {
    var message = new joint.dia.Link({
            source: { id: fromNode },
            target: { id: toNode },
            attrs: {
    //            '.marker-source': { fill: 'red', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z'},
                '.marker-target': { fill: 'yellow', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
                type: { text: 'Message' }
            },
            labels: [
                { position: 0.5, attrs: { text: { text: label } } }
             ]
          });

    return message;
  }, 

 newFunction: function (functionName) {
    var fct = new joint.shapes.basic.DecoratedRect({
        position: { x: 100, y: maxTop },
        size: { width: calcWidthfromText(functionName), height: 60 },
        attrs: { 
            rect: { fill: cFunction},
            text: { text: functionName, fill: 'black' },
            image: { 'xlink:href': 'http://placehold.it/20x20' },
            type: { text: 'Function'}
        }
    });

   return fct;
  },

   newReceive: function (receiveName) {
    var receive = new joint.shapes.basic.DecoratedRect({
        position: { x: 100, y: maxTop },
        size: { width: calcWidthfromText(receiveName), height: 60 },
        attrs: { 
            rect: { fill: cReceive},
            text: { text: receiveName, fill: 'black' },
            image: { 'xlink:href': 'http://placehold.it/20x20' },
            type: { text: 'Receive'}
        }
    });

   return receive;
  },

   newSend: function (sendName) {
    var send = new joint.shapes.basic.DecoratedRect({
        position: { x: 100, y: maxTop },
        size: { width: calcWidthfromText(sendName), height: 60 },
        attrs: { 
            rect: { fill: cSend},
            text: { text: sendName, fill: 'black' },
            image: { 'xlink:href': 'http://placehold.it/20x20' },
            type: { text: 'Send'}
        }
    });

   return send;
  },
    newTransition: function(fromNode, toNode, label) {
    var transition = new joint.dia.Link({
            source: { id: fromNode },
            target: { id: toNode },
            attrs: {
    //            '.marker-source': { fill: 'red', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z'},
                '.marker-target': { fill: 'yellow', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
                type: { text: 'Transition' }
            },
            labels: [
                { position: 0.5, attrs: { text: { text: label } } }
             ]
          });

    return transition;
  }
}


var modellist = [];
var model;
var parentID;

// temporary workaround for parameters in form
var elementRef;
var bNewNode=true;
var bNewElement=true;
var bNewMessage=true;


function switchModel (parent) {

  // parent null --> Subject Interaction Diagram
  if (parent == null) {
    //set menu
    setMainMenu();
    setSubMenu('SID');

    // save Behavior model
    if (parentID != null) {
      keepModel(parentID);
    }

    console.log("no parent --> subject interaction diagram");
    $('#subject-behavior-d').removeClass("active");
    $('#subject-interaction-d').addClass("active");

    //setSubMenu('SID');

     model = getModel (0);
  }
  // parent not null --> Subject Behavior Diagram
  else {
    // keep Model in memory
    keepModel();

    // create new graph
    clearGraph();

    parentID = parent.id;
    console.log("ID: ", parentID);
    parentName = parent.attr('text/text');
    console.log("parent --> subject-behavior-diagram for ", parentName);

    // set menu
    setMainMenu(parentName);
    setSubMenu('SBD');

    $('#subject-behavior-d').addClass("active");
    $('#subject-interaction-d').removeClass("active");

    model = getModel (parentID);
  }

 if (model != null) {
    console.log('SWITCHModel: ', model);
    graph.fromJSON(JSON.parse(model));
  }
  else {
    maxTop = 0;
  }

  // set default inspector
  inspector_general();

  // model = {model : modelName, nodes:[],links:{}};
}

/*
function newNodeDialoge () {
        bNewNode = true;

        $('#newNodeModal').modal('show');
        $('#nodename').focus();

        //document.getElementById("nodename").focus();
      }
*/

    function newElement (elementType) {
      //make X and Y coordinates center
      // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
      console.log('S-BPM: Enter newElement method');

      if (!bNewElement) {
        console.log('MODEL ID: ', elementRef.id);
      }


      console.log("New Element:", bNewElement);
      console.log("New ElementType: ", elementType);

      var elementName = $('#elementName').val();
      console.log('Name ', elementName);


      if (bNewElement) {
        console.log('S-BPM: in new element branch');

        if (maxTop == 0) {
          maxTop = 10;
        }
        else {
          maxTop = maxTop + 150;
        }

        var element;

        if (elementType == 'Subject') {
          element = SBPM.methods.newSubject(elementName);
        } else if (elementType == 'Function') {
          element = SBPM.methods.newFunction(elementName);
        } else if (elementType == 'Receive') {
          element = SBPM.methods.newReceive(elementName);
        } else if (elementType == 'Send') {
          element = SBPM.methods.newSend(elementName);
        } 
        
/*
        var rect = new joint.shapes.basic.Rect({
          position: { x: 100, y: maxTop },
          size: { width: 100, height: 30 },
          attrs: { rect: { fill: 'blue' }, text: { text: nodeName, fill: 'white' } }
      });
*/

      // handle event for change position of nodes/subjects (probably not needed)
/*
      rect.on('change:position', function(element) {
        console.log(element.id, ':', element.get('position'));
      });
*/

      // add Node to JSON model
      /*
      var nodes = model.nodes;
      nodeID = rect.id;
      var item =inspector {"nodeID" : nodeID, "nodeName" : nodeName, "position" : {x : maxTop, y : 30}};
      nodes.push(item);
      $.extend(model.nodes,nodes);
      
      
        console.log(model);
        */
        
        graph.addCells([element]);

      }
      else {
        console.log('edit element: ', elementName);

        elementRef.attr('text/text', elementName);
/*
         var activeObject = canvas.getActiveObject();
         var objectsInGroup = activeObject.getObjects();
          objectsInGroup.forEach(function(object) {
          var oText = object.text;
          if (oText) {
            object.set({text: nodeName});
          }
         });
*/
      }

      bNewElement = true;

      // reset form
      document.getElementById('elementName').value='';

  }

    /*

     function newMessageDialoge() {
        console.log('newMessageDIaloge');

        getNodeNames('tonode');
        getNodeNames('fromnode');

        $('#newMessageModal').modal('show');
      }

    */

      function newMessage(messageType) {
        console.log('Enter newMessage method');

        if (!bNewMessage) {
          console.log('MODEL ID: ', elementRef.id);
        }

        var fromNode = $('#fromnode').val();
        console.log('FromNode: ', fromNode);

        var toNode = $('#tonode').val();
        console.log('ToNode: ', toNode);

        var label = $('#label').val();
        console.log('label: ', label);


        if (bNewMessage) {
/*
          console.log("New Mesage");
          var link = SBPM.methods.newMessage(fromNode, toNode, label);
          console.log("LINK",link);


          var link = new joint.dia.Link({
            source: { id: fromNode },
            target: { id: toNode },
            attrs: {
    //            '.marker-source': { fill: 'red', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z'},
                '.marker-target': { fill: 'yellow', stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            labels: [
                { position: 0.5, attrs: { text: { text: label } } }
             ]
          });



link.attr({
    '.marker-source': { stroke: '#fe854f', fill: '#fe854f', d: 'M 10 0 L 0 5 L 10 10 z' },
    '.marker-target': { stroke: '#fe854f', fill: '#fe854f', d: 'M 10 0 L 0 5 L 10 10 z' }
});

          graph.addCells([link]);

*/

          console.log("New Mesage");

          var link;


          if (messageType == 'Message') {
            link = SBPM.methods.newMessage(fromNode, toNode, label);
          } else if (messageType == 'Transition') {
            link = SBPM.methods.newTransition(fromNode, toNode, label);
          }

          graph.addCells([link]);

        }
        else {
          console.log("Edit Message");
           //test
          elementRef.label(0, { attrs: { text: { text: label } } });

        }

        //

        //$('#label').val('');
        // reset form
        document.getElementById('label').value='';

      }

      function clearGraph() {
        graph.clear();
      }


    function about () {
      $('#aboutModal').modal('show');
      }


//================== INSPECTOR FUNCTIONS

  function inspector_general() {
    var str = "<h4>Attribute Inspector</h4>";
    console.log(str);
    $("div#inspector").html(str);
  }


// S-BPM 
// New Dialoge

  function inspector_newElement(model, elementType) {

    console.log("S-BPM: Enter inspector_newElement");

    elementRef = null;

    var eType = elementType;

    bNewElement = true;

    var elementName = "";

    if ((model != null) && (model != "")) {
      bNewElement = false;
      console.log(model.attr('text/text'));
      elementName = model.attr('text/text');
      elementRef = model;
      
      eType = model.attr('type/text');  
      console.log("ElementType: ", eType);
    }

    var str = "<h4>Attribute Inspector</h4>";

    str += "<br/><h4>New/Edit " + eType + "</h4>";

    str += "<form id=\"elementform\" method=\"post\" action=\"javascript:newElement('" + eType + "')\" role=\"form\">";
    str += "<p>Please enter the name</p>";
    str += "<div class=\"col-lg-12\">";
    str += "<label class=\"control-label\" for=\"elementName\">Name</label>";
    str += "<input type=\"text\" class=\"form-control required\" id=\"elementName\" name=\"elementName\" value=\"" + elementName + "\" autofocus></input>";
    str += "</div>";
    str += "<div class=\"modal-footer\">";
//    str += "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
    str += "<button id=\"myFormSubmit\" class=\"btn btn-primary\">Save</button>";
    str += "</div>";    
    str += "</form>";

    $("div#inspector").html(str);
  }


// New Message Dialoge

  function inspector_newMessage(model, messageType) {

    elementRef = null;

    var eType = messageType;

    console.log("Enter inspector_newMessage");

    bNewMessage = true;

    var messageName = '';

    if ((model != null) && (model != "")) {
      bNewMessage = false;
      
      var label = model.get('labels');

      if (label) { // edit existing label
            console.log("label", label[0]['attrs']['text']['text']); 
            messageName = label[0]['attrs']['text']['text'];   
      }   
      //
      nodeName = model.attr('text/text');
      eType = model.attr('type/text');  
      elementRef = model;
    }

    var str = "<h4>Attribute Inspector</h4>";

    str += "<br/><h4>New/Edit " + eType + "</h4>";

    str += "<form id=\"nodeform\" method=\"post\" action=\"javascript:newMessage('" + eType + "')\" role=\"form\">";
    str += "<p>Please enter the from- and to-node names and label</p>";
    str += "<div class=\"col-lg-12\">";
    str += "<label class=\"control-label\" for=\"fromnode\">From Node:</label>";
    str += "<select class=\"form-control\" id=\"fromnode\" onchange='changedOption()'></select>";
//place holde for select FROM/TO Node from SID
    str += "<div id='SITNode'></div>";
    str += "<br/>";
    str += "<label class=\"control-label\" for=\"tonode\">To Node:</label>";
    str += "<select class=\"form-control\" id=\"tonode\"></select>";
    str += "<br/>";
    str += "<label class=\"control-label\" for=\"label\">Label:</label>";
    str += "<input type=\"text\" class=\"form-control required\" id=\"label\" name=\"label\" value=\"" + messageName + "\"  autofocus></input>";
    str += "</div>";
    str += "<div class=\"modal-footer\">";
//    str += "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
    str += "<button id=\"myFormSubmit\" class=\"btn btn-primary\">Save</button>";
    str += "</div>";    
    str += "</form>";

    $("div#inspector").html(str);

    getNodeNames('tonode');
    getNodeNames('fromnode');

  }

/*
  <div id="newNodeModal" class="modal fade">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!--form-->
            <form class = "form-horizontal" id="nodeform" method="post" action="javascript:newNode()" role="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">New/Edit Node</h4>
                </div>
                <div class="modal-body">
                    <p>
                        Please enter the node name.
                    </p>
                    <br/>

                    <div class="form-group">

                        <div class="col-lg-12">
                            <label class="control-label" for="nodename">Name</label>
                            <input type="text" class="form-control required" id="nodename" name="nodename" autofocus></input>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="myFormSubmit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>

/*
  <form>
  <h1>to: Mozilla</h1>

  <div id="from">
    <label for="name">from:</label>
    <input type="text" id="name" name="user_name">
  </div>

  <div id="reply">
    <label for="mail">reply:</label>
    <input type="email" id="mail" name="user_email">
  </div>

  <div id="message">
    <label for="msg">Your message:</label>
    <textarea id="msg" name="user_message"></textarea>
  </div>
 
  <div class="button">
    <button type="submit">Send your message</button>
  </div>
</form>

/*

*/

 function loadModel () {
    console.log('in loadModel...');
    var jsonString = '';
     $.ajax({ 
         type: "GET",
         contentType: "application/json; charset=utf-8",
         dataType: "text",
         data: jsonString,
         url: "http://pumstinyc.dyndns.org:8082/load",
         success: function(data){       
            console.log('in success'); 
            console.log('json from get...', JSON.stringify(data));
            console.log(JSON.parse(data));

            //graph.fromJSON(data);
            graph.fromJSON(JSON.parse(data));
         },
         error: function (e) {
                alert("Error calling REST function" + e)
            }
     });
     console.log('json from GET: ',jsonString);

     //graph.fromJSON(JSON.parse(jsonString));
  }

  function saveModel () {
    var jsonString = JSON.stringify(graph);
    console.log('in saveModel...');
    console.log('json: ', jsonString);

    // REST call to NodeJS Server

     $.ajax({ 
         type: "POST",
         contentType: "application/json; charset=utf-8",
         dataType: "text",
         data: jsonString,
         url: "http://pumstinyc.dyndns.org:8082/save",
         success: function(data){        
            alert("Model successfully saved to Server!");
         },
         error: function (e) {
                alert("Error calling REST function" + e)
            }
     });
  }

  function keepModel (parent) {
     var jsonString = JSON.stringify(graph);
     console.log('in keepModel...');
     console.log('json: ', jsonString);

      if (parent == null) {
        listReplace (0, jsonString);
      } else { 
        listReplace (parentID, jsonString);
      }
//      model =  JSON.stringify(graph);
  }

  function listReplace (id, content) {
    var bFound = false;

    for (var i = 0; i < modellist.length; i++) {
      var item = modellist[i];
      if (item.id == id ) {
        bFound = true;
        console.log('found replace before ', modellist);
        modellist[i] = {id: id, model : content};
        console.log ("FOUND-REPLACE ", modellist);
      }
    }

    if (!bFound) {
      console.log("NOT FOUND");
      modellist.push({id: id, model : JSON.stringify(graph)});
    }
  }

  function getModel (id) {
    var bFound = false;

    console.log('getmodel modellist:', modellist);
    console.log('gemodel id', id);

    for (var i = 0; i < modellist.length; i++) {
      var item = modellist[i];
      console.log('gemodel item', item);
      console.log('gemodel item.id', item.id);
      if (item.id == id ) {
        bFound = true;
        console.log ("FOUND-GETMODEL ", item.model);
        return item.model;
      }
    }
    console.log('getModel: Model not found!');
  }

  function exportModel () {
    var jsonString = JSON.stringify(graph);
    console.log('in exportModel...');
    console.log('json: ', jsonString);

    var cells = graph.getCells();

    for (i=0; i<cells.length; i++) {
      console.log("Cell: ", cells[i]);
    }

    var elements = graph.getElements();

    for (i=0; i<elements.length; i++) {
      console.log("Element: ", elements[i]);

      console.log("NodeName",elements[i]['attributes']['attrs']['text']['text']); 
    }
  }
 
//================== Menu

  function setMainMenu(parentName) {

    console.log ("in setMainMenu");

    var sHeaderLine = "";

    if (parentName != null) {
      sHeaderLine = "Subject Behavior for " + parentName;
    }

    var strMenu =  "<nav class=\"navbar navbar-default\">" +
    "<div class=\"row\">" +
          "<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">" +
            "<ul class=\"nav navbar-nav\">" +
               "<li><a class=\"navbar-brand\" href=\"#\">ModelEditor v0.4</a>" +
               "<li><a href=\"#\">" + sHeaderLine + "</a>" +
            "</ul>" +
             "<ul class=\"nav navbar-nav navbar-right\">" +
              "<li class=\"active\" id=\"subject-interaction-d\"><a href='javascript:switchModel()'>Subject-Interaction-Diagram</a></li>" +
              "<li id=\"subject-behavior-d\"><a href=\"#\">Subject-Behavior-Diagram</a></li>"+
            "</ul>" +
          "</div><!-- /.navbar-collapse -->" +
      "</div><!--row -->" +
    "</nav>";

    $("#modelmainmenu").html(strMenu);
  }


  function setSubMenu(diagram) {

    console.log ("in setSubMenu");

    var strMenu = '';

    if (diagram == 'SID') {
      strMenu +=  "<nav class=\"navbar navbar-default\">" +
        "<div class=\"row\">" +
          "<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">"+
            "<ul class=\"nav navbar-nav\">"+
              "<li><a href='javascript:inspector_newElement(\"\", \"Subject\")'>New Subject</a></li>"+
              "<li><a href='javascript:inspector_newMessage(\"\", \"Message\")'>New Message</a></li>"+
              "<li class=\"dropdown\">"+
                "<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">More<span class=\"caret\"></span></a>"+
                "<ul class=\"dropdown-menu\">"+
                  "<li><a href=\"javascript:loadModel()\">Load Model</a></li>"+
                  "<li><a href=\"javascript:saveModel()\">Save Model</a></li>"+
                  "<li role=\"separator\" class=\"divider\"></li>"+
                  "<li><a href=\"javascript:clearGraph()\">Clear Canvas</a></li>"+
                  "<li role=\"separator\" class=\"divider\"></li>"+
                  "<li><a href=\"javascript:exportModel()\">Export Model</a></li>"+
                "</ul>"+
              "</li>"+
               "<li><a href='javascript:about()'>About?</a></li>"+
            "</ul>"+
          "</div><!-- /.navbar-collapse -->"+
        "</div> <!--row -->"+
      "</nav>";
    } else {
       strMenu +=  "<nav class=\"navbar navbar-default\">" +
        "<div class=\"row\">" +
          "<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">"+
            "<ul class=\"nav navbar-nav\">"+
              "<li><a href='javascript:inspector_newElement(\"\", \"Function\")'>New Function</a></li>"+
              "<li><a href='javascript:inspector_newElement(\"\", \"Receive\")'>New Receive</a></li>"+
              "<li><a href='javascript:inspector_newElement(\"\", \"Send\")'>New Send</a></li>"+
              "<li><a href='javascript:inspector_newMessage(\"\", \"Transition\")'>New Transition</a></li>"+
              "<li class=\"dropdown\">"+
                "<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">More<span class=\"caret\"></span></a>"+
                "<ul class=\"dropdown-menu\">"+
                  "<li><a href=\"javascript:loadModel()\">Load Model</a></li>"+
                  "<li><a href=\"javascript:saveModel()\">Save Model</a></li>"+
                  "<li role=\"separator\" class=\"divider\"></li>"+
                  "<li><a href=\"javascript:clearGraph()\">Clear Canvas</a></li>"+
                  "<li role=\"separator\" class=\"divider\"></li>"+
                  "<li><a href=\"javascript:exportModel()\">Export Model</a></li>"+
                "</ul>"+
              "</li>"+
               "<li><a href='javascript:about()'>About?</a></li>"+
            "</ul>"+
          "</div><!-- /.navbar-collapse -->"+
        "</div> <!--row -->"+
      "</nav>";
    }

    $("#modelsubmenu").html(strMenu);
  }



  


//================== HELPER FUNCTIONS

  function getNodeNames (referenceName) {
    console.log('in getNodeNames for ' + referenceName);

/*

      var data = model.nodes;
      var element = document.getElementById(referenceName);

      for (i=0; i < data.length; i++) {
        var opt = document.createElement('option');
          opt.innerHTML = data[i].nodeName;
          opt.value = data[i].nodeID;
          console.log(data[i].nodeID);
          element.appendChild(opt);
      }
*/

    //getElements returns just Nodes and no Links
    var elements = graph.getElements();
    var dropdown = document.getElementById(referenceName);

    for (i=0; i<elements.length; i++) {
      console.log("Element: ", elements[i]);
      var nodeName = elements[i]['attributes']['attrs']['text']['text'];
      var nodeType = elements[i]['attributes']['attrs']['type']['text'];
      console.log("NodeName", nodeName); 
      console.log("NodeType", nodeType);
      var nodeID = elements[i]['id'];
      console.log("NodeID", nodeID); 

      var opt = document.createElement('option');
       //opt.setAttribute('onchange', 'selectedFromNode()');
        opt.innerHTML = nodeName;
        opt.value = nodeID;   
      console.log("OPTION ", opt);
      dropdown.appendChild(opt);
    }
  }

  function changedOption() {
    console.log("changedOption");

    var NodeID = document.getElementById("fromnode").value;

    console.log("nodeID ", NodeID);

    var elements = graph.getElements();
    var nodeType ='';

    for (i=0; i< elements.length; i++) {
      var elementID = elements[i]['id'];
      if (elementID == NodeID) {
       nodeType = elements[i]['attributes']['attrs']['type']['text'];
      }
    }

    if  ((nodeType =='Send') || (nodeType == 'Receive')) {
      console.log("nodetype is ", nodeType);


      var SIT = JSON.parse(getModel(0));
      console.log(SIT);
      elements = SIT.getElements();

      for (i=0; i<elements.length; i++) {
        console.log("Element ", elements[i]);
      }
    }
/*
    //getElements returns just Nodes and no Links
    var elements = graph.getElements();
    var dropdown = document.getElementById(referenceName);

    for (i=0; i<elements.length; i++) {
      console.log("Element: ", elements[i]);
      var nodeName = elements[i]['attributes']['attrs']['text']['text'];
      var nodeType = elements[i]['attributes']['attrs']['type']['text'];
      console.log("NodeName", nodeName); 
      console.log("NodeType", nodeType);
      var nodeID = elements[i]['id'];
      console.log("NodeID", nodeID); 

      var opt = document.createElement('option');
       //opt.setAttribute('onchange', 'selectedFromNode()');
        opt.innerHTML = nodeName;
        opt.value = nodeID;   
      console.log("OPTION ", opt);
      dropdown.appendChild(opt);
    }   

*/ 

  }

  function removeOptions(referenceName)
  {
      var i;
      var element = document.getElementById(referenceName);
      for(i=element.options.length-1;i>=0;i--)
      {
          element.remove(i);
      }
  }

// function helps to define box length based on text length
  function calcWidthfromText (text) {
    console.log("Text: ", text);
    var length = text.length;

    console.log("Text-length", length);

    var width = length * 10; 

    // define minimum length
    if (width < 100) {
      width = 100;
    }

    return width;
  }
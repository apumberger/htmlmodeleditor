/*!
 * Modeleditor v0.3 (http://pumstinyc.dyndns.org)
 * Author: Andreas Pumberger
 */

var model = {};

// temporary workaround for parameters in form
var elementRef;
var bNewNode=true;
var bNewMessage=true;


function createNewModel (modelName) {
  model = {model : modelName, nodes:[],links:{}};
}

/*

function newNodeDialoge () {
        bNewNode = true;

        $('#newNodeModal').modal('show');
        $('#nodename').focus();

        //document.getElementById("nodename").focus();
      }

*/

      function newNode () {
        //make X and Y coordinates center
        // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';


        console.log('Enter newNode method');

        if (!bNewNode) {
          console.log('MODEL ID: ', elementRef.id);
        }


        console.log("New Node:", bNewNode);
        var nodeName = null;
        nodeName = $('#nodename').val();
        console.log('Name ', nodeName);

        $("#newNodeModal").modal('hide'); //hide popup  
        $('#nodename').val('');

        if (bNewNode) {
          console.log('in new node branch');

          if (maxTop == 0) {
            maxTop = 10;
          }
          else {
            maxTop = maxTop + 70;
          }

        var rect = new joint.shapes.basic.Rect({
            position: { x: 100, y: maxTop },
            size: { width: 100, height: 30 },
            attrs: { rect: { fill: 'blue' }, text: { text: nodeName, fill: 'white' } }
        });

        // handle event for change position of nodes

        rect.on('change:position', function(element) {
          console.log(element.id, ':', element.get('position'));
        });

      //

        console.log('add node');

        // add Node to JSON model
        var nodes = model.nodes;
        nodeID = rect.id;
        var item = {"nodeID" : nodeID, "nodeName" : nodeName, "position" : {x : maxTop, y : 30}};
        nodes.push(item);
        $.extend(model.nodes,nodes);
        
        console.log(model);
          graph.addCells([rect]);
        }
        else {
          console.log('not new node, nodename ', nodeName);

          elementRef.attr('text/text', nodeName);
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

        bNewNode = true;

    }

    /*

     function newMessageDialoge() {
        console.log('newMessageDIaloge');

        getNodeNames('tonode');
        getNodeNames('fromnode');

        $('#newMessageModal').modal('show');
      }

    */

      function newMessage() {
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
          console.log("New Mesage");
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

          graph.addCells([link]);
        }
        else {
          console.log("Edit Message");
           //test
          elementRef.label(0, { attrs: { text: { text: label } } });

        }

        //

        $('#label').val('');

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
    $("div#inspector").append(str);
  }

// New Node Dialoge

  function inspector_newNode(model) {

    elementRef = null;

    console.log("Enter inspector_newNode");

    bnewNode = true;

    var nodeName = "";

    if (model != null) {
      bNewNode = false;
      console.log(model.attr('text/text'));
      nodeName = model.attr('text/text');
      elementRef = model;
    }

    var str = "<h4>Attribute Inspector</h4>";

    str += "<br/><h4>New/Edit Node</h4>";

    str += "<form id=\"nodeform\" method=\"post\" action=\"javascript:newNode()\" role=\"form\">";
    str += "<p>Please enter the node name</p>";
    str += "<div class=\"col-lg-12\">";
    str += "<label class=\"control-label\" for=\"nodename\">Name</label>";
    str += "<input type=\"text\" class=\"form-control required\" id=\"nodename\" name=\"nodename\" value=\"" + nodeName + "\" autofocus></input>";
    str += "</div>";
    str += "<div class=\"modal-footer\">";
//    str += "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
    str += "<button id=\"myFormSubmit\" class=\"btn btn-primary\">Save</button>";
    str += "</div>";    
    str += "</form>";

    $("div#inspector").empty();

    $("div#inspector").append(str);
  }


// New Message Dialoge

  function inspector_newMessage(model) {

    elementRef = null;

    console.log("Enter inspector_newMessage");

    bNewMessage = true;

    var messageName = "";

    if (model != null) {
      bNewMessage = false;
      
      var label = model.get('labels');

      if (label) { // edit existing label
            console.log("label", label[0]['attrs']['text']['text']); 
            messageName = label[0]['attrs']['text']['text'];   
      }

     
      //
      nodeName = model.attr('text/text');
      elementRef = model;
    }


   var str = "<h4>Attribute Inspector</h4>";

    str += "<br/><h4>New/Edit Message</h4>";

    str += "<form id=\"nodeform\" method=\"post\" action=\"javascript:newMessage()\" role=\"form\">";
    str += "<p>Please enter the from- and to-node names and label</p>";
    str += "<div class=\"col-lg-12\">";
    str += "<label class=\"control-label\" for=\"fromnode\">From Node:</label>";
    str += "<select class=\"form-control\" id=\"fromnode\"></select>";
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


    $("div#inspector").empty();

    $("div#inspector").append(str);

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

     $.ajax({ 
         type: "POST",
         contentType: "application/json; charset=utf-8",
         dataType: "text",
         data: jsonString,
         url: "http://pumstinyc.dyndns.org:8082/save",
         success: function(data){        
            alert(data);
         },
         error: function (e) {
                alert("Error calling REST function" + e)
            }
     });
  }


//================== HELPER FUNCTIONS

    function getNodeNames (referenceName) {
      console.log('in getNodeNames for ' + referenceName);

      //removeOptions(referenceName);

      var data = model.nodes;
        var element = document.getElementById(referenceName);



      for (i=0; i < data.length; i++) {
        var opt = document.createElement('option');
          opt.innerHTML = data[i].nodeName;
          opt.value = data[i].nodeID;
          console.log(data[i].nodeID);
          element.appendChild(opt);
      }
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
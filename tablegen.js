var rowCount;
var columnCount;
var title;
$(function() {
      
  $('.slider').on('input change', function(){
            $(this).prev($('.rowValue')).html(this.value);
       	 while(document.getElementById("columnTitles").childElementCount != document.getElementById('columnCount').value) {
			  if(document.getElementById("columnTitles").childElementCount < document.getElementById('columnCount').value){
				  	var titleDiv = document.createElement("div");
				  	titleDiv.className = "columnTitleContainer";
				  	titleDiv.setAttribute("contenteditable", "true");
				  	document.getElementById('columnTitles').appendChild(titleDiv);
			  }
			   else{
				   	var select = document.getElementById('columnTitles');
				   	select.removeChild(select.lastChild);
			   }
            }
          });

        $('.rowValue').each(function(){
            var value = $(this).next().attr('value');
            $(this).html(value);
          });  
       if (window.location.pathname == '/F:/Desktop/5uzd/main.html'){
			while(document.getElementById("columnTitles").childElementCount != document.getElementById('columnCount').value) {
		        	  if(document.getElementById("columnTitles").childElementCount < document.getElementById('columnCount').value){
		        	  	var titleDiv = document.createElement("div");
		        	  	titleDiv.className = "columnTitleContainer";
		        	  	titleDiv.setAttribute("contenteditable", "true");
		        	  	document.getElementById('columnTitles').appendChild(titleDiv);
		        	  }
		        }
		} 


	$( ".confirmbtn" ).click(function(){

		sessionStorage.setItem("rowCount", document.getElementById('rowCount').value);
		sessionStorage.setItem("columnCount", document.getElementById('columnCount').value);
		sessionStorage.setItem("title", document.getElementById('tableTitle').value);
		var columnTitles = [];
		for(var i = 0; i < document.getElementById('columnCount').value;i++){
			console.log(i);
			columnTitles.push(document.getElementById('columnTitles').childNodes[i+1].innerHTML);
		}
		sessionStorage.setItem("columnTitles", JSON.stringify(columnTitles));
		sessionStorage.setItem("height", document.getElementById('height').innerHTML);
		sessionStorage.setItem("width", document.getElementById('width').innerHTML);
		sessionStorage.setItem("borderStyle", $('input[name=border]:checked').val());
		console.log($('input[name=border]:checked').val());
		var width = document.getElementById('width').innerHTML;
		var columns = document.getElementById('columnCount').value;
		window.open("generated.html");
	});

	$("#additionalSettings").click(function(){
		 $('#additionalContent').slideToggle('slow');
	});

	$(".colors").click(function(){
		var getColor = $(this).css("backgroundColor");
		var getTable = document.getElementById("containTable").childNodes;
		var firstRow = getTable[1].rows[0];
		for(var i = 0; i < firstRow.cells.length; i++){
			firstRow.cells[i].setAttribute("style", "background-color: "+getColor);
		}
	});

	$("#themeSettings").click(function(){
		 $('#themeContent').slideToggle('slow');
	});
	$("#fontSettings").click(function(){
		 $('#fontContent').slideToggle('slow');
	});
	$("#fontColorSettings").click(function(){
		 $('#fontColorContent').slideToggle('slow');
	});
	$("#font-family").on('change', function(){
		var select =  document.getElementById("font-family");
		var index  = select.selectedIndex;
		var family = select.options[index].style.fontFamily;
		console.log(family);
		var getTable = document.getElementById("containTable").childNodes[1];
		getTable.setAttribute("style", "font-family: "+family);
		
	});
	$("#font-color").on('input change', function(){
		var val = document.getElementById("font-color").value;
		console.log(val);
		var getTable = document.getElementById("containTable").childNodes[1];
		switch(val){
			case "1":
				document.getElementById("currentColor").innerHTML = "Juoda";
				document.getElementById("currentColor").style.color = "black";
				var getColor = "black";
				break;
			case "2":
				document.getElementById("currentColor").innerHTML = "Geltona";
				document.getElementById("currentColor").style.color = "yellow";
				var getColor = "yellow";
				break;
			case "3":
				document.getElementById("currentColor").innerHTML = "Raudona";
				document.getElementById("currentColor").style.color = "red";
				var getColor = "red";
				break;
			case "4":
				document.getElementById("currentColor").innerHTML = "Mėlyna";
				document.getElementById("currentColor").style.color = "blue";
				var getColor = "blue";
				break;
			case "5":
				document.getElementById("currentColor").innerHTML = "Žalia";
				document.getElementById("currentColor").style.color = "green";
				var getColor = "green";
				break;
			case "6":
				document.getElementById("currentColor").innerHTML = "Violetinė";
				document.getElementById("currentColor").style.color = "purple";
				var getColor = "purple";
				break;
			case "7":
				document.getElementById("currentColor").innerHTML = "Ruda";
				document.getElementById("currentColor").style.color = "brown";
				var getColor = "brown";
				break;
			case "8":
				document.getElementById("currentColor").innerHTML = "Pilka";
				document.getElementById("currentColor").style.color = "gray";
				var getColor = "gray";
				break;
			case "9":
				document.getElementById("currentColor").innerHTML = "Tamsiai pilka";
				document.getElementById("currentColor").style.color = "darkgray";
				var getColor = "darkgray";
				break;
			case "10":
				document.getElementById("currentColor").innerHTML = "Balta";
				document.getElementById("currentColor").style.color = "black";
				var getColor = "white";
				break;
		}
		for(var i = 0; i < getTable.rows.length; i++){
			for(var j = 0; j < getTable.rows[i].cells.length; j++){
				getTable.rows[i].cells[j].style.color = getColor;
			}
			
		}
	});
});
console.log(window.location.pathname);
	if (window.location.pathname == '/F:/Desktop/5uzd/generated.html'){
		window.onload = generateTable;
		generateTable();
	}
function generateTable(){
		var rowCount = sessionStorage.getItem("rowCount");
		var columnCount = sessionStorage.getItem("columnCount");
		var title = sessionStorage.getItem("title");
		var retrieveArray = sessionStorage.getItem("columnTitles");
		var clmnTitles=  JSON.parse(retrieveArray);
		var tableHeight = sessionStorage.getItem("height");
		var tableWidth = sessionStorage.getItem("width");
		var borderIndex = sessionStorage.getItem("borderStyle");

		if(borderIndex!=null && borderIndex != undefined){
			switch(borderIndex){
				case "1":
					var borderStyle = "border-style: double";
					break;
				case "2":
					var borderStyle = "border-style: solid";
					break;
			    case "3":
			    	var borderStyle = "border-radius: 14px; overflow:hidden; border: 0;";
			    	break;
			    case "4":
			    	var borderStyle = "border-style: dashed; border-spacing:0px; border-collapse: separate";
			    	break;
			}
		}

		var tbl = document.createElement("table");
		tbl.setAttribute("style", "min-height:"+tableHeight+"px; min-width:"+tableWidth+"px;"+borderStyle);
		var caption = document.createElement("caption");
		caption.appendChild(document.createTextNode(title));
 		var tblBody = document.createElement("tbody");
	  	for (var j = 0; j <= rowCount; j++) {
		   	 var row = document.createElement("tr");

		    for (var i = 0; i <= columnCount; i++) {
		      var cell = document.createElement("td");
		      cell.setAttribute("style", "min-width:"+(tableWidth/(columnCount+1))+"px; max-width:"+ ((tableWidth/(columnCount+1))+50)+"px");
		      cell.setAttribute("contenteditable", "true");
		      if(i == 0){
		      	if(j == 0){
		      		var cellText = document.createTextNode("");
		      		cell.setAttribute("style", "font-size: 20px; background-color: #80c484");
		      	} 
		      	else {
		      		var cellText = document.createTextNode(j+".");
		      		cell.setAttribute("style", "font-size: 20px");
		      	}
		  	  }
		      else{
		        if(j == 0)  {
		        	var cellText = document.createTextNode(clmnTitles[i-1]);
		        	cell.setAttribute("style", "font-size: 20px; background-color: #80c484");
		        }
			    else var cellText = document.createTextNode("");
		      }

		      cell.appendChild(cellText);
		      row.appendChild(cell);
	        }

	    	tblBody.appendChild(row);
	    }
	  	tbl.appendChild(caption);
		tbl.appendChild(tblBody);
		tbl.setAttribute("border", "2");
		console.log(rowCount);

		window.onload = init;
		function init(){
			document.getElementById('containTable').appendChild(tbl);
		}
		sessionStorage.clear();
}
function openCloseDrawer(){
	if(document.getElementById("myDrawer").style.width != 0 && document.getElementById("myDrawer").style.width != "0px" ) document.getElementById("myDrawer").style.width = 0;
	else {
		if(window.innerWidth <700){
			document.getElementById("myDrawer").style.width = "39vw";
			if(window.innerWidth <500){
				document.getElementById("myDrawer").style.width = "52vw";
				if(window.innerWidth <300) document.getElementById("myDrawer").style.width = "74vw";
			}
		}
		else{
		document.getElementById("myDrawer").style.width = "28vw";
		document.getElementById("closeham").style.visibility = "visible"; 
		}
	}
	
}

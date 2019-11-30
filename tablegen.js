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
		window.open("generated.html");
	});
	$(".collapsible").click(function(){
		 $('.content').slideToggle('slow');
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

		var tbl = document.createElement("table");
		tbl.setAttribute("style", "height:"+tableHeight+"px; width:"+tableWidth+"px");
		var caption = document.createElement("caption");
		caption.appendChild(document.createTextNode(title));
 		var tblBody = document.createElement("tbody");
	  	for (var j = 1; j <= rowCount; j++) {
		   	 var row = document.createElement("tr");

		    for (var i = 1; i <= columnCount; i++) {
		      var cell = document.createElement("td");
		      cell.setAttribute("contenteditable", "true");
		      if(j == 1)  var cellText = document.createTextNode(clmnTitles[i-1]);
		      else var cellText = document.createTextNode("cell is row " + j + ", column " + i);

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
		document.getElementById('genContainer').appendChild(tbl);
		}
		sessionStorage.clear();
}

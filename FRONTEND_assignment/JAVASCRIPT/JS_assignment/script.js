// inserting row data
var row = data; 
var table_row = ''; //empty string 
for (var i = 0; i < row.length; i++) { 
  //appending row_data to each row.
  var table_row = table_row + '<tr>'  + 
    '<td>' + row[i].id       + '</td>' + 
    '<td>' + row[i].name     + '</td>' + 
    '<td>' + row[i].subject1 + '</td>' + 
    '<td>' + row[i].subject2 + '</td>' + 
    '<td>' + row[i].subject3 + '</td>' + 
    '<td>' + Math.max(row[i].subject1,row[i].subject2,row[i].subject3) + '</td>' +  // form maximum marks among 3 subs
    '</tr>'; 
}

var t_element = document.createElement('tbody');
t_element.innerHTML = table_row; //Sets or returns the content of an element
document.getElementById('my_table').appendChild(t_element); // Adds a new child node, to an element, as the last child node

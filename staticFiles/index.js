//form logic
// $("#form").submit(function(event) {
 
//   console.log("Hi");
// });
function subForm(){
  event.preventDefault();
  var name = $("input[name='name']").val();
  var phy = $("input[name='phy']").val();
  var che = $("input[name='che']").val();
  var maths = $("input[name='maths']").val();
  var timepass="timepass";

  if(phy>100 || che>100 || maths>100){
    alert("Please enter Marks below 100");


  }
  if(phy>100){
    phy=99;
  }
  if(che>100){
    che=99;
  }
  if(maths>100){
    maths=99;
  }

  var query = "create trigger stud_marks before INSERT on Student for each row set Student.total = Student.subj1 + Student.subj2 + Student.subj3, Student.per = Student.total * 60 / 100;"
  sessionStorage.setItem("query", query);

// Retrieve the value of the query variable from session storage
 var storedQuery = sessionStorage.getItem("query");

  
  var triggerQueryElement = document.querySelector('.trigger_query');
  var pElement = document.createElement('p');
  pElement.textContent = query;
  triggerQueryElement.appendChild(pElement);



  $.ajax({
    type: "POST",
    url: "/demo",
    data: {name: name, phy: phy, che: che, maths: maths,timepass:timepass},
    success: function(response) {
        console.log(response);
    }
});
}
let audioturn = new Audio("ting.mp3");
var searchInput_nav = document.getElementById('searchInput_nav');
var cards = document.querySelectorAll('.card-text');

  searchInput_nav.addEventListener('input', () => {
    const search_query = searchInput_nav.value.toLowerCase();

    cards.forEach(card => {
      const cardText = card.querySelector('.card-text');
      const query = cardText.textContent.toLowerCase();

      if (query.includes(search_query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
function restart_server() {
  var display_flex = document.getElementById("display_flex");
  var sql = document.getElementById("sql")
  var join_button_modal = document.getElementById("join_button_modal");
  join_button_modal.style.display = "none";
  sql.innerText = "";
  display_flex.innerText = "";
  
  var cnt=1;
  $.ajax({
    type: "POST",
    url: "/demo",
    data: {cnt:cnt},
    success: function(response) {
     
      console.log(response);
      location.reload();
    },
    
  });
}

function noQueries(){
  var noofqueries = document.getElementById('noofqueries');
  var cardno = document.getElementsByClassName('cardno');
  console.log();
  var sql_query = document.getElementById('sql').innerText;
  var user_id = document.getElementById('user_id').innerText
  $.ajax({
    type:'POST',
    url:'/demo',
    data:{
        no_dede_bhai :"no dede bhai",
        sql_query:sql_query,
        user_id:user_id,
        // fetch_output:sql_query 
    },          
    success: function(response) {
      console.log(response);
      console.log("response.length");
      console.log(response.length);
      noofqueries.innerText=response.length;
      // $('#main-container').html(response);
  }
  })

}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('Text/html', ev.target.id);
}

function drop(ev,target) {
  var audio = document.getElementById("myAudio");
    // audio.play();
 

  ev.preventDefault();
  console.log(target.id, ev.target.id)

  let data_id = ev.dataTransfer.getData("Text/html");
  
  
 

  console.log(`The data id is passing to backend is ${data_id}`);
  alert(data_id)
  
  if(data_id!=""){

      console.log("above post method")
      $.ajax({
          type:'POST',
          url:'/demo',
          data:{
              table_name:data_id 
          },          
          success: function(response) {         
            $('#main-container').html(response);
        }
      })
  }
  console.log("calling checkbox method");
  
  //  audioturn.play();
  setTimeout(function() {
   
    checkbox();
   
  }, 1000); // Set the delay to 2000ms (2 seconds)

}
// ------------------------------------------------check box function------------------------------------------------------

function checkbox() {
  
  global_arr=[];

  //storing global_arr elements   
  var elements = document.getElementsByClassName('global_arr');
  for (var i = 0; i < elements.length; i++) {
    global_arr.push(elements[i].innerText);
  }
  console.log(global_arr);



  //checkbox logic
  var checkboxexchecked = [];
  var chech_column = document.getElementsByClassName('check_column');

  
    for (var i=0; i<chech_column.length; i++) {
      if (chech_column[i].checked) {
        checkboxexchecked.push(chech_column[i].value);
      }
    }
    //for length graeter than 1 so to simplyfiy the column name in diffrent array
    checkboxexchecked1=[];
    checkboxexchecked2=[];
    checkboxexchecked3=[];
    aggregateArray = [];
    allAggregateArray=[];
    list_table1=[];
    list_table2=[];
    list_table3=[];
    
    //list 1 so it can be ealily divided
    var list1 = document.getElementsByClassName('list1');
    for (var i = 0; i < list1.length; i++) {
      list_table1.push(list1[i].innerText);
    }
    // console.log(list_table1);

    //list 2 so it can be ealily divided
    var list2 = document.getElementsByClassName('list2');
    for (var i = 0; i < list2.length; i++) {
      list_table2.push(list2[i].innerText);
    }
    // console.log(list_table2);
   //list 3 so it can be ealily divided
    var list3 = document.getElementsByClassName('list3');
    for (var i = 0; i < list3.length; i++) {
      list_table3.push(list3[i].innerText);
    }
  
  
  // feature box dropdown menu targetting
  var input_container = document.getElementsByClassName('input-container');
  console.log(input_container.innerText);
  var features_box=[];
  let clause = document.querySelectorAll('.item-label');
  
  if(clause!=null){
    clause.forEach(function(element) {
      let value = element.getAttribute('data-value');
      features_box.push(value);
      
    });
  }


  //all groupby , orderby, limit, where logic display block -------------------------------

  //group BY
  let groupby_big_container=document.getElementById('groupby_big_container');
  var group_dropdown  = document.getElementById('groupby').value;



  // order by
  let order_big_container = document.getElementById('order_big_container');
  var order_dropdown = document.getElementById('orderby').value;
  var asc = document.querySelector('input[name="asc"]:checked').value;

   // where
   let where_big_container = document.getElementById('where_big_container');
   var where_dropdown = document.getElementById('where').value;
   var where_is_null="";
   if(document.querySelector('input[name="isnull"]:checked')){
    console.log("ha bhai check hogaya ");
    where_is_null = document.querySelector('input[name="isnull"]:checked').value;
    console.log(where_is_null);
   }
    const button = document.getElementById("user_input");
    const userInputDiv = document.getElementById("user_input_id");
    var user_value = document.getElementById("user_value").value;
    console.log(user_value);
    console.log("____________________________-");
    
    button.addEventListener("click", function() {
       
        userInputDiv.style.display = "block";
    });
   // LIKE Container
   let like_big_container = document.getElementById('like_big_container')
   var like_dropdown = document.getElementById('likeby').value;
   var luser_value = document.getElementById("luser_value").value;


    //HAVING
    let having_big_container = document.getElementById('having_big_container')
    const hbutton = document.getElementById("huser_input");
    const huserInputDiv = document.getElementById("huser_input_id");
    var huser_value = document.getElementById("huser_value").value;
    console.log(huser_value);
    console.log("____________________________-");
    
    hbutton.addEventListener("click", function() {
       
        huserInputDiv.style.display = "block";
    });

   
  //limit
  var limit_big_container = document.getElementById('limit_big_container');
  var limit_value = document.getElementById('limit_id').value;
  console.log("----------------");
  console.log(limit_value);
  console.log("-----------------");

  //min
  var min_big_container = document.getElementById('min_big_container');
  var min_dropdown  = document.getElementById('minby').value;

  //MIN Distinct
  var mindistinct_big_container = document.getElementById('mindistinct_big_container');
  var mindistinct_dropdown = document.getElementById('mindistinctby').value;

  //max
  var max_big_container = document.getElementById('max_big_container');
  var max_dropdown = document.getElementById('maxby').value;

  //maxDISTINCT
  var maxdistinct_big_container = document.getElementById('maxdistinct_big_container');
  var maxdistinct_dropdown = document.getElementById('maxdistinctby').value

  //distinct
  var distinct_big_container = document.getElementById('distinct_big_container');
  var distinct_dropdown = document.getElementById('distinctby').value;
 
  //COUNT DISTINCT
  var countdistinct_big_container = document.getElementById('countdistinct_big_container');
  var countdistinct_dropdown = document.getElementById('countdistinctby').value;

  //COUNT
  var count_big_container = document.getElementById('count_big_container');
  var count_dropdown = document.getElementById('countby').value;

   //avg
   var avg_big_container = document.getElementById('avg_big_container');
   var avg_dropdown = document.getElementById('avgby').value;
 
   //AVG DISTINCT
   var avgdistinct_big_container = document.getElementById('avgdistinct_big_container');
   var avgdistinct_dropdown = document.getElementById('avgdistinctby').value

   //SUM
   var sum_big_container = document.getElementById('sum_big_container');
   var sum_dropdown = document.getElementById('sumby').value;
 
   //SUM DISTINCT
   var sumdistinct_big_container = document.getElementById('sumdistinct_big_container');
   var sumdistinct_dropdown = document.getElementById('sumdistinctby').value

  console.log(features_box);
  let size = features_box.length;
  if(size>0){
    console.log(features_box[size-1]);


    if(features_box[size-1] == 'GROUP BY'){
      groupby_big_container.style.display = 'block';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //order by
    if(features_box[size-1] == 'ORDER BY'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='block';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';

    }

    //where
    if(features_box[size-1] == 'WHERE'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='block';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //limit
    if(features_box[size-1] == 'LIMIT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'block';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //MIN
    if(features_box[size-1] == 'MIN'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'block';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //MIN Distinct
    if(features_box[size-1] == 'MIN DISTINCT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'block';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //Max 
    if(features_box[size-1] == 'MAX'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'block';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //Max Distinct
    if(features_box[size-1] == 'MAX DISTINCT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'block';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //Distinct
    if(features_box[size-1] == 'DISTINCT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'block';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //count Distinct
    if(features_box[size-1] == 'COUNT DISTINCT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'block';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //count
    if(features_box[size-1] == 'COUNT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'block';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //Having
    if(features_box[size-1] == 'HAVING'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'block';
      like_big_container.style.display='none';
    }

    //LIKE
    if(features_box[size-1] == 'LIKE'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='block';
    }

    //avg
    if(features_box[size-1] == 'AVG'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'block';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //avg distinct
    if(features_box[size-1] == 'AVG DISTINCT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'block';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //sum
    if(features_box[size-1] == 'SUM'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'block';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //sum distinct
    if(features_box[size-1] == 'SUM DISTINCT'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'block';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }

    //case
    if(features_box[size-1] == 'CASE'){
      groupby_big_container.style.display = 'none';
      order_big_container.style.display='none';
      where_big_container.style.display='none';
      limit_big_container.style.display = 'none';
      min_big_container.style.display = 'none';
      mindistinct_big_container.style.display = 'none';
      max_big_container.style.display = 'none';
      maxdistinct_big_container.style.display = 'none';
      distinct_big_container.style.display = 'none';
      countdistinct_big_container.style.display = 'none';
      count_big_container.style.display = 'none';
      avg_big_container.style.display = 'none';
      avgdistinct_big_container.style.display = 'none';
      sum_big_container.style.display = 'none';
      sumdistinct_big_container.style.display = 'none';
      having_big_container.style.display = 'none';
      like_big_container.style.display='none';
    }
  }
  


  



  //all clause assigning value
  str_group = "";
  str_order = "";
  str_where = "";
  str_limit = "";
  str_min = "";
  str_mindistinct = "";
  str_max = "";
  str_maxdistinct = "";
  str_distinct = "";
  str_countdistinct = "";
  str_count = "";
  str_avg = "";
  str_avgdistinct = "";
  str_sum = "";
  str_sumdistinct = "";
  str_having = "";
  str_like="";

    //group by features box
    if(features_box.includes('GROUP BY')){
      if(checkboxexchecked.length==0 ){
        str_group = " GROUP BY " + group_dropdown;
      }
      else{
        str_group = " GROUP BY " + checkboxexchecked;
        groupby_big_container.style.display='none';
      }
    }

    if(features_box.includes('ORDER BY')){
      if(asc=="Asc"){
        str_order += " ORDER BY "+order_dropdown;
      }
      else{
        str_order += " ORDER BY "+order_dropdown+" "+asc;
      }
      
    }
    var cnt=0;
    if(features_box.includes('WHERE')){
      cnt++;

      if((where_dropdown=="" && where_is_null!="") || (where_dropdown!="" && where_is_null=="")){
        alert("select dropdown value");
      }
      else if(user_value == ""){
        str_where+= " WHERE "+where_dropdown+" "+where_is_null;
      }
      else if(where_dropdown=="" && where_is_null==""){
        str_where+= " WHERE "+user_value;
      }
      else if(where_dropdown!="" && where_is_null!="" && user_value!=""){
        str_where+=" WHERE "+where_dropdown+" "+where_is_null+" AND "+user_value;
      }
      
    }
    if(features_box.includes('LIKE')){
      if(cnt>0){
        str_like+= " "+like_dropdown+" LIKE "+luser_value;
      }
      else{
        str_like+= " WHERE "+like_dropdown+" LIKE "+luser_value;
      }
       
    }
    //having
    if(features_box.includes('HAVING')){
      str_having += " HAVING "+huser_value
    }
    if(features_box.includes('LIMIT')){
     
      if(limit_value<0){
        alert('No negative values are allowed in limit');
      }
      
      else{
        str_limit += " LIMIT "+limit_value;
      }
        
      
      
    }
    if(features_box.includes('MIN')){
      aggregateArray.push('MIN');
      
      str_min += " MIN(" + min_dropdown + ")"  ;

      allAggregateArray.push(str_min);

    }

    //Min Distinct
    if(features_box.includes('MIN DISTINCT')){
      aggregateArray.push('MIN DISTINCT');
      
      str_mindistinct += " MIN(DISTINCT " + mindistinct_dropdown + ")"  ;

      allAggregateArray.push(str_mindistinct);

    }

    //max
    if(features_box.includes('MAX')){
      aggregateArray.push('MAX');
      
      str_max += " MAX(" + max_dropdown + ")"  ;

      allAggregateArray.push(str_max);

    }

    //max distinct
    if(features_box.includes('MAX DISTINCT')){
      aggregateArray.push('MAX DISTINCT');
      
      str_maxdistinct += " MAX(DISTINCT " + maxdistinct_dropdown + ")"  ;

      allAggregateArray.push(str_maxdistinct);

    }
    //Distinct
    if(features_box.includes('DISTINCT')){
      aggregateArray.push("DISTINCT");
      str_distinct += " DISTINCT( "+distinct_dropdown + ")";
      allAggregateArray.unshift(str_distinct);

    }

    //COUNT DISTINCT
    if(features_box.includes('COUNT DISTINCT')){
      aggregateArray.push("COUNT DISTINCT");
      str_countdistinct += " COUNT(DISTINCT "+countdistinct_dropdown + ")";
      allAggregateArray.unshift(str_countdistinct);
    }
    //COUNT
    if(features_box.includes('COUNT')){
      aggregateArray.push("COUNT");
      str_count += " COUNT("+count_dropdown + ")";
      allAggregateArray.unshift(str_count);
    }

    //AVG
    if(features_box.includes('AVG')){
      aggregateArray.push('AVG');
      
      str_avg += " AVG(" + avg_dropdown + ")"  ;

      allAggregateArray.push(str_avg);

    }

    //max distinct
    if(features_box.includes('AVG DISTINCT')){
      aggregateArray.push('AVG DISTINCT');
      
      str_avgdistinct += " AVG(DISTINCT " + avgdistinct_dropdown + ")"  ;

      allAggregateArray.push(str_avgdistinct);

    }
     //SUM
     if(features_box.includes('SUM')){
      aggregateArray.push('SUM');
      
      str_sum += " SUM(" + sum_dropdown + ")"  ;

      allAggregateArray.push(str_sum);

    }

    //SUM distinct
    if(features_box.includes('SUM DISTINCT')){
      aggregateArray.push('SUM DISTINCT');
      
      str_sumdistinct += " SUM(DISTINCT " + sumdistinct_dropdown + ")"  ;

      allAggregateArray.push(str_sumdistinct);

    }
    console.log(`The limit value is ${limit_value}`);
    
    
    
  
  
  
 
  console.log(str_where);



    for(var i=0;i<checkboxexchecked.length;i++){
        if(list_table1.includes(checkboxexchecked[i])){
          checkboxexchecked1.push(global_arr[0]+"."+checkboxexchecked[i]);
        }
        else if(list_table2.includes(checkboxexchecked[i])){
          checkboxexchecked2.push(global_arr[1]+"."+checkboxexchecked[i]);
        }
        else if(list_table3.includes(checkboxexchecked[i])){
          checkboxexchecked3.push(global_arr[2]+"."+checkboxexchecked[i]);
        }
    }

    // console.log(checkboxexchecked1);
    // console.log(checkboxexchecked2);
    
    


  

  
  
  console.log(checkboxexchecked);



  //join
  var join_container = document.getElementById('join_container');
  var join_button_modal = document.getElementById("join_button_modal")
  var join_display = document.getElementById('join_display');
  var apply_join_display3 = document.getElementById('apply_join_display3')
  if(global_arr.length>=2){
    join_button_modal.style.display='block';
    if(global_arr.length==3){
      join_display.style.display='block'
      apply_join_display3.style.display='block'
    }
    join_container.style.display = 'block';
  }
  var join_type = document.getElementById('join').value;
  var join_type2 = document.getElementById('join2').value;
  console.log(join_type);
  
  //taking value of selected join on 2 tables
  var apply_join_on_1 = document.getElementById('on_which_1').value;
  var apply_join_on_2 = document.getElementById('on_which_2').value;
  var apply_join_on_3 = document.getElementById('on_which_3').value;



  //displaying query on frontend
  var sql =document.getElementById('sql');
  


  //length=1------------------------------------------------------------------------------
  if(global_arr.length==1){
    if(checkboxexchecked.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT * FROM ${global_arr[0]} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray} FROM ${global_arr[0]} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else{
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT ${checkboxexchecked} FROM ${global_arr[0]} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray},${checkboxexchecked} FROM ${global_arr[0]} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    
  }
  else if(global_arr.length==2){
    //lebgth=2----------------------------------------------------------------------------------
    if(checkboxexchecked1.length==0 && checkboxexchecked2.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT * FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
       
    }
    else if(checkboxexchecked1.length==0 && checkboxexchecked2.length!=0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray}, ${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length!=0 && checkboxexchecked2.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked1} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray}, ${checkboxexchecked1} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order}} ${str_limit};`;
      }
      

    }
    else{
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked1},${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray}, ${checkboxexchecked1},${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    
  }
  else if(global_arr.length==3){
    if(checkboxexchecked1.length==0 && checkboxexchecked2.length==0 && checkboxexchecked3.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT * FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
       
    }
    else if(checkboxexchecked1.length==0 && checkboxexchecked2.length==0 && checkboxexchecked3.length!=0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray}, ${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length==0 && checkboxexchecked2.length!=0 && checkboxexchecked3.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray}, ${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length!=0 && checkboxexchecked2.length==0 && checkboxexchecked3.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked1} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray}, ${checkboxexchecked1} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length==0 && checkboxexchecked2.length!=0 && checkboxexchecked3.length!=0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked2},${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray},${checkboxexchecked2}, ${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length!=0 && checkboxexchecked2.length==0 && checkboxexchecked3.length!=0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked1},${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray},${checkboxexchecked1}, ${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length!=0 && checkboxexchecked2.length!=0 && checkboxexchecked3.length==0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked1},${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray},${checkboxexchecked1}, ${checkboxexchecked2} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    else if(checkboxexchecked1.length!=0 && checkboxexchecked2.length!=0 && checkboxexchecked3.length!=0){
      if(allAggregateArray.length==0){
        sql.innerText = `SELECT  ${checkboxexchecked1},${checkboxexchecked2},${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      else{
        sql.innerText = `SELECT ${allAggregateArray},${checkboxexchecked1},${checkboxexchecked2},${checkboxexchecked3} FROM ${global_arr[0]} ${join_type} ${global_arr[1]} ON ${global_arr[0]}.${apply_join_on_1} = ${global_arr[1]}.${apply_join_on_2} ${join_type2} ${global_arr[2]} ON ${global_arr[1]}.${apply_join_on_2} = ${global_arr[2]}.${apply_join_on_3} ${str_where} ${str_like} ${str_group} ${str_having} ${str_order} ${str_limit};`;
      }
      
    }
    
    
  }

  // Get the original SQL query
const originalSqlQuery = sql.innerHTML;
console.log(`sql.innerHTML = ${originalSqlQuery}`);

// Add the <br> tag before the FROM keyword
var modifiedSqlQuery = originalSqlQuery.replace(/FROM/g, '<br>FROM');
console.log(modifiedSqlQuery);
modifiedSqlQuery = modifiedSqlQuery.replace(/ON/g, 'ON<br>');
modifiedSqlQuery = modifiedSqlQuery.replace(/FROM/g, '<strong>FROM</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/ON/g, '<strong>ON</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/INNER JOIN/g, '<strong>INNER JOIN</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/LEFT JOIN/g, '<strong>LEFT JOIN</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/RIGHT JOIN/g, '<strong>RIGHT JOIN</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/FULL JOIN/g, '<strong>FULL JOIN</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/SELECT/g, '<strong>SELECT</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/GROUP/g, '<br><strong>GROUP</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/ORDER/g, '<br><strong>ORDER</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/WHERE/g, '<br><strong>WHERE</strong>');
modifiedSqlQuery = modifiedSqlQuery.replace(/HAVING/g, '<br><strong>HAVING</strong>');
// Set the modified SQL query as the new HTML content
sql.innerHTML = modifiedSqlQuery;
string_query = ""+modifiedSqlQuery

// var typed = new Typed(".sql",{
//   strings : ["yash",string_query],
//   typeSpeed: 50,
//   backSpeed: 50,
//   loop: false
// })
}



function output(){
  var sql_query = document.getElementById('sql').innerText;
  var user_id = document.getElementById('user_id').innerText
  console.log((sql_query));
  $.ajax({
    type:'POST',
    url:'/demo',
    data:{
        ye_bhi_output:"ye_bhi_output_he",
        fetch_output:sql_query,
        user_id:user_id
    },          
    success: function(response) {
      if (response.html_table) {
        // Query executed successfully, update table
        $('#output_container').html('<p>Loading...</p>');

        // Delay for 2 seconds and update table after the delay
        setTimeout(function() {
          $('#output_container').html(response.html_table);
          $('#output_container table thead th').css('text-align', 'left');
        }, 2000);
      } else {
        // Query failed, show error message in alert box
        alert("Error executing query:\n" + response.error_message);
      }
    }
})

var btn_csv = document.getElementById('btn_csv');
var output_container = document.getElementById('output_container');
if(output_container.innerHTML!=""){
  btn_csv.style.display = 'block';
}
else{
  btn_csv.style.display = 'none';
}



}


//visualize function
function Visualize(){
 console.log("In visualize function");
 var th_value = []
 var thElements = document.getElementsByTagName('th');

// Loop through the collection and extract the values
for (var i = 0; i < thElements.length; i++) {
  var thValue = thElements[i].textContent;
  if(thValue>=0){

  }
  else{
    th_value.push(thValue);
  }
  
}
console.log(th_value);

const table = document.querySelector('table');

// Get all the table rows
const rows = table.rows;

// Get the number of columns
const numCols = rows[0].cells.length;

// Initialize an empty array for each column
const colArrays = new Array(numCols).fill().map(() => []);

// Iterate through each row and push the cell value into the corresponding column array
for (let i = 1; i < rows.length; i++) {
  for (let j = 0; j < numCols; j++) {
    // colArrays[j].push(rows[i].cells[j].textContent);
    colArrays[j].push(parseInt(rows[i].cells[j].textContent));
  }
}
const data = {
  labels: colArrays[0],
  datasets: [{
    label: '# of Votes',
    data: colArrays.slice(1),
    borderWidth: 1
  }]
};
console.log(data);

 const ctx = document.getElementById('myChart');
      
        // new Chart(ctx, {
        //   type: 'bar',
        //   data: {
        //     labels: th_value,
        //     datasets: [{
        //       label: '# of Votes',
        //       data: [['y@gmail.com','z@gmail.com','k@gmail.com'], [4,5,6], [7,8,9], [11,2,3]],
        //       borderWidth: 1
        //     }]
        //   },
        //   options: {
        //     scales: {
        //       y: {
        //         beginAtZero: true
        //       }
        //     }
        //   }
        // });
        new Chart(ctx, {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

}


//to CSV function 
function toCSV(){
 
  var table = document.getElementById('my-table'); // Replace 'my-table' with the ID of your table element
  var csv = tableToCsv(table);
  let name = prompt("Please enter file name", "my-table");

  if (name != null) {
      downloadCsv(csv, name+'.csv'); // Replace 'my-table.csv' with the desired filename
  }
  else{
    alert('Please enter file name to continue!');
  }
  
}
function tableToCsv(table) {
  var csv = '';
  var rows = table.querySelectorAll('tr');
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].querySelectorAll('th, td');
    for (var j = 0; j < cells.length; j++) {
      csv += cells[j].textContent.trim() + ',';
    }
    csv = csv.slice(0, -1); // Remove trailing comma
    csv += '\n';
  }
  return csv;
}
function downloadCsv(csv, filename) {
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}


//new file append
var file_name = [];
function append_new_file() {
  
  var sql = document.getElementById('sql').innerText;
  var user_id = document.getElementById('user_id').innerText
  console.log(sql,user_id);
  let name = prompt("Please enter file name", "file1");

  if (name != null) {
    if(file_name.includes(name)){
      alert('There is file present with this name')
    }
    else{
      file_name.push(name);
      // create the new elements
    var newLi = document.createElement("li");
    newLi.setAttribute("class", "nav-item");
    
    var newLink = document.createElement("a");
    newLink.setAttribute("class", "nav-link active");
    newLink.setAttribute("aria-current", "page");
    newLink.setAttribute("href", "new-link-url"); // replace with your desired link URL
    newLink.innerHTML = name+".avs"; // replace with your desired link text
    
    var newTextArea = document.createElement("textarea");
    newTextArea.setAttribute("id", name+"_textarea");
    newTextArea.setAttribute("style", "display: block;");
    // newTextArea.setAttribute("")
    newTextArea.innerHTML = sql; // set the value of the textarea to the SQL
    
    // append the new elements to the DOM
    newLi.appendChild(newLink);
    newLi.appendChild(newTextArea);
    
    var navbar = document.querySelector('.navbar-nav.justify-content-end.flex-grow-1.pe-3');
    navbar.appendChild(newLi);
    }
    
    $.ajax({
      type:'POST',
      url:'/demo',
      data:{
          making_clear:"making_clear",
          sql_query:sql,
          user_id:user_id,
          // fetch_output:sql_query 
      },          
      success: function(response) {
       
        // $('#main-container').html(response);
        alert("Query Saved Successfully!")
    }
  })

    
    
  } else {
    alert('Please enter file name to continue!');
  }
}

//refresh Queries
function refresh_queries(){
  var sql_query = document.getElementById('sql').innerText;
  var user_id = document.getElementById('user_id').innerText
  console.log((sql_query));
  $.ajax({
    type:'POST',
    url:'/demo',
    data:{
        id_lele_bhai:"id lele bhai",
        fetch_output:sql_query,
        user_id:user_id
    },          
    success: function(response) {
      var refresh_query = document.getElementById('refresh_query')
      console.log(response);
      var query_html="";
      for(var i=0;i<response.length;i++){
        query_html+=`
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Query </a>
        <div class="card" style="width: 18rem;">
        
          <div class="card-body">
              <h5 class="card-title">SQL QUery</h5>
              <p class="card-text">${response[i]}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
         </div>
      </li>
        `
      }
      var div = document.createElement('div');
div.innerHTML = query_html;
refresh_query.appendChild(div);
      // $('#refresh_query').html(response.html_table);
  }
})
}


//copy to clipboard
function copyFunction(){
  var cc = document.getElementById('sql').innerText;
  console.log(`The cc ic ${cc}`);
  var text = "Example text to appear on clipboard";
  navigator.clipboard.writeText(cc).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    alert(`copied : ${cc}`);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}


//create Table
// CREATE TABLE IF NOT EXISTS local_companies AS 
//   SELECT *
//   FROM companies
//   WHERE state = 'Florida';
function create_table(){
  global_arr=[];

  //storing global_arr elements   
  var elements = document.getElementsByClassName('global_arr');
  for (var i = 0; i < elements.length; i++) {
    global_arr.push(elements[i].innerText);
  }
  console.log(global_arr);



// NO OF Queries


  //checkbox logic
  var checkboxexchecked = [];
  var chech_column = document.getElementsByClassName('check_column');

  
    for (var i=0; i<chech_column.length; i++) {
      if (chech_column[i].checked) {
        checkboxexchecked.push(chech_column[i].value);
      }
    }
    console.log(checkboxexchecked);
    if(checkboxexchecked.length==0){
      alert('Please Select some checkboxex to create new table')
      checkbox();
    }
    else{
      var all_tables = document.getElementsByClassName('items');
      all_tables_values=[]
      for(var i=0;i<all_tables.length;i++){
        all_tables_values.push(all_tables[i].value)
      }
    console.log(`All tables are ${all_tables_values}`);
    let table_name = prompt("Please enter Table name to create", "new_table");

    if(all_tables_values.includes(table_name)){
      alert('Please enter anothere table name');
      create_table();
    }
    else{
      if(table_name!=null){
        $.ajax({
            type:'POST',
            url:'/demo',
            data:{
                create_table:table_name,
                checkboxchecked:checkboxexchecked,
                create_value: "ye create kar"
                // fetch_output:sql_query 
            },          
            success: function(response) {
              var table_name_to_html = document.getElementById('table_name')
            var append_table = `
              <center>
                <div class="table_list_name" id="table_list_name">
                <input type="text" name="sub_class" name="check" ondragstart="drag(event)" draggable="true" id="${response}" class="items" value="${response}" disabled>
                </div>
              </center>
            `
              // $('#table_name').html(append_table);
              var newDiv = document.createElement("div");
              // newDiv.setAttribute()
              newDiv.innerHTML = append_table;
              table_name_to_html.appendChild(newDiv);


              var alertDiv = document.createElement("div");

              // set the class and content of the alert div to match Bootstrap success alert
              alertDiv.className = "alert alert-success alert-dismissible fade show";
              alertDiv.role = "alert";
              alertDiv.innerHTML = "<strong>New table added successfully!</strong> Your new table has been added to the database.";
              alertDiv.innerHTML += '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

              // get the parent element to append the alert to
              var parentElement = document.getElementById("timepass");

              // append the alert div to the parent element
              parentElement.appendChild(alertDiv);
                          
          }
        })
    }

    }
  
    }
    
  
}


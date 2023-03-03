console.log("This is console");


function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData('Text/html', ev.target.id);
  }
  
  function drop(ev,target) {
    ev.preventDefault();
    console.log(target.id, ev.target.id)

    var data_id = ev.dataTransfer.getData("Text/html");

    alert(data_id)
    var get_table_name = document.getElementById("get_table_name");
    if(data_id!=""){

        console.log("above post method")
        $.ajax({
            type:'POST',
            url:'/',
            data:{
                table_name:data_id 
            },          
            success: function(response) {         
              $('#my-content').html(response);
          }
        })
    }
   
    
    // if(data!=" "){
    //     $(document).ready(function(){
    //         $("button").click(function(){
    //           $.post("demo_test_post.asp",
    //           {
    //             name: "Donald Duck",
    //             city: "Duckburg"
    //           },
    //           function(data,status){
    //             alert("Data: " + data + "\nStatus: " + status);
    //           });
    //         });
    //       });
    
    // }
    // else{
    //     alert("Please Drag the table name correctly")
    // }
  }
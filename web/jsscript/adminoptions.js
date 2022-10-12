/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function redirectadministratorpage()
{
    swal( "Admin","Admin Redirecting to Admin Actions !","success" ).then((value)=>{
        window.location="adminactions.jsp";
    });
   
}

function redirectvotingpage()
{
    swal( "Admin"," Admin Redirecting to VotingController Page !","success" ).then((value)=>{
        window.location="VotingControllerServlet";
    });
   
}

function manageuser()
{
    swal( "Admin","Admin Redirecting to Candidate Management Page !","success" ).then((value)=>{
        window.location="manageuser.jsp";
    });
   
}

function managecandidate()
{
    swal( "Admin","Admin Redirecting to Candidate Management!","success" ).then((value)=>{
        window.location="managecandidate.jsp";
    });
   
}
 function removecandidateForm()
    {
        var contdiv=document.getElementById("#result");
        var indiv=document.getElementById("#candidateform");
        if(indiv!==null)
        {
            $("#candidateform").fadeOut("3500");
            contdiv.removeChild(indiv);
            
        }
        
        
        
    }

function showaddcandidateform()         //to show form and animation and candidateid locked and autogenerated ,uderstand line 51 well
{
   removecandidateForm();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
     newdiv.setAttribute("float","left");
      newdiv.setAttribute("padding-left","12px");
       newdiv.setAttribute("border","2px solid red");
       newdiv.innerHTML="<h3>Add New Candidate</h3>";
       newdiv.innerHTML=newdiv.innerHTML+" <form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
    <table><tr><th>Candidate Id:</th><td><input type='text' id='cid'></td></tr>\n\
        <tr><th>User Id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'></td></tr>\n\
      <tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
        <tr><th>City:</th><td><select id='city'></select></td></tr>\n\
        <tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
        <tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
        <tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
            <th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
            newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
            var addcand=$("#result")[0];
            addcand.appendChild(newdiv);
            $("#candidateform").hide();
            $("#candidateform").fadeIn(2500);
            data={id:"getid"};
            $.post("AddCandidateControllerServlet",data,function(responseText){
                $("#cid").val(responseText);
                $('#cid').prop("disabled",true);
            });
       
    
    
}

function getdetails(e)       //on striking eneter with aadhar no
{
    if(e.keyCode===13)
    {
        data={uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet",data,function(responseText){
            let details=JSON.parse(responseText);        //contains 2 things dropdown and name
            let city=details.city;
            let uname=details.username;
            if(uname==='wrong')
            {
                swal("Wrong Aadhar Number ","Aadhar number is invalid","error");
            }
            else
            {
                $("#cname").val(uname);
                $("#city").empty();            //to clear previous drop down already filed ,empty used not val or value for drop down in jquery
                $("#city").append(city);        //to create dropdown of city
                $("#cname").prop("disabled","true");
            }
        });
    }
    
}


function addcandidate()      //after add Candidate button at bottom of the form
{
    var form=$('#fileUploadForm')[0];
    var data =new FormData(form);         //now this class cpoy non binary (here image) data in its object
    alert(data);
    var cid=$('#cid').val();
    var city=$('#city').val();
    var party=$('#party').val();
     var cname = $("#cname").val();
    var uid=$('#uid').val();
   data.append("cid",cid);
   data.append("uid",uid);
   data.append("cname",cname);
   data.append("party",party);
   data.append("city",city);
    
    $.ajax({
        type:"POST",
        enctype:'multipart/form-data',
        url: "AddNewCandidateControllerServlet",          //note we had AddCand...(for filling) and AddNewCandidate...(for submitting)
        data:  data,
        processData:false,
        contentType:false,
        cache:false,
        timeout:600000,
        success:function (data){
            str=data+"....";
            swal("Admin!",str,"success").then((value)=>{
                showaddcandidateform();
            });
        },
        error:function(e){
            swal("Admin!",e,"error");
        }
        
        
        
    });
    
    }
function showcandidate()
{
removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Show Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div></div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn(3500);
data={data:"cid"}; //to get all cid
  $.post("ShowCandidateController",data,function(responseText){
      console.log("inside adminoption.js and before cidList");
       var cidlist=JSON.parse(responseText);
      $('#cid').append(cidlist.cid);  
      });


$("#cid").change(function()
{
    console.log("in ** change ** of adminoptions.js");
     var cid=$("#cid").val();
     alert("Selected id:"+cid);
     if(cid===''){
swal("No selection!","Please select an id ","error");
         return;
     }

     data={data:cid};//with selected cid
    $.post("ShowCandidateController",data,function(responseText)
    {
         console.log("responseText received for shwcandidate");
        var details=JSON.parse(responseText);
        $("#addresp").append(details.subdetails);

    });
     });
}
// Update request To servlet after clicking 'Update Candidate Button'
function updatecandidate()
{
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid = $("#cid").val();
    var cname = $("#cname").val();
    var city = $("#city").val();
    var party = $("#party").val();
    var uid = $("#uid").val();
    data.append("cid", cid);
    data.append("uid", uid);
    data.append("cname", cname);
    data.append("party", party);
    data.append("city", city);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "UpdateCandidateControllerServlet",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (responseText, textStatus, xhr)
        {
            if (responseText.trim() === "success")
            {
                swal("Success!", "Updated Successfully!", "success");
                setTimeOut(showupdatecandidateform, 3000);
            }
            else
            {
                swal("Error!", "Some went wrong try again!", "error");
            }
        },
        error: function (e) {
            swal("Admin!", e, "success");
        }
    });
}

// Show candidate Id List so can update candidate 
function showupdatecandidateform() {
    removecandidateForm();
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border", "solid 2px red");
    newdiv.innerHTML = "<h3>Update Candidate</h3>";
    newdiv.innerHTML = newdiv.innerHTML + "<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><select id='cid'></select></td></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid'></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Update Candidate' onclick='updatecandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form><br>";
    newdiv.innerHTML = newdiv.innerHTML + "<br><span id='addimg'></span>";
    var addcand = $("#result")[0];
    addcand.appendChild(newdiv);
    data = {data: "cid"};
    $.post("ShowCandidateController", data, function (responseText) {
        var cidlist = JSON.parse(responseText);
        $('#cid').append(cidlist.cids);
    });

    $("#cid").change(function ()
    {
        var cid = $("#cid").val();
        alert("Sel id:  " + cid);
        if (cid === '') {
            swal("No selection!", "Please select an id ", "error");
            return;
        }

        data = {data: cid};
        $.post("UpdateCandidateController", data, function (responseText)
        {
//            clearText();
            var details = JSON.parse(responseText);
            $("#candidateform").hide();
            $("#candidateform").fadeIn("3500");
            $("#uid").val(details.uid);
            $('#uid').prop("disabled", true)

            data = {uid: $("#uid").val()};
            $.post("AddCandidateControllerServlet", data, function (responseText) {
                var citydetails = JSON.parse(responseText);
                var city = citydetails.city;
                var uname = citydetails.username;
                if (uname === "wrong")
                    swal("Wrong Adhar!", "Adhar not found in DB", "error");
                else {
                    $('#city').empty();
                    $('#city').html(city);
                    $("#city option[value='" + details.city.trim() + "']").attr('selected', 'selected');
                    alert(details.city.trim());
                }
            });
            console.log(details.city);
            $("#cname").val(details.cname);
            $('#cname').prop("disabled", true)
            $("#city option[value='" + details.city.trim() + "']").attr('selected', 'selected');
//            alert(details.city.trim());
            $('#party').val(details.party);
            $('#addimg').html("<img src='data:image/jpg;base64," + details.symbol + "' style='width:300px;height:200px;'/>");
        });
    });



}

function electionresult()
{
    swal("Admin!", "Redirecting To Results Page!", "success").then(function (value) {
        window.location = "electionresult2.jsp";
    });
}


function deletecandidate()
{removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Delete Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div></div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn(3500);
data={data:"cid"}; //to get all cid
  $.post("ShowCandidateController",data,function(responseText){
      console.log("inside adminoption.js and before cidList");
       var cidlist=JSON.parse(responseText);
      $('#cid').append(cidlist.cid);  
      });


$("#cid").change(function()
{
    console.log("in ** change ** of adminoptions.js");
     var cid=$("#cid").val();
     alert("Selected id:"+cid);
     if(cid===''){
swal("No selection!","Please select an id ","error");
         return;
     }

     data={data:cid};//with selected cid

       
    $.post("DeleteCandidateController", data, function (responseText) {
        if (responseText === 'success')
        {
            swal("Success", "Candidate Deleted Successfully \n Candidate ID - " + $("#cid").val(), "success");
            $("#cid").removeChild($("#cid option[value='" + $("#cid").val() + "']"));

        }
        else {
            console.log(responseText);
            swal("Failed", "Couldn't delete Candidate!", "error");
        }
    });

});
}
function showdeletecandidateform() {
    removecandidateForm();
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border", "solid 2px red");
    newdiv.innerHTML = "<h3>Update Candidate</h3>";
    newdiv.innerHTML = newdiv.innerHTML + "<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><select id='cid'></select></td></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid'></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><th><input type='button' value='Delete Candidate' onclick='deletecandidate()' id='delcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form><br>";
    newdiv.innerHTML = newdiv.innerHTML + "<br><span id='addimg'></span>";
    var addcand = $("#result")[0];
    addcand.appendChild(newdiv);
    data = {data: "cid"};
    $.post("ShowCandidateControllerServlet", data, function (responseText) {
        var cidlist = JSON.parse(responseText);
        $('#cid').append(cidlist.cids);
    });

    $("#cid").change(function ()
    {
        var cid = $("#cid").val();
        alert("Sel id:  " + cid);
        if (cid === '') {
            swal("No selection!", "Please select an id ", "error");
            return;
        }

        data = {data: cid};
        $.post("DeleteCandidateControllerServlet", data, function (responseText)
        {
//            clearText();
            
        });
    });

}



function removecandidateForm()
{
    var contdiv = document.getElementById("result");
    var formdiv = document.getElementById("candidateform");
    if (formdiv !== null)
    {
        $("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);
    }
}
$(document).ready(function(){
    $("#joinChat").on("click",function()
    {
        if($("#userInput").val()!='')
        { 
          let name =$("#userInput").val();
          name=name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          $.ajax(
          {
              url:'/login',
              data:{
                  user:name
                },
              type:'POST',
              success:function()
              {
                  location.reload();
              }

          });
         
          
        }
       
        return false;
    });
    $("#inputButton").on("click",function()
    {
        if($("#inputText").val()!='')
        {
            var text=$("#inputText").val();
            text=text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            text=$("#hidden").html()+':'+text;
            var buff = "";
            var numOfLines = Math.floor(text.length/38);
            for(var i = 0; i<numOfLines+1; i++) {
                buff += text.substr(i*38, 38); if(i !== numOfLines) { buff += "\n"; }
            }
            text=buff;
            
            $.ajax(
                {
                    url:'/msg',
                    data:{
                        msg:text
                      },
                    type:'POST',
                    success:function()
                    {
                        location.reload();
                    }
      
                });
                return false;
        }
    })

   

     
})
setInterval(function () {


    $.ajax(
        {
            url:'/check',
            contentType:'application/json',
            success:function(response)
            {
              if(response.number>$("#numhidden").html())
              {
               location.reload();
              }
            }

        }
    )
   
    
  }, 5000);
  $('html').bind('keypress', function(e)
{
   if(e.keyCode == 13)
   {
      return false;
   }
});
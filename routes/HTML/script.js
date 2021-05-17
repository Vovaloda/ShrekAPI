const connect = "http://localhost:3010/search/";
    
    function getz()
    {   
      console.log("GET");
      $.ajax({
        type: "GET",
        url: connect + document.getElementById('idGET').value,
        success: function(msg){
          if(msg.data.length == 0)
          {
            document.getElementById("image1").src = "https://pbs.twimg.com/profile_banners/915263610133319680/1532365555/1500x500";
            document.getElementById("sex").style.display = "none";
            document.getElementById("race").style.display = "none";
            document.getElementById("name").style.display = "none";
            document.getElementById("name").innerHTML = "Персонаж не найден";
          }
          else
          {
          document.getElementById("image1").src = msg.data[0].image;
          document.getElementById("name").innerHTML = msg.data[0].name;
          document.getElementById("name").style.display = "inline";
          document.getElementById("sex").innerHTML = "Пол персонажа: " + msg.data[0].sex;
          document.getElementById("sex").style.display = "inline";
          document.getElementById("race").innerHTML = "Раса персонажа: " + msg.data[0].race;
          document.getElementById("race").style.display = "inline"; 
          }
        }
      });
    }
    
    function postajax()
    {
      if(document.getElementById('idPOST').imageue == "")
      {
        document.getElementById('idPOST').classList.add("is-invalid");
        return;
      }
      else
      {
        document.getElementById('idPOST').classList.remove("is-invalid");
      }
      document.getElementById('idGET').value = document.getElementById('idPOST').value;
      var id = parseInt(document.getElementById('idPOST').value);
      $.ajax({
        type: "POST",
        url: connect,
        
        data: "id="+ id +"&name=" + document.getElementById('namePOST').value + "&sex=" + document.getElementById('sexPOST').value + "&race="+ document.getElementById('racePOST').value + "&image=" + document.getElementById('imagePOST').value,
        success: function(msg){
          console.log(msg);
          if(msg == "id already exists")
          {
            document.getElementById("image1").src = "https://im0-tub-ru.yandex.net/i?id=51a6907cc7b6a0faa88f256610964858&n=13&exp=1";
            document.getElementById("sex").style.display = "none";
            document.getElementById("race").style.display = "none";
            document.getElementById("name").style.display = "inline";
            document.getElementById("name").innerHTML = "id уже существует";
          }
          else
          {
          getz();
        }
        }
      });
    }
    
    function putajax()
    {
      console.log("PUT");
      if(document.getElementById('idPUT').value == "")
      {
        document.getElementById('idPUT').classList.add("is-invalid");
        return;
      }
      else
      {
        document.getElementById('idPUT').classList.remove("is-invalid");
      }
      document.getElementById('idGET').value = document.getElementById('idPUT').value;
      var id = parseInt(document.getElementById('idPUT').value);
      $.ajax({
        type: "PUT",
        url: connect + id,
        
        data: "id="+ id +"&name=" + document.getElementById('namePUT').value + "&sex=" + document.getElementById('sexPUT').value + "&race="+ document.getElementById('racePUT').value + "&image=" + document.getElementById('imagePUT').value,
        success: function(msg){
          console.log(msg);
          if(msg == "id not founded")
          {
            document.getElementById("image1").src = "https://im0-tub-ru.yandex.net/i?id=51a6907cc7b6a0faa88f256610964858&n=13&exp=1";
            document.getElementById("sex").style.display = "none";
            document.getElementById("race").style.display = "none";
            document.getElementById("name").style.display = "inline";
            document.getElementById("name").innerHTML = "id не найден";
          }
          else
          {
          getz();
        }
        }
      });
    }
    
    function deleteajax()
    {
      $.ajax({
        type: "DELETE",
        url: connect + document.getElementById('idDELETE').value,
        success: function(msg){
          console.log(msg);
          if(msg == "id not founded")
          {
        document.getElementById("image1").src = "https://im0-tub-ru.yandex.net/i?id=51a6907cc7b6a0faa88f256610964858&n=13&exp=1";
        document.getElementById("sex").style.display = "none";
        document.getElementById("race").style.display = "none";
        document.getElementById("name").style.display = "inline";
        document.getElementById("name").innerHTML = "id не найден";
          }
           if(msg == "DELETE ok")
          {
            document.getElementById("image1").src = "https://static-sl.insales.ru/files/1/3498/1723818/original/kupi_buvar_galochka_1.png";
            document.getElementById("sex").style.display = "none";
            document.getElementById("race").style.display = "none";
            document.getElementById("name").style.display = "inline";
            document.getElementById("name").innerHTML = "Удаление прошло успешно";
          }
        }
      });
    }
    
    function GetM(M)
    {
      document.getElementById('GetP').classList.remove('active');
      document.getElementById('PostP').classList.remove('active');
      document.getElementById('PutP').classList.remove('active');
      document.getElementById('DelP').classList.remove('active');
      switch(M)
      {
        case 1:
          document.getElementById('GetP').classList.add('active');
          document.getElementById('formGet').style.display = "inline";
          document.getElementById('formPost').style.display = "none";
          document.getElementById('formPut').style.display = "none";
          document.getElementById('formDelete').style.display = "none";
          break;
        case 2:
          document.getElementById('PostP').classList.add('active');
          document.getElementById('formGet').style.display = "none";
          document.getElementById('formPost').style.display = "inline";
          document.getElementById('formPut').style.display = "none";
          document.getElementById('formDelete').style.display = "none";
          break;
        case 3:
          document.getElementById('PutP').classList.add('active');
          document.getElementById('formGet').style.display = "none";
          document.getElementById('formPost').style.display = "none";
          document.getElementById('formPut').style.display = "inline";
          document.getElementById('formDelete').style.display = "none";
          break;
        case 4:
          document.getElementById('DelP').classList.add('active');
          document.getElementById('formGet').style.display = "none";
          document.getElementById('formPost').style.display = "none";
          document.getElementById('formPut').style.display = "none";
          document.getElementById('formDelete').style.display = "inline";
          break;
        default:
          document.getElementById('GetP').classList.add('active');
          document.getElementById('formGet').style.display = "inline";
          document.getElementById('formPost').style.display = "none";
          document.getElementById('formPut').style.display = "none";
          document.getElementById('formDelete').style.display = "none";
          break;
      }
    } 
const BASE_URL_BIKE = 'https://g0497c038904c6c-dbreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/bike/bike';
    
function traerInformacion(){
    $.ajax({
        url:BASE_URL_BIKE,
        type:"GET",
        dataType:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
        }
    })
}

function pintarRespuesta(items){
    $('#consultarBici').text('Ocultar');
    $('#consultarBici').attr('onclick', 'ocultarRespuesta()');

    let myTable= 
    `<table style="border: 1px solid black">
        <thead>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Categoria</th>
            <th>Nombre</th>
        </thead>
        <tbody>`;
    
    for (let i=0; i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].model+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</tbody></table>";
    $("#listaBicis").empty();
    $("#listaBicis").append(myTable);
}

function ocultarRespuesta(){
    $('#consultarBici').text('Consultar');
    $('#consultarBici').attr('onclick', 'traerInformacion()');
    $("#listaBicis").empty();
}

function guardarInformacion(){
    let myData={
        id:$("#idBici").val(),
        brand:$("#brandBici").val(),
        model:$("#modelBici").val(),
        category_id:$("#categoryBici").val(),
        name:$("#nameBici").val()
    };

    let dataToSend=JSON.stringify(myData);
    
    $.ajax({
        url:BASE_URL_BIKE,
        type:"POST",
        data:dataToSend,
        contentType: 'application/json',
        success:function(respuesta){
            $("#idBici").val("");
            $("#brandBici").val("");
            $("#modelBici").val("");
            $("#categoryBici").val("");
            $("#nameBici").val("");
            traerInformacion();
            alert("Se ha guardado el dato");
        }
    });
}

function editarInformacion(){
    let myData={
        id:$("#idBici").val(),
        brand:$("#brandBici").val(),
        model:$("#modelBici").val(),
        category_id:$("#categoryBici").val(),
        name:$("#nameBici").val(),
    };

    let dataToSend=JSON.stringify(myData);
    
    $.ajax({
        url:BASE_URL_BIKE,
        type:"PUT",
        data:dataToSend,
        contentType:"application/json",
        success:function(respuesta){
            $("#idBici").val("");
            $("#brandBici").val("");
            $("#modelBici").val("");
            $("#categoryBici").val("");
            $("#nameBici").val("");
            traerInformacion();
            alert("Se ha actualizado un dato");
        }
    });
}

function borrarElemento(idElemento){
    let myData={
        id:idElemento
        };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:BASE_URL_BIKE,
        type:"DELETE",
        data:dataToSend,
        contentType: "application/json",
        success:function(respuesta){
            traerInformacion();
            alert("Se ha eliminado un dato");
        }
    });
}
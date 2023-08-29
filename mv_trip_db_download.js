//Script pra download da lista em 'Agendamento de Viagem'

function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 0)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "page_1.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//Retorna a 'página' de cadastros especificada
function getPage(page){
    //                                      /sigss/agendamentoViagem/listar?searchField=entiIsen.entiNome&searchString=&filters%5B0%5D=isFiltrarDataSaida%3Afalse&filters%5B1%5D=dataInicialSaida%3A18%2F08%2F2023&filters%5B2%5D=dataFinalSaida%3A18%2F08%2F2023&filters%5B3%5D=isFiltrarDataRetorno%3Afalse&filters%5B4%5D=dataInicialRetorno%3A18%2F08%2F2023&filters%5B5%5D=dataFinalRetorno%3A18%2F08%2F2023&filters%5B6%5D=cidade%3A&filters%5B7%5D=filtroMostrar%3AFiltrarTodas&_search=false&nd=1692379904169&rows=15&page=1&sidx=agviDtSaida&sord=desc
    var theUrl = window.location.origin + '/sigss/agendamentoViagem/listar?searchField=entiIsen.entiNome&searchString=&filters%5B0%5D=isFiltrarDataSaida%3Afalse&filters%5B1%5D=dataInicialSaida%3A18%2F08%2F2023&filters%5B2%5D=dataFinalSaida%3A18%2F08%2F2023&filters%5B3%5D=isFiltrarDataRetorno%3Afalse&filters%5B4%5D=dataInicialRetorno%3A18%2F08%2F2023&filters%5B5%5D=dataFinalRetorno%3A18%2F08%2F2023&filters%5B6%5D=cidade%3A&filters%5B7%5D=filtroMostrar%3AFiltrarTodas&_search=false&nd=1692379904169&rows=5000&page=' + page + '&sidx=agviDtSaida&sord=desc';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText);
    return data;
}

//Baixa todos os cadastros atualmente disponiveis na base
function getFullyDb(){
    let total = -1;
    let drop = {"page":1,"total":1,"records":0,"rows":[]};

    for(let i = 1; i <= total || total == -1; i++){
        var page = getPage(i);
        console.log('Page ' + i + '/' + total + ' downloaded...');

        if(total == -1){
            total = page['total'];
        }

        drop['rows'] = drop['rows'].concat(page['rows']);
    }

    drop['records'] = drop['rows'].length;

    export2txt(drop);
}

getFullyDb();
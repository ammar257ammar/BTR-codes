const myEngine = Comunica.newEngine();

// from wikidata
query1 = `
PREFIX wdp: <http://www.wikidata.org/prop/direct/>
PREFIX wde: <http://www.wikidata.org/entity/>
SELECT ?item
WHERE {
  ?item wdp:P2868 wde:Q11364
  }
`

//from nextprot
//Proteins associated with diseases that are associated with cardiovascular aspects (D002318) --> tried with depression (C2982), but doesn't work
query2 = `
select distinct ?entry where {
  ?entry :isoform /:medical / :term /:related / :childOf cv:D002318.
}
`

sources = [];
sources.push('https://query.wikidata.org/sparql');
//sources.push('https://api.nextprot.org/sparql');

var dataJSON = {};

async function fetchJson() {

    const results = await myEngine.query(query1, {sources: sources,});

    const data = await myEngine.resultToString(results,
      'application/sparql-results+json', results.context);

    data.data.on('data', (a) => {
        dataJSON += a
    })

    data.data.on('end', () => {
    console.log(dataJSON)
    })
}


fetchJson();
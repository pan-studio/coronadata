export const ENDPOINT = {

    ANDAMENTO_NAZIONALE: 'http://www.coronadata.it/getdata.php?data=andamentoNazionale',
    ANDAMENTO_REGIONALE: 'http://www.coronadata.it/getdata.php?data=andamentoRegionale',
    ANDAMENTO_REGIONALE_LATEST: 'http://www.coronadata.it/getdata.php?data=andamentoRegionaleLatest',
    ANDAMENTO_PROVINCIALE_LATEST: 'http://www.coronadata.it/getdata.php?data=andamentoProvincialeLatest',
    ITALY_GEOJSON: 'http://www.coronadata.it/getdata.php?data=getGeoJSON'
}

//WORLD: https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/03-19-2020.csv

export const FIELDS = {
    TOTALE_ATTUALMENTE_POSITIVI: 'totale_attualmente_positivi',
    TOTALE_OSPEDALIZZATI: 'totale_ospedalizzati',
    TERAPIA_INTENSIVA: 'terapia_intensiva',
    DECEDUTI: 'deceduti',
    DIMESSI_GUARITI: 'dimessi_guariti',
    RICOVERATI_CON_SINTOMI: 'ricoverati_con_sintomi',
    ISOLAMENTO_DOMICILIARE: 'isolamento_domiciliare',
    NUOVI_ATTUALMENTE_POSITIVI: 'nuovi_attualmente_positivi',
    TOTALE_CASI: 'totale_casi',
    TAMPONI: 'tamponi'
}
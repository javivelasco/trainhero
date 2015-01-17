var _       = require('lodash'),
    request = require('request'),
    cheerio = require('cheerio'),
    helper  = require('../helper'),
    md5     = require("blueimp-md5").md5,
    Train   = require('../models/train'),
    StationsRepository = require('../repositories/station_repository');

function TrainService () {}

_.extend(TrainService.prototype, {
  allStations: function() {
    return StationsRepository.findAll();
  },

  searchAtRenfe: function (fromId, toId, departureDate, cb) {
    from = StationsRepository.findOneById(fromId);
    to   = StationsRepository.findOneById(toId);
    if (!from || !to) return cb([]);
    params = configureSearch(from, to, departureDate);
    performRequest(params, cb);
  }
});

request = request.defaults({
  jar: true,
  headers: { 'User-Agent': 'Chrome/38.0.2125.122' }
});

var performRequest = function (params, cb) {
  var init   = "https://venta.renfe.com/vol/index.do";
  var search = "https://venta.renfe.com/vol/buscarTren.do";

  request.get({url: init}, function (error, response, html) {
    request.post({url: search, form: params}, function (error, response, html) {
      if (!error) {
        cb(parseResultsPage(html));
      } else {
        throw new Error("Error connecting with Renfe");
      }
    });
  });
};

var parseResultsPage = function (htmlPage) {
  var $ = cheerio.load(htmlPage), train;
  var trains = _.map($('.tablaTrenes > tbody > tr:not([id])'), function(val) {
    var element = $(val);
    if (element.find('th,td').eq(4).find("img[title*='Mesa']").length > 0) {
      train = {
        name:        helper.trimSpacesAndNewlines(element.find('th,td').eq(0).text()),
        departure:   helper.parseHour(helper.trimSpacesAndNewlines(element.find('th,td').eq(1).text())),
        arrival:     helper.parseHour(helper.trimSpacesAndNewlines(element.find('th,td').eq(2).text())),
        price:       helper.trimSpacesAndNewlines(element.find('th,td').eq(4).find("img[title*='Mesa']").eq(0).parent().text())
      };
      train.signature = calculateTrainSignature(train);
      return train;
    }
  });
  return _.compact(trains);
};

var calculateTrainSignature = function(train) {
  return md5(process.env.MD5SECRET + '-' + train.name + '-' + train.departure + '-' + train.arrival + '-' + train.price);
};

var configureSearch = function (from, to, departure) {
  return {
    tipoBusqueda: "autocomplete",
    desOrigen: from.name,
    desDestino: to.name,
    ninos: 0,
    currenLocation: "menuBusqueda",
    operation: "",
    grupos: false,
    tipoOperacion: "IND",
    empresas: false,
    cdgoOrigen: from.code,
    cdgoDestino: to.code,
    idiomaBusqueda: "ES",
    vengoderenfecom: "SI",
    iv: "i",
    IdOrigen: from.name,
    IdDestino: to.name,
    FechaIdaSel: departure,
    HoraIdaSel: "00:00",
    adultos_: 1,
    ninos_: 0,
    ninosMenores: 0,
    adultos: 1,
    codPromocional: ""
  };
};

// Export module
module.exports = new TrainService();
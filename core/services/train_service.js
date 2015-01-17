var _        = require('lodash'),
    request  = require('request'),
    cheerio  = require('cheerio'),
    helper   = require('../helper'),
    P        = require('bluebird'),
    md5      = require('blueimp-md5').md5,
    Train    = require('../models/train'),
    stations = require('../repositories/station_repository'),
    trains   = require('../repositories/train_repository');

function TrainService () {}

_.extend(TrainService.prototype, {
  allStations: function() {
    return stations.findAll();
  },

  searchAtRenfe: function (fromId, toId, departureDate, cb) {
    var from = stations.findOneById(fromId),
        to   = stations.findOneById(toId);

    if (!from || !to) return cb([]);
    var params = configureSearch(from, to, departureDate);
    performRequest(params, fromId, toId, departureDate, cb);
  },

  findOrCreateTrain: function(name, fromId, toId, date, departure, arrival, signature) {
    if (!isValidTrainSignature(name, fromId, toId, date, departure, arrival, signature)) {
      return P.reject({signature: "Invalid signature for train data"});
    }

    return trains.findOneByNameAndRoute({name: name, fromId: fromId, toId: toId, date: date}).then(function(result) {
      if (result) return P.resolve(result);
      var train = new Train({name: name, fromId: fromId, toId: toId, date: date, departure: departure, arrival: arrival});
      if (!train.isValid()) return P.reject(train.errors);
      return trains.put(train);
    });
  }
});

request = request.defaults({
  jar: true,
  headers: { 'User-Agent': 'Chrome/38.0.2125.122' }
});

var performRequest = function (params, fromId, toId, date, cb) {
  var init   = "https://venta.renfe.com/vol/index.do";
  var search = "https://venta.renfe.com/vol/buscarTren.do";

  request.get({url: init}, function (error, response, html) {
    request.post({url: search, form: params}, function (error, response, html) {
      if (!error) {
        cb(parseResultsPage(html, fromId, toId, date));
      } else {
        throw new Error("Error connecting with Renfe");
      }
    });
  });
};

var parseResultsPage = function (htmlPage, fromId, toId, date) {
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
      train.signature = helper.signArguments(train.name, fromId, toId, date, train.departure, train.arrival);
      return train;
    }
  });
  return _.compact(trains);
};

var isValidTrainSignature = function(name, fromId, toId, date, departure, arrival, signature) {
  var validSignature = helper.signArguments(name, fromId, toId, date, departure, arrival);
  return validSignature === signature;
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

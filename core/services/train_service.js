var _        = require('lodash'),
    cheerio  = require('cheerio'),
    P        = require('bluebird'),
    request  = require('../../config/request'),
    helper   = require('../helper'),
    Train    = require('../models/train'),
    trains   = require('../repositories/train_repository');

function TrainService () {}

_.extend(TrainService.prototype, {
  searchAtRenfe: function(from, to, departureDate) {
    var params = configureSearch(from, to, departureDate);
    return performRequest(params, from.id, to.id, departureDate);
  },

  searchAtLocal: function(from, to, departureDate) {
    var date = helper.renfeDatetimeToDate(departureDate);
    return trains.findByRouteAndDeparture(from.id, to.id, date);
  },

  findOrCreateTrain: function(name, fromId, toId, date, departure, arrival, price, signature) {
    if (!isValidTrainSignature(name, fromId, toId, date, departure, arrival, price, signature))
      return P.reject({signature: "Invalid signature for train data"});

    var departureDatetime = helper.renfeDatetimeToDate(date, departure),
        arrivalDatetime   = helper.renfeDatetimeToDate(date, arrival);

    return trains.findOneByNameRouteAndDeparture({name: name, fromId: fromId, toId: toId, departure: departureDatetime}).then(function(result) {
      if (result) return P.resolve(updateTrainPrice(result, price));
      var train = new Train({name: name, fromId: fromId, toId: toId, departure: departureDatetime, arrival: arrivalDatetime, price: price});
      if (!train.isValid()) return P.reject(train.errors);
      return trains.put(train);
    });
  }
});

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

var performRequest = function (params, fromId, toId, date, cb) {
  var init   = "https://venta.renfe.com/vol/index.do";
  var search = "https://venta.renfe.com/vol/buscarTren.do";

  return request.get({uri: init, timeout: 20000}).then(function(page) {
    return request.post({uri: search, form: params, timeout: 20000});
  }).then(function(body) {
    return P.resolve(parseResultsPage(body, fromId, toId, date));
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
      train.signature = helper.signArguments(train.name, fromId, toId, date, train.departure, train.arrival, train.price);
      return train;
    }
  });
  return _.compact(trains);
};

var isValidTrainSignature = function(name, fromId, toId, date, departure, arrival, price, signature) {
  var validSignature = helper.signArguments(name, fromId, toId, date, departure, arrival, price);
  return validSignature === signature;
};

var updateTrainPrice = function(train, price) {
  if (train.price !== price) {
    train.price = price;
    trains.put(train);
  }
  return train;
};

module.exports = new TrainService();

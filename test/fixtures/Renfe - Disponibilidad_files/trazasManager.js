if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
var c;
var addedNow = [];

if (!dwr.engine._mappedClasses["AbonoFormalizacionBean"]) {
c = function() {
this.respuesta = null;
this.telefonoPMR = null;
this.nivelPMR = null;
this.indiceTren = null;
this.fchaViaje = null;
this.dscError = null;
this.hayError = false;
this.preferenciaUbic = null;
this.sentidoMarcha = null;
this.clase = null;
this.plazaH = null;
this.nombrePMR = null;
}
c.$dwrClassName = 'AbonoFormalizacionBean';
c.$dwrClassMembers = {};
c.$dwrClassMembers.respuesta = {};
c.$dwrClassMembers.telefonoPMR = {};
c.$dwrClassMembers.nivelPMR = {};
c.$dwrClassMembers.indiceTren = {};
c.$dwrClassMembers.fchaViaje = {};
c.$dwrClassMembers.dscError = {};
c.$dwrClassMembers.hayError = {};
c.$dwrClassMembers.preferenciaUbic = {};
c.$dwrClassMembers.sentidoMarcha = {};
c.$dwrClassMembers.clase = {};
c.$dwrClassMembers.plazaH = {};
c.$dwrClassMembers.nombrePMR = {};
c.createFromMap = dwr.engine._createFromMap;
dwr.engine._setObject("AbonoFormalizacionBean", c);
dwr.engine._mappedClasses["AbonoFormalizacionBean"] = c;
addedNow["AbonoFormalizacionBean"] = true;
}
})();

(function() {
if (dwr.engine._getObject("trazasManager") == undefined) {
var p;

p = {};
p._path = '/vol/dwr';










p.grabarTraza = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'trazasManager', 'grabarTraza', arguments);
};

dwr.engine._setObject("trazasManager", p);
}
})();


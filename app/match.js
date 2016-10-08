"use strict";
var field_1 = require('./field');
exports.MatchStatus = { PRIVATE: 'private', PUBLIC: 'public', DRAFT: 'draft' };
var Match = (function () {
    function Match() {
        this.status = exports.MatchStatus.PRIVATE;
        this.players = [];
        this._field = new field_1.Field();
        this.date = new Date();
        this.admins = [];
    }
    return Match;
}());
exports.Match = Match;
//# sourceMappingURL=match.js.map
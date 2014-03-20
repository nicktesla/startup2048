var valueToStartup = {
  2 : {
    startupName: "Liquid Labs",
    valuation: "10M"
  },

  4: {
    startupName: "SpoonRocket",
    valuation: "20M"
  },

  8: {
    startupName: "HomeJoy",
    valuation: "80M"
  },

  16: {
    startupName: "Foursquare",
    valuation: "160M"
  },

  32: {
    startupName: "Weebly",
    valuation: "320M"
  },

  64: {
    startupName: "Cloudera",
    valuation: "640M"
  },

  128: {
    startupName: "Stripe",
    valuation: "1.28B"
  },

  256: {
    startupName: "Square",
    valuation: "2.56B"
  },

  512: {
    startupName: "AirBnB",
    valuation: "5.12B"
  },

  1024: {
    startupName: "DropBox",
    valuation: "10.24B"
  },

  2048: {
    startupName: "WhatsApp",
    valuation: "20.48B"
  }
}

function Tile(position, value, startupName, valuation) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;
  this.startupName      = valueToStartup[value].startupName
  this.valuation        = valueToStartup[value].valuation

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

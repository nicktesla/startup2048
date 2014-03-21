var valueToStartup = {
  2 : {
    startupName: "Myspace",
    valuation: "10M",
    imageURL: "/media/appicons/Myspace.png"
  },

  4: {
    startupName: "Bebo",
    valuation: "20M",
    imageURL: "/media/appicons/Bebo.png"
  },

  8: {
    startupName: "Path",
    valuation: "80M",
    imageURL: "/media/appicons/Path.png"
  },

  16: {
    startupName: "Quora",
    valuation: "160M",
    imageURL: "/media/appicons/Quora.png"
  },

  32: {
    startupName: "Reddit",
    valuation: "320M",
    imageURL: "/media/appicons/Reddit.png"
  },

  64: {
    startupName: "Pinterest",
    valuation: "640M",
    imageURL: "/media/appicons/Pinterest.png"
  },

  128: {
    startupName: "Github",
    valuation: "1.28B",
    imageURL: "/media/appicons/Github.png"
  },

  256: {
    startupName: "Instagram",
    valuation: "2.56B",
    imageURL: "/media/appicons/Instagram.png"
  },

  512: {
    startupName: "LinkedIn",
    valuation: "5.12B",
    imageURL: "/media/appicons/Linkedin.png"
  },

  1024: {
    startupName: "Twitter",
    valuation: "10.24B",
    imageURL: "/media/appicons/Twitter.png"
  },

  2048: {
    startupName: "Whatsapp",
    valuation: "20.48B",
    imageURL: "/media/appicons/Whatsapp.png"
  }
}

function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;
  this.startupName      = valueToStartup[value].startupName
  this.valuation        = valueToStartup[value].valuation
  this.imageURL         = valueToStartup[value].imageURL

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

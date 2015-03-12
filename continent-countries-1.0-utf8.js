/**
 * Original writed by DGmike
 * Forked to implement new usability by Patrick Müller github.com/mpatrick
 * Hosted on CODELAND's github page gituhub.com/codelandev/continent-country
 */


/* Dom Ready */
window.onDomReady = function dgDomReady(fn) {
  if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', fn, false);
  else
    document.onreadystatechange = function() {
      dgReadyState(fn);
    };
};

function dgReadyState(fn) {
  if (document.readyState == 'interactive') fn();
}

/* Object */
var dgContinentsCountries = function(data) {
  var defaultData = {
    continent: false,
    continentVal: '',
    country: false,
    countryVal: '',
    change: false
  };

  for (name in defaultData) {
    if (!data[name]) {
      data[name] = defaultData[name];
    }
  }

  var keys = ['continent', 'country'];
  if (data.change) {
    var nome, length = keys.length;
    for (var a = 0; a < length; a++) {
      nome = keys[a];
      if (data[nome].tagName) {
        var opt = document.createElement('select');
        opt.disabled = null;
        for (var i = 0; i < data[nome].attributes.length; i++) {
          var attr = data[nome].attributes[i];
          if (attr.name != 'type') {
            opt.setAttribute(attr.name, attr.value);
          }
        }
        opt.size = 1;
        opt.disabled = false;
        data[nome].parentNode.replaceChild(opt, data[nome]);
        data[nome] = opt;
      }
    }
  }
  this.set(data.continent, data.country);
  this.start();

  var nome, length = keys.length;
  for (var i = 0; i < length; i++) {
    nome = keys[i];

    if (this[nome].getAttribute('value')) {
      data[nome + 'Val'] = this[nome].getAttribute('value');
    }

    if (data[nome + 'Val']) {
      var options = this[nome].options;
      if (nome == 'continent') this.continent.onchange();
      for (var j = 0; j < options.length; j++) {
        if (options[j].tagName == 'OPTION') {
          if (options[j].value == data[nome + 'Val']) {
            options[j].setAttribute('selected', true);
            if (nome == 'continent') {
              this.continent.selectedIndex = j;
              this.continent.onchange();
            }
          }
        }
      }
    }

  }

};

dgContinentsCountries.prototype = {
  continent: document.createElement('select'),
  country: document.createElement('select'),
  set: function(continent, country) {
    this.continent = continent;
    this.continent.dgContinentsCountries = this;
    this.country = country;
    this.continent.onchange = function() {
      this.dgContinentsCountries.run();
    };
  },
  start: function() {
    var continent = this.continent;
    while (continent.childNodes.length) continent.removeChild(continent.firstChild);
    for (var i = 0; i < this.continents.length; i++) this.addOption(continent, this.continents[i][0], this.continents[i][1]);
    this.addOption(country, '', 'Select a country');
  },
  run: function() {
    var sel = this.continent.selectedIndex;
    var itens = this.countries[sel];
    var itens_total = itens.length;

    var opts = this.country;
    while (opts.childNodes.length) opts.removeChild(opts.firstChild);

    for (var i = 0; i < itens_total; i++) this.addOption(opts, itens[i], itens[i]);
  },
  addOption: function(elm, val, text) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(text));
    opt.value = val;
    elm.appendChild(opt);
  },
  continents: [
    ['', 'Select a continent'],
    ['Africa', 'Africa'],
    ['Antarctica', 'Antarctica'],
    ['Asia', 'Asia'],
    ['Oceania', 'Oceania'],
    ['Europe', 'Europe'],
    ['North America', 'North America'],
    ['South America', 'South America']
  ],
  countries: [
    /* Prompt */
    [''],
    /* Africa */
    ['Algeria', 'Angolia', 'Benin', 'Botswana', 'Burkina', 'Burundi', 'Cameroon', 'Central African Republic', 'Chad', 'Chana', 'Comoros Island', 'Congo', 'Congo (Zaire)', 'Cote D\'Ivoire', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Guinea', 'Guinea Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tomi and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'Republic of South Africa', 'Sudan', 'Swaziland', 'Tanzania', 'Tunisia', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe'],

    /* Antarctica */
    ['Mainland Antarctica', 'United Kingdom (Islands only)'],

    /* Asia */
    ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'Iran', 'Iraq', 'India', 'Indonesia', 'Israel and Gaza', 'Japan', 'Jordan', 'Kazakstan', 'Kuwait', 'Kyrgzstan', 'Laos', 'Lebanon', 'Malaysia', 'Mongolia', 'Myanmar (Burma)', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palau', 'Phillipines', 'Quatar', 'Russian Federation', 'Saudi Arabia', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikstan', 'Thailand', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'],

    /* Oceania */
    ['Australia', 'Fiji', 'France (Islands only)', 'Kiribati', 'Marshall Islands', 'Micronesia, F.S.O', 'Nauru', 'New Zealand', 'Papua New Guinea', 'Solomon Islands', 'Tonga', 'Tuvalu', 'United Kingdom (Islands only)', 'Vanuatu', 'Western Samoa'],

    /* Europe */
    ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia-Herzegovina', 'Bulgaria', 'Cape Verde', 'Croatia', 'Czech Republic', 'Denmark and Greenland', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Republic of Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Yugoslavia'],

    /* North America */
    ['Barbados', 'Bahamas', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'France (Islands only)', 'Greenland (Denmark)', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Netherlands (Islands only)', 'Pacific Islands Inc. Hawaii', 'Panama', 'St Kitts-Nevis', 'St Lucia', 'St Vincent and the Grenadines', 'Trinidad and Tobago', 'United Kingdom (Islands only)', 'United States Of America'],

    /* South America */
    ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'French Guiana', 'Guyana', 'Nicaragua', 'Paraguay', 'Peru', 'Suriname', 'United Kingdom (Islands only)', 'Uruguay', 'Venezuela']
  ]
};

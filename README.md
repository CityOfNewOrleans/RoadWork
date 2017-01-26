# RoadWork App

An easy-to-use web app to show the status of road and utility repairs in the City of New Orleans.

![Web App Screenshot](/screenshot.jpg)

You can try out a [live version of the app](http://gis.nola.gov/apps/orange/), or visit the [RoadWork site](http://roadwork.nola.gov/) to see the app in context.

## Requirements

* ArcGIS Enterprise 10.4 (formerly Server)
* ArcGIS Desktop 10.4

## Installation

### GIS Data

You'll need at least two ArcGIS Enterprise services for the app:

* A GeocodeServer, configured as US Dual Range Addresses, with side offset of 0 feet, end offset of 50%, and with suggestions enabled.
* A MapServer with the data you to show in the app, using the service publishing defaults.  An example MXD and data are in the /gis folder.

### Web Application

The web application can be published on any web server, with no special tools required.

You will need to configure the web app to consume your data and use your geolocator.  See the "Configuring the Web App" section for details.

## Configuring the Web App

Edit the /index.html file to reflect the names, images, *etc.* you'd like to use, and be sure to edit the modals to reflect information and links you'd like to show.

To configure the app to point to your data, you'll need to edit the /js/roadwork.js file.  There are four sections to edit, all located at the top of the file.

### Map and General Application Settings

```javascript
var settings = {'layers': [{'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/1',
                            'type': 'dynamic',
                            'layerName': 'Pavement Condition',
                            'layerControl': true,
                            'identify': true,
                            'visible': false,
                            'legendtitle': '<a href="#" data-toggle="modal" data-target="#condition-modal">{{NAME}}</a>'},

                            ...

                            ],
                'basemap': 'http://gis.nola.gov/arcgis/rest/services/Basemaps/BasemapNOLA3/MapServer',
                'idURL': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer',
                'mapDiv': '#map',
                'panelDiv': '#infopanel',
                'panelClose': '#info-close',
                'layerControl': '#layer-control',
                'searchBox': '#searchbox',
                'controlDiv': '#mapcontrols',
                'controlCollapse': '#mapctrl-toggle',
                'controlIcon': '#mapctrl-close',
                'controlText': '#mapctrl-text',
                'legendDiv': '#legend',
                'searchPanel': '#search-panel',
                'streetlayer': 'Streets',
                'conditionlayer': 'Pavement Condition',
                'layermap': {'#info-location': 'Streets',
                             '#info-project': 'DPW Projects',
                             '#info-condition': 'Pavement Condition',
                             '#info-surface': 'DPW Projects',
                             '#info-subsurface': 'S&WB Projects',
                             '#info-permits': 'Street Closure Permits'}};
```

The `settings` object contains most of the configuration options for the app.  Only some of them need to be changed to configure the app.

* `layers` is a list of objects for configuring the map layers you want to show.  The properties of the object are:
  * `url`: the URL to the map layer you want to add to the map.
  * `type`: for now, all layers must be dynamic.
  * `layerName`: the name of the layer in the MXD, as you published it in the map service.
  * `layerControl`: `true` if you'd like to be able to turn the layer on or off, `false` otherwise.
  * `identify`: `true` if you want the app to display data from this layer, `false` otherwise.
  * `visible`: `true` if you want the layer shown on the map, `false` otherwise.  If this is `false`, and `layerControl` is `true`, the layer will not be shown on the map or in the layer control.
  * `legendtitle`: if `null`, the value of `layerName` will be used.  If you specify anything else, that will be used instead, even html.  In the example above, clicking the legend title above will open a modal window explaining what the different condition types are.  The `{{NAME}}` entry is a special tag indicating that the value of `legendtitle` should be inserted.
* `basemap` is the URL to the map service you'd like to use as a base map.
* `idURL` is the URL to the map service that will deliver the data for display in the info panel.  This can be the same map you're using for display in the map, or it can be an entirely different map service.
* `streetlayer` is the layer name of the centerline layer in the MXD as published.
* `conditionlayer` is layer name of the pavement condition layer in the MXD as published.
* `layermap` is an object connecting map layers to display areas in the info panel.  It tells the code where to put data once it has retrieved it from the map service.

You shouldn't need to edit the `mapDiv`, `panelDiv`, `panelClose`, `layerControl`, `searchBox`, `controlDiv`, `controlCollapse`, `controlIcon`, `controlText`, `legendDiv`, or `searchPanel` settings unless you're doing some pretty substantial editing of the app.

### Data Display Templates

When configuring the general application settings, the `layermap` object defines in which part of the info panel the data is displayed.  The `templates` object defines *how* the data are displayed.

```javascript
var templates = {'#info-location': {'template': '<h3>{{JIDADD}}&nbsp;block of {{JIDSTREET}}<br/><small>From {{JIDFR}} to {{JIDTO}} in {{NHOOD}}, {{COUNCILDST}}</small></h3>',
                                    'datefields': [],
                                    'blankdiv': null,
                                    'hidediv': null},
                 '#info-project': {'template': '<h4>Project</h4><div class="indent">{{Project_Name}}</div><h4>Schedule</h4><div class="indent">Start: {{StartQtr}}</div><div class="indent">End: {{EndQtr}}</div>',
                                   'datefields': [],
                                   'blankdiv': '#noproject',
                                   'hidediv': null},
                 '#info-condition': {'template': '<h4>Pavement Condition</h4><p class="indent"><a href="#" data-toggle="modal" data-target="#condition-modal">{{PCILABEL}}</a></p>',
                                     'datefields': [],
                                     'blankdiv': '#nocond',
                                     'hidediv': null},
                 '#info-surface': {'template': '<dl class="dl-horizontal"><dt>Project ID</dt><dd><a href="http://roadwork.nola.gov/roadwork/media/Documents/Maps/ByNeighborhood/{{PROJID}}.pdf" target="_blank">{{PROJID}}</a></dd><dt>Repair Type</dt><dd><a href="#" data-toggle="modal" data-target="#repairtype-modal">{{CONSTTYPE}}</a></dd><dt>Status</dt><dd>{{Current_Phase}}</dd></dl>',
                                   'datefields': [],
                                   'blankdiv': '#nosurface',
                                   'hidediv': null},
                 '#info-subsurface': {'template': '<dl class="dl-horizontal"><dt>Work Type</dt><dd>{{SSTYPE}}</dd><dt>Status</dt><dd>{{SSSTAT}}</dd></dl>',
                                      'datefields': [],
                                      'blankdiv': '#nosubsurface',
                                      'hidediv': null},
                 '#info-permits': {'template': '<dl class="dl-horizontal"><dt>Permit Type</dt><dd>{{Type}}</dd><dt>Permit Number</dt><dd>{{NumString}}</dd><dt>Closure Dates</dt><dd>{{StartDate}} - {{EndDate}}</dd><dt>Sidewalk Closure</dt><dd>{{SidewalkClose}}</dd><dt>Street Closure</dt><dd>{{StreetClose}}</dd></dl>',
                                   'datefields': [],
                                   'blankdiv': null,
                                   'hidediv': '#row-permits'}};
```

For each id defined in `layermap`, you need to define an entry in `templates`, consisting of an object with the following properties:

* `template`: a string of valid html.  Within the html, you can substitute values from the map by using the field names enclosed in double-braces (*e.g.*, `{{Project_Name}}`).  The simplest (useful) template possible is a single field name enclosed in double-braces.
* `datefields`: a list of field names containing date values that are to be converted to quarters (*e.g.*, 3/17/2017 becomes Q1 2017).
* `blankdiv`: the id of a div in the info panel that should be displayed if all the fields referenced in the template are blank.  Useful for showing placeholder text.
* `hidediv`: the id of a div in the info panel that should be hidden if all the fields referenced in the template are blank.  Useful for hiding whole sections of the info panel if there's nothing to show.

### Geolocator Settings

To specify a geolocator to use, you'll need to edit the `searchsettings` object.

```javascript
var searchsettings = {'geolocURL': 'http://gis.nola.gov/arcgis/rest/services/Locators/RoadWork_Centerline/GeocodeServer',
                      'searchBox': '#searchbox',
                      'searchBtn': '#searchbtn'};
```

* `geolocURL`: the URL to the GeocodeServer to use.
* `searchBox`: the id of the input box where users type their address search.  You shouldn't need to edit this.
* `searchBtn`: the id of the button used to execute an address search.  You shouldn't need to edit this.

### Default URL for Deeplinking

The app enables users to share a link directly to a particular block.  In some cases, you'll need or want to specify how the link URL is built, and you can configure that in the `defaultlocation` object.

```javascript
var defaultlocation = {'protocol': 'http:', 
                       'host': 'roadwork.nola.gov', 
                       'pathname': ''};
```

* `protocol`: the transport protocol to use.  Can be 'http:' or 'https:' (the trailing colon is important).
* `host`: the name of the web application host.
* `pathname`: if the application is hosted in a subfolder on your server.

As an example, if you were hosting the app at "https://example.com/roadwork/app/":

* `protocol` is 'https:'
* `host` is 'example.com'
* `pathname` is '/roadwork/app/'

## Issues

Submit an issue to let us know if you've found a bug or to request a new feature.

## Licensing

Copyright 2016-2017 City of New Orleans

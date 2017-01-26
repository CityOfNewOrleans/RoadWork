/***                                                                        ***/
/***                             RoadWork 2.0                               ***/
/***                                                                        ***/

/******************************************************************************/
/***                          Start Configuration                           ***/
/******************************************************************************/
/* Configuration for layers, etc. */
var settings = {'layers': [{'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/1',
                            'type': 'dynamic',
                            'layerName': 'Pavement Condition',
                            'layerControl': true,
                            'identify': true,
                            'visible': false,
                            'legendtitle': '<a href="#" data-toggle="modal" data-target="#condition-modal">{{NAME}}</a>'},
                            {'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/6',
                            'type': 'dynamic',
                            'layerName': 'Planned Road Construction',
                            'layerControl': true,
                            'identify': false,
                            'visible': false,
                            'legendtitle': '<a href="#" data-toggle="modal" data-target="#repairtype-modal">{{NAME}}</a>'},
                            {'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/0',
                            'type': 'dynamic',
                            'layerName': 'Street Closure Permits',
                            'layerControl': false,
                            'identify': true,
                            'visible': false,
                            'legendtitle': null},
                            {'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/5',
                            'type': 'dynamic',
                            'layerName': 'Roads Under Construction Now',
                            'layerControl': true,
                            'identify': false,
                            'visible': true,
                            'legendtitle': null},
                            {'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/2',
                            'type': 'dynamic',
                            'layerName': 'DPW Projects',
                            'layerControl': false,
                            'identify': true,
                            'visible': false,
                            'legendtitle': null},
                            {'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/3',
                            'type': 'dynamic',
                            'layerName': 'S&WB Projects',
                            'layerControl': false,
                            'identify': true,
                            'visible': false,
                            'legendtitle': null},
                            {'url': 'http://gis.nola.gov/arcgis/rest/services/apps/road_work/MapServer/4',
                            'type': 'dynamic',
                            'layerName': 'Streets',
                            'layerControl': false,
                            'identify': true,
                            'visible': false,
                            'legendtitle': null}],
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

/* Template Display Config */
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

var searchsettings = {'geolocURL': 'http://gis.nola.gov/arcgis/rest/services/Locators/RoadWork_Centerline/GeocodeServer',
                      'searchBox': '#searchbox',
                      'searchBtn': '#searchbtn'};

/* Deeplink Default Config */
var defaultlocation = {'protocol': 'http:', 'host': 'roadwork.nola.gov', 'pathname': ''};


/******************************************************************************/
/***                              App Startup                               ***/
/******************************************************************************/
var rdwk;
var searcher;
var clipboard;

function is_mobile()
{
    return $('#mobile-indicator').is(':visible');
}

function class_watch(elem, watchclass, callback, param)
{
    //Watch an element for the addition of a class, and when found, fire the
    // callback with the given param.
    var timerid = window.setInterval(function(){
        if (elem.hasClass(watchclass))
        {
            window.clearInterval(timerid);
            callback(param);
        }
    }, 20);
}


function init(urlparams)
{
    //Instantiate our objects.
    // rdwk is the primary app controller.
    rdwk = new RoadWork(settings, templates);
    // searcher handles address searches and suggestions.
    searcher = new Locator(searchsettings);
    rdwk.init(searcher.clear);
    searcher.init(rdwk.search_identify);
    
    //Setup the clipboard.
    clipboard = new Clipboard('#copybutton', {'text': function(){return rdwk.create_deeplink(defaultlocation);}});
    clipboard.on('success', function(e){
        var popper = $('#copybutton').popover({'content': 'The link has been copied','placement': 'right'});
        popper.popover('show');
        window.setTimeout(function(){popper.popover('destroy');}, 4000);
    });
    clipboard.on('error', function(e){
        var popper = $('#copybutton').popover({'content': 'The link is shown below','placement': 'right'});
        $('#copyhidden').collapse('show');
        $('#copytext').focus();
        $('#copytext').val(rdwk.create_deeplink(defaultlocation));
        $('#copytext').selectionStart = 0
        $('#copytext').selectionEnd = $('#copytext').val().length+1;
        popper.popover('show');
        window.setTimeout(function(){popper.popover('destroy');}, 4000);
    });

    //Watch for when the map is ready to work, then run the deeplink handler.
    class_watch($('#map'), rdwk.mapReady, rdwk.handle_deeplink, urlparams);
    if (!is_mobile())
        $(searchsettings['searchBox']).focus();
}

/******************************************************************************/
/***                    RoadWork Object Definition                          ***/
/******************************************************************************/
function RoadWork(config, templates)
{
    /*** Property and Class Init **********************************************/
    var self = this;
    self.map = {};
    self.layers = config['layers'];
    self.basemap = config['basemap'];
    self.idURL = config['idURL'];
    self.infopanel = $(config['panelDiv']);
    self.infoclose = $(config['panelClose']);
    self.layerControl = config['layerControl'];
    self.ctrlDiv = $(config['controlDiv']);
    self.ctrlCollapse = $(config['controlCollapse']);
    self.controlIcon = $(config['controlIcon']);
    self.controlText = $(config['controlText']);
    self.searchPanel = $(config['searchPanel']);
    self.legendDiv = $(config['legendDiv']);
    self.mapDiv = config['mapDiv'];
    self.layermap = config['layermap'];
    self.streetlayer = config['streetlayer'];
    self.conditionlayer = config['conditionlayer'];
    self.templates = templates;

    //This is here only for use with error messages.
    self.searchBox = $(config['searchBox']);

    self.lastKey = -1;
    self.idLayers = [];
    self.ctrlLayers = [];
    self.legendData = {};
    self.lastPoint = null;
    self.lastType = null;
    self.resizeTimeout;
    
    //Class to add to the map once all the layers have been added, and we're 
    // essentially ready to do any of the work.
    self.mapReady = 'mapready';
    
    self.searchClear;

    //Init templating
    self.infodisp = new InfoDisplay(templates)
    self.infodisp.init();

    self.init = function(searchClear)
    {
        //The app needs to know how to clear the search box; searchClear is a
        // function to do that.  It could be a stand-alone function, but we're
        // using the Locator.clear method to do it.

        //Info panel trickery.
        self.infoclose.on('click', self.hide_panel);
        self.set_panel_height();
        self.smallSwitch();
        self.fixHeaderHeight();

        //Handle typing and button clicking.
        //The method necessary to clear the searchbox.  Provided by a Locator instance.
        self.searchClear = searchClear;
        self.ctrlCollapse.on('click', self.toggleControls);
        self.searchPanel.on('click', self.clickWatch);
        $(window).on('resize', function(evt){self.smallSwitch();self.fixHeaderHeight();});

        //Initialize the map.
        self.create_map();
        
        //When all ajax calls are done, we know we can proceed with legend creation.
        $(document).ajaxStop(function(){$(this).unbind('ajaxStop');self.build_legend();});
    };

    /*** Map Creation, Load, and Interaction Methods **************************/
    self.create_map = function()
    {
        var zoom = 11;
        var center = [-90.00, 30.00];
        if (is_mobile())
        {
            //Shift the center a bit 
            center = [-90.05, 30.00]
        }
        if ($(window).width() > 1400)
        {
            //Zoom in a bit for larger screens.
            zoom = 12;
        }

        require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "dojo/domReady!"], function(Map, ArcGISTiledMapServiceLayer) {
            var opts = {'center': center, 
                        'sliderPosition': 'top-right', 
                        'zoom': zoom, 
                        'showInfoWindowOnClick': false, 
                        'force3DTransforms': true,
                        'logo': false, 
                        'attributionWidth': 0};
            //'basemap': "gray-vector",
            self.map = new Map(self.mapDiv.slice(1), opts);
            var bmapOpts = {'showAttribution': false};
            var basemap = new ArcGISTiledMapServiceLayer(self.basemap, bmapOpts);
            self.map.addLayer(basemap);
            self.add_layers();
            self.map.on('click', self.click_identify);
            self.map.on('load', self.fixHeaderHeight);
        });
    };

    self.clickWatch = function(evt)
    {
        infoId = '#' + self.infopanel.attr('id')
        if ($(evt.target).closest(infoId).length == 0) 
        {
            if (self.infopanel.hasClass('collapse in')) 
            {
                self.infopanel.collapse('hide');
                self.searchClear();
            }
        }
        if (!is_mobile())
        {
            self.showControls();
        }
    };

    self.smallSwitch = function()
    {
        if(is_mobile())
        {
            self.hideControls();
            $('body').removeClass('sm').addClass('xs');
        }
        else
        {
            $('body').removeClass('xs').addClass('sm');
        }
    }

    self.fixHeaderHeight = function()
    {
        var srchHeight = self.searchPanel.height();
        $('body').css('padding-top', srchHeight);
        self.ctrlDiv.css('top', srchHeight + 25);
    }


    /*** Panel and Map Controls Methods ***************************************/
    self.toggleControls = function()
    {
        if (!self.infopanel.is(':visible'))
        {
            if(self.ctrlDiv.hasClass("slide-show"))
            {
                self.hideControls();
            }
            else
            {
                self.showControls();
            }
        }
    };
    
    self.showControls = function()
    {
        self.ctrlDiv.removeClass("slide-hide").addClass("slide-show");
        self.controlIcon.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left");
        self.controlText.text("Hide legend");
    };

    self.hideControls = function()
    {
        self.ctrlDiv.removeClass("slide-show").addClass("slide-hide");
        self.controlIcon.removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right");
        self.controlText.text("Show legend");        
    }

    self.hide_panel = function(evt)
    {
        self.set_panel_height();
        if (!is_mobile())
            self.showControls();
        self.infopanel.collapse('hide');
    }

    self.show_panel = function(evt)
    {
        self.set_panel_height();
        self.hideControls();
        self.infopanel.collapse('show');    
    };

    self.set_panel_height = function()
    {
        // Fix these to refer to config objects.
        var panelbody = self.infopanel.find('.panel-body');
        var paneltop = 1;
        var bodyheight = $('body').height();
        var panelheight = bodyheight - paneltop - 15;
        self.infopanel.css('top', self.searchPanel.height() );
        panelbody.css('height', panelheight);
        //window.addEventListener('resize', self.handle_resizes, false);
    }

    self.handle_resizes = function()
    {
        if (!self.resizeTimeout)
        {
            self.resizeTimeout = setTimeout(function() {
                self.resizeTimeout = null;
                self.set_panel_height();

            }, 120);
        }
    };

    self.add_layers = function()
    {
        require(["esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ImageParameters"], function(ArcGISDynamicMapServiceLayer, ImageParameters) {
            for (var i=0; i < self.layers.length; i++)
            {
                var layerIndex = self.layers[i]['url'].slice(self.layers[i]['url'].lastIndexOf('/')+1);
                var layerURL = self.layers[i]['url'].slice(0, self.layers[i]['url'].lastIndexOf('/'));
                var params = new ImageParameters();
                params.format = 'png32';
                params.layerIds = [layerIndex];
                params.layerOption = ImageParameters.LAYER_OPTION_SHOW;

                var opts = {'visible': self.layers[i]['visible'],
                            'imageParameters': params};

                if (self.layers[i]['type'] == 'dynamic')
                {
                    var layer = new ArcGISDynamicMapServiceLayer(layerURL, opts);
                }
                self.map.addLayer(layer);
                if (self.layers[i]['identify'])
                {
                    self.idLayers.push(parseInt(layerIndex));
                }
                if (self.layers[i]['layerControl'])
                {
                    self.ctrlLayers.push(i);
                }
                if (self.layers[i]['visible'] || self.layers[i]['layerControl'])
                {
                    //This can / will be shown on the map, so we need to get the
                    // legend data from the server.
                    self.legendData[i] = {'name': self.layers[i]['layerName'],
                                          'visible': self.layers[i]['visible'],
                                          'swatches': null};
                    (function(pos, idx, url)
                    {
                        $.getJSON(url, {}, function(data){self.get_legend_data.call(window, data, idx, pos);});
                    })(i, layerIndex, layerURL+'/legend?f=json');
                }
                else
                {
                    self.legendData[i] = null;
                }
            }
        });
        self.build_layer_control(self.layerControl);
    };

    self.get_legend_data = function(data, layerIndex, layerPos)
    {
        var legendData = null;
        for (var j=0; j<data['layers'].length; j++)
        {
            if (data['layers'][j]['layerId'] == layerIndex)
            {
                legendData = data['layers'][j]['legend'];
                break;
            }
        }
        var swatches = [];
        if (legendData)
        {
            for (var i=0; i<legendData.length; i++)
            {
                var swatch = {'label': legendData[i]['label'], 
                              'icon': 'url(data:'+legendData[i]['contentType']+';base64,'+legendData[i]['imageData']+')'};
                swatches.push(swatch);
            }
        }
        if (self.legendData[layerPos])
        {
            self.legendData[layerPos]['swatches'] = swatches;
        }
    };

    self.build_layer_control = function(div)
    {
        for (var i=0; i<self.ctrlLayers.length; i++)
        {
            var lyrnum = self.ctrlLayers[i];
            var data = lyrnum + 1; //Again, we always have a basemap at position 0.
            var btnattrs = {'type': 'button', 'class': 'btn btn-default', 
                            'data-toggle': 'button', 'aria-pressed': 'false', 
                            'autocomplete': 'off', 'data-value': data};

            var btn = $('<button></button>', btnattrs);
            if (self.layers[lyrnum]['layerControl'] && self.layers[lyrnum]['visible'])
            {
                btn.attr('aria-pressed', true);
                btn.addClass('active');
            }
            else
            {
                btn.attr('aria-pressed', false);
                btn.removeClass('active');
            }
            btn.on('click', self.toggle_layer);
            $(div).append(btn).append($('<br>'));
            btn.html(self.layers[lyrnum]['layerName']);
        }
    };

    self.build_legend = function()
    {
        var outlist = $('<ul></ul>', {'class': 'layer-legend'});
        for (var i=0; i<self.layers.length; i++)
        {
            if (self.legendData[i])
            {
                if (self.layers[i]['legendtitle'] && self.layers[i]['legendtitle'] != '')
                {
                    if (self.layers[i]['legendtitle'].indexOf('{{NAME}}') >= 0)  //IE doesn't support .includes()
                    {
                        var lyrHeader = self.layers[i]['legendtitle'].replace('{{NAME}}', self.legendData[i]['name']);
                    }
                    else
                    {
                        var lyrHeader = self.legendData[i]['name'];
                    }
                }
                else
                {
                    var lyrHeader = self.legendData[i]['name'];
                }
                var lyr = $('<li></li>', {'data-value': i+1, 'class': 'heading'}).append(lyrHeader);
                if (!self.legendData[i]['visible'])
                {
                    lyr.css('display', 'none');
                }
                var sublist = $('<ul></ul>')
                for (var j=0; j<self.legendData[i]['swatches'].length; j++)
                {
                    var attrs = {'style': 'list-style-image:'+self.legendData[i]['swatches'][j]['icon']};
                    var swatch = $('<li></li>', attrs).append(self.legendData[i]['swatches'][j]['label']);
                    sublist.append(swatch);
                }
                lyr.append(sublist);
                outlist.append(lyr);
                if (!self.legendData[i]['visible'])
                {
                    var val = i + 1;
                    $('li[data-value='+val+']').hide();
                }
            }
        }
        self.legendDiv.append(outlist);
        self.hide_legend() //Just in case no layers are visible.
        //Tell the world we're ready to go.
        $(self.mapDiv).addClass(self.mapReady);
    };

    self.toggle_layer = function(evt) //Turn off all other layers when this one is on
    {
        var target = $(evt.currentTarget);
        var val = target.data('value');
        var lyr = self.map.getLayer(self.map.layerIds[val]);
        if (lyr.visible)
        {
            lyr.hide();
            $('li[data-value='+val+']').hide('slow', self.hide_legend);
        }
        else
        {
            lyr.show();
            $('#legend').show();
            $('li[data-value='+val+']').show('slow');
            var buttons = $(self.layerControl + " button:not([data-value='"+val+"'])");
            for (var i=0; i<buttons.length; i++)
            {
                var btn = $(buttons[i]);
                var hidelyr = self.map.getLayer(self.map.layerIds[btn.data('value')]);
                hidelyr.hide();
                btn.attr('aria-pressed', false);
                btn.removeClass('active');
                $('li[data-value='+btn.data('value')+']').hide('slow', self.hide_legend);
            }
        }
    };

    self.toggle_layer_independent = function(evt) //Independently toggle layers
    {
        var target = $(evt.currentTarget);
        var val = target.data('value');
        var lyr = self.map.getLayer(self.map.layerIds[val]);
        if (lyr.visible)
        {
            lyr.hide();
            $('li[data-value='+val+']').hide('slow', self.hide_legend);
        }
        else
        {
            lyr.show();
            $('#legend').show();
            $('li[data-value='+val+']').show('slow');
        }
    };

    self.hide_legend = function()
    {
        if ($('ul.layer-legend>li:visible').length == 0)
        {
            $('#legend').hide();
        }
    }

    /*** Identify Methods *****************************************************/
    self.click_identify = function(evt)
    {
        if (!self.infopanel.is(':visible'))
        {
            //We only want to enable ID click if the infopanel is hidden.
            self.lastType = 'click'
            if (self.map.getZoom() < 16)
                var tol = 30;
            else
                var tol = 15;
            //Clear out the search box to avoid confusion.
            self.searchClear();
            self.run_identify(evt.mapPoint, tol);
        }
    };

    self.search_identify = function(x, y)
    {
        self.lastType = 'search'
        var zoompoint;
        require(["esri/geometry/Point", "esri/SpatialReference"], function(Point, SpatialReference) {
            zoompoint = new Point(x, y, self.map.spatialReference);
        });
        self.run_identify(zoompoint, 10);
    };

    self.run_identify = function(mapPoint, tol)
    {
        self.lastPoint = mapPoint;
        //Abort if x and y are 0.
        require(["esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "esri/geometry/Extent"], function(IdentifyTask, IdentifyParameters, Extent) {
            //First, construct an extent that is right around the point of interest.
            var idExtent = new Extent(mapPoint['x']-100, mapPoint['y']-100,
                                      mapPoint['x']+100, mapPoint['y']+100,
                                      self.map.spatialReference);
            var params = new IdentifyParameters();
            params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            params.geometry = mapPoint;
            params.returnGeometry = true;
            params.tolerance = tol;
            params.layerIds = self.idLayers;
            params.mapExtent = idExtent; //self.map.extent;
            params.width = 200; //self.map.width;
            params.height = 200; //self.map.height;
            params.dpi = 96;
            var idtask = new IdentifyTask(self.idURL);
            idtask.execute(params, self.show_results, self.error_results);
        });
    };

    self.show_results = function(res)
    {
        if (res.length == 0 && self.lastType == 'search')
        {
            //If we didn't get any search results, explain that.
            self.explain_no_results();
        }
        var zoomgeom = null;
        //first, find all of the street segments, and determine if we're in one.
        for (var i=0; i<res.length; i++)
        {
            if (res[i]['layerName'] == self.streetlayer)
            {
                var streetext = res[i]['feature']['geometry'].getExtent();
                if (self.lastPoint['x']>=streetext.xmin-1 && self.lastPoint['x']<=streetext.xmax+1 &&
                    self.lastPoint['y']>=streetext.ymin-1 && self.lastPoint['y']<=streetext.ymax+1)
                {
                    //We're in.
                    zoomgeom = res[i]['feature']['geometry'];
                    break;
                }
            }
        }
        //Abort if there's no street segment.
        if (zoomgeom)
        {
            self.map.graphics.clear();
            //First, clear out old data, and show the message for relevant panels.
            for (div in self.layermap)
            {
                $(div).html('');
                $(div).hide();
                //If there is a div that needs to be shown when there's no info, do so.
                if (self.templates[div]['blankdiv'])
                {
                    $(self.templates[div]['blankdiv']).show();
                }
                //If we need to hide a div in addition to this one, do so.
                if (self.templates[div]['hidediv'])
                {
                    $(self.templates[div]['hidediv']).hide();
                }
            }
            //Now, get the rendered output and put it in the right spot.
            for (div in self.layermap)
            {
                var lyr = self.layermap[div];
                for (var i=0; i<res.length; i++)
                {
                    //Test if we are using the geometry we're zooming to.
                    var samegeom = self.sameish(zoomgeom, res[i]['feature']['geometry']);
                    if (res[i]['layerName'] == lyr && samegeom)
                    {
                        var output = self.infodisp.render(div, res[i]['feature']['attributes'])
                        if (output)
                        {
                            $(div).html($(div).html() + output);
                            $(div).show();
                            if (self.templates[div]['blankdiv'])
                            {
                                $(self.templates[div]['blankdiv']).hide();
                            }
                            if (self.templates[div]['hidediv'])
                            {
                                $(self.templates[div]['hidediv']).show();
                            }                            
                        }
                        else
                        {
                            if (self.templates[div]['blankdiv'])
                            {
                                $(div).hide();
                                $(self.templates[div]['blankdiv']).show();
                            }
                        }
                    }
                }
                if (lyr == self.conditionlayer)
                {
                    if ($(div).html().length==0)
                    {
                        $(self.templates[div]['blankdiv']).show();
                    }
                }
            }
            //Now, draw the line segment
            var segextent = self.draw_segment(zoomgeom);
            self.zoom_to(segextent);
            //Finally, show the infopanel.
            self.show_panel();
        }
    };

    self.sameish = function(refgeom, testgeom)
    {
        var same = false;
        var testjson = JSON.stringify(testgeom['paths'][0]);
        var refjson = JSON.stringify(refgeom['paths'][0]);
        if (testjson == refjson)
        {
            //First, test to see if they are exactly the same.
            same = true;
        }
        else
        {
            //If that didn't work, test to see if the geometries are close.
            var refext = refgeom.getExtent();
            var testext = testgeom.getExtent();
            //Use the center point of the test extent as our test point...
            var testpoint = [(testext.xmax+testext.xmin)/2, (testext.ymax+testext.ymin)/2];
            //And see if it's within a slightly buffered reference extent.
            if (testpoint[0]>=refext.xmin-1 && testpoint[0]<=refext.xmax+1 &&
                testpoint[1]>=refext.ymin-1 && testpoint[1]<=refext.ymax+1)
            {
                same = true;
            }
        }
        return same;
    }

    self.draw_segment = function(geom)
    {
        //Make this thing look like an orange barrel.
        //Maybe defer on the zoom.
        var lineext;
        require(["esri/symbols/CartographicLineSymbol", "esri/graphic", "esri/Color"], function(CartographicLineSymbol, Graphic, Color) {
            var lineWhite = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SOLID, new Color([255,255,255]), 10, CartographicLineSymbol.CAP_BUTT, CartographicLineSymbol.JOIN_MITER, 5);
            var lineOrange = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SHORTDASHDOT, new Color([242,114,57]), 10, CartographicLineSymbol.CAP_BUTT, CartographicLineSymbol.JOIN_MITER, 5);
            var white = new Graphic(geom, lineWhite);
            self.map.graphics.add(white);
            var orange = new Graphic(geom, lineOrange);
            self.map.graphics.add(orange);
            lineext = white._extent;
        });
        return lineext;
    };

    self.zoom_to = function(extent)
    {
        self.map.setExtent(extent.expand(1.5));
        //This code can be used if part of the display hovers over the map,
        // but you want to be able to see the entire selection in spite of that.
        /*
        if (is_mobile())
        {
            self.map.setExtent(extent.expand(1.5));
        }
        else
        {
            var selectedext = extent.expand(1.25);
            var selectedcenter = selectedext.getCenter();
            var currentzoom = self.map.getZoom();
            var currentext = self.map.extent;
            var currentcenter = currentext.getCenter();
            //Compute the new zoom level
            var visext = self.get_vis_ext(currentext);
            var viscenter = visext.getCenter();
            var newzoom = self.get_new_zoom(selectedext, currentext, currentzoom, visext);
            var zoomfact = (1.0 / Math.pow(2, (newzoom-currentzoom)));
            //figure out the shift amount
            var shiftx = (viscenter['x'] - currentcenter['x']) * zoomfact;
            var shifty = (viscenter['y'] - currentcenter['y']) * zoomfact;
            //Now shift the selected center
            var newcenter;
            var newx = selectedcenter['x'] - shiftx;
            var newy = selectedcenter['y'] + shifty;
            require(["esri/geometry/Point"], function(Point)
            {
                newcenter = new Point(newx, newy, self.map.spatialReference);
            });
            self.map.centerAndZoom(newcenter, newzoom);
        }
        */
    };

    self.explain_no_results = function()
    {
        var msg = "I can't seem to find anything at this address.";
            msg += "<br><br>Please check the street number and the spelling of the street name, and try again.";

        var opts = {'container': 'body',
                    'animation': true,
                    'content': msg,
                    'html': true,
                    'placement': 'bottom',
                    'trigger': 'focus'};
        self.searchBox.popover(opts);
        self.searchBox.popover('show');
        setTimeout(function(){self.searchBox.popover('hide');self.searchBox.popover('destroy');}, 4000);
    };

    self.get_vis_ext = function(currext)
    {
        //Compute the area not covered by interface elements.
        var coveredx = self.infopanel.position()['left'] + self.infopanel.width();
        if ($('.navbar').length==1)
        {
            var coveredy = $('.navbar').position()['top'] + $('.navbar').height(); //there's a navbar.
        }
        else
        {
            var coveredy = 0;
        }
        var openfracx = (1.0 - coveredx/self.map.width);
        var openfracy = (1.0 - coveredy/self.map.height);
        var openext;
        require(["esri/geometry/Extent"], function(Extent) {
            //Now, make an extent out of it.
            var newxmin = currext['xmax'] - currext.getWidth() * openfracx;
            var newymin = currext['ymax'] - currext.getHeight() * openfracy;
            openext = new Extent(newxmin, newymin, currext['xmax'], currext['ymax'], self.map.spatialReference);
        });
        return openext;
    };

    self.get_new_zoom = function(fitext, currext, currzoom, openext)
    {
        var newzoom;
        var minzoom = 12; //This is the start desktop zoom, we'll use this as a cutoff.
        var maxzoom = self.map.getMaxZoom();  //We can't zoom any tighter than this.
        //Now 'move' fitext to the center of the open extent.
        var movedext = fitext.centerAt(openext.getCenter());
        //Now we need to see if the moved extent fits in the moved extent...
        newzoom = currzoom;
        if (!self.is_within(movedext, openext))
        {
            //The extent to fit is outside of the open extent,
            // so we need to zoom out (decrease the zoom level)
            var bigger = openext;
            while (newzoom > minzoom)
            {
                newzoom--;
                bigger = bigger.expand(2.0);
                if (self.is_within(movedext, bigger))
                {
                    //We're within the enlarged zoom, so we're good now.
                    break;
                }
            }
        }
        else if (self.is_within(movedext, openext))
        {
            //The moved extent is entirely within the open extent, 
            // so let's see if we can tighten up a bit.
            var smaller = openext;
            while (newzoom < maxzoom)
            {
                var lastzoom = newzoom;
                newzoom++;
                smaller = smaller.expand(0.5);
                if (!self.is_within(movedext, smaller))
                {
                    //We've shrunk too much, roll it back.
                    newzoom = lastzoom;
                    break;
                }
            }
        }
        else
        {
            //We don't need to to do anything; they match.
        }
        return newzoom;
    };

    self.is_within = function(testext, outerext)
    {
        var within = false;
        if (testext.getWidth() <= outerext.getWidth() && testext.getHeight() <= outerext.getHeight())
        {
            within = true;
        }
        return within;
    };
    
    /*** Deeplink Methods *****************************************************/
    self.handle_deeplink = function(params)
    {
        if (params['x'] && params['y'])
        {
            var xval = parseFloat(params['x']);
            var yval = parseFloat(params['y']);
            var mapPoint;
            require(["esri/geometry/Point"], function(Point) 
            {
                mapPoint = new Point(xval, yval, self.map.spatialReference)
                self.searchClear();
                self.run_identify(mapPoint, 30);
            });
        }
        return;
    };
    
    self.create_deeplink = function(defaultloc)
    {
        var loc = null;
        var link = null;
        if (window.location != window.parent.location)
        {
            //loc = window.parent.location; //Doesn't work, DOMException error when embedded.
            loc = defaultloc;
        }
        else
        {
            loc = window.location;
        }
        
        if (loc && self.lastPoint)
        {            
            var linkhost = loc.protocol + '//' + loc.host + loc.pathname;
            var joiner = '?';
            //We specifically omit the query string when generating this, so we
            // don't accidentally capture an old deeplink.
            /*
            if (loc.search && loc.search != '')
            {
                joiner =  loc.search + '&'
            }
            */
            link = encodeURI(linkhost + joiner + 'x=' + self.lastPoint['x'] + '&y=' + self.lastPoint['y']);
        }
        return link;
    };

    self.error_results = function(evt)
    {
        console.log('Error!');
        console.log(evt);
    };
}

/******************************************************************************/
/***                       Locator Object Definition                        ***/
/******************************************************************************/
function Locator(config)
{
    var self = this;
    self.useSuggestions = true;
    self.isComposite = false;
    self.addrURL = config['geolocURL'];
    self.searchBox = $(config['searchBox']);
    self.searchList = $('#'+self.searchBox.attr('list'));
    self.searchButton = $(config['searchBtn']);
    self.phantom = $(config['searchBox']).siblings('.hint');
    self.identify;

    self.init = function(callback)
    {
        //Init the callback function
        if (callback)
            self.identify = callback;    
        else
            self.identify = function(x, y){console.log('('+x+', '+y+')')};

        //Handle typing and button clicking.
        self.searchBox.on('input', self.handleInput);
        self.searchBox.on('change', self.handleInput);
        self.searchBox.on('input', self.matchPhantom);
        self.searchBox.on('change', self.matchPhantom);
        self.searchBox.on('keydown', function(evt){self.lastKey = evt.keyCode; self.handleInput(evt);});
        self.searchButton.on('click', self.handleSearchEvt);
    };

    self.clear = function()
    {
        self.searchList.empty();
        self.searchBox.val('');
        self.phantom.val('');
    };

    self.matchPhantom = function(evt)
    {
        self.phantom.val('');
        return true;
    };

    self.handleInput = function(evt)
    {
        //Determine what the user is trying to do, and run with it.
        if (self.lastKey == 8 || self.lastKey == 46)
        {
            //Let it slide through and clear stuff out.
            self.searchList.empty();
        }
        else if (self.lastKey == 13)
        {
            //Clear the enter key from the list to prevent double-searching.
            self.lastKey = -1;
            self.handleSearchEvt(evt);
        }
        else
        {
            if (evt.type == 'input' || evt.type == 'change')
            {
                self.getAddresses(evt);
            }
        }
        return true;
    };

    self.getAddresses = function(evt) 
    {
        //Query the address locator service (if we have enough characters).
        if (self.searchBox.val().length > 5)
        {
            //AHA! only search for the non-highlighted text!
            var queryText = self.searchBox.val();
            self.searchBox.data('data-typed', queryText);
            if (self.useSuggestions)
                self.querySuggestions(queryText, self.populateList);
            else
                self.queryCandidates(queryText, self.populateList);
        }
        else if (self.searchBox.val().length == 0)
        {
            self.clear();
        }
    };

    self.querySuggestions = function(queryAddr, callback)
    {
        //Get suggestions from the locator.
        var query = self.addrURL + '/suggest?text=';
        query += queryAddr + '&maxSuggestions=5&f=json';
        $.getJSON(query, {}, callback).fail(self.showLocationError);
    };

    self.queryCandidates = function(queryAddr, callback)
    {
        //Get candidate addresses from the locator.
        if (self.isComposite)
            var query = self.addrURL + '/findAddressCandidates?SingleLine='; //This appears to be the format for composite locators.
        else
            var query = self.addrURL + '/findAddressCandidates?Single+Line+Input=';
        query += queryAddr + '&f=json';
        $.getJSON(query, {}, callback).fail(self.showLocationError);
    };

    self.queryMagicKey = function(queryText, queryMagicKey, callback)
    {
        //Get candidate addresses from the locator using a magic key.
        var query = self.addrURL + '/findAddressCandidates?Single+Line+Input=';
        query += queryText + '&magicKey=' + queryMagicKey + '&f=json';
        $.getJSON(query, {}, callback).fail(self.showLocationError);
    };

    self.populateList = function(resp)
    {
        //Fill the datalist with address candidates.
        //Proceed if we haven't gotten an error.
        if (resp['error'])
        {
            self.showLocationError(resp['error']);
            return;
        }
        if (resp && resp['candidates'] && resp['candidates'].length > 0)
        {
            self.populateCandidates(resp);
        } 
        else if (resp && resp['suggestions'] && resp['suggestions'].length > 0)
        {
            self.populateSuggestions(resp);
        }
    };

    self.populateCandidates = function(resp)
    {
        self.searchList.empty();
        for (var i=0; i<resp['candidates'].length; i++)
        {
            var opt = $('<option>');
            opt.attr('value', resp['candidates'][i]['address']);
            opt.data('data-location', resp['candidates'][i]['location']);
            self.searchList.append(opt);
            if (i == 0)
            {
                if (self.searchBox.val().toUpperCase() == resp['candidates'][i]['address'].toUpperCase().slice(0, self.searchBox.val().length))
                {
                    var start = self.searchBox.val().length;
                    var end = resp['candidates'][i]['address'].length;
                    var autofill = self.searchBox.val()+resp['candidates'][i]['address'].slice(start, end);
                    self.phantom.val(autofill);
                }
            }
        }
    };

    self.populateSuggestions = function(resp)
    {
        self.searchList.empty();
        for (var i=0; i<resp['suggestions'].length; i++)
        {
            var opt = $('<option>');
            opt.attr('value', resp['suggestions'][i]['text']);
            opt.data('data-text', resp['suggestions'][i]['text']);
            opt.data('data-key', resp['suggestions'][i]['magicKey']);
            self.searchList.append(opt);
            if (i == 0)
            {
                if (self.searchBox.val().toUpperCase() == resp['suggestions'][i]['text'].toUpperCase().slice(0, self.searchBox.val().length))
                {
                    var start = self.searchBox.val().length;
                    var end = resp['suggestions'][i]['text'].length;
                    var autofill = self.searchBox.val()+resp['suggestions'][i]['text'].slice(start, end);
                    self.phantom.val(autofill);
                }
            }
        }
    };

    self.handleSearchEvt = function(evt)
    {
        //Decide what to do with the search event (i.e., search or clear the list).
        //if (evt.target.value.length > 0)
        if (self.searchBox.val().length > 0)
        {
            self.searchClick(evt);
        }
        else
        {
            self.searchList.empty();
            //self.clearResults();
        }
    };

    self.searchClick = function(evt)
    {
        //Handle an actual search (button click or enter with enough characters).
        var x = null;
        var y = null;
        var suggestions = false;
        var searchTxt = self.searchBox.val().toUpperCase();
        var options = self.searchList.children('option');
        for (var i=0; i<options.length; i++)
        {
            if (searchTxt == $(options[i]).val().toUpperCase())
            {
                if ($(options[i]).data('data-location'))
                {
                    //We've populated the options list with candidates, and 
                    // already have location information.
                    var location = $(options[i]).data('data-location');
                    var x = location['x'];
                    var y = location['y'];
                    break;
                }
                else if ($(options[i]).data('data-key'))
                {
                    //We've populated the options list with suggestions, and
                    // we need to get the location from a candidate request.
                    suggestions = true;
                    var queryText = $(options[i]).data('data-text');
                    var queryMagicKey = $(options[i]).data('data-key');
                    self.queryMagicKey(queryText, queryMagicKey, self.handleMagic);
                    break;
                }
            }
        }

        if (i == options.length && options.length > 0)
        {
            //We got a search event, but we have options, and the entered text 
            // doesn't match any of them.  This means that the user didn't 
            // select anything from the dropdown list (maybe they couldn't see 
            // it), and they liked what they saw in the phantom, i.e., the 
            // first option.
            var typed = self.searchBox.val();
            //if ($(options[0]).val().toUpperCase().startsWith(typed.toUpperCase()))
            if ($(options[0]).val().toUpperCase().indexOf(typed.toUpperCase()) == 0) //IE doesn't support .startsWith()
            {
                //But only if there's some sort of text match.
                var autofill = typed+$(options[0]).val().slice(typed.length);
                self.searchBox.val(autofill);
                self.searchClick(evt);
                return false;
            }
        }

        if (x && y)
        {
            self.searchBox.blur();
            self.identify(x, y)
        }
        else
        {
            //If we don't have any options or no option matches the address, 
            // we need to try one last time to get a location from the service.
            self.searchBox.blur();
            if (!suggestions)
                self.lastChanceSearch(searchTxt);
        }
        evt.preventDefault();
        return false;
    };

    self.handleMagic = function(resp)
    {
        var location = resp['candidates'][0]['location'];
        self.identify(location['x'], location['y']);
        return false;
    };

    self.setSelectionRange = function(input, selectionStart, selectionEnd)
    {
        //Position the cursor in the input box and select the remainder of the 
        // text once we've gotten an address candidate.
        //Cribbed from http://stackoverflow.com/a/499158
        if (input.setSelectionRange)
        {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (input.createTextRange)
        {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    };

    self.lastChanceSearch = function(addr)
    {
        //Last chance search of the user-supplied address.
        self.queryCandidates(addr, self.lastTry);
    };

    self.lastTry = function(resp)
    {
        var msg;
        if (resp['error'])
        {
            msg = 'There was an error while searching for this address.';
            self.showLocationError(msg);
            return;
        }
        if (resp && resp['candidates'].length == 0)
        {
            msg = "I can't seem to find this address.";
            msg += "<br>Please check the spelling of the street name, and try again.";

            self.showLocationError(msg);
        }
        else if (resp && resp['candidates'].length > 0)
        {
            self.searchList.empty();
            //grab the candidate with the highest score
            var location = resp['candidates'][0]['location'];
            self.identify(location['x'], location['y']);
        }
    };

    self.showLocationError = function(errmsg)
    {
        console.log('Search Error:', errmsg);
        if (!errmsg || errmsg == '')
        {
            errmsg = 'There was an error searching for addresses.<br>Please try again later.';
        }
        var opts = {'container': 'body',
                    'animation': true,
                    'content': errmsg,
                    'html': true,
                    'placement': 'bottom',
                    'trigger': 'focus'};
        self.searchBox.popover(opts);
        self.searchBox.popover('show');
        setTimeout(function(){self.searchBox.popover('hide');self.searchBox.popover('destroy');}, 4000);
    };
}

/******************************************************************************/
/***                     InfoDisplay Object Definition                      ***/
/******************************************************************************/
function InfoDisplay(templates)
{
    var self = this;
    self.templates = templates;
    self.fields = {};

    self.init = function()
    {
        self.parse_fields();
    }

    self.parse_fields = function()
    {
        for (div in self.templates)
        {
            var fields = [];
            var template = self.templates[div]['template'];
            var starts = template.split('{');
            for (var i=0; i<starts.length; i++)
            {
                if (starts[i] == '')
                {
                    var fld = starts[i+1].split('}}')[0];
                    fields.push(fld);
                }
            }
            self.fields[div] = fields;
        }
    };

    self.render = function(divname, attributes)
    {
        var result = '';
        if (divname && attributes && templates[divname])
        {
            var showthis = false;
            for (var i=0; i<self.fields[div].length; i++)
            {
                var data = attributes[self.fields[div][i]];
                if (data && data != '' && data != ' ')
                {
                    showthis = true;
                    break;
                }
            }
            if (showthis)
            {
                result = self.fill_template(templates[divname]['template'], attributes, templates[divname]['datefields']);
            }
            else
            {
                result = null;
            }
        }
        return result;
    };

    self.fill_template = function(template, data, dates)
    {
        var filled = template;
        for (var item in data)
        {
            var info = data[item];
            if (info == 'Null' || info == '' || info == ' ')
            {
                info = ' - ';
            }
            else if (dates.indexOf(item) > -1)
            {
                info = self.make_quarter(info);
            }
            var replacepattern = new RegExp('{{' + item +'}}', 'g');
            filled = filled.replace(replacepattern, info);
        }
        return filled;
    };

    self.make_quarter = function(rawdate)
    {
        var datebits = rawdate.split('/');
        if (datebits.length == 3)
        {
            var month = parseInt(datebits[0]);
            var year = parseInt(datebits[2]);
            var qtr = ''
            if (month < 4)
                qtr = 'Q1 ';
            else if (month > 3 && month < 7)
                qtr = 'Q2 ';
            else if (month > 6 && month < 10)
                qtr = 'Q3 ';
            else if (month > 9 && month < 13)
                qtr = 'Q4 ';

            if (year > 2015)
            {
                quarterdate = qtr + year;
                quarterdate = quarterdate.trim();
            }
            else
            {
                quarterdate = ' - ';
            }
        }
        else
        {
            quarterdate = ' - ';
        }
        return quarterdate
    };
}

/******************************************************************************/
/***                       General Utilitiy Functions                       ***/
/******************************************************************************/
function getParams()
{
    var params = {};
    if (location.search)
    {
        if (location.search.charAt(location.search.length-1) == '/')
        {
            var parts = location.search.substring(1, location.search.length-1).split('&');
        }
        else
        {
            var parts = location.search.substring(1).split('&');
        }

        for (var i = 0; i < parts.length; i++)
        {
            var nv = parts[i].split('=');
            if (!nv[0])
                continue;
            if (nv[1])
            {
                params[nv[0]] = decodeURIComponent(nv[1]);
            }
            else
            {
                params[nv[0]] = true;
            }
        }
    }
    return params;
}

function hide_chrome()
{
    //Hide the header and footer
    $('.jumbotron').css('display', 'none');
    $('footer').css('display', 'none');
    $('body').css('padding-bottom', '0');    
}

$(function() {
    var urlparams = getParams();
    if (urlparams.embedded)
        hide_chrome();
    init(urlparams);
});

$( function() {
	
	/******************************
	 * Default Parameters
	 */
	var colors = colors || {};
	
	colors.palette = [];
	colors.palettes =
	[
		{
			'id': 'pal_1234',
			'name': 'Palette #1',
			'items': [
				"rgb(66, 108, 158)",
				"rgb(107, 166, 98)",
				"rgb(238, 174, 84)",
				"rgb(199, 59, 62)",
				"rgb(134, 77, 145)",
				"rgb(158, 218, 229)",
				"rgb(253, 228, 128)",
				"rgb(241, 85, 1)",
				"rgb(61, 96, 56)",
				"rgb(185, 104, 111)",
				"rgb(139, 125, 107)"
			]
		}
	];

	colors.conf =
	{ 
		'currentPaletteId': colors.palettes[ 0 ].id,	// default to the first palette
		'outputHex': true
	};

	var currentPalette = colors.palettes[ colors.conf.currentPaletteId ];
	var currentColor = null;
	var blendColor = null;
	var blendColorDefault = "red";

	var defaultPalette = [
		"rgb(66, 108, 158)",
		"rgb(107, 166, 98)",
		"rgb(238, 174, 84)",
		"rgb(199, 59, 62)",
		"rgb(134, 77, 145)",
		"rgb(158, 218, 229)",
		"rgb(253, 228, 128)",
		"rgb(241, 85, 1)",
		"rgb(61, 96, 56)",
		"rgb(185, 104, 111)",
		"rgb(139, 125, 107)"
	];

	/*********************************
	 * Functions
	 */

	 // Check if a color is not in the palette
	function notInPalette( color )
	{
		var r = colors.palette.indexOf( color ) >= 0 ? false : true;
		return  r;
	}

	// Add a color to the palette
	var addColor = function( event, ui )
	{
		if( $( ui.draggable[0] ).hasClass( "color" ) && $( ui.draggable[0] ).hasClass( "drop") )
		{
			var newColor =  ui.draggable.css("backgroundColor");
			if( notInPalette( newColor ) )
			{
				colors.palette.push( newColor );
				storePalette();
				colors.buildPalette();
			}
		}
	};

	// Remove a color from the palette
	var removeColor = function( event, ui )
	{
		var c = ui.draggable.css("backgroundColor");
		var index = colors.palette.indexOf( c );
		
		if( index > -1 )
		{
			colors.palette.splice(index, 1);
			storePalette();
			colors.buildPalette();
		}
	};

	// Update the palette when a change occurs
	var updatePalette = function ( e )
	{
		var curColors = $("#masterPalette .color" );

		colors.palette = [];

		for( i = 0; i < curColors.length; i++ )
		{
			c = $( curColors[ i ] ).css( "backgroundColor" );
			colors.palette.push( c );
		}
		
		$( "body" ).data( { "palette": colors.palette } );

		colors.buildPalette();

	};

	// Clear the local storage
	var clearLocalStorage = function()
	{
		window.localStorage.clear();
	};

	var newPalette = function( name )
	{

	};

	var deletePalette = function( id )
	{

	};

	var newPaletteId = function()
	{
		var id = "pal_" + new Date().getTime();
		return( id );
	};

	// Save the palette in local storage
	var storePalette = function()
	{
		clearLocalStorage();

		localStorage.setItem( "colors.palette" , JSON.stringify( colors.palette ) );
	};

	// Load the palette from local storgage
	var retrievePalette = function()
	{
		if( localStorage.getItem( "colors.palette" ) )
		{
			colors.palette = [];
			colors.palette = JSON.parse( localStorage.getItem( "colors.palette" ) );
		}
	};

	// Create the complement color
	var setComplement = function( c )
	{
		var cmp = c.complement().html("rgb");
		$("#complement").css( "backgroundColor", cmp );
	};
	
	// Create the color triads
	var setTriads = function ( c )
	{
		var tri = c.triad();
		$("#triad2").css( "backgroundColor", tri[ 1 ].html( "rgb" ) );
		$("#triad2").attr( "title", tri[ 1 ].html( "rgb" ) );
		$("#triad3").css("backgroundColor", tri[ 2 ].html("rgb") );
		$("#triad3").attr( "title", tri[ 2 ].html( "rgb" ) );
	};

	// Create the set of various hues
	var setHueSet = function( c )
	{
		var i;
		var hs = c.hueSet();
		for( i = 0; i < hs.length; i++ )
		{
			$( "#hs" + i ).css( "backgroundColor", hs[ i ].html( "rgb" ) );
			$( "#hs" + i ).attr( "title", hs[ i ].html( "rgb" ) );
		}
	};
	
	// Create the set of tints (mixed with white)
	var setTintSet = function( c )
	{
		var i;
		var tintVal = 0.1;

		for( i = 0; i < 10; i++ )
		{
			var tint = c.tint( tintVal );
			$( "#tint" + i ).css( "backgroundColor", tint.html( "rgb" ) );
			$( "#tint" + i ).attr( "title", tint.html( "rgb" ) );
			tintVal += 0.1;
		}
	};
	
	// Create the set of shades
	var setShadeSet = function( c )
	{
		var i;
		var shadeVal = 0.1;

		for( i = 0; i < 10; i++ )
		{
			var shade = c.shade( shadeVal );
			$( "#shade" + i ).css( "backgroundColor", shade.html("rgb" ) );
			$( "#shade" + i ).attr( "title", shade.html("rgb" ) );
			shadeVal += 0.1;
		}
	};
	
	// Create the set of tones (mixed with gray)
	var setToneSet = function( c )
	{
		var i;
		var toneVal = 0.1;

		for( i = 0; i < 10; i++ )
		{
			var tone = c.tone( toneVal );
			$( "#tone" + i ).css("backgroundColor", tone.html("rgb") );
			$( "#tone" + i ).attr("title", tone.html("rgb") );
			toneVal += 0.1;
		}
	};
	
	// Create the set of blended colors
	var setBlendSet = function( c )
	{
		var i;
		var blendVal = 0;

		if ( blendColor === null )
		{
			blendColor = pusher.color( blendColorDefault );
		}

		for( i = 0; i < 10; i++ )
		{
			var blnd = c.blend( blendColor, blendVal );
			$( "#blnd" + i ).css("backgroundColor", blnd.html("rgb") );
			$(  "#blnd" + i  ).attr( "title", blnd.html("rgb") ); 
			blendVal += 0.1;
		}
	};
	
	// Change the second blend color
	var blendDrop = function( e, ui )
	{
		var c = pusher.color( ui.draggable.css("backgroundColor" ) );
		blendColor = pusher.color( ui.draggable.css("backgroundColor" ) );
		setBlendSet( currentColor );
	};

	// Update all the colors when there is a change
	function updateColors( clr )
	{
		var c = pusher.color( clr.toRgbString() );
		currentColor = c;
		$( "#paletteColor" ).css( "backgroundColor", clr.toRgbString() );
		setComplement( c );
		setTriads( c );
		setHueSet( c );
		setTintSet( c );
		setToneSet( c );
		setShadeSet( c );
		setBlendSet( c, pusher.color( "red" ) );
	}

	colors.setColorPickerColor = function( pColor )
	{
		$( "#cpick1" ).spectrum( "set",  pColor.html() );
		var sColor = $( "#cpick1" ).spectrum( "get" );
		updateColors( sColor );
	};

	colors.buildPalette = function()
	{
		var i = 0, c;
		var mp = $( "#masterPalette" );

		mp.empty();

		for ( i = 0; i < colors.palette.length; i++ )
		{
			c = $( "<li></li>" );
			c.id = "cp" + i;
			$( c ).css( "backgroundColor",  colors.palette[ i ] );
			$( c ).prop( "title", colors.palette[ i ] );
			$( c ).addClass( "color" );
			$( c ).attr( "title", colors.palette[ i ] ); 
			$( mp ).append( c );
		}

		storePalette();
		colors.displayPaletteText();
	};

	/* **********************************
	 * Output the text values for the selected colors in either hex or RGB format
	 */
	colors.displayPaletteText = function()
	{
		var val = "", c, ctxt = "";
		
		var pt = $( "textarea[name='paletteTextArea']" );

		for ( i = 0; i < colors.palette.length; i++ )
		{
			if( colors.conf.outputHex )
			{
				c = pusher.color( colors.palette[ i ] );
				ctxt = c.html( 'hex6' );
			}
			else
			{
				ctxt = colors.palette[ i ];
			}

			val += ctxt + "\n";
		}

		$(pt).val( val );
	};

	colors.clearPalette = function()
	{
		console.log( "clearPalette " );

		$( "#masterPalette" ).empty();
		$( "#clearPaletteModal" ).modal( 'hide' );
	};

	colors.init = function()
	{
		var palette = [];

		// Get our initial palette. If there is one stored use that otherwise use default.
		if( colors.palette.length === 0 )
		{
			if( localStorage.getItem( "colors.palette" ) )
			{
				retrievePalette();
			}
			else
			{
				colors.palette = defaultPalette;
			}
		}

		if( colors.conf.outputHex )
		{
			$( "input[ name='textOutputType' ][ value='hex' ]" ).prop( "checked", true );
		}
		else
		{
			$( "input[ name='textOutputType' ][ value='rgb' ]" ).prop( "checked", true );
		}

		colors.buildPalette();
		colors.setColorPickerColor( pusher.color( colors.palette[ 0 ] ) );
		currentColor = pusher.color( colors.palette[ 0 ] );
	};


	/********************
	 * Event bindings
	 */
	$( "#masterPalette" ).sortable(
		{
			tolerance: "pointer",
			update: updatePalette,
			opacity: 0.7,
			connectWith: "#mainColor"
		}
	);

	$( "#paletteColor" ).droppable(
		{
			drop: function( e, ui ) 
			{
				var c = pusher.color( ui.draggable.css("backgroundColor") );
				currentColor = c;
				$("#cpick1").spectrum( "set",  c.html() );
				$( "#paletteColor").css( "backgroundColor", c.html() );
				setComplement( c );
				setTriads( c );
				setHueSet( c );
				setTintSet( c );
				setToneSet( c );
				setShadeSet( c );
				setBlendSet( c, pusher.color("red") );
			}
		}
	);

	$( "#blnd9" ).droppable(
		{
			drop: blendDrop
		}
	);

	$( "#masterPalette" ).droppable( 
		{
			drop: addColor
		}
	);

	$( "#trash" ).droppable( {
		drop: removeColor,
		tolerance: "touch"
	} );

	$( ".color" ).draggable( { helper: "clone" } );

	$( ".colors" ).disableSelection();

	$( "#cpick1" ).spectrum(
		{
			flat: false,
			showInitial: true,
			showInput: true,
			allowEmpty: true,
			// showAlpha: true,
			// showPalette: true,
			// showSelectionPalette: true,
			showButtons: true,
			preferredFormat: "name",
			move: updateColors,
			change: updateColors
		} 
	);

	$( "input[ name='textOutputType' ]" ).click( function()
	{
		colors.conf.outputHex = $( "input[ name='textOutputType' ]:checked" ).val() == "hex" ? true : false;
		colors.displayPaletteText();
	});

	$('#clearPaletteYes-btn').click( colors.clearPalette );

	/***********************
	 * Initialize
	 */
	colors.init();
});


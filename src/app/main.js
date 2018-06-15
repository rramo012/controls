import { Application as ComponentApplication } from '@boldgrid/components/src/app/js/main.js';

import {
	ColorPalette,
	StyleUpdater,
	ColorPaletteSelection,
	PaletteConfiguration,
	Animation,
	Slider,
	DeviceVisibility
} from '../controls';

import '@boldgrid/components/src/app/scss/main.scss';
import { Demo as MultiSlider } from './multi-slider';
import './main.scss';

export class Application {

	/**
	 * Initialize the app used for testing.
	 *
	 * @since 1.0.0
	 */
	init() {
		this.paletteConfig = new PaletteConfiguration();

		new ComponentApplication().init();

		// Instantiate the css loader.
		this.styleUpdater = new StyleUpdater( document );
		this.styleUpdater.setup();

		this.renderControls();
	}

	/**
	 * Create the controls.
	 *
	 * @since 1.0.0
	 */
	renderControls() {
		this.paletteCustomize();
		this.paletteSelection();
		this.setupSlider();
		new MultiSlider().render();
		this.animation();
		this.deviceVisibility();
	}

	deviceVisibility() {
		let $tab = $( '.device-visibility' ),
			$demoElement = $tab.find( '.demo-element' );

		$tab.find( '.control' ).html( new DeviceVisibility( {
			target: $demoElement,
			control: {
				selectors: [ '.headdings' ],
				responsive: {

					// These are max widths.
					phone: 767, // 0 to 767 is phone.
					tablet: 991,  // 768 to 991 is tablet.
					desktop: 1199  // 992 to 1199 is desktop.

					// Large is 1200+
				}
			}
		} ).render() );
	}

	setupSlider() {
		let $tab = $( '.slider-tab' );

		$tab.find( '.control' ).html( new Slider().render() );
	}

	/**
	 * Set up animation demo control.
	 *
	 * @since 0.10.0
	 */
	animation() {
		let $tab = $( '.animations-tab' ),
			$demoElement = $tab.find( '.demo-element' );

		$tab.find( '.control' ).html( new Animation( {
			target: $demoElement
		} ).render() );
	}

	paletteSelection() {
		let $tab = $( '.palette-selection-tab .control' ),
			$log = $( '.palette-selection-tab .log' ),
			paletteSelection = new ColorPaletteSelection(),
			$control = paletteSelection.create();

		$tab.html( $control );

		$control.on( 'palette-selection', ( e, data ) => {
			let logData = {
				colors: data.palette,
				time: new Date().getTime()
			};

			$log.append( '<div class="log-line">' + JSON.stringify( logData ) + '</div>' );
		} );
	}

	paletteCustomize() {
		let $control,
			$tab = $( '.colors-tab' ),
			colorPalette = new ColorPalette();

		colorPalette.init();

		$control = colorPalette.render( $tab.find( '.control' ) );

		$control.on( 'sass_compiled', ( e, data ) => {
			this.styleUpdater.update( {
				id: 'bg-controls-colors',
				css: data.result.text,
				scss: data.scss
			} );

			$tab.find( '.css' ).show();

			if ( BOLDGRID.COLOR_PALETTE.Modify.state ) {
				let savableState = this.paletteConfig.createSavableState(
					BOLDGRID.COLOR_PALETTE.Modify.state
				);
				console.log( 'State', savableState );
				console.log( 'State', JSON.stringify( savableState ) );
			}
		} );
	}
}

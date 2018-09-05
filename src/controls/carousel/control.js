var $ = window.jQuery;

import { Switch } from '../switch';
import { Slider } from '../slider';
import { MatSelect } from '../mat-select';
import { FontColor } from '../typography/font-color';
import template from './template.html';
import navigationOptions from './config/nav-position';
import navigationDesign from './config/nav-design';
import dotPosition from './config/dot-position';
import './style.scss';

export class Control {
	constructor( options ) {
		this.options = _.defaults( options || {}, {
			title: 'BoldGrid Slider'
		} );

		this.template = _.template( template );
		this._setupNavigation();
		this._setupAutoPlay();
		this._setupInfinite();
		this._setupDots();
	}

	/**
	 * Render the carousel control.
	 *
	 * @since 1.0.0
	 *
	 * @return {jQuery} Control library.
	 */
	render() {
		this.$element = $( this.template( this.options ) );

		this.$element.find( 'nav-switch' ).replaceWith( this.navSwitch.render() );
		this.$element.find( 'nav-position' ).replaceWith( this.navPosition.render() );
		this.$element.find( 'nav-design' ).replaceWith( this.navDesign.render() );
		this.$element.find( 'nav-overlay' ).replaceWith( this.navOverlay.render() );
		this.$element.find( 'nav-background-color' ).replaceWith( this.backgroundColor.render() );

		this.$element.find( 'dots-switch' ).replaceWith( this.dotSwitch.render() );
		this.$element.find( 'dots-position' ).replaceWith( this.dotPosition.render() );
		this.$element.find( 'dots-overlay' ).replaceWith( this.dotOverlay.render() );
		this.$element.find( 'dots-color' ).replaceWith( this.dotColor.render() );

		this.$element.find( 'autoplay-switch' ).replaceWith( this.autoplaySwitch.render() );
		this.$element.find( 'autoplay-speed' ).replaceWith( this.autoplaySlider.render() );
		this.$element.find( 'infinite-switch' ).replaceWith( this.infiniteSwitch.render() );

		return this.$element;
	}

	_setupDots() {
		this.dotSwitch = new Switch( {
			name: 'carousel-navigation-dots',
			direction: 'reverse',
			label: 'Navigation Dots'
		} );

		this.dotOverlay = new Switch( {
			name: 'carousel-dots-overlay',
			direction: 'reverse',
			label: 'Overlay'
		} );

		this.dotPosition = new MatSelect( dotPosition );
		this.dotColor = new FontColor( {
			label: 'Color',
			target: $( '<div style="color: #000000">' )
		} );
	}

	_setupInfinite() {
		this.infiniteSwitch = new Switch( {
			name: 'carousel-infinite',
			direction: 'reverse',
			label: 'Loop'
		} );
	}

	_setupAutoPlay() {
		this.autoplaySwitch = new Switch( {
			name: 'carousel-autoplay-enabled',
			direction: 'reverse',
			label: 'Autoplay'
		} );

		this.autoplaySlider = new Slider( {
			name: 'autoplay-duration',
			label: 'Autoplay Duration',
			uiSettings: {
				min: 2,
				max: 20
			}
		} );
	}

	_setupNavigation() {
		this.navSwitch = new Switch( {
			name: 'carousel-navigation-buttons',
			direction: 'reverse',
			label: 'Navigation Buttons'
		} );

		this.navOverlay = new Switch( {
			name: 'carousel-navigation-overlay',
			direction: 'reverse',
			label: 'Overlay'
		} );

		this.navPosition = new MatSelect( navigationOptions );
		this.navDesign = new MatSelect( navigationDesign );
		this.backgroundColor = new FontColor( {
			label: 'Background Color',
			target: $( '<div style="color: #000000">' )
		} );
	}
}
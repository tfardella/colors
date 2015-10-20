#Color Palette Creator

This was just a little utility that I wrote for a project I was working on. The project involved creating a bunch of line charts and I needed to choose appropriate color palettes for the charts. Colors had to be different enough as to be decernable on different systems. I needed a way to easily change the order of a series of colors and I couldn't find any tools out there to allow me to do this. Hence this project was born.

You can choose a color via a color picker. Once you do other related colors are shown including it's complement, triads, hues, tints, shades, tones. There is also a blend option that allows you to drag another color to the end of the list and show 10 blended colors from the original to the new color.

Once you find a color you like just drag it to the main palette at the top of the page. Within the main palette you can drag colors around to change their order. You can also drag a color down to the main color box and play with it. Finally, you can drag a color from the palette to the trash icon to remove it from the list.

Once you have a palette you're happy with you can copy the list of values in either hex or rgb format into your code.

This project makes use of the following libraries:

jQuery
	The js library we all know and love.
	https://jquery.com/

jQueryUI
	Used to handle the drag/drop functionality
	http://jqueryui.com/

pusher.color.js
	A great library for manipulating color values. The original website for this library doesn't seem to be working any more. A cached version can be found here:

	http://cache.preserve.io/5g18q0pw/index.html

Spectrum - The No Hassle Colorpicker
	A simple and easy to use colorpicker
	https://github.com/bgrins/spectrum

If you have any questions you can contact me at tfardella@gmail.com
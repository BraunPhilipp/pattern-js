# Pattern.js

## Demo

A working demo can be found at https://braunphilipp.github.io/pattern-js/.


## General

Pattern.js is a lightweight jQuery plugin that lets you select patterns, sizes and colors.
The selected item is stored as an attribute in the parent object. The project
was necessary to realize https://ricecover.com (POD Editor).

For instance in the case of `<div class="patterns" id="pattern" value="cat.jpg"></div>` the value `cat.jpg` represents the selected item and can be used for further processing.


## Install

To install the plugin simply import `jQuery` and `pattern.js` in the following way. To
import `pattern.js` and from the `/js` folder.

```
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="js/pattern.js"></script>
<script type="text/javascript">
$(function() {
  $('.patterns').patternSelect();
  $("#color").patternSet("#dd0011");
});
</script>
```

The plugin is accessed through `$('.patterns').patternSelect();`. During any javascript
routine the current pattern can be changed using `$("#color").patternSet("#dd0011");`.
Please make sure to use a unique identifier.

To use the current gulp configuration use the two commands below.

```
npm install
gulp dev
```


## License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Please note this does not include any image files associated with the project.**
